import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import './App.css';

const Login = () => {
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
      const res = await fetch("http://localhost:5000/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email: trimmedEmail, password: trimmedPassword }),
      });

      const data = await res.json();

      if (res.status === 200 && data.success) {
        const user = {
          userId: data.user.id,
          name: data.user.name || "",
          email: data.user.email,
        };
        localStorage.setItem("user", JSON.stringify(user));

        console.log("Logged-in user:", user); // ✅ Check userId stored
        setMessage("✅ Login successful! Redirecting...");
        setMsgColor("green");

        setTimeout(() => navigate("/dashboard"), 1000);
      } else {
        setMessage(data.message || "❌ Invalid email or password");
        setMsgColor("red");
      }
    } catch (err) {
      console.error("Login error:", err);
      setMessage("⚠️ Something went wrong. Try again!");
      setMsgColor("red");
    }
  };

  return (
    <div className="auth-container">
      <div className="left-column">
        <div className="logo"> Online Complaint Portal</div>
        <h1>Welcome Back!</h1>
        <p>Login to access your account</p>
      </div>

      <div className="right-column">
        <div className="form-container">
          <h2>Login</h2>
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
           <p onClick={() => navigate("/signup")}>Don't have an account?</p>
            <p onClick={() => navigate("/home")}>Home</p>
        </div>
      </div>
    </div>
  );
};

export default Login;
