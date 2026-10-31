const express = require('express');
const router = express.Router();
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const Admin = require('../models/adminModel');
const Booking = require('../models/bookingModel');
const Movie = require('../models/movieModel');
const Theatre = require('../models/theatreModel');
const User = require('../models/userModel');

const JWT_SECRET = process.env.JWT_SECRET || 'imovies_super_secret_jwt_key_2026';

// @route   POST /api/auth/admin/register
// @desc    Register administrator account
router.post('/register', async (req, res, next) => {
  try {
    const { username, email, password } = req.body;
    if (!username || !email || !password) {
      return res.status(400).json({ success: false, message: 'Please provide username, email, and password.' });
    }

    const existing = await Admin.findOne({ email: email.toLowerCase().trim() });
    if (existing) {
      return res.status(400).json({ success: false, message: 'Admin email already exists.' });
    }

    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, salt);

    const admin = new Admin({
      username: username.trim(),
      email: email.toLowerCase().trim(),
      password: hashedPassword,
      role: 'admin'
    });

    const saved = await admin.save();
    const token = jwt.sign({ admin: { id: saved._id, email: saved.email, role: 'admin' } }, JWT_SECRET, { expiresIn: '7d' });

    res.status(201).json({ success: true, message: 'Admin registered successfully', token });
  } catch (error) {
    next(error);
  }
});

// @route   POST /api/auth/admin/login
// @desc    Admin login
router.post('/login', async (req, res, next) => {
  try {
    const { email, password } = req.body;
    const admin = await Admin.findOne({ email: email.toLowerCase().trim() });
    if (!admin) {
      return res.status(400).json({ success: false, message: 'Invalid admin credentials.' });
    }

    const isMatch = await bcrypt.compare(password, admin.password);
    if (!isMatch) {
      return res.status(400).json({ success: false, message: 'Invalid admin credentials.' });
    }

    const token = jwt.sign({ admin: { id: admin._id, email: admin.email, role: 'admin' } }, JWT_SECRET, { expiresIn: '7d' });
    res.status(200).json({ success: true, message: 'Admin login successful', token });
  } catch (error) {
    next(error);
  }
});

// @route   GET /api/auth/admin/stats
// @desc    High-level platform statistics for dashboard
router.get('/stats', async (req, res, next) => {
  try {
    const [totalUsers, totalMovies, totalTheatres, totalBookings] = await Promise.all([
      User.countDocuments(),
      Movie.countDocuments(),
      Theatre.countDocuments(),
      Booking.countDocuments()
    ]);

    const revenueResult = await Booking.aggregate([
      { $match: { bookingStatus: 'CONFIRMED' } },
      { $group: { _id: null, totalRevenue: { $sum: '$totalAmount' } } }
    ]);

    const totalRevenue = revenueResult[0]?.totalRevenue || 0;

    res.status(200).json({
      success: true,
      stats: {
        totalUsers,
        totalMovies,
        totalTheatres,
        totalBookings,
        totalRevenue
      }
    });
  } catch (error) {
    next(error);
  }
});

module.exports = router;
