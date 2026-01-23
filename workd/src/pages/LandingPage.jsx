import React from 'react';
import PropTypes from 'prop-types';
import { useNavigate } from 'react-router-dom';
import { FaRocket, FaSignInAlt, FaCode, FaUsers, FaShieldAlt, FaArrowUp } from 'react-icons/fa';
import './LandingPage.css'; 
import logo from '../assets/WOD-Logo.png';


const LandingPage = ({ title = 'Freelance solutions by WOD', subtitle = 'Connect with top freelancers and bring your projects to life.' }) => {
  const navigate = useNavigate();

  const handleGetStarted = () => navigate('/register');
  const handleLogin = () => navigate('/login');
  const scrollToTop = () => window.scrollTo({ top: 0, behavior: 'smooth' });

  return (
    <div className="landing-container">
      <nav className="landing-navbar">
        <img src={logo} alt="WOD Logo" className="landing-logo" />
        <div className="landing-nav-links">
          <a href="#features" className="landing-nav-link">Features</a>
          <a href="#about" className="landing-nav-link">About</a>
        </div>
      </nav>
      <section className="landing-hero-section">
        <h1 className="landing-title">{title}</h1>
        <p className="landing-typing-subtitle">{subtitle}</p>
        <div className="landing-button-group">
          <button onClick={handleGetStarted} className="landing-primary-button">
            <FaRocket style={{ marginRight: '8px' }} />
            Get Started
          </button>
          <button onClick={handleLogin} className="landing-secondary-button">
            <FaSignInAlt style={{ marginRight: '8px' }} />
            Login
          </button>
        </div>
      </section>
      <section id="features" className="landing-features-section">
        <h2 className="landing-section-title">Why Choose WorkD?</h2>
        <div className="landing-features-grid">
          <div className="landing-feature-card">
            <FaCode size={40} color="#2a1b3d" />
            <h3>Expert Freelancers</h3>
            <p>Access a global network of skilled professionals.</p>
          </div>
          <div className="landing-feature-card">
            <FaUsers size={40} color="#0a1f3a" />
            <h3>Easy Collaboration</h3>
            <p>Seamless tools for project management and communication.</p>
          </div>
          <div className="landing-feature-card">
            <FaShieldAlt size={40} color="#2a1b3d" />
            <h3>Secure Payments</h3>
            <p>Safe transactions with escrow and milestone-based payouts.</p>
          </div>
        </div>
      </section>
      <footer className="landing-footer">
        <p>&copy; 2023 WOD. All rights reserved. | <a href="/privacy" className="landing-footer-link">Privacy Policy</a></p>
        <button onClick={scrollToTop} className="landing-scroll-to-top">
          <FaArrowUp />
        </button>
      </footer>
      <div className="landing-particles">
        <div className="landing-particle landing-particle-1"></div>
        <div className="landing-particle landing-particle-2"></div>
      </div>
    </div>
  );
};

LandingPage.propTypes = {
  title: PropTypes.string,
  subtitle: PropTypes.string,
};

export default LandingPage;