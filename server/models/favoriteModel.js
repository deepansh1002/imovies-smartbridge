const mongoose = require('mongoose');

const favoriteSchema = new mongoose.Schema({
  movieId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Movie',
    required: true
  },
  userId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User'
  },
  userEmail: {
    type: String,
    required: true,
    lowercase: true
  },
  addedAt: {
    type: Date,
    default: Date.now
  }
});

// Compound index to prevent duplicate favorites per user
favoriteSchema.index({ userEmail: 1, movieId: 1 }, { unique: true });

module.exports = mongoose.model('Favorite', favoriteSchema);
