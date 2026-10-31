const Show = require('../models/showModel');
const Booking = require('../models/bookingModel');

const cleanupOldBookings = async () => {
  try {
    const now = new Date();
    // Revert temporary locked seats that exceeded TTL
    console.log(`🧹 [Cleanup Service] Releasing expired seat locks as of ${now.toISOString()}`);
    
    // Updates seat layouts in shows where lockExpiresAt < now and status === 'LOCKED'
    await Show.updateMany(
      { 'seatLayout.lower.status': 'LOCKED', 'seatLayout.lower.lockExpiresAt': { $lt: now } },
      { $set: { 'seatLayout.lower.$.status': 'AVAILABLE' } }
    ).catch(() => {});
  } catch (error) {
    console.error('Error running cleanupOldBookings cron:', error);
  }
};

module.exports = {
  cleanupOldBookings
};
