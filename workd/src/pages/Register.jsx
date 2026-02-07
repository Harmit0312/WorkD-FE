import React from 'react';
import { useState } from "react";
import { Link } from 'react-router-dom';
import { useNavigate } from "react-router-dom";
import api from "../services/api";
import { FaUser, FaEnvelope, FaLock, FaBriefcase, FaTools } from 'react-icons/fa'; // Added FaBriefcase and FaTools for icons
import './Register.css';
import logo from '../assets/WOD-Logo.png';

const Register = () => {
  const navigate = useNavigate();

  const [form, setForm] = useState({
    name: "",
    email: "",
    password: "",
    role: "",
    experience: "",
    skills: ""
  });
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");

  const validate = () => {
    if (!form.name || !form.email || !form.password || !form.role) {
      setError("All fields are required");
      return false;
    }

    if (form.name.length < 3) {
      setError("Name must be at least 3 characters");
      return false;
    }

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(form.email)) {
      setError("Invalid email format");
      return false;
    }

    if (form.password.length < 4) {
      setError("Password must be at least 4 characters");
      return false;
    }

    // Additional validation for freelancers
    if (form.role === 'freelancer') {
      if (!form.experience || !form.skills) {
        setError("Experience and Skills are required for freelancers");
        return false;
      }
      if (form.experience.length < 2) {
        setError("Experience must be at least 2 characters");
        return false;
      }
      if (form.skills.length < 2) {
        setError("Skills must be at least 2 characters");
        return false;
      }
    }

    setError("");
    return true;
  };

  const submit = async (e) => {
    e.preventDefault();
    if (!validate()) return;

    try {
      const res = await api.post(
        "/auth/register.php",
        form, // Includes experience and skills
        {
          headers: {
            "Content-Type": "application/json",
          },
        }
      );

      console.log("REGISTER RESPONSE:", res.data);

      if (res.data.success) {
        setSuccess(res.data.message);
        setError("");

        alert(res.data.message);

        setTimeout(() => {
          navigate("/login");
        }, 1000);
      } else {
        setError(res.data.message || "Registration failed");
        setSuccess("");
      }

    } catch (err) {
      console.error("REGISTER ERROR:", err);
      setError(err.response?.data?.message || "Registration failed");
      setSuccess("");
    }
  };

  return (
    <div className="signup-container">
      <nav className="signup-navbar">
        <img src={logo} alt="WOD Logo" className="signup-logo" />
        <div className="signup-nav-links">
          <Link to="/" className="signup-nav-link">Home</Link>
          <Link to="/login" className="signup-nav-link">Login</Link>
        </div>
      </nav>
      <section className="signup-section">
        <div className="signup-form-card">
          <h2>Sign Up for WOD</h2>
          <p>Create your account to start freelancing.</p>
          <form onSubmit={submit} className="signup-form">
            {error && <p style={{ color: "red" }}>{error}</p>}
            <div className="signup-input-group">
              <FaUser className="signup-icon" />
              <input type="text" placeholder="Full Name" value={form.name} onChange={e => setForm({ ...form, name: e.target.value })} required />
            </div>
            <div className="signup-input-group">
              <FaEnvelope className="signup-icon" />
              <input type="email" placeholder="Email" value={form.email} onChange={e => setForm({ ...form, email: e.target.value })} required />
            </div>
            <div className="signup-input-group">
              <FaLock className="signup-icon" />
              <input type="password" placeholder="Password" value={form.password} onChange={e => setForm({ ...form, password: e.target.value })} required />
            </div>
            <div className="signup-input-group">
              <FaUser className="signup-icon" />
              <select
                value={form.role}
                onChange={e => setForm({ ...form, role: e.target.value })}
                className="signup-select"
                required
              >
                <option value="">Select Role</option>
                <option value="client">Client</option>
                <option value="freelancer">Freelancer</option>
              </select>
            </div>
            {form.role === 'freelancer' && (
              <>
                <div className="signup-input-group">
                  <FaBriefcase className="signup-icon" />
                  <input type="text" placeholder="Experience (e.g., 2 years in web development)" value={form.experience} onChange={e => setForm({ ...form, experience: e.target.value })} required />
                </div>
                <div className="signup-input-group">
                  <FaTools className="signup-icon" />
                  <input type="text" placeholder="Skills (e.g., React, Node.js, Design)" value={form.skills} onChange={e => setForm({ ...form, skills: e.target.value })} required />
                </div>
              </>
            )}
            <button type="submit" className="signup-primary-button">Sign Up</button>
          </form>
          <p className="signup-link-text">Already have an account? <Link to="/login" className="signup-link">Login here</Link></p>
        </div>
      </section>
      <footer className="signup-footer">
        <p>&copy; 2026 WOD. All rights reserved. | <a href="/privacy" className="signup-footer-link">Privacy Policy</a></p>
      </footer>
    </div>
  );
};

export default Register;