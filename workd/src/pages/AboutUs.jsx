import React from 'react';
import { FaUsers, FaRocket, FaHeart, FaGlobe, FaCode, FaUsersCog } from 'react-icons/fa';
import './AboutUs.css';

const AboutUs = () => {
  return (
    <div className="about-us-container">
      {/* Hero Section */}
      <section className="about-us-hero">
        <div className="about-us-hero-content">
          <h1 className="about-us-title">About WorkD</h1>
          <p className="about-us-subtitle">Connecting Talent with Opportunity</p>
          <p className="about-us-description">
            WorkD is a modern freelance marketplace that bridges the gap between skilled freelancers and businesses seeking top-tier talent. We believe in creating a fair, transparent, and efficient platform where both parties can thrive.
          </p>
        </div>
      </section>

      {/* Mission & Vision */}
      <section className="about-us-section">
        <div className="about-us-container-inner">
          <div className="about-us-card">
            <FaRocket className="about-us-icon" />
            <h3>Our Mission</h3>
            <p>
              To empower freelancers and businesses by providing a secure, user-friendly platform that facilitates meaningful connections and successful collaborations. We strive to make freelance work accessible to everyone, everywhere.
            </p>
          </div>
          <div className="about-us-card">
            <FaGlobe className="about-us-icon" />
            <h3>Our Vision</h3>
            <p>
              To become the world's most trusted freelance marketplace, recognized for our commitment to quality, security, and user satisfaction. We envision a future where work knows no boundaries.
            </p>
          </div>
        </div>
      </section>

      {/* Core Values */}
      <section className="about-us-section">
        <h2 className="about-us-section-title">Our Core Values</h2>
        <div className="about-us-container-inner">
          <div className="about-us-card">
            <FaUsers className="about-us-icon" />
            <h3>Community First</h3>
            <p>
              We build our platform around the needs of our users, fostering a supportive community where freelancers and clients can grow together.
            </p>
          </div>
          <div className="about-us-card">
            <FaCode className="about-us-icon" />
            <h3>Innovation</h3>
            <p>
              We continuously improve our platform with cutting-edge technology to ensure the best experience for all users.
            </p>
          </div>
          <div className="about-us-card">
            <FaHeart className="about-us-icon" />
            <h3>Transparency</h3>
            <p>
              We believe in open communication, fair pricing, and honest interactions between freelancers and clients.
            </p>
          </div>
          <div className="about-us-card">
            <FaUsersCog className="about-us-icon" />
            <h3>Security</h3>
            <p>
              Your data and payments are protected with industry-leading security measures to ensure peace of mind.
            </p>
          </div>
        </div>
      </section>

      {/* How It Works */}
      <section className="about-us-section">
        <h2 className="about-us-section-title">How It Works</h2>
        <div className="about-us-container-inner">
          <div className="about-us-step">
            <div className="about-us-step-number">1</div>
            <h3>Sign Up</h3>
            <p>Create your free account as a freelancer or client</p>
          </div>
          <div className="about-us-step">
            <div className="about-us-step-number">2</div>
            <h3>Connect</h3>
            <p>Freelancers showcase skills, clients post jobs</p>
          </div>
          <div className="about-us-step">
            <div className="about-us-step-number">3</div>
            <h3>Collaborate</h3>
            <p>Work together, track progress, and communicate</p>
          </div>
          <div className="about-us-step">
            <div className="about-us-step-number">4</div>
            <h3>Complete</h3>
            <p>Submit work, make payment, and leave reviews</p>
          </div>
        </div>
      </section>

      {/* Contact Section */}
      <section className="about-us-section">
        <h2 className="about-us-section-title">Get In Touch</h2>
        <div className="about-us-contact">
          <p>Have questions? We'd love to hear from you.</p>
          <p><strong>Email:</strong> support@wod.com</p>
          <p><strong>Phone:</strong> +91 87805 23694</p>
          <p><strong>Address:</strong> Pal, Surat, India</p>
        </div>
      </section>

      {/* Footer */}
      <footer className="about-us-footer">
        <p>&copy; 2026 WOD. All rights reserved.</p>
      </footer>
    </div>
  );
};

export default AboutUs;