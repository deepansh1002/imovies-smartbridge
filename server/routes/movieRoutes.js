const express = require('express');
const router = express.Router();
const Movie = require('../models/movieModel');

// @route   GET /api/movie
// @desc    Get all movies with optional filters (genre, language, search)
router.get('/', async (req, res, next) => {
  try {
    const { genre, search } = req.query;
    let query = {};

    if (genre) {
      query.genres = { $in: [new RegExp(genre, 'i')] };
    }
    if (search) {
      query.movieName = { $regex: search, $options: 'i' };
    }

    const movies = await Movie.find(query).sort({ releaseDate: -1 });
    res.status(200).json({ success: true, count: movies.length, movies });
  } catch (error) {
    next(error);
  }
});

// @route   GET /api/movie/:id
// @desc    Get single movie by ID with shows populated
router.get('/:id', async (req, res, next) => {
  try {
    const movie = await Movie.findById(req.params.id).populate('shows');
    if (!movie) {
      return res.status(404).json({ success: false, message: 'Movie not found.' });
    }
    res.status(200).json({ success: true, movie });
  } catch (error) {
    next(error);
  }
});

// @route   POST /api/movie
// @desc    Create a new movie (Admin)
router.post('/', async (req, res, next) => {
  try {
    const newMovie = new Movie(req.body);
    const savedMovie = await newMovie.save();
    res.status(201).json({ success: true, message: 'Movie created successfully', movie: savedMovie });
  } catch (error) {
    next(error);
  }
});

// @route   PUT /api/movie/:id
// @desc    Update movie details (Admin)
router.put('/:id', async (req, res, next) => {
  try {
    const updatedMovie = await Movie.findByIdAndUpdate(req.params.id, req.body, { new: true, runValidators: true });
    if (!updatedMovie) {
      return res.status(404).json({ success: false, message: 'Movie not found.' });
    }
    res.status(200).json({ success: true, message: 'Movie updated successfully', movie: updatedMovie });
  } catch (error) {
    next(error);
  }
});

// @route   DELETE /api/movie/:id
// @desc    Delete movie (Admin)
router.delete('/:id', async (req, res, next) => {
  try {
    const deletedMovie = await Movie.findByIdAndDelete(req.params.id);
    if (!deletedMovie) {
      return res.status(404).json({ success: false, message: 'Movie not found.' });
    }
    res.status(200).json({ success: true, message: 'Movie deleted successfully' });
  } catch (error) {
    next(error);
  }
});

module.exports = router;
