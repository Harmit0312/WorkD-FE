import React from 'react';
import logo from '../assets/WOD-Logo.png';
import PropTypes from 'prop-types';
import { useNavigate } from 'react-router-dom';
import { FaRocket, FaSignInAlt, FaCode, FaUsers, FaShieldAlt, FaArrowUp } from 'react-icons/fa';
import './LandingPage.css'; // Import the external CSS file

const LandingPage = ({ title = 'Freelance solutions by WOD', subtitle = 'Connect with top freelancers and bring your projects to life.' }) => {
  const navigate = useNavigate();

  const handleGetStarted = () => navigate('/register');
  const handleLogin = () => navigate('/login');
  const scrollToTop = () => window.scrollTo({ top: 0, behavior: 'smooth' });

  return (
    <div className="container">
      <nav className="navbar">
        <img src={logo} alt="WOD Logo" className="logo" />
        <div className="nav-links">
          <a href="#features" className="nav-link">Features</a>
          <a href="#about" className="nav-link">About</a>
        </div>
      </nav>
      <section className="hero-section">
        <h1 className="title">{title}</h1>
        <p className="typing-subtitle">{subtitle}</p>
        <div className="button-group">
          <button onClick={handleGetStarted} className="primary-button">
            <FaRocket style={{ marginRight: '8px' }} />
            Get Started
          </button>
          <button onClick={handleLogin} className="secondary-button">
            <FaSignInAlt style={{ marginRight: '8px' }} />
            Login
          </button>
        </div>
      </section>
      <section id="features" className="features-section">
        <h2 className="section-title">Why Choose WOD?</h2>
        <div className="features-grid">
          <div className="feature-card">
            <FaCode size={40} color="#2a1b3d" />
            <h3>Expert Freelancers</h3>
            <p>Access a global network of skilled professionals.</p>
          </div>
          <div className="feature-card">
            <FaUsers size={40} color="#0a1f3a" />
            <h3>Easy Collaboration</h3>
            <p>Seamless tools for project management and communication.</p>
          </div>
          <div className="feature-card">
            <FaShieldAlt size={40} color="#2a1b3d" />
            <h3>Secure Payments</h3>
            <p>Safe transactions with escrow and milestone-based payouts.</p>
          </div>
        </div>
      </section>
      <footer className="footer">
        <p>&copy; 2026 WorkD. All rights reserved. | <a href="/privacy" className="footer-link">Privacy Policy</a></p>
        <button onClick={scrollToTop} className="scroll-to-top">
          <FaArrowUp />
        </button>
      </footer>
      <div className="particles">
        <div className="particle particle-1"></div>
        <div className="particle particle-2"></div>
      </div>
    </div>
  );
};

LandingPage.propTypes = {
  title: PropTypes.string,
  subtitle: PropTypes.string,
};

export default LandingPage;