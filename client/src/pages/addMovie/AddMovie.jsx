import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { FaSun, FaHome, FaCalendarAlt, FaPlus, FaTheaterMasks, FaHistory, FaSignOutAlt, FaTrash, FaBan } from "react-icons/fa";
import axios from "axios";
import { render } from "../../host";

const AddMovie = () => {
  const navigate = useNavigate();
  const [movieData, setMovieData] = useState({
    movieName: "",
    description: "",
    genres: "",
    releaseDate: "",
    runtime: "",
    certification: "",
    trailerUrl: ""
  });

  const availableMovies = [
    { name: "Rrr", date: "Mar 25, 2022", poster: "https://m.media-amazon.com/images/M/MV5BODUwNDNjMTctODUxNy00ZTA2LWIyYTEtMDc5Y2E5NjUzZmMxXkEyXkFqcGc@._V1_.jpg" },
    { name: "Baahubali 2: the conclusion", date: "Apr 25, 2017", poster: "https://m.media-amazon.com/images/M/MV5BOGNlNmRkMjctNDgxMC00NzFhLWIzY2YtNTk3ZGIzZDA3ZDYyXkEyXkFqcGc@._V1_.jpg" },
    { name: "Og", date: "Sep 25, 2025", poster: "https://m.media-amazon.com/images/M/MV5BNTBmYzI0YjEtM2M0My00MGUyLWI4YTYtNzkzYTEyYjcxMTg1XkEyXkFqcGc@._V1_.jpg" },
    { name: "Rajasaab", date: "Dec 5, 2025", poster: "https://m.media-amazon.com/images/M/MV5BYzA4ZDQ2NWItNTljNC00NGRhLWE2YmEtYjExMzIxZjg4YjFkXkEyXkFqcGc@._V1_.jpg" },
    { name: "Toxic", date: "Oct 1, 2025", poster: "https://m.media-amazon.com/images/M/MV5BYTRiMjg3NDQtMDU5OC00N2FhLTk1NjYtMjdhMTA3ZWM4Y2ZhXkEyXkFqcGc@._V1_.jpg" }
  ];

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await axios.post(`${render}/api/movie`, {
        ...movieData,
        genres: movieData.genres.split(",").map(g => g.trim()),
        runtime: Number(movieData.runtime)
      });
      alert("Movie added successfully!");
    } catch (err) {
      alert(err?.response?.data?.message || "Failed to add movie");
    }
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
          <FaPlus style={{ cursor: "pointer", color: "#fff" }} onClick={() => navigate("/addmovie")} />
          <FaTheaterMasks style={{ cursor: "pointer" }} onClick={() => navigate("/addtheatre")} />
          <FaHistory style={{ cursor: "pointer" }} onClick={() => navigate("/adminbookings")} />
          <FaSignOutAlt style={{ cursor: "pointer" }} onClick={() => navigate("/admin/login")} />
        </div>
      </nav>

      {/* Form Container */}
      <div style={{ padding: "2rem 3rem", maxWidth: "800px", margin: "0 auto" }}>
        {/* Upload Box */}
        <div style={{
          height: "180px",
          border: "1px solid #e50914",
          borderRadius: "8px",
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          background: "#161b26",
          marginBottom: "1.5rem"
        }}>
          <FaBan size={28} color="#e50914" />
        </div>

        <h2 style={{ textAlign: "center", fontSize: "1.8rem", margin: "0 0 1.5rem 0" }}>
          Add <span style={{ color: "#e50914" }}>Movie</span>
        </h2>

        <form onSubmit={handleSubmit} style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "1rem" }}>
          <div>
            <label style={{ display: "block", fontSize: "0.8rem", color: "#8b949e", marginBottom: "0.2rem" }}>Movie</label>
            <input
              type="text"
              placeholder="Enter movie name"
              value={movieData.movieName}
              onChange={(e) => setMovieData({ ...movieData, movieName: e.target.value })}
              required
              style={{ width: "100%", padding: "0.6rem", background: "#212836", border: "1px solid #30363d", color: "#fff", borderRadius: "4px", boxSizing: "border-box" }}
            />
          </div>
          <div>
            <label style={{ display: "block", fontSize: "0.8rem", color: "#8b949e", marginBottom: "0.2rem" }}>Description</label>
            <input
              type="text"
              placeholder="Enter movie description"
              value={movieData.description}
              onChange={(e) => setMovieData({ ...movieData, description: e.target.value })}
              required
              style={{ width: "100%", padding: "0.6rem", background: "#212836", border: "1px solid #30363d", color: "#fff", borderRadius: "4px", boxSizing: "border-box" }}
            />
          </div>
          <div>
            <label style={{ display: "block", fontSize: "0.8rem", color: "#8b949e", marginBottom: "0.2rem" }}>Genres</label>
            <input
              type="text"
              placeholder="Enter movie genres sep..."
              value={movieData.genres}
              onChange={(e) => setMovieData({ ...movieData, genres: e.target.value })}
              required
              style={{ width: "100%", padding: "0.6rem", background: "#212836", border: "1px solid #30363d", color: "#fff", borderRadius: "4px", boxSizing: "border-box" }}
            />
          </div>
          <div>
            <label style={{ display: "block", fontSize: "0.8rem", color: "#8b949e", marginBottom: "0.2rem" }}>Release Date</label>
            <input
              type="date"
              value={movieData.releaseDate}
              onChange={(e) => setMovieData({ ...movieData, releaseDate: e.target.value })}
              required
              style={{ width: "100%", padding: "0.6rem", background: "#212836", border: "1px solid #30363d", color: "#fff", borderRadius: "4px", boxSizing: "border-box" }}
            />
          </div>
          <div>
            <label style={{ display: "block", fontSize: "0.8rem", color: "#8b949e", marginBottom: "0.2rem" }}>Runtime</label>
            <input
              type="number"
              placeholder="Enter runtime in minute"
              value={movieData.runtime}
              onChange={(e) => setMovieData({ ...movieData, runtime: e.target.value })}
              required
              style={{ width: "100%", padding: "0.6rem", background: "#212836", border: "1px solid #30363d", color: "#fff", borderRadius: "4px", boxSizing: "border-box" }}
            />
          </div>
          <div>
            <label style={{ display: "block", fontSize: "0.8rem", color: "#8b949e", marginBottom: "0.2rem" }}>Certification</label>
            <input
              type="text"
              placeholder="Enter movie certification"
              value={movieData.certification}
              onChange={(e) => setMovieData({ ...movieData, certification: e.target.value })}
              style={{ width: "100%", padding: "0.6rem", background: "#212836", border: "1px solid #30363d", color: "#fff", borderRadius: "4px", boxSizing: "border-box" }}
            />
          </div>
          <div style={{ gridColumn: "span 2" }}>
            <label style={{ display: "block", fontSize: "0.8rem", color: "#8b949e", marginBottom: "0.2rem" }}>Trailer URL (YouTube)</label>
            <input
              type="url"
              placeholder="https://www.youtube.com"
              value={movieData.trailerUrl}
              onChange={(e) => setMovieData({ ...movieData, trailerUrl: e.target.value })}
              style={{ width: "100%", padding: "0.6rem", background: "#212836", border: "1px solid #30363d", color: "#fff", borderRadius: "4px", boxSizing: "border-box" }}
            />
          </div>
          <div style={{ gridColumn: "span 2", textAlign: "center", marginTop: "1rem" }}>
            <button
              type="submit"
              style={{ background: "#e50914", color: "#fff", padding: "0.7rem 2.5rem", border: "none", borderRadius: "4px", fontWeight: "bold", cursor: "pointer" }}
            >
              Submit
            </button>
          </div>
        </form>
      </div>

      {/* Available Movies Section Banner */}
      <div style={{ padding: "0 3rem 4rem 3rem" }}>
        <div style={{ background: "#e50914", color: "#fff", textAlign: "center", padding: "0.6rem", borderRadius: "4px", fontWeight: "bold", fontSize: "1.2rem", marginBottom: "2rem" }}>
          Available Movies
        </div>
        <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fill, minmax(180px, 1fr))", gap: "1.5rem" }}>
          {availableMovies.map((m, i) => (
            <div key={i} style={{ position: "relative", background: "#161b26", borderRadius: "8px", overflow: "hidden", border: "1px solid #212836" }}>
              <button
                style={{
                  position: "absolute",
                  top: "8px",
                  right: "8px",
                  background: "#fff",
                  color: "#e50914",
                  border: "none",
                  borderRadius: "50%",
                  width: "24px",
                  height: "24px",
                  display: "flex",
                  justifyContent: "center",
                  alignItems: "center",
                  cursor: "pointer",
                  boxShadow: "0 2px 5px rgba(0,0,0,0.4)"
                }}
              >
                <FaTrash size={12} />
              </button>
              <img src={m.poster} alt={m.name} style={{ width: "100%", height: "240px", objectFit: "cover" }} />
              <div style={{ padding: "0.8rem" }}>
                <h4 style={{ margin: "0 0 0.3rem 0", fontSize: "0.9rem", whiteSpace: "nowrap", overflow: "hidden", textOverflow: "ellipsis" }}>{m.name}</h4>
                <p style={{ margin: 0, fontSize: "0.75rem", color: "#8b949e" }}>{m.date}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default AddMovie;
