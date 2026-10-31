import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";
import Cookies from "js-cookie";
import { render } from "../../host";

const Register = () => {
  const [formData, setFormData] = useState({
    username: "",
    email: "",
    password: "",
    confirmPassword: ""
  });
  const [showPassword, setShowPassword] = useState(false);
  const [error, setError] = useState("");
  const navigate = useNavigate();

  const handleRegister = async (e) => {
    e.preventDefault();
    if (formData.password !== formData.confirmPassword) {
      setError("Passwords do not match.");
      return;
    }
    try {
      const res = await axios.post(`${render}/api/auth/register`, {
        username: formData.username,
        email: formData.email,
        password: formData.password
      });
      if (res.data.authToken) {
        Cookies.set("userToken", res.data.authToken, { expires: 7 });
        localStorage.setItem("userToken", res.data.authToken);
        navigate("/home");
      }
    } catch (err) {
      setError(err?.response?.data?.message || "Registration failed.");
    }
  };

  return (
    <div style={{
      minHeight: "100vh",
      background: "#0d1117",
      display: "flex",
      justifyContent: "center",
      alignItems: "center",
      padding: "2rem",
      fontFamily: "Inter, sans-serif"
    }}>
      <div style={{
        background: "#161b26",
        border: "1px solid #e50914",
        borderRadius: "12px",
        padding: "2.5rem 2rem",
        width: "100%",
        maxWidth: "420px",
        color: "#fff",
        boxShadow: "0 8px 30px rgba(0,0,0,0.5)"
      }}>
        <div style={{ textAlign: "center", marginBottom: "1.5rem" }}>
          <h1 style={{ fontSize: "2rem", fontWeight: "bold", margin: "0 0 0.5rem 0" }}>
            <span style={{ color: "#fff" }}>i</span><span style={{ color: "#e50914" }}>Movies</span>
          </h1>
          <h2 style={{ fontSize: "1.2rem", fontWeight: "normal", color: "#ccc", margin: 0 }}>Register</h2>
        </div>

        {error && <p style={{ color: "#e50914", fontSize: "0.85rem", textAlign: "center" }}>{error}</p>}

        <form onSubmit={handleRegister}>
          <div style={{ marginBottom: "1rem" }}>
            <label style={{ display: "block", fontSize: "0.85rem", marginBottom: "0.3rem", color: "#b0b8c4" }}>Username</label>
            <input
              type="text"
              placeholder="Enter Username"
              value={formData.username}
              onChange={(e) => setFormData({ ...formData, username: e.target.value })}
              required
              style={{ width: "100%", padding: "0.7rem", background: "#212836", border: "1px solid #30363d", color: "#fff", borderRadius: "6px", boxSizing: "border-box" }}
            />
          </div>

          <div style={{ marginBottom: "1rem" }}>
            <label style={{ display: "block", fontSize: "0.85rem", marginBottom: "0.3rem", color: "#b0b8c4" }}>Email</label>
            <input
              type="email"
              placeholder="Enter your email"
              value={formData.email}
              onChange={(e) => setFormData({ ...formData, email: e.target.value })}
              required
              style={{ width: "100%", padding: "0.7rem", background: "#212836", border: "1px solid #30363d", color: "#fff", borderRadius: "6px", boxSizing: "border-box" }}
            />
          </div>

          <div style={{ marginBottom: "1rem" }}>
            <label style={{ display: "block", fontSize: "0.85rem", marginBottom: "0.3rem", color: "#b0b8c4" }}>Password</label>
            <input
              type={showPassword ? "text" : "password"}
              placeholder="Enter your password"
              value={formData.password}
              onChange={(e) => setFormData({ ...formData, password: e.target.value })}
              required
              style={{ width: "100%", padding: "0.7rem", background: "#212836", border: "1px solid #30363d", color: "#fff", borderRadius: "6px", boxSizing: "border-box" }}
            />
          </div>

          <div style={{ marginBottom: "1rem" }}>
            <label style={{ display: "block", fontSize: "0.85rem", marginBottom: "0.3rem", color: "#b0b8c4" }}>Confirm Password</label>
            <input
              type={showPassword ? "text" : "password"}
              placeholder="Confirm your password"
              value={formData.confirmPassword}
              onChange={(e) => setFormData({ ...formData, confirmPassword: e.target.value })}
              required
              style={{ width: "100%", padding: "0.7rem", background: "#212836", border: "1px solid #30363d", color: "#fff", borderRadius: "6px", boxSizing: "border-box" }}
            />
          </div>

          <div style={{ display: "flex", alignItems: "center", gap: "0.5rem", marginBottom: "1.5rem" }}>
            <input
              type="checkbox"
              id="showPass"
              checked={showPassword}
              onChange={() => setShowPassword(!showPassword)}
            />
            <label htmlFor="showPass" style={{ fontSize: "0.85rem", color: "#b0b8c4", cursor: "pointer" }}>Show Password</label>
          </div>

          <button
            type="submit"
            style={{
              width: "100%",
              padding: "0.75rem",
              background: "#e50914",
              color: "#fff",
              border: "none",
              borderRadius: "6px",
              fontWeight: "600",
              cursor: "pointer"
            }}
          >
            Submit
          </button>

          <p style={{ marginTop: "1.2rem", fontSize: "0.85rem", textAlign: "center", color: "#8b949e" }}>
            Already have an account? <Link to="/login" style={{ color: "#e50914", textDecoration: "none", fontWeight: "600" }}>Login</Link>
          </p>

          <p style={{ marginTop: "0.5rem", fontSize: "0.85rem", textAlign: "center", color: "#8b949e" }}>
            Register as an <Link to="/admin/register" style={{ color: "#e50914", textDecoration: "none", fontWeight: "600" }}>Admin</Link>
          </p>
        </form>
      </div>
    </div>
  );
};

export default Register;
