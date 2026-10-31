import React from "react";
import { Link, useNavigate } from "react-router-dom";
import { FaSun, FaHome, FaCalendarAlt, FaPlus, FaTheaterMasks, FaHistory, FaSignOutAlt, FaTrash } from "react-icons/fa";
import Cookies from "js-cookie";

const Admin = () => {
  const navigate = useNavigate();

  const handleLogout = () => {
    Cookies.remove("adminToken");
    localStorage.removeItem("adminToken");
    navigate("/admin/login");
  };

  const adminShows = [
    { id: "1", movie: "Og", theatre: "Srinivasa", date: "Sep 25, 2025", time: "2:00 PM" },
    { id: "2", movie: "Og", theatre: "Srinivasa", date: "Sep 25, 2025", time: "4:00 PM" },
    { id: "3", movie: "Og", theatre: "Srinivasa", date: "Sep 26, 2025", time: "9:00 PM" },
    { id: "4", movie: "G2", theatre: "Gokul", date: "Nov 14, 2025", time: "2:00 PM" },
    { id: "5", movie: "G2", theatre: "Gokul", date: "Nov 14, 2025", time: "6:00 PM" },
    { id: "6", movie: "The pride of bharat", theatre: "Gokul", date: "Jan 2, 2026", time: "9:30 PM" },
  ];

  return (
    <div style={{ minHeight: "100vh", background: "#0d1117", color: "#fff", fontFamily: "Inter, sans-serif" }}>
      {/* Admin Navbar */}
      <nav style={{
        display: "flex",
        justifyContent: "space-between",
        alignItems: "center",
        padding: "0.8rem 2rem",
        background: "#161b26",
        borderBottom: "1px solid #212836"
      }}>
        <Link to="/admin" style={{ textDecoration: "none", fontSize: "1.5rem", fontWeight: "bold" }}>
          <span style={{ color: "#fff" }}>i</span><span style={{ color: "#e50914" }}>Movies</span>
        </Link>
        <div style={{ display: "flex", gap: "1.2rem", alignItems: "center", fontSize: "1.1rem", color: "#8b949e" }}>
          <FaSun style={{ cursor: "pointer" }} />
          <FaHome style={{ cursor: "pointer" }} onClick={() => navigate("/admin")} />
          <FaCalendarAlt style={{ cursor: "pointer" }} onClick={() => navigate("/addshow")} />
          <FaPlus style={{ cursor: "pointer" }} onClick={() => navigate("/addmovie")} />
          <FaTheaterMasks style={{ cursor: "pointer" }} onClick={() => navigate("/addtheatre")} />
          <FaHistory style={{ cursor: "pointer" }} onClick={() => navigate("/adminbookings")} />
          <FaSignOutAlt style={{ cursor: "pointer" }} onClick={handleLogout} />
        </div>
      </nav>

      {/* Content */}
      <div style={{ padding: "2rem 3rem" }}>
        {/* Admin Shows */}
        <h2 style={{ fontSize: "1.8rem", fontWeight: "bold", margin: "1rem 0 1.5rem 0" }}>
          Admin <span style={{ color: "#e50914" }}>Shows</span>
        </h2>

        <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fill, minmax(220px, 1fr))", gap: "1.2rem" }}>
          {adminShows.map((s) => (
            <div key={s.id} style={{ background: "#161b26", padding: "1.2rem", borderRadius: "8px", border: "1px solid #212836", fontSize: "0.85rem" }}>
              <p style={{ margin: "0 0 0.3rem 0" }}>📹 <strong>Movie:</strong> {s.movie}</p>
              <p style={{ margin: "0 0 0.3rem 0", color: "#8b949e" }}>Theatre: {s.theatre}</p>
              <p style={{ margin: "0 0 0.3rem 0", color: "#8b949e" }}>Showdate: {s.date}</p>
              <p style={{ margin: "0 0 0.8rem 0", color: "#8b949e" }}>Showtime: {s.time}</p>
              <button style={{
                width: "100%",
                padding: "0.4rem",
                background: "transparent",
                border: "1px solid #7f1d1d",
                color: "#fca5a5",
                borderRadius: "4px",
                cursor: "pointer",
                display: "flex",
                justifyContent: "center",
                alignItems: "center"
              }}>
                <FaTrash size={12} />
              </button>
            </div>
          ))}
        </div>

        {/* All Bookings */}
        <h2 style={{ fontSize: "1.8rem", fontWeight: "bold", margin: "3rem 0 1.5rem 0" }}>
          All <span style={{ color: "#e50914" }}>Bookings</span>
        </h2>
        <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fill, minmax(280px, 1fr))", gap: "1.2rem" }}>
          <div style={{ background: "#161b26", padding: "1rem", borderRadius: "8px", border: "1px solid #212836", fontSize: "0.85rem" }}>
            <p>👤 <strong>User:</strong> gvvdkumar@gmail.com</p>
          </div>
          <div style={{ background: "#161b26", padding: "1rem", borderRadius: "8px", border: "1px solid #212836", fontSize: "0.85rem" }}>
            <p>👤 <strong>User:</strong> gvvdkumar@gmail.com</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Admin;
