import React, { useState } from "react";
import "./style.scss";
import Loader from "../../components/loader/Loader";
import dayjs from "dayjs";
import { MdDelete } from "react-icons/md";
import { toast } from "react-toastify";
import { RxCross1 } from "react-icons/rx";
import { FaStar } from "react-icons/fa";
import axios from "axios";
import Cookies from "js-cookie";
import { render } from "../../host";

const MovieDetailsPopup = ({ movie, onClose }) => {
  if (!movie) return null;

  // Helper function to get the first available image URL
  const getImageUrl = (media) => {
    if (!media) return "/default-movie.png";
    if (typeof media === "string") return media;
    const mediaItem = Array.isArray(media) ? media[0] : media;
    return mediaItem?.url || mediaItem || "/default-movie.png";
  };

  console.log("Movie data:", movie); // Debug log

  return (
    <div className="popup-overlay" onClick={onClose} style={{
      position: "fixed",
      top: 0,
      left: 0,
      width: "100%",
      height: "100%",
      background: "rgba(0, 0, 0, 0.75)",
      display: "flex",
      justifyContent: "center",
      alignItems: "center",
      zIndex: 1000
    }}>
      <div
        className="movie-details-popup"
        onClick={(e) => e.stopPropagation()}
        style={{
          background: "#1e1e1e",
          padding: "2rem",
          borderRadius: "12px",
          maxWidth: "600px",
          width: "90%",
          color: "#fff",
          position: "relative"
        }}
      >
        <button
          className="close-btn"
          onClick={onClose}
          style={{
            position: "absolute",
            top: "1rem",
            right: "1rem",
            background: "none",
            border: "none",
            color: "#fff",
            fontSize: "1.5rem",
            cursor: "pointer"
          }}
        >
          <RxCross1 />
        </button>
        <div style={{ display: "flex", gap: "1.5rem", marginTop: "1rem" }}>
          <img
            src={getImageUrl(movie.media)}
            alt={movie.movieName}
            style={{ width: "160px", height: "240px", objectFit: "cover", borderRadius: "8px" }}
            onError={(e) => { e.target.src = "https://via.placeholder.com/160x240?text=iMovies"; }}
          />
          <div>
            <h2 style={{ margin: "0 0 0.5rem 0", color: "#e50914" }}>{movie.movieName}</h2>
            <p style={{ display: "flex", alignItems: "center", gap: "0.4rem", color: "#f5c518" }}>
              <FaStar /> {movie.rating || "N/A"}
            </p>
            <p><strong>Release Date:</strong> {dayjs(movie.releaseDate).format("MMM DD, YYYY")}</p>
            <p><strong>Genres:</strong> {Array.isArray(movie.genres) ? movie.genres.join(", ") : movie.genres}</p>
            <p style={{ color: "#aaa", fontSize: "0.9rem", marginTop: "0.5rem" }}>{movie.description}</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default MovieDetailsPopup;
