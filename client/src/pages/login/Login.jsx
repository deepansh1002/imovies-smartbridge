import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";
import Cookies from "js-cookie";
import { render } from "../../host";

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [error, setError] = useState("");
  const navigate = useNavigate();

  const handleLogin = async (e) => {
    e.preventDefault();
    try {
      const res = await axios.post(`${render}/api/auth/login`, { email, password });
      if (res.data.authToken) {
        Cookies.set("userToken", res.data.authToken, { expires: 7 });
        localStorage.setItem("userToken", res.data.authToken);
        navigate("/home");
      }
    } catch (err) {
      setError(err?.response?.data?.message || "Invalid email or password.");
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
        maxWidth: "400px",
        color: "#fff",
        boxShadow: "0 8px 30px rgba(0,0,0,0.5)"
      }}>
        <div style={{ textAlign: "center", marginBottom: "1.5rem" }}>
          <h1 style={{ fontSize: "2rem", fontWeight: "bold", margin: "0 0 0.5rem 0" }}>
            <span style={{ color: "#fff" }}>i</span><span style={{ color: "#e50914" }}>Movies</span>
          </h1>
          <h2 style={{ fontSize: "1.2rem", fontWeight: "normal", color: "#ccc", margin: 0 }}>Login</h2>
        </div>

        {error && <p style={{ color: "#e50914", fontSize: "0.85rem", textAlign: "center" }}>{error}</p>}

        <form onSubmit={handleLogin}>
          <div style={{ marginBottom: "1rem" }}>
            <label style={{ display: "block", fontSize: "0.85rem", marginBottom: "0.3rem", color: "#b0b8c4" }}>Email</label>
            <input
              type="email"
              placeholder="Enter your email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
              style={{ width: "100%", padding: "0.7rem", background: "#212836", border: "1px solid #30363d", color: "#fff", borderRadius: "6px", boxSizing: "border-box" }}
            />
          </div>

          <div style={{ marginBottom: "1rem" }}>
            <label style={{ display: "block", fontSize: "0.85rem", marginBottom: "0.3rem", color: "#b0b8c4" }}>Password</label>
            <input
              type={showPassword ? "text" : "password"}
              placeholder="Enter your password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
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

          <p style={{ marginTop: "1.5rem", fontSize: "0.85rem", textAlign: "center", color: "#8b949e" }}>
            Create an account <Link to="/register" style={{ color: "#e50914", textDecoration: "none", fontWeight: "600" }}>Register</Link>
          </p>
        </form>
      </div>
    </div>
  );
};

export default Login;
