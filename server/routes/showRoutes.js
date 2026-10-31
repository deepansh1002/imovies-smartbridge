const express = require('express');
const router = express.Router();
const Show = require('../models/showModel');
const Theatre = require('../models/theatreModel');

// @route   GET /api/shows
// @desc    Get shows filtered by movie or date
router.get('/', async (req, res, next) => {
  try {
    const { movieId, date } = req.query;
    let query = {};

    if (movieId) query.movieId = movieId;
    if (date) {
      const startOfDay = new Date(date);
      startOfDay.setHours(0, 0, 0, 0);
      const endOfDay = new Date(date);
      endOfDay.setHours(23, 59, 59, 999);
      query.showdate = { $gte: startOfDay, $lte: endOfDay };
    }

    const shows = await Show.find(query).populate('movieId').populate('theatreId');
    res.status(200).json({ success: true, count: shows.length, shows });
  } catch (error) {
    next(error);
  }
});

// @route   GET /api/shows/:id
// @desc    Get show details and seat layout
router.get('/:id', async (req, res, next) => {
  try {
    const show = await Show.findById(req.params.id).populate('movieId').populate('theatreId');
    if (!show) {
      return res.status(404).json({ success: false, message: 'Show not found.' });
    }
    res.status(200).json({ success: true, show });
  } catch (error) {
    next(error);
  }
});

// @route   POST /api/shows
// @desc    Create a new show schedule with auto-initialized seat grid
router.post('/', async (req, res, next) => {
  try {
    const { movieId, theatreId, theatreName, adminEmail, showdate, showtime, tickets } = req.body;

    // Fetch theatre capacity to generate seats
    let lowerCount = 30, middleCount = 50, balconyCount = 20;
    if (theatreId) {
      const theatre = await Theatre.findById(theatreId);
      if (theatre) {
        lowerCount = theatre.lowerSeats || lowerCount;
        middleCount = theatre.middleSeats || middleCount;
        balconyCount = theatre.balconySeats || balconyCount;
      }
    }

    // Auto-populate seat layout grids
    const seatLayout = {
      lower: Array.from({ length: lowerCount }, (_, i) => ({
        seatNumber: `L${i + 1}`,
        status: 'AVAILABLE'
      })),
      middle: Array.from({ length: middleCount }, (_, i) => ({
        seatNumber: `M${i + 1}`,
        status: 'AVAILABLE'
      })),
      balcony: Array.from({ length: balconyCount }, (_, i) => ({
        seatNumber: `B${i + 1}`,
        status: 'AVAILABLE'
      }))
    };

    const newShow = new Show({
      movieId,
      theatreId,
      theatreName,
      adminEmail,
      showdate,
      showtime,
      tickets: tickets || (lowerCount + middleCount + balconyCount),
      availableSeats: tickets || (lowerCount + middleCount + balconyCount),
      seatLayout
    });

    const savedShow = await newShow.save();
    res.status(201).json({ success: true, message: 'Show schedule created successfully', show: savedShow });
  } catch (error) {
    next(error);
  }
});

// @route   DELETE /api/shows/:id
// @desc    Delete show
router.delete('/:id', async (req, res, next) => {
  try {
    const deletedShow = await Show.findByIdAndDelete(req.params.id);
    if (!deletedShow) {
      return res.status(404).json({ success: false, message: 'Show not found.' });
    }
    res.status(200).json({ success: true, message: 'Show cancelled and deleted successfully' });
  } catch (error) {
    next(error);
  }
});

module.exports = router;
