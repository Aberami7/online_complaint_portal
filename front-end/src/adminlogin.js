import React, { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import './App.css';

const AdminLogin = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [message, setMessage] = useState("");
  const [msgColor, setMsgColor] = useState("red");
  const navigate = useNavigate();

  const handleLogin = async () => {
    const trimmedEmail = email.trim();
    const trimmedPassword = password.trim();

    if (!trimmedEmail || !trimmedPassword) {
      setMessage("⚠️ Please enter your details");
      setMsgColor("red");
      return;
    }

    try {
      // 🔹 Call backend admin login API
      const res = await fetch("http://localhost:5000/admin-login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email: trimmedEmail, password: trimmedPassword }),
      });

      const data = await res.json();

      if (res.status === 200 && data.success) {
        // ✅ Store admin info in localStorage
        localStorage.setItem("admin", JSON.stringify(data.admin));

        setMessage("✅ Admin login successful! Redirecting...");
        setMsgColor("green");

        // 🔹 Navigate to admin dashboard after 1 second
        setTimeout(() => navigate("/admin"), 1000);
      } else {
        setMessage(data.message || "❌ Invalid email or password");
        setMsgColor("red");
      }
    } catch (err) {
      console.error("Admin login error:", err);
      setMessage("⚠️ Something went wrong. Try again!");
      setMsgColor("red");
    }
  };

  return (
    <div className="auth-container">
      <div className="left-column">
        <div className="logo">Online Complaint Portal</div>
        <h1>Welcome Admin!</h1>
        <p>Login to access your admin dashboard</p>
      </div>

      <div className="right-column">
        <div className="form-container">
          <h2>Admin Login</h2>
          <input
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            placeholder="Enter your email"
          />
          <input
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            placeholder="Enter your password"
          />
          <button type="button" onClick={handleLogin}>Login</button>
          {message && <p style={{ marginTop: "15px", color: msgColor }}>{message}</p>}
          <p onClick={() => navigate("/home")} style={{ cursor: "pointer", color: "white" }}>Back to Home</p>
        </div>
      </div>
    </div>
  );
};

export default AdminLogin;
