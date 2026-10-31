import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { FaSun, FaHome, FaCalendarAlt, FaPlus, FaTheaterMasks, FaHistory, FaSignOutAlt } from "react-icons/fa";

const AddTheatre = () => {
  const navigate = useNavigate();
  const [theatreData, setTheatreData] = useState({
    theatreName: "",
    location: "",
    balconySeatPrice: 0,
    balconySeats: 0,
    middleSeatPrice: 0,
    middleSeats: 0,
    lowerSeatPrice: 0,
    lowerSeats: 0
  });

  const handleSubmit = (e) => {
    e.preventDefault();
    alert("Theatre registered successfully!");
  };

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
          <FaTheaterMasks style={{ cursor: "pointer", color: "#fff" }} onClick={() => navigate("/addtheatre")} />
          <FaHistory style={{ cursor: "pointer" }} onClick={() => navigate("/adminbookings")} />
          <FaSignOutAlt style={{ cursor: "pointer" }} onClick={() => navigate("/admin/login")} />
        </div>
      </nav>

      {/* Form Container */}
      <div style={{ padding: "4rem 2rem", display: "flex", flexDirection: "column", alignItems: "center" }}>
        <h2 style={{ fontSize: "2rem", fontWeight: "bold", marginBottom: "2rem" }}>
          Add <span style={{ color: "#e50914" }}>Theatre</span>
        </h2>

        <form onSubmit={handleSubmit} style={{
          background: "#161b26",
          padding: "2.5rem",
          borderRadius: "10px",
          width: "100%",
          maxWidth: "520px",
          border: "1px solid #212836",
          boxShadow: "0 8px 30px rgba(0,0,0,0.5)"
        }}>
          <div style={{ marginBottom: "1.2rem" }}>
            <label style={{ display: "block", fontSize: "0.85rem", color: "#8b949e", marginBottom: "0.3rem" }}>Theatre Name</label>
            <input
              type="text"
              value={theatreData.theatreName}
              onChange={(e) => setTheatreData({ ...theatreData, theatreName: e.target.value })}
              required
              style={{ width: "100%", padding: "0.7rem", background: "#212836", border: "1px solid #30363d", color: "#fff", borderRadius: "4px", boxSizing: "border-box" }}
            />
          </div>

          <div style={{ marginBottom: "1.2rem" }}>
            <label style={{ display: "block", fontSize: "0.85rem", color: "#8b949e", marginBottom: "0.3rem" }}>Theatre location</label>
            <input
              type="text"
              value={theatreData.location}
              onChange={(e) => setTheatreData({ ...theatreData, location: e.target.value })}
              required
              style={{ width: "100%", padding: "0.7rem", background: "#212836", border: "1px solid #30363d", color: "#fff", borderRadius: "4px", boxSizing: "border-box" }}
            />
          </div>

          <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "1rem", marginBottom: "1rem" }}>
            <div>
              <label style={{ display: "block", fontSize: "0.85rem", color: "#8b949e", marginBottom: "0.3rem" }}>Balcony Seat Price</label>
              <input
                type="number"
                value={theatreData.balconySeatPrice}
                onChange={(e) => setTheatreData({ ...theatreData, balconySeatPrice: Number(e.target.value) })}
                style={{ width: "100%", padding: "0.7rem", background: "#212836", border: "1px solid #30363d", color: "#fff", borderRadius: "4px", boxSizing: "border-box" }}
              />
            </div>
            <div>
              <label style={{ display: "block", fontSize: "0.85rem", color: "#8b949e", marginBottom: "0.3rem" }}>Balcony Seat Count</label>
              <input
                type="number"
                value={theatreData.balconySeats}
                onChange={(e) => setTheatreData({ ...theatreData, balconySeats: Number(e.target.value) })}
                style={{ width: "100%", padding: "0.7rem", background: "#212836", border: "1px solid #30363d", color: "#fff", borderRadius: "4px", boxSizing: "border-box" }}
              />
            </div>
          </div>

          <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "1rem", marginBottom: "1rem" }}>
            <div>
              <label style={{ display: "block", fontSize: "0.85rem", color: "#8b949e", marginBottom: "0.3rem" }}>Middle Seat Price</label>
              <input
                type="number"
                value={theatreData.middleSeatPrice}
                onChange={(e) => setTheatreData({ ...theatreData, middleSeatPrice: Number(e.target.value) })}
                style={{ width: "100%", padding: "0.7rem", background: "#212836", border: "1px solid #30363d", color: "#fff", borderRadius: "4px", boxSizing: "border-box" }}
              />
            </div>
            <div>
              <label style={{ display: "block", fontSize: "0.85rem", color: "#8b949e", marginBottom: "0.3rem" }}>Middle Seat Count</label>
              <input
                type="number"
                value={theatreData.middleSeats}
                onChange={(e) => setTheatreData({ ...theatreData, middleSeats: Number(e.target.value) })}
                style={{ width: "100%", padding: "0.7rem", background: "#212836", border: "1px solid #30363d", color: "#fff", borderRadius: "4px", boxSizing: "border-box" }}
              />
            </div>
          </div>

          <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "1rem", marginBottom: "2rem" }}>
            <div>
              <label style={{ display: "block", fontSize: "0.85rem", color: "#8b949e", marginBottom: "0.3rem" }}>Lower Seat Price</label>
              <input
                type="number"
                value={theatreData.lowerSeatPrice}
                onChange={(e) => setTheatreData({ ...theatreData, lowerSeatPrice: Number(e.target.value) })}
                style={{ width: "100%", padding: "0.7rem", background: "#212836", border: "1px solid #30363d", color: "#fff", borderRadius: "4px", boxSizing: "border-box" }}
              />
            </div>
            <div>
              <label style={{ display: "block", fontSize: "0.85rem", color: "#8b949e", marginBottom: "0.3rem" }}>Lower Seat Count</label>
              <input
                type="number"
                value={theatreData.lowerSeats}
                onChange={(e) => setTheatreData({ ...theatreData, lowerSeats: Number(e.target.value) })}
                style={{ width: "100%", padding: "0.7rem", background: "#212836", border: "1px solid #30363d", color: "#fff", borderRadius: "4px", boxSizing: "border-box" }}
              />
            </div>
          </div>

          <div style={{ textAlign: "center" }}>
            <button
              type="submit"
              style={{ background: "#e50914", color: "#fff", padding: "0.7rem 2.5rem", border: "none", borderRadius: "4px", fontWeight: "bold", cursor: "pointer" }}
            >
              Submit
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default AddTheatre;
