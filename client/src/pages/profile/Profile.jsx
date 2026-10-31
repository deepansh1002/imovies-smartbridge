import React from "react";
import Header from "../../components/header/Header";
import Footer from "../../components/footer/Footer";

const Profile = () => (
  <div style={{ minHeight: "100vh", display: "flex", flexDirection: "column", background: "#121212", color: "#fff" }}>
    <Header />
    <div style={{ padding: "2rem", flex: 1 }}><h2>User Profile</h2></div>
    <Footer />
  </div>
);
export default Profile;
