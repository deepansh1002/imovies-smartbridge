import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { render } from "../../host";

const AdminRegister = () => {
  const [formData, setFormData] = useState({ username: "", email: "", password: "" });
  const [error, setError] = useState("");
  const navigate = useNavigate();

  const handleAdminRegister = async (e) => {
    e.preventDefault();
    try {
      await axios.post(`${render}/api/auth/admin/register`, formData);
      navigate("/admin/login");
    } catch (err) {
      setError(err?.response?.data?.message || "Admin registration failed.");
    }
  };

  return (
    <div style={{ minHeight: "100vh", display: "flex", justifyContent: "center", alignItems: "center", background: "#0a0a0a", color: "#fff" }}>
      <form onSubmit={handleAdminRegister} style={{ background: "#1c1c1c", padding: "2.5rem", borderRadius: "10px", width: "100%", maxWidth: "400px", border: "1px solid #444" }}>
        <h2 style={{ marginBottom: "1rem", color: "#f5c518" }}>Register Administrator</h2>
        {error && <p style={{ color: "#e50914" }}>{error}</p>}
        <div style={{ marginBottom: "1rem" }}>
          <label style={{ display: "block", marginBottom: "0.3rem" }}>Admin Username</label>
          <input type="text" value={formData.username} onChange={(e) => setFormData({ ...formData, username: e.target.value })} required style={{ width: "100%", padding: "0.6rem", background: "#282828", border: "1px solid #444", color: "#fff" }} />
        </div>
        <div style={{ marginBottom: "1rem" }}>
          <label style={{ display: "block", marginBottom: "0.3rem" }}>Admin Email</label>
          <input type="email" value={formData.email} onChange={(e) => setFormData({ ...formData, email: e.target.value })} required style={{ width: "100%", padding: "0.6rem", background: "#282828", border: "1px solid #444", color: "#fff" }} />
        </div>
        <div style={{ marginBottom: "1.5rem" }}>
          <label style={{ display: "block", marginBottom: "0.3rem" }}>Password</label>
          <input type="password" value={formData.password} onChange={(e) => setFormData({ ...formData, password: e.target.value })} required minLength={8} style={{ width: "100%", padding: "0.6rem", background: "#282828", border: "1px solid #444", color: "#fff" }} />
        </div>
        <button type="submit" style={{ width: "100%", padding: "0.75rem", background: "#f5c518", color: "#000", fontWeight: "bold", border: "none", borderRadius: "4px", cursor: "pointer" }}>
          Register Admin
        </button>
      </form>
    </div>
  );
};

export default AdminRegister;
