const mongoose = require('mongoose');

const mongoUri = process.env.MONGO_URI || process.env.MONGODB_CONNECTION_LINK || process.env.MONGODB_URI || 'mongodb://127.0.0.1:27017/Imovies';

const connectToMongo = async () => {
  try {
    await mongoose.connect(mongoUri, {
      // Remove deprecated options as they're no longer needed in MongoDB Driver v4.0.0+
      // The new Node.js driver handles these configurations internally
    });
    console.log("✅ Connected to MongoDB successfully");
  } catch (error) {
    console.error("❌ MongoDB connection error:", error.message);
    // In production or strict mode, exit process with failure if connection fails
    if (process.env.NODE_ENV === 'production') {
      process.exit(1);
    }
  }

  // Handle connection events
  mongoose.connection.on('error', (err) => {
    console.error('MongoDB connection error:', err);
  });

  mongoose.connection.on('disconnected', () => {
    console.log('MongoDB disconnected. Attempting to reconnect...');
    // Attempt to reconnect
    setTimeout(connectToMongo, 5000);
  });
};

module.exports = connectToMongo;
