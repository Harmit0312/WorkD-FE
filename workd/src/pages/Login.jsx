import React from 'react';
import { useState, useContext } from "react";
import { Link } from 'react-router-dom';
import { useNavigate } from "react-router-dom";
import { FaEnvelope, FaLock } from 'react-icons/fa';
import './Login.css';
import logo from '../assets/WOD-Logo.png';
import api from "../services/api";
import { AuthContext } from "../context/AuthContext";

const Login = () => {
  // const handleSubmit = (e) => {
  // e.preventDefault();
  //   // Handle login logic here
  //   alert('Login submitted!');
  // };

  const { login } = useContext(AuthContext);
  const navigate = useNavigate();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");

  const validate = () => {
    if (!email || !password) {
      setError("All fields are required");
      return false;
    }

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      setError("Invalid email format");
      return false;
    }

    if (password.length < 4) {
      setError("Password must be at least 4 characters");
      return false;
    }

    setError("");
    return true;
  };

  const submit = async (e) => {
    e.preventDefault(); // Prevent form submission
    if (!validate()) return;

    // backend will be added in next step
    // alert("Login validation passed");
    try {
      const res = await api.post("/auth/login.php", { email, password });
      login(res.data);

      // Temporary redirect (role protection next session)
      if (res.data.role === "admin") navigate("/admin");
      else if (res.data.role === "client") navigate("/client");
      else navigate("/freelancer");

    } catch (err) {
      setError(err.response?.data?.error || "Login failed");
    }
  };

  return (
    <div className="login-container">
      <nav className="login-navbar">
        <img src={logo} alt="WOD Logo" className="login-logo" />
        <div className="login-nav-links">
          <Link to="/" className="login-nav-link">Home</Link>
          <Link to="/register" className="login-nav-link">Register</Link>
        </div>
      </nav>
      <section className="login-section">
        <div className="login-form-card">
          <h2>Login to WOD</h2>
          <p>Welcome back! Please log in.</p>
          <form className="login-form" onSubmit={submit}>
            {error && <p style={{ color: "red" }}>{error}</p>}
            <div className="login-input-group">
              <FaEnvelope className="login-icon" />
              <input type="email" placeholder="Email" value={email} onChange={e => setEmail(e.target.value)} required />
            </div>
            <div className="login-input-group">
              <FaLock className="login-icon" />
              <input type="password" placeholder="Password" value={password} onChange={e => setPassword(e.target.value)} required />
            </div>
            <button type="submit" className="login-primary-button">Login</button>
          </form>
          <p className="login-link-text">Don't have an account? <Link to="/register" className="login-link">Register here</Link></p>
        </div>
      </section>
      <footer className="login-footer">
        <p>&copy; 2026 WOD. All rights reserved. | <a href="/privacy" className="login-footer-link">Privacy Policy</a></p>
      </footer>
    </div>
  );
};

export default Login;