const express = require("express");
const mongoose = require("mongoose");
const authRoutes = require("./routes/authRoutes");
const showRoutes = require("./routes/showRoutes");
const theatreRoutes = require("./routes/theatreRoutes");
const movieRoutes = require("./routes/movieRoutes");
const favoriteRoutes = require("./routes/favoriteRoutes");
const bookingRoutes = require("./routes/bookingRoutes");
const adminRoutes = require("./routes/adminRoutes");
const reviewRoutes = require("./routes/reviewRoutes");
require("dotenv").config({ path: "./.env" });

// Prefer IPv4 results to avoid ::1 (IPv6) connections when providers expect IPv4
const dns = require("dns");
if (dns.setDefaultResultOrder) {
  dns.setDefaultResultOrder("ipv4first");
}

const { verifyTransport } = require("./utils/mailer");
const cron = require("node-cron");
const { sendReminderEmails } = require("./utils/reminderService");
const { cleanupOldBookings } = require("./utils/cleanupService");
const connectToMongo = require("./db");
const errorHandler = require("./middlewares/errorHandler");

const app = express();
const cors = require("cors");
app.use(cors());

app.use(express.json());

// Initialize Database Connection
connectToMongo();

// Verify Mailer Transport
verifyTransport();

// Scheduled Cron Jobs
// Run reminder emails every 30 minutes
cron.schedule("*/30 * * * *", () => {
  sendReminderEmails();
});

// Run cleanup for expired seat locks every 5 minutes
cron.schedule("*/5 * * * *", () => {
  cleanupOldBookings();
});

const PORT = process.env.PORT || 8000;
app.listen(PORT, () => {
  console.log(`Server is running on ${PORT} port`);
});

// API Routes
app.use("/api/auth", authRoutes);
app.use("/api/shows", showRoutes);
app.use("/api/theatre", theatreRoutes);
app.use("/api/movie", movieRoutes);
app.use("/api/favorite", favoriteRoutes);
app.use("/api/bookings", bookingRoutes);
app.use("/api/auth/admin", adminRoutes);
app.use("/api/reviews", reviewRoutes);

// Root & Health
app.get("/", (req, res) => {
  res.send("🎬 iMovies Backend is active and running.");
});

// Centralized Error Handling Middleware
app.use(errorHandler);

module.exports = app;
