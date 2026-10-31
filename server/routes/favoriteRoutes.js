const express = require('express');
const router = express.Router();
const Favorite = require('../models/favoriteModel');
const fetchUser = require('../middlewares/fetchUser');

// @route   GET /api/favorite
// @desc    Get all favorites of logged in user
// @access  Private
router.get('/', fetchUser, async (req, res, next) => {
  try {
    const favorites = await Favorite.find({ userId: req.user.id })
      .populate('movieId')
      .sort({ addedAt: -1 });

    res.status(200).json({ success: true, count: favorites.length, favorites });
  } catch (error) {
    next(error);
  }
});

// @route   POST /api/favorite
// @desc    Add movie to user's favorites
// @access  Private
router.post('/', fetchUser, async (req, res, next) => {
  try {
    const { movieId } = req.body;
    if (!movieId) {
      return res.status(400).json({ success: false, message: 'Please provide movieId' });
    }

    const existing = await Favorite.findOne({ userId: req.user.id, movieId });
    if (existing) {
      return res.status(400).json({ success: false, message: 'Movie is already in favorites.' });
    }

    const favorite = new Favorite({
      movieId,
      userId: req.user.id,
      userEmail: req.user.email
    });

    const saved = await favorite.save();
    res.status(201).json({ success: true, message: 'Added to favorites', favorite: saved });
  } catch (error) {
    next(error);
  }
});

// @route   DELETE /api/favorite/:movieId
// @desc    Remove movie from favorites
// @access  Private
router.delete('/:movieId', fetchUser, async (req, res, next) => {
  try {
    const removed = await Favorite.findOneAndDelete({ userId: req.user.id, movieId: req.params.movieId });
    if (!removed) {
      return res.status(404).json({ success: false, message: 'Favorite not found.' });
    }
    res.status(200).json({ success: true, message: 'Removed from favorites' });
  } catch (error) {
    next(error);
  }
});

module.exports = router;
