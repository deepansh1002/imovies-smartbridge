const express = require('express');
const router = express.Router();
const Theatre = require('../models/theatreModel');

// @route   GET /api/theatre
// @desc    Get all theatres
router.get('/', async (req, res, next) => {
  try {
    const theatres = await Theatre.find().sort({ theatreName: 1 });
    res.status(200).json({ success: true, count: theatres.length, theatres });
  } catch (error) {
    next(error);
  }
});

// @route   GET /api/theatre/:id
// @desc    Get single theatre by ID
router.get('/:id', async (req, res, next) => {
  try {
    const theatre = await Theatre.findById(req.params.id);
    if (!theatre) {
      return res.status(404).json({ success: false, message: 'Theatre not found.' });
    }
    res.status(200).json({ success: true, theatre });
  } catch (error) {
    next(error);
  }
});

// @route   POST /api/theatre
// @desc    Add new theatre
router.post('/', async (req, res, next) => {
  try {
    const newTheatre = new Theatre(req.body);
    const savedTheatre = await newTheatre.save();
    res.status(201).json({ success: true, message: 'Theatre registered successfully', theatre: savedTheatre });
  } catch (error) {
    next(error);
  }
});

// @route   PUT /api/theatre/:id
// @desc    Update theatre configuration
router.put('/:id', async (req, res, next) => {
  try {
    const updatedTheatre = await Theatre.findByIdAndUpdate(req.params.id, req.body, { new: true, runValidators: true });
    if (!updatedTheatre) {
      return res.status(404).json({ success: false, message: 'Theatre not found.' });
    }
    res.status(200).json({ success: true, message: 'Theatre updated successfully', theatre: updatedTheatre });
  } catch (error) {
    next(error);
  }
});

// @route   DELETE /api/theatre/:id
// @desc    Delete theatre
router.delete('/:id', async (req, res, next) => {
  try {
    const deletedTheatre = await Theatre.findByIdAndDelete(req.params.id);
    if (!deletedTheatre) {
      return res.status(404).json({ success: false, message: 'Theatre not found.' });
    }
    res.status(200).json({ success: true, message: 'Theatre removed successfully' });
  } catch (error) {
    next(error);
  }
});

module.exports = router;
