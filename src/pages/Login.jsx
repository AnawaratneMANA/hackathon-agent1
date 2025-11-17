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

  return (
    <div style={{ maxWidth: 360, margin: "auto" }}>
      <h2>Login</h2>
      <form onSubmit={submit}>
        <div>
          <input value={user} onChange={(e) => setUser(e.target.value)} />
        </div>
        <div>
          <input
            value={pass}
            onChange={(e) => setPass(e.target.value)}
            type="password"
          />
        </div>
        <button type="submit">Login</button>
      </form>
      {err && <div style={{ color: "red" }}>{err}</div>}
    </div>
  );
}
