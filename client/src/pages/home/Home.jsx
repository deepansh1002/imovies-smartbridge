import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import useFetch from "../../hooks/useFetch";
import Loader from "../../components/loader/Loader";
import { FaHome, FaHeart, FaUser, FaSun, FaInfoCircle, FaSearch } from "react-icons/fa";

const Home = () => {
  const navigate = useNavigate();
  const [search, setSearch] = useState("");
  const { resData, loading } = useFetch("/api/movie");
  const movies = resData?.movies || [
    { _id: "1", movieName: "Rrr", releaseDate: "2022-03-25", genres: ["Action", "Drama", "Historical"], poster: "https://m.media-amazon.com/images/M/MV5BODUwNDNjMTctODUxNy00ZTA2LWIyYTEtMDc5Y2E5NjUzZmMxXkEyXkFqcGc@._V1_.jpg" },
    { _id: "2", movieName: "Baahubali 2: the conclusion", releaseDate: "2017-04-28", genres: ["Action", "Drama", "Fantasy"], poster: "https://m.media-amazon.com/images/M/MV5BOGNlNmRkMjctNDgxMC00NzFhLWIzY2YtNTk3ZGIzZDA3ZDYyXkEyXkFqcGc@._V1_.jpg" },
    { _id: "3", movieName: "Og", releaseDate: "2025-09-25", genres: ["Action", "Thriller"], poster: "https://m.media-amazon.com/images/M/MV5BNTBmYzI0YjEtM2M0My00MGUyLWI4YTYtNzkzYTEyYjcxMTg1XkEyXkFqcGc@._V1_.jpg" },
    { _id: "4", movieName: "Rajasaab", releaseDate: "2025-12-05", genres: ["Comedy", "Horror", "Romantic"], poster: "https://m.media-amazon.com/images/M/MV5BYzA4ZDQ2NWItNTljNC00NGRhLWE2YmEtYjExMzIxZjg4YjFkXkEyXkFqcGc@._V1_.jpg" },
    { _id: "5", movieName: "Toxic", releaseDate: "2025-10-01", genres: ["Action", "Thriller"], poster: "https://m.media-amazon.com/images/M/MV5BYTRiMjg3NDQtMDU5OC00N2FhLTk1NjYtMjdhMTA3ZWM4Y2ZhXkEyXkFqcGc@._V1_.jpg" },
    { _id: "6", movieName: "Avatar", releaseDate: "2025-09-30", genres: ["Action", "Adventure", "Fantasy", "Sci-Fi"], poster: "https://m.media-amazon.com/images/M/MV5BYjhiNjBlODctY2ZiOC00YjVlLWFlNzAtNTVhNzM1YjI1NzMxXkEyXkFqcGc@._V1_.jpg" }
  ];

  const filtered = movies.filter(m => m.movieName.toLowerCase().includes(search.toLowerCase()));

  return (
    <div style={{ minHeight: "100vh", background: "#0d1117", color: "#fff", fontFamily: "Inter, sans-serif" }}>
      {/* Top Navbar */}
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

        {/* Search Bar with Info pill */}
        <div style={{ display: "flex", alignItems: "center", position: "relative", width: "40%", maxWidth: "450px" }}>
          <input
            type="text"
            placeholder="Search movies..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            style={{
              width: "100%",
              padding: "0.5rem 2rem 0.5rem 1rem",
              background: "#212836",
              border: "1px solid #30363d",
              borderRadius: "4px",
              color: "#fff"
            }}
          />
          <FaInfoCircle color="#e50914" style={{ position: "absolute", right: "10px" }} />
        </div>

        {/* Icons */}
        <div style={{ display: "flex", gap: "1.2rem", alignItems: "center", fontSize: "1.1rem" }}>
          <FaSun style={{ cursor: "pointer", color: "#8b949e" }} />
          <FaHome style={{ cursor: "pointer", color: "#fff" }} onClick={() => navigate("/home")} />
          <FaHeart style={{ cursor: "pointer", color: "#8b949e" }} onClick={() => navigate("/favorites")} />
          <FaUser style={{ cursor: "pointer", color: "#8b949e" }} onClick={() => navigate("/bookings")} />
        </div>
      </nav>

      {/* Main Content */}
      <div style={{ padding: "2rem 3rem" }}>
        <h2 style={{ textAlign: "center", fontSize: "2rem", fontWeight: "bold", margin: "1rem 0 2rem 0" }}>
          Available <span style={{ color: "#e50914" }}>Movies</span>
        </h2>

        {loading && <Loader />}

        <div style={{
          display: "grid",
          gridTemplateColumns: "repeat(auto-fill, minmax(180px, 1fr))",
          gap: "1.5rem"
        }}>
          {filtered.map((movie) => (
            <div
              key={movie._id}
              onClick={() => navigate(`/movieshows/${encodeURIComponent(movie.movieName)}`)}
              style={{
                background: "#161b26",
                borderRadius: "8px",
                overflow: "hidden",
                cursor: "pointer",
                border: "1px solid #212836",
                transition: "transform 0.2s"
              }}
            >
              <div style={{ height: "240px", overflow: "hidden", background: "#0a0d14" }}>
                <img
                  src={movie.poster || movie.media?.posterUrl || "https://via.placeholder.com/180x240?text=iMovies"}
                  alt={movie.movieName}
                  style={{ width: "100%", height: "100%", objectFit: "cover" }}
                  onError={(e) => { e.target.src = "https://via.placeholder.com/180x240?text=iMovies"; }}
                />
              </div>
              <div style={{ padding: "0.8rem" }}>
                <h3 style={{ fontSize: "0.95rem", fontWeight: "600", margin: "0 0 0.3rem 0", whiteSpace: "nowrap", overflow: "hidden", textOverflow: "ellipsis" }}>
                  {movie.movieName}
                </h3>
                <p style={{ fontSize: "0.75rem", color: "#8b949e", margin: "0 0 0.5rem 0" }}>
                  📅 {new Date(movie.releaseDate).toLocaleDateString("en-US", { month: "short", day: "numeric", year: "numeric" })}
                </p>
                <div style={{ display: "flex", flexWrap: "wrap", gap: "0.3rem" }}>
                  {(Array.isArray(movie.genres) ? movie.genres : [movie.genres]).map((g, idx) => (
                    <span key={idx} style={{ background: "#7f1d1d", color: "#fca5a5", fontSize: "0.65rem", padding: "0.15rem 0.4rem", borderRadius: "3px" }}>
                      {g}
                    </span>
                  ))}
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Home;
