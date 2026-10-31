import React from "react";
import dayjs from "dayjs";
import "./style.scss";
import Header from "../../components/header/Header";
import Footer from "../../components/footer/Footer";
import Loader from "../../components/loader/Loader";
import useFetch from "../../hooks/useFetch";
import { BiCameraMovie } from "react-icons/bi";
import { TbMovieOff } from "react-icons/tb";
import { useNavigate, useParams } from "react-router-dom";

const MovieShows = () => {
  const navigate = useNavigate();
  const { movieName } = useParams();
  const { resData, loading, error } = useFetch(
    `/api/shows/getmovieshows/${movieName}`
  );

  const showsData = resData?.data?.showData || resData?.shows || [];
  showsData?.sort(function (a, b) {
    // Concatenate date and time strings for comparison
    var datetimeA = new Date(a.showdate + "T" + a.showtime + "Z");
    var datetimeB = new Date(b.showdate + "T" + b.showtime + "Z");
    return datetimeA - datetimeB;
  });

  function convertTo12HourFormat(time24) {
    if (!time24) return "";
    var [hours, minutes] = time24.split(":");
    hours = parseInt(hours);
    var meridiem = hours >= 12 ? "PM" : "AM";
    var hours12 = hours % 12 || 12;
    return `${hours12}:${minutes} ${meridiem}`;
  }

  return (
    <div className="movie-shows-container">
      <Header />
      <div className="content-wrap" style={{ padding: "2rem", minHeight: "80vh" }}>
        <h2>Available Shows for {movieName}</h2>
        {loading && <Loader />}
        {error && <p style={{ color: "#e50914" }}>{error}</p>}
        {!loading && (!showsData || showsData.length === 0) && (
          <div style={{ textAlign: "center", padding: "3rem" }}>
            <TbMovieOff size={48} color="#666" />
            <p>No scheduled shows available for this movie yet.</p>
          </div>
        )}
        <div className="shows-grid" style={{ display: "grid", gridTemplateColumns: "repeat(auto-fill, minmax(280px, 1fr))", gap: "1.5rem", marginTop: "1.5rem" }}>
          {showsData?.map((show) => (
            <div
              key={show._id || show.showId}
              className="show-card"
              style={{
                background: "#1f1f1f",
                padding: "1.5rem",
                borderRadius: "8px",
                border: "1px solid #333",
                cursor: "pointer"
              }}
              onClick={() => navigate(`/seats/${show._id || show.showId}`)}
            >
              <h3><BiCameraMovie style={{ marginRight: "0.5rem" }} />{show.theatreName}</h3>
              <p>📅 Date: {dayjs(show.showdate).format("YYYY-MM-DD")}</p>
              <p>⏰ Time: {convertTo12HourFormat(show.showtime)}</p>
              <button style={{
                marginTop: "1rem",
                width: "100%",
                background: "#e50914",
                color: "#fff",
                border: "none",
                padding: "0.6rem",
                borderRadius: "4px",
                cursor: "pointer"
              }}>
                Select Seats
              </button>
            </div>
          ))}
        </div>
      </div>
      <Footer />
    </div>
  );
};

export default MovieShows;
