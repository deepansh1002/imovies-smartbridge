const express = require('express');
const router = express.Router();
const Booking = require('../models/bookingModel');
const Show = require('../models/showModel');
const fetchUser = require('../middlewares/fetchUser');

// @route   POST /api/bookings/lock-seats
// @desc    Acquire temporary lock on selected seats (10-minute TTL)
// @access  Private
router.post('/lock-seats', fetchUser, async (req, res, next) => {
  try {
    const { showId, seats, tier = 'middle' } = req.body;
    // seats is an array of seat numbers e.g. ["M1", "M2"]
    if (!showId || !seats || !seats.length) {
      return res.status(400).json({ success: false, message: 'Please provide showId and seats to lock.' });
    }

    const show = await Show.findById(showId);
    if (!show) {
      return res.status(404).json({ success: false, message: 'Show not found.' });
    }

    const tierLower = tier.toLowerCase();
    const layout = show.seatLayout[tierLower];
    if (!layout) {
      return res.status(400).json({ success: false, message: `Invalid seating tier: ${tier}` });
    }

    const now = new Date();
    const lockExpiresAt = new Date(now.getTime() + 10 * 60 * 1000); // 10 minutes

    // Check if any seat is already booked or actively locked by someone else
    for (const seatNum of seats) {
      const seat = layout.find(s => s.seatNumber === seatNum);
      if (!seat) {
        return res.status(400).json({ success: false, message: `Seat ${seatNum} does not exist.` });
      }
      if (seat.status === 'BOOKED') {
        return res.status(409).json({ success: false, message: `Seat ${seatNum} is already booked.` });
      }
      if (seat.status === 'LOCKED' && seat.lockExpiresAt > now && seat.lockedBy !== req.user.id) {
        return res.status(409).json({ success: false, message: `Seat ${seatNum} is temporarily held by another customer.` });
      }
    }

    // Apply temporary lock
    seats.forEach(seatNum => {
      const seat = layout.find(s => s.seatNumber === seatNum);
      seat.status = 'LOCKED';
      seat.lockExpiresAt = lockExpiresAt;
      seat.lockedBy = req.user.id;
    });

    await show.save();

    res.status(200).json({
      success: true,
      message: 'Seats locked successfully for 10 minutes.',
      lockedSeats: seats,
      expiresAt: lockExpiresAt
    });
  } catch (error) {
    next(error);
  }
});

// @route   POST /api/bookings/confirm
// @desc    Confirm booking, finalize payment & mark seats as BOOKED
// @access  Private
router.post('/confirm', fetchUser, async (req, res, next) => {
  try {
    const { showId, ticketsData, totalAmount, paymentId, tier = 'middle' } = req.body;

    if (!showId || !ticketsData || !totalAmount) {
      return res.status(400).json({ success: false, message: 'Missing required booking details.' });
    }

    const show = await Show.findById(showId);
    if (!show) {
      return res.status(404).json({ success: false, message: 'Show not found.' });
    }

    const tierLower = tier.toLowerCase();
    const layout = show.seatLayout[tierLower];

    // Mark seats as permanently BOOKED
    ticketsData.forEach(ticket => {
      const seat = layout.find(s => s.seatNumber === ticket.seatNumber);
      if (seat) {
        seat.status = 'BOOKED';
        seat.lockExpiresAt = null;
        seat.lockedBy = req.user.id;
      }
    });

    // Decrement available tickets count
    show.availableSeats = Math.max(0, (show.availableSeats || show.tickets) - ticketsData.length);
    await show.save();

    const bookingId = 'BK-' + Date.now().toString(36).toUpperCase() + '-' + Math.floor(Math.random() * 1000);

    const newBooking = new Booking({
      bookingId,
      showId,
      userId: req.user.id,
      userEmail: req.user.email,
      ticketsData,
      totalAmount,
      paymentId: paymentId || 'PAY-' + Date.now(),
      bookingStatus: 'CONFIRMED'
    });

    const savedBooking = await newBooking.save();

    res.status(201).json({
      success: true,
      message: 'Booking confirmed successfully!',
      booking: savedBooking
    });
  } catch (error) {
    next(error);
  }
});

// @route   GET /api/bookings/my-bookings
// @desc    Get user's personal booking history
// @access  Private
router.get('/my-bookings', fetchUser, async (req, res, next) => {
  try {
    const bookings = await Booking.find({ userId: req.user.id })
      .populate('showId')
      .sort({ bookingDate: -1 });

    res.status(200).json({ success: true, count: bookings.length, bookings });
  } catch (error) {
    next(error);
  }
});

// @route   PUT /api/bookings/:id/cancel
// @desc    Cancel a booking and release seats
// @access  Private
router.put('/:id/cancel', fetchUser, async (req, res, next) => {
  try {
    const booking = await Booking.findOne({ _id: req.params.id, userId: req.user.id });
    if (!booking) {
      return res.status(404).json({ success: false, message: 'Booking not found.' });
    }

    booking.bookingStatus = 'CANCELLED';
    await booking.save();

    // Release seats on show
    const show = await Show.findById(booking.showId);
    if (show) {
      booking.ticketsData.forEach(ticket => {
        ['lower', 'middle', 'balcony'].forEach(tierKey => {
          const seat = show.seatLayout[tierKey]?.find(s => s.seatNumber === ticket.seatNumber);
          if (seat) {
            seat.status = 'AVAILABLE';
            seat.lockedBy = null;
            seat.lockExpiresAt = null;
          }
        });
      });
      show.availableSeats = (show.availableSeats || 0) + booking.ticketsData.length;
      await show.save();
    }

    res.status(200).json({ success: true, message: 'Booking cancelled and seats released successfully.', booking });
  } catch (error) {
    next(error);
  }
});

module.exports = router;
