import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import Cookies from "js-cookie";
import { render } from "../../host";

const AdminLogin = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const navigate = useNavigate();

  const handleAdminLogin = async (e) => {
    e.preventDefault();
    try {
      const res = await axios.post(`${render}/api/auth/admin/login`, { email, password });
      if (res.data.token) {
        Cookies.set("adminToken", res.data.token, { expires: 7 });
        localStorage.setItem("adminToken", res.data.token);
        navigate("/admin");
      }
    } catch (err) {
      setError(err?.response?.data?.message || "Admin authentication failed.");
    }
  };

  return (
    <div style={{ minHeight: "100vh", display: "flex", justifyContent: "center", alignItems: "center", background: "#0a0a0a", color: "#fff" }}>
      <form onSubmit={handleAdminLogin} style={{ background: "#1c1c1c", padding: "2.5rem", borderRadius: "10px", width: "100%", maxWidth: "400px", border: "1px solid #444" }}>
        <h2 style={{ marginBottom: "1rem", color: "#f5c518" }}>🛡️ Admin Portal</h2>
        {error && <p style={{ color: "#e50914" }}>{error}</p>}
        <div style={{ marginBottom: "1rem" }}>
          <label style={{ display: "block", marginBottom: "0.3rem" }}>Admin Email</label>
          <input type="email" value={email} onChange={(e) => setEmail(e.target.value)} required style={{ width: "100%", padding: "0.6rem", background: "#282828", border: "1px solid #444", color: "#fff" }} />
        </div>
        <div style={{ marginBottom: "1.5rem" }}>
          <label style={{ display: "block", marginBottom: "0.3rem" }}>Password</label>
          <input type="password" value={password} onChange={(e) => setPassword(e.target.value)} required style={{ width: "100%", padding: "0.6rem", background: "#282828", border: "1px solid #444", color: "#fff" }} />
        </div>
        <button type="submit" style={{ width: "100%", padding: "0.75rem", background: "#f5c518", color: "#000", fontWeight: "bold", border: "none", borderRadius: "4px", cursor: "pointer" }}>
          Enter Dashboard
        </button>
      </form>
    </div>
  );
};

export default AdminLogin;
