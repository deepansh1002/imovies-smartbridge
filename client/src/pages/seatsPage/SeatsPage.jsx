import React, { useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import Header from "../../components/header/Header";
import Footer from "../../components/footer/Footer";
import useFetch from "../../hooks/useFetch";
import Loader from "../../components/loader/Loader";
import axios from "axios";
import Cookies from "js-cookie";
import { render } from "../../host";

const SeatsPage = () => {
  const { showId } = useParams();
  const navigate = useNavigate();
  const { resData, loading } = useFetch(`/api/shows/${showId}`);
  const [selectedSeats, setSelectedSeats] = useState([]);
  const [bookingLoading, setBookingLoading] = useState(false);

  const show = resData?.show;

  const toggleSeat = (seatNumber) => {
    if (selectedSeats.includes(seatNumber)) {
      setSelectedSeats(selectedSeats.filter(s => s !== seatNumber));
    } else {
      setSelectedSeats([...selectedSeats, seatNumber]);
    }
  };

  const handleBooking = async () => {
    const token = Cookies.get("userToken") || localStorage.getItem("userToken");
    if (!token) {
      navigate("/login");
      return;
    }

    setBookingLoading(true);
    try {
      const ticketsData = selectedSeats.map(s => ({ seatNumber: s, tier: 'MIDDLE', price: 250 }));
      await axios.post(
        `${render}/api/bookings/confirm`,
        { showId, ticketsData, totalAmount: selectedSeats.length * 250, tier: 'middle' },
        { headers: { 'auth-token': token } }
      );
      navigate("/bookings");
    } catch (err) {
      alert(err?.response?.data?.message || "Booking failed.");
    } finally {
      setBookingLoading(false);
    }
  };

  return (
    <div style={{ minHeight: "100vh", display: "flex", flexDirection: "column", background: "#121212", color: "#fff" }}>
      <Header />
      <div style={{ padding: "2rem", flex: 1, maxWidth: "800px", margin: "0 auto", width: "100%" }}>
        <h2>Select Your Seats</h2>
        {loading && <Loader />}
        {show && (
          <div>
            <p style={{ color: "#aaa" }}>Theatre: {show.theatreName} | Showtime: {show.showtime}</p>
            <div style={{ background: "#222", padding: "1.5rem", borderRadius: "8px", margin: "2rem 0", textAlign: "center" }}>
              <div style={{ height: "4px", background: "#e50914", margin: "0 auto 1.5rem auto", width: "80%" }} />
              <p style={{ fontSize: "0.85rem", color: "#777", marginBottom: "1.5rem" }}>SCREEN THIS WAY</p>
              <div style={{ display: "grid", gridTemplateColumns: "repeat(8, 1fr)", gap: "0.75rem", justifyContent: "center" }}>
                {Array.from({ length: 32 }, (_, i) => {
                  const seatNo = `M${i + 1}`;
                  const isSelected = selectedSeats.includes(seatNo);
                  return (
                    <button
                      key={seatNo}
                      onClick={() => toggleSeat(seatNo)}
                      style={{
                        padding: "0.6rem",
                        background: isSelected ? "#e50914" : "#333",
                        color: "#fff",
                        border: "none",
                        borderRadius: "4px",
                        cursor: "pointer"
                      }}
                    >
                      {seatNo}
                    </button>
                  );
                })}
              </div>
            </div>
            {selectedSeats.length > 0 && (
              <div style={{ textAlign: "right" }}>
                <p>Selected Seats: {selectedSeats.join(", ")}</p>
                <p>Total: ₹{selectedSeats.length * 250}</p>
                <button
                  onClick={handleBooking}
                  disabled={bookingLoading}
                  style={{ background: "#e50914", color: "#fff", padding: "0.8rem 2rem", border: "none", borderRadius: "4px", cursor: "pointer", fontWeight: "bold" }}
                >
                  {bookingLoading ? "Processing..." : "Confirm & Pay"}
                </button>
              </div>
            )}
          </div>
        )}
      </div>
      <Footer />
    </div>
  );
};

export default SeatsPage;
