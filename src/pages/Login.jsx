import React, { useState } from "react";
import { loginUser } from "../api/Api.js";
import { useNavigate } from "react-router-dom";

export default function Login() {
  const [user, setUser] = useState("demo");
  const [pass, setPass] = useState("demo");
  const [err, setErr] = useState(null);
  const navigate = useNavigate();

  async function submit(e) {
    e.preventDefault();
    try {
      const info = await loginUser(user, pass);
      // store SME_ID in sessionStorage for demo
      sessionStorage.setItem("smeId", info.smeId);
      // Navigate to the Dashboard.
      navigate("/dashboard");
    } catch (e) {
      setErr(e.message);
    }
  }

  const containerStyle = {
    maxWidth: 600,
    margin: "50px auto",
    padding: "40px",
    borderRadius: "10px",
    boxShadow: "0 4px 6px rgba(0, 0, 0, 0.1)",
    backgroundColor: "#ffffff",
    fontFamily: "Arial, sans-serif",
  };

  const headingStyle = {
    textAlign: "center",
    color: "#333",
    marginBottom: "30px",
    fontSize: "28px",
    fontWeight: "600",
  };

  const formStyle = {
    display: "flex",
    flexDirection: "column",
    gap: "15px",
  };

  const inputContainerStyle = {
    display: "flex",
    flexDirection: "column",
  };

  const labelStyle = {
    marginBottom: "5px",
    color: "#555",
    fontSize: "14px",
    fontWeight: "500",
  };

  const inputStyle = {
    padding: "12px",
    borderRadius: "6px",
    border: "1px solid #ddd",
    fontSize: "14px",
    transition: "border-color 0.3s, box-shadow 0.3s",
    outline: "none",
  };

  const buttonStyle = {
    padding: "12px 20px",
    backgroundColor: "#007bff",
    color: "white",
    border: "none",
    borderRadius: "6px",
    fontSize: "16px",
    fontWeight: "600",
    cursor: "pointer",
    transition: "background-color 0.3s, transform 0.1s",
    marginTop: "10px",
  };

  const errorStyle = {
    color: "#dc3545",
    backgroundColor: "#f8d7da",
    padding: "12px",
    borderRadius: "6px",
    marginTop: "15px",
    fontSize: "14px",
    border: "1px solid #f5c6cb",
    textAlign: "center",
  };

  return (
    <div style={containerStyle}>
      <h2 style={headingStyle}>Login</h2>
      <form onSubmit={submit} style={formStyle}>
        <div style={inputContainerStyle}>
          <label style={labelStyle}>Username</label>
          <input
            value={user}
            onChange={(e) => setUser(e.target.value)}
            style={inputStyle}
            placeholder="Enter username"
            onFocus={(e) => (e.target.style.borderColor = "#007bff")}
            onBlur={(e) => (e.target.style.borderColor = "#ddd")}
          />
        </div>
        <div style={inputContainerStyle}>
          <label style={labelStyle}>Password</label>
          <input
            value={pass}
            onChange={(e) => setPass(e.target.value)}
            type="password"
            style={inputStyle}
            placeholder="Enter password"
            onFocus={(e) => (e.target.style.borderColor = "#007bff")}
            onBlur={(e) => (e.target.style.borderColor = "#ddd")}
          />
        </div>
        <button
          type="submit"
          style={buttonStyle}
          onMouseEnter={(e) => (e.target.style.backgroundColor = "#0056b3")}
          onMouseLeave={(e) => (e.target.style.backgroundColor = "#007bff")}
          onMouseDown={(e) => (e.target.style.transform = "scale(0.98)")}
          onMouseUp={(e) => (e.target.style.transform = "scale(1)")}
        >
          Login
        </button>
      </form>
      {err && <div style={errorStyle}>{err}</div>}
    </div>
  );
}
