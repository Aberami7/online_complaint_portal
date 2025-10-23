import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import './App.css';

const Signup = () => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [message, setMessage] = useState(""); 
  const navigate = useNavigate();

  const handleSignup = async (e) => {
    e.preventDefault(); // Prevent page reload

    if (!name || !email || !password) {
      setMessage("⚠️ Please enter all details");
      return;
    }

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      setMessage("⚠️ Please enter a valid email address");
      return;
    }

    try {
      const res = await fetch("http://localhost:5000/signup", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ name, email, password }), // Send name, email & password
      });

      const data = await res.json();

      if (res.status === 200 || res.status === 201) {
        setMessage("✅ Thanks for registering! Redirecting to Login...");
        setTimeout(() => navigate("/login"), 2500);
      } else if (res.status === 400) {
        setMessage("⚠️ Email already registered. Please login.");
        setTimeout(() => navigate("/login"), 2000); 
      } else {
        setMessage("⚠️ " + data.message);
      }
    } catch (err) {
      console.error("Signup error:", err);
      setMessage("⚠️ Something went wrong");
    }
  };

  return (
    <div className="auth-container">
      <div className="left-column">
        <div className="logo">Online Complaint Portal</div>
        <h1>Welcome!</h1>
        <p>Create an account to get started</p>
        <div className="shape1"></div>
        <div className="shape2"></div>
        <div className="shape3"></div>
      </div> 

      <div className="right-column">
        <div className="form-container">
          <h2>Signup</h2>

          <form onSubmit={handleSignup}>
            <input
              type="text"
              value={name}
              onChange={(e) => setName(e.target.value)}
              placeholder="Enter your Name"
              required
            />

            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="Enter your email"
              required
            />

            <input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="Enter your password"
              required
            />

            <button type="submit">
              Signup
            </button>
          </form>

          {message && <p className="signup-message">{message}</p>}

          <div className="form-links">
            <p onClick={() => navigate("/login")}>Already have an account?</p>
            <p onClick={() => navigate("/home")}>Home</p>
          </div>

        </div>
      </div>
    </div>
  );
};

export default Signup;
