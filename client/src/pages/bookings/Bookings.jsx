import React from "react";
import { Link, useNavigate } from "react-router-dom";
import { FaHome, FaHeart, FaUser, FaSun, FaInfoCircle } from "react-icons/fa";

const Bookings = () => {
  const navigate = useNavigate();

  const mockBookings = [
    {
      id: "1",
      movie: "Og",
      theatre: "Srinivasa",
      showdate: "Sep 26, 2025",
      showtime: "21:00",
      seats: "Middle Seats: 261, 262",
      price: "260₹",
      poster: "https://m.media-amazon.com/images/M/MV5BNTBmYzI0YjEtM2M0My00MGUyLWI4YTYtNzkzYTEyYjcxMTg1XkEyXkFqcGc@._V1_.jpg"
    },
    {
      id: "2",
      movie: "Og",
      theatre: "Srinivasa",
      showdate: "Sep 26, 2025",
      showtime: "21:00",
      seats: "Balcony Seats: 162",
      price: "175₹",
      poster: "https://m.media-amazon.com/images/M/MV5BNTBmYzI0YjEtM2M0My00MGUyLWI4YTYtNzkzYTEyYjcxMTg1XkEyXkFqcGc@._V1_.jpg"
    },
    {
      id: "3",
      movie: "The pride of bharat",
      theatre: "Gokul",
      showdate: "Jan 2, 2026",
      showtime: "21:30",
      seats: "Balcony Seats: 198",
      price: "200₹",
      poster: "https://via.placeholder.com/140x200?text=Shivaji+Maharaj"
    }
  ];

  return (
    <div style={{ minHeight: "100vh", background: "#0d1117", color: "#fff", fontFamily: "Inter, sans-serif" }}>
      {/* Navbar */}
      <nav style={{
        display: "flex",
        justifyContent: "space-between",
        alignItems: "center",
        padding: "0.8rem 2rem",
        background: "#161b26",
        borderBottom: "1px solid #212836"
      }}>
        <Link to="/" style={{ textDecoration: "none", fontSize: "1.5rem", fontWeight: "bold" }}>
          <span style={{ color: "#fff" }}>i</span><span style={{ color: "#e50914" }}>Movies</span>
        </Link>
        <div style={{ display: "flex", alignItems: "center", position: "relative", width: "40%", maxWidth: "450px" }}>
          <input
            type="text"
            placeholder="Search bookings..."
            style={{ width: "100%", padding: "0.5rem 2rem 0.5rem 1rem", background: "#212836", border: "1px solid #30363d", borderRadius: "4px", color: "#fff" }}
          />
          <FaInfoCircle color="#e50914" style={{ position: "absolute", right: "10px" }} />
        </div>
        <div style={{ display: "flex", gap: "1.2rem", alignItems: "center", fontSize: "1.1rem" }}>
          <FaSun style={{ cursor: "pointer", color: "#8b949e" }} />
          <FaHome style={{ cursor: "pointer", color: "#8b949e" }} onClick={() => navigate("/home")} />
          <FaHeart style={{ cursor: "pointer", color: "#8b949e" }} onClick={() => navigate("/favorites")} />
          <FaUser style={{ cursor: "pointer", color: "#fff" }} onClick={() => navigate("/bookings")} />
        </div>
      </nav>

      {/* Content */}
      <div style={{ padding: "2rem 3rem" }}>
        <h2 style={{ textAlign: "center", fontSize: "2rem", fontWeight: "bold", margin: "1rem 0 2.5rem 0" }}>
          Your <span style={{ color: "#e50914" }}>Bookings</span>
        </h2>

        <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fill, minmax(320px, 1fr))", gap: "1.5rem" }}>
          {mockBookings.map((b) => (
            <div
              key={b.id}
              style={{
                display: "flex",
                background: "#161b26",
                borderRadius: "8px",
                overflow: "hidden",
                border: "1px solid #212836",
                boxShadow: "0 4px 15px rgba(0,0,0,0.3)"
              }}
            >
              <img
                src={b.poster}
                alt={b.movie}
                style={{ width: "120px", height: "160px", objectFit: "cover", flexShrink: 0 }}
                onError={(e) => { e.target.src = "https://via.placeholder.com/120x160?text=iMovies"; }}
              />
              <div style={{ padding: "0.8rem 1rem", display: "flex", flexDirection: "column", justifyContent: "space-between", flex: 1, fontSize: "0.85rem" }}>
                <div>
                  <p style={{ margin: "0 0 0.25rem 0" }}><strong>Movie:</strong> {b.movie}</p>
                  <p style={{ margin: "0 0 0.25rem 0", color: "#8b949e" }}><strong>Theatre:</strong> {b.theatre}</p>
                  <p style={{ margin: "0 0 0.25rem 0", color: "#8b949e" }}><strong>Showdate:</strong> {b.showdate}</p>
                  <p style={{ margin: "0 0 0.25rem 0", color: "#8b949e" }}><strong>showtime:</strong> {b.showtime}</p>
                  <p style={{ margin: "0 0 0.25rem 0", color: "#fca5a5" }}>{b.seats}</p>
                </div>
                <p style={{ margin: "0.5rem 0 0 0", fontWeight: "bold", fontSize: "0.95rem" }}>Total Price: {b.price}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Bookings;
