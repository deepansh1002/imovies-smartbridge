# 🎬 iMovies — Cinema & Movie Ticket Booking System

[![GitHub Repo](https://img.shields.io/badge/GitHub-Repository-181717?style=for-the-badge&logo=github)](https://github.com/deepansh1002/imovies-smartbridge)
[![Live Demo](https://img.shields.io/badge/Demo-Live_Preview-red?style=for-the-badge&logo=githubpages)](https://deepansh1002.github.io/imovies-smartbridge/)
[![Deploy with Vercel](https://img.shields.io/badge/Deploy-Vercel-black?style=for-the-badge&logo=vercel)](https://vercel.com/new/clone?repository-url=https%3A%2F%2Fgithub.com%2Fdeepansh1002%2Fimovies-smartbridge)
[![MERN Stack](https://img.shields.io/badge/Stack-MERN-green?style=for-the-badge&logo=mongodb)](https://mongodb.com)

> **iMovies** is a full-stack MERN cinema ticketing platform for browsing movies, checking real-time showtimes, choosing tiered seats (`Balcony`, `Middle`, `Lower`), and managing cinema bookings. Built matching the SmartBridge project specification.

---

## 🔗 Quick Links

- 🐙 **GitHub Repository Link**: [https://github.com/deepansh1002/imovies-smartbridge](https://github.com/deepansh1002/imovies-smartbridge)
- 🌐 **Live Demo Link (GitHub Pages)**: [https://deepansh1002.github.io/imovies-smartbridge/](https://deepansh1002.github.io/imovies-smartbridge/)
- ⚡ **1-Click Vercel Deploy**: [Deploy to Vercel](https://vercel.com/new/clone?repository-url=https%3A%2F%2Fgithub.com%2Fdeepansh1002%2Fimovies-smartbridge)

---

## 🌟 Key Features

### 👤 End-User Experience
- **Responsive Catalogue**: Multi-filter browsing by genre, language, and release dates (*Rrr*, *Baahubali 2*, *Og*, *Rajasaab*, *Toxic*, *Avatar*).
- **Show Schedules**: Daily showtimes categorized by cinema venues (*Srinivasa*, *Gokul*).
- **Interactive Seat Selection**: Visual 3-tier seating grid (`Balcony`, `Middle`, `Lower`) with live seat reservation.
- **Booking Management**: Instant digital booking confirmation, reservation history, and ticket receipts with unique booking IDs.
- **Watchlist & Reviews**: Save favorite upcoming titles and write community ratings.

### 🛡️ Admin Management Dashboard
- **Movie Catalog Manager**: Add, update, and remove movies with poster upload preview, genres, runtimes, and trailer links.
- **Theatre Configurator**: Register cinema venues with custom seating capacities and tier-based pricing.
- **Show Scheduler**: Link movies and venues to create daily screening schedules.
- **Real-Time Booking Oversight**: Audit customer bookings, track box-office revenue, and oversee seat availability.

---

## 🏗️ Architecture & Tech Stack

```text
imovies-smartbridge/
├── client/                 # Frontend (React 18, Vite, Sass, React Router v6)
│   ├── src/
│   │   ├── components/     # Layout (Header, Footer, Loader, Protection)
│   │   ├── pages/          # 17 Lazy-loaded views (Home, MovieShows, Admin, etc.)
│   │   ├── hooks/          # Custom hooks (useFetch)
│   │   └── host.js         # Backend API host configuration
│   ├── index.html
│   └── package.json
│
└── server/                 # Backend REST API (Node.js, Express, MongoDB, Mongoose)
    ├── middlewares/        # JWT Authentication (fetchUser) & Error Handlers
    ├── models/             # 8 Mongoose Schemas (User, Admin, Movie, Show, Theatre, Booking, Review, Favorite)
    ├── routes/             # REST API endpoints (/api/auth, /api/movie, /api/shows, etc.)
    ├── utils/              # Node-cron background jobs & SMTP Mailer
    ├── db.js               # Auto-reconnecting MongoDB connection
    ├── index.js            # Express server entrypoint
    ├── package.json
    └── .env.example
```

---

## 🚀 Getting Started

### Prerequisites
- [Node.js](https://nodejs.org) (v18 or higher)
- [MongoDB](https://www.mongodb.com/) (running locally on port `27017` or MongoDB Atlas URI)

### 1. Clone the Repository
```bash
git clone https://github.com/deepansh1002/imovies-smartbridge.git
cd imovies-smartbridge
```

### 2. Configure & Start Backend
```bash
cd server
cp .env.example .env
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

## 🌿 Branches
- `main` — Production-ready code
- `dev` — Active development branch

---

## 📄 License
This project is submitted by **Deepansh** for the SmartBridge Program under the MIT License.
