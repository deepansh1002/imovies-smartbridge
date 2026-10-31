import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { FaSun, FaHome, FaCalendarAlt, FaPlus, FaTheaterMasks, FaHistory, FaSignOutAlt } from "react-icons/fa";

const AddShow = () => {
  const navigate = useNavigate();
  const [showData, setShowData] = useState({
    theatre: "",
    movie: "",
    showdate: "",
    showtime: ""
  });

  const handleSubmit = (e) => {
    e.preventDefault();
    alert("Show scheduled successfully!");
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
          <FaCalendarAlt style={{ cursor: "pointer", color: "#fff" }} onClick={() => navigate("/addshow")} />
          <FaPlus style={{ cursor: "pointer" }} onClick={() => navigate("/addmovie")} />
          <FaTheaterMasks style={{ cursor: "pointer" }} onClick={() => navigate("/addtheatre")} />
          <FaHistory style={{ cursor: "pointer" }} onClick={() => navigate("/adminbookings")} />
          <FaSignOutAlt style={{ cursor: "pointer" }} onClick={() => navigate("/admin/login")} />
        </div>
      </nav>

      {/* Form Container */}
      <div style={{ padding: "4rem 2rem", display: "flex", flexDirection: "column", alignItems: "center" }}>
        <h2 style={{ fontSize: "2rem", fontWeight: "bold", marginBottom: "2rem" }}>
          Add <span style={{ color: "#e50914" }}>Show</span>
        </h2>

        <form onSubmit={handleSubmit} style={{
          background: "#161b26",
          padding: "2.5rem",
          borderRadius: "10px",
          width: "100%",
          maxWidth: "480px",
          border: "1px solid #212836",
          boxShadow: "0 8px 30px rgba(0,0,0,0.5)"
        }}>
          <div style={{ marginBottom: "1.2rem" }}>
            <label style={{ display: "block", fontSize: "0.85rem", color: "#8b949e", marginBottom: "0.3rem" }}>Theatres</label>
            <select
              value={showData.theatre}
              onChange={(e) => setShowData({ ...showData, theatre: e.target.value })}
              style={{ width: "100%", padding: "0.7rem", background: "#212836", border: "1px solid #30363d", color: "#fff", borderRadius: "4px" }}
            >
              <option value="">Select Theatre</option>
              <option value="Srinivasa">Srinivasa</option>
              <option value="Gokul">Gokul</option>
            </select>
          </div>

          <div style={{ marginBottom: "1.2rem" }}>
            <label style={{ display: "block", fontSize: "0.85rem", color: "#8b949e", marginBottom: "0.3rem" }}>Movies</label>
            <select
              value={showData.movie}
              onChange={(e) => setShowData({ ...showData, movie: e.target.value })}
              style={{ width: "100%", padding: "0.7rem", background: "#212836", border: "1px solid #30363d", color: "#fff", borderRadius: "4px" }}
            >
              <option value="">Select Movie</option>
              <option value="Og">Og</option>
              <option value="G2">G2</option>
              <option value="Rrr">Rrr</option>
            </select>
          </div>

          <div style={{ marginBottom: "1.2rem" }}>
            <label style={{ display: "block", fontSize: "0.85rem", color: "#8b949e", marginBottom: "0.3rem" }}>Show Date</label>
            <input
              type="date"
              value={showData.showdate}
              onChange={(e) => setShowData({ ...showData, showdate: e.target.value })}
              style={{ width: "100%", padding: "0.7rem", background: "#212836", border: "1px solid #30363d", color: "#fff", borderRadius: "4px", boxSizing: "border-box" }}
            />
          </div>

          <div style={{ marginBottom: "2rem" }}>
            <label style={{ display: "block", fontSize: "0.85rem", color: "#8b949e", marginBottom: "0.3rem" }}>Showtime</label>
            <input
              type="time"
              value={showData.showtime}
              onChange={(e) => setShowData({ ...showData, showtime: e.target.value })}
              style={{ width: "100%", padding: "0.7rem", background: "#212836", border: "1px solid #30363d", color: "#fff", borderRadius: "4px", boxSizing: "border-box" }}
            />
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

export default AddShow;
