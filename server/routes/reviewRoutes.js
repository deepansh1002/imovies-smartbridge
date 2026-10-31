const express = require('express');
const router = express.Router();
const Review = require('../models/reviewModel');
const Movie = require('../models/movieModel');
const fetchUser = require('../middlewares/fetchUser');

// @route   GET /api/reviews/movie/:movieId
// @desc    Get all reviews for a movie
router.get('/movie/:movieId', async (req, res, next) => {
  try {
    const reviews = await Review.find({ movieId: req.params.movieId }).sort({ reviewDate: -1 });
    res.status(200).json({ success: true, count: reviews.length, reviews });
  } catch (error) {
    next(error);
  }
});

// @route   POST /api/reviews
// @desc    Submit a review and update movie rating
// @access  Private
router.post('/', fetchUser, async (req, res, next) => {
  try {
    const { movieId, rating, comment } = req.body;

    if (!movieId || !rating || !comment) {
      return res.status(400).json({ success: false, message: 'Please provide movieId, rating (1-5), and comment.' });
    }

    const review = new Review({
      movieId,
      userId: req.user.id,
      userEmail: req.user.email,
      username: req.user.username,
      rating: Number(rating),
      comment
    });

    const savedReview = await review.save();

    // Recalculate average movie rating
    const allReviews = await Review.find({ movieId });
    const avgRating = allReviews.reduce((sum, r) => sum + r.rating, 0) / allReviews.length;
    await Movie.findByIdAndUpdate(movieId, { rating: Number(avgRating.toFixed(1)) });

    res.status(201).json({ success: true, message: 'Review submitted successfully', review: savedReview });
  } catch (error) {
    next(error);
  }
});

// @route   DELETE /api/reviews/:id
// @desc    Delete review
// @access  Private
router.delete('/:id', fetchUser, async (req, res, next) => {
  try {
    const review = await Review.findById(req.params.id);
    if (!review) {
      return res.status(404).json({ success: false, message: 'Review not found.' });
    }

    // Only allow author or admin
    if (review.userId.toString() !== req.user.id) {
      return res.status(403).json({ success: false, message: 'Not authorized to delete this review.' });
    }

    await Review.findByIdAndDelete(req.params.id);
    res.status(200).json({ success: true, message: 'Review deleted successfully.' });
  } catch (error) {
    next(error);
  }
});

module.exports = router;
