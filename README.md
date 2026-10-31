# 🎬 iMovies — Cinema & Movie Ticket Booking System

[![GitHub Repo](https://img.shields.io/badge/GitHub-Repository-181717?style=for-the-badge&logo=github)](https://github.com/deepansh1002/imovies-smartbridge)
[![GitHub Pages Live Demo](https://img.shields.io/badge/GitHub_Pages-LIVE_WORKING_DEMO-red?style=for-the-badge&logo=github)](https://deepansh1002.github.io/imovies-smartbridge/)
[![Platform](https://img.shields.io/badge/Platform-GitHub_Only-238636?style=for-the-badge&logo=github)](https://github.com/deepansh1002/imovies-smartbridge)

---

### 🚀 Direct Live Running Site on GitHub:
👉 **[CLICK HERE TO OPEN LIVE WORKING SITE](https://deepansh1002.github.io/imovies-smartbridge/)**

*(Runs 100% inside GitHub Pages with zero external dependencies, zero redirect, and instant loading)*

---

## 📌 Repository Links

- 🐙 **GitHub Source Code**: [https://github.com/deepansh1002/imovies-smartbridge](https://github.com/deepansh1002/imovies-smartbridge)
- 🌐 **GitHub Live Demo**: [https://deepansh1002.github.io/imovies-smartbridge/](https://deepansh1002.github.io/imovies-smartbridge/)
- 💻 **Edit / Run in GitHub Dev Editor**: Press `.` on your keyboard anywhere on this repo or open [https://github.dev/deepansh1002/imovies-smartbridge](https://github.dev/deepansh1002/imovies-smartbridge)

---

## 🌟 Key Features Implemented

### 👤 User Features:
- **Available Movies Catalog**: Browse movies (*RRR*, *Baahubali 2*, *Og*, *Rajasaab*, *Toxic*, *Avatar*) with search and genres.
- **Show Timings**: Filter shows by theatre venues (*Srinivasa*, *Gokul*).
- **Interactive 3-Tier Seat Selection**:
  - **Balcony** (₹200)
  - **Middle** (₹130)
  - **Lower** (₹80)
  - Live seat selection counter, dynamic subtotal calculation, and instant booking confirmation.
- **Your Bookings**: Digital ticket receipts with movie poster, theatre, date, time, reserved seat numbers, and total price.

### 🛡️ Admin Dashboard Features:
- **Admin Shows**: View all scheduled shows with instant trash delete button.
- **All Bookings**: Audit customer reservations and transactions.
- **Add Movie**: Movie title, description, genres, release date, runtime, certification, and YouTube trailer.
- **Add Show**: Schedule shows by theatre, movie, date, and showtime.
- **Add Theatre**: Venue registration with configurable 3-tier seat prices and capacities.

---

## 🏗️ Project Structure

```text
imovies-smartbridge/
├── index.html              # Standalone interactive live demo running on GitHub Pages
├── client/                 # React 18 + Vite frontend codebase
│   ├── src/
│   │   ├── pages/          # 17 Lazy-loaded views
│   │   ├── components/     # Protection & layout components
│   │   └── host.js         # API endpoint configuration
│   └── package.json
└── server/                 # Express.js + Mongoose REST API backend
    ├── models/             # 8 Mongoose models (User, Admin, Movie, Show, Theatre, Booking, etc.)
    ├── routes/             # REST route handlers
    ├── middlewares/        # JWT auth & error handling
    ├── utils/              # Mailer, reminder service & cleanup cron
    └── index.js            # Express server
```
