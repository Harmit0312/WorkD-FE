import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { FaSearch, FaFileAlt, FaHandshake, FaUser, FaHome } from 'react-icons/fa';
import FreelancerStats from '../components/FreelancerStats';
import FreelancerFindJobs from '../components/FreelancerFindJobs';
import FreelancerMyProposals from '../components/FreelancerMyProposals';
import FreelancerActiveJobs from '../components/FreelancerActiveJobs';
import FreelancerProfile from '../components/FreelancerProfile';
import './FreelancerDashboard.css';
import logo from '../assets/WOD-Logo.png';

const FreelancerDashboard = () => {
  // Refactored to a single state for clean tab switching
  const [activeTab, setActiveTab] = useState('home');

  // Renders the correct component based on the active tab
  const renderContent = () => {
    switch (activeTab) {
      case 'home': return <FreelancerStats />;
      case 'findJobs': return <FreelancerFindJobs />;
      case 'myProposals': return <FreelancerMyProposals />;
      case 'activeJobs': return <FreelancerActiveJobs />;
      case 'profile': return <FreelancerProfile />;
      default: return <FreelancerStats />;
    }
  };

  return (
    <div className="freelancer-layout">
      {/* Sidebar Navigation */}
      <aside className="freelancer-sidebar">
        <div className="freelancer-logo-container">
          <img src={logo} alt="WOD Logo" className="freelancer-logo" />
        </div>

        <nav className="freelancer-nav-menu">
          <button 
            className={`freelancer-nav-link ${activeTab === 'home' ? 'active' : ''}`} 
            onClick={() => setActiveTab('home')}
          >
            <FaHome className="nav-icon" /> Home
          </button>
          
          <button 
            className={`freelancer-nav-link ${activeTab === 'findJobs' ? 'active' : ''}`} 
            onClick={() => setActiveTab('findJobs')}
          >
            <FaSearch className="nav-icon" /> Find Jobs
          </button>
          
          <button 
            className={`freelancer-nav-link ${activeTab === 'myProposals' ? 'active' : ''}`} 
            onClick={() => setActiveTab('myProposals')}
          >
            <FaFileAlt className="nav-icon" /> My Proposals
          </button>
          
          <button 
            className={`freelancer-nav-link ${activeTab === 'activeJobs' ? 'active' : ''}`} 
            onClick={() => setActiveTab('activeJobs')}
          >
            <FaHandshake className="nav-icon" /> Active Contracts
          </button>
          
          <button 
            className={`freelancer-nav-link ${activeTab === 'profile' ? 'active' : ''}`} 
            onClick={() => setActiveTab('profile')}
          >
            <FaUser className="nav-icon" /> Profile
          </button>
        </nav>
      </aside>

      {/* Main Content Area */}
      <main className="freelancer-main">
        <header className="freelancer-topbar">
          <h2>Freelancer Hub</h2>
        </header>

        <div className="freelancer-content-wrapper">
          {renderContent()}
        </div>

        <footer className="freelancer-footer">
          <p>&copy; 2026 WOD. All rights reserved. | <Link to="/privacy" className="freelancer-footer-link">Privacy Policy</Link></p>
        </footer>
      </main>
    </div>
  );
};

export default FreelancerDashboard;