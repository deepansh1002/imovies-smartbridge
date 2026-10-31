import React from "react";
import { Link, useNavigate } from "react-router-dom";
import Cookies from "js-cookie";

const Header = () => {
  const navigate = useNavigate();
  const token = Cookies.get("userToken") || localStorage.getItem("userToken");

  const handleLogout = () => {
    Cookies.remove("userToken");
    localStorage.removeItem("userToken");
    navigate("/login");
  };

  return (
    <header style={{
      display: "flex",
      justifyContent: "space-between",
      alignItems: "center",
      padding: "1rem 2rem",
      backgroundColor: "#141414",
      borderBottom: "1px solid #282828"
    }}>
      <Link to="/" style={{ textDecoration: "none", color: "#e50914", fontSize: "1.8rem", fontWeight: "bold" }}>
        🎬 iMovies
      </Link>
      <nav style={{ display: "flex", gap: "1.5rem", alignItems: "center" }}>
        <Link to="/home" style={{ color: "#fff", textDecoration: "none" }}>Movies</Link>
        <Link to="/favorites" style={{ color: "#fff", textDecoration: "none" }}>Watchlist</Link>
        <Link to="/bookings" style={{ color: "#fff", textDecoration: "none" }}>My Bookings</Link>
        {token ? (
          <button onClick={handleLogout} style={{ background: "transparent", border: "1px solid #e50914", color: "#fff", padding: "0.4rem 0.8rem", borderRadius: "4px", cursor: "pointer" }}>
            Logout
          </button>
        ) : (
          <Link to="/login" style={{ backgroundColor: "#e50914", color: "#fff", padding: "0.4rem 1rem", borderRadius: "4px", textDecoration: "none" }}>
            Sign In
          </Link>
        )}
      </nav>
    </header>
  );
};

export default Header;
