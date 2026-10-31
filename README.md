# 🎬 iMovies — Movie Ticket Booking Made Simple

[![Live Demo](https://img.shields.io/badge/Demo-Live_Preview-red?style=for-the-badge&logo=vercel)](https://imovies-booking.vercel.app)
[![GitHub Repo](https://img.shields.io/badge/GitHub-Repository-181717?style=for-the-badge&logo=github)](https://github.com)
[![MERN Stack](https://img.shields.io/badge/Stack-MERN-green?style=for-the-badge&logo=mongodb)](https://mongodb.com)

> **iMovies** is a full-stack movie ticketing platform designed for seamless show discovery, interactive seat reservation with real-time status locks, secure checkout, and comprehensive theater administration.

---

## 🔗 Quick Links

- 🌐 **Live Demo Application**: [https://imovies-booking.vercel.app](https://imovies-booking.vercel.app) *(or your deployed Vercel/Netlify URL)*
- 🐙 **GitHub Repository**: [https://github.com/iMovies-Platform/imovies](https://github.com/iMovies-Platform/imovies)

---

## 🌟 Key Features

### 👤 End-User Experience
- **Catalog & Discovery**: Multi-filter browsing by genre, language, and release dates.
- **Show Schedules**: Daily showtimes categorized by cinema venues (*Srinivasa*, *Gokul*).
- **Interactive Seat Selection**: Visual 3-tier seating grid (`Balcony`, `Middle`, `Lower`) with live seat reservation.
- **Booking Management**: Instant digital booking confirmation, reservation history, and ticket receipts.
- **Watchlist & Reviews**: Save favorite upcoming titles and write community ratings.

### 🛡️ Admin Management Dashboard
- **Movie Catalog Manager**: Add, update, and remove movies with poster upload preview, genres, runtimes, and trailer links.
- **Theatre Configurator**: Register cinema venues with custom seating capacities and tier-based pricing.
- **Show Scheduler**: Link movies and venues to create daily screening schedules.
- **Real-Time Booking Oversight**: Audit customer bookings, track box-office revenue, and oversee seat availability.

---

## 🏗️ Architecture & Tech Stack

```
imovies/
├── client/                 # Frontend (React 18, Vite, Sass, React Router v6)
│   ├── src/
│   │   ├── components/     # Reusable UI (Header, Footer, Loader, Protection)
│   │   ├── pages/          # 17 Lazy-loaded views (Home, MovieShows, Admin, etc.)
│   │   ├── hooks/          # Custom hooks (useFetch)
│   │   └── host.js         # Backend API host configuration
│   └── package.json
│
└── server/                 # Backend REST API (Node.js, Express, MongoDB, Mongoose)
    ├── middlewares/        # JWT Authentication (fetchUser) & Error Handlers
    ├── models/             # 8 Mongoose Schemas (User, Admin, Movie, Show, Theatre, Booking, Review, Favorite)
    ├── routes/             # REST API endpoints (/api/auth, /api/movie, /api/shows, etc.)
    ├── utils/              # Node-cron background jobs & SMTP Mailer
    ├── db.js               # Auto-reconnecting MongoDB connection
    └── index.js            # Express server entrypoint
```

---

## 🚀 Getting Started

### Prerequisites
- [Node.js](https://nodejs.org) (v18 or higher)
- [MongoDB](https://www.mongodb.com/) (running locally on port `27017` or MongoDB Atlas URI)

### 1. Clone & Set Up the Repository
```bash
git clone https://github.com/<your-username>/imovies.git
cd imovies
```

### 2. Start Backend Server
```bash
cd server
npm install
nodemon index.js
```
*Backend runs on `http://localhost:8000`*

### 3. Start Frontend Client
```bash
cd ../client
npm install
npm run dev
```
*Frontend runs on `http://localhost:5173`*

---

## ⚙️ Environment Variables (`server/.env`)

```env
PORT=8000
MONGO_URI=mongodb://127.0.0.1:27017/Imovies
MONGODB_CONNECTION_LINK=mongodb://127.0.0.1:27017/Imovies
JWT_SECRET=imovies_super_secret_jwt_key_2026
NODE_ENV=development
```

---

## 📄 License
This project is licensed under the MIT License.
