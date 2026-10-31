import React from "react";
import { Link } from "react-router-dom";

const Landing = () => {
  return (
    <div style={{
      minHeight: "100vh",
      background: "radial-gradient(circle at center, #11141e 0%, #07090e 100%)",
      color: "#fff",
      display: "flex",
      flexDirection: "column",
      justifyContent: "center",
      alignItems: "flex-start",
      padding: "0 10vw",
      fontFamily: "Inter, sans-serif"
    }}>
      <h1 style={{ fontSize: "3.8rem", fontWeight: "800", marginBottom: "1rem", lineHeight: "1.1" }}>
        Welcome to <span style={{ color: "#e50914" }}>iMovies</span>
      </h1>
      <p style={{ fontSize: "1.25rem", color: "#b0b8c4", maxWidth: "600px", marginBottom: "2.5rem", lineHeight: "1.6" }}>
        Your ultimate destination for the latest blockbusters and timeless classics
      </p>
      <div style={{ display: "flex", gap: "1.2rem" }}>
        <Link
          to="/login"
          style={{
            backgroundColor: "#e50914",
            color: "#fff",
            padding: "0.75rem 2rem",
            borderRadius: "50px",
            textDecoration: "none",
            fontWeight: "600",
            fontSize: "1rem",
            boxShadow: "0 4px 14px rgba(229, 9, 20, 0.4)"
          }}
        >
          Sign In
        </Link>
        <Link
          to="/register"
          style={{
            backgroundColor: "transparent",
            color: "#fff",
            padding: "0.75rem 2rem",
            borderRadius: "50px",
            textDecoration: "none",
            fontWeight: "600",
            fontSize: "1rem",
            border: "1px solid #4a5568"
          }}
        >
          Sign Up
        </Link>
      </div>
    </div>
  );
};

export default Landing;
