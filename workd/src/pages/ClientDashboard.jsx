import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { FaPlus, FaEye, FaBriefcase, FaUser, FaHome } from 'react-icons/fa';
import ClientStats from '../components/ClientStats';
import ClientPostJobs from '../components/ClientPostJobs';
import ClientUpdateJob from '../components/ClientUpdateJob';
import ClientProposals from '../components/ClientProposals';
import ClientActiveJobs from '../components/ClientActiveJobs';
import ClientProfile from '../components/ClientProfile';
import './ClientDashboard.css';
import logo from '../assets/WOD-Logo.png';

const ClientDashboard = () => {
  // Refactored to a single state for cleaner logic
  const [activeTab, setActiveTab] = useState('home');

  // Renders the correct component based on the active tab
  const renderContent = () => {
    switch (activeTab) {
      case 'home': return <ClientStats />;
      case 'postJobs': return <ClientPostJobs />;
      case 'proposals': return <ClientProposals />;
      case 'activeJobs': return <ClientActiveJobs />;
      case 'updateJob': return <ClientUpdateJob />;
      case 'profile': return <ClientProfile />;
      default: return <ClientStats />;
    }
  };

  return (
    <div className="client-layout">
      {/* Sidebar Navigation */}
      <aside className="client-sidebar">
        <div className="client-logo-container">
          <img src={logo} alt="WOD Logo" className="client-logo" />
        </div>

        <nav className="client-nav-menu">
          <button 
            className={`client-nav-link ${activeTab === 'home' ? 'active' : ''}`} 
            onClick={() => setActiveTab('home')}
          >
            <FaHome className="nav-icon" /> Home
          </button>
          
          <button 
            className={`client-nav-link ${activeTab === 'postJobs' ? 'active' : ''}`} 
            onClick={() => setActiveTab('postJobs')}
          >
            <FaPlus className="nav-icon" /> Post Job
          </button>
          
          <button 
            className={`client-nav-link ${activeTab === 'proposals' ? 'active' : ''}`} 
            onClick={() => setActiveTab('proposals')}
          >
            <FaEye className="nav-icon" /> Proposals
          </button>
          
          <button 
            className={`client-nav-link ${activeTab === 'activeJobs' ? 'active' : ''}`} 
            onClick={() => setActiveTab('activeJobs')}
          >
            <FaBriefcase className="nav-icon" /> Active Jobs
          </button>

          <button 
            className={`client-nav-link ${activeTab === 'updateJob' ? 'active' : ''}`} 
            onClick={() => setActiveTab('updateJob')}
          >
            <FaBriefcase className="nav-icon" /> Update Job
          </button>
          
          <button 
            className={`client-nav-link ${activeTab === 'profile' ? 'active' : ''}`} 
            onClick={() => setActiveTab('profile')}
          >
            <FaUser className="nav-icon" /> Profile
          </button>
        </nav>
      </aside>

      {/* Main Content Area */}
      <main className="client-main">
        <header className="client-topbar">
          <h2>Client Workspace</h2>
        </header>

        <div className="client-content-wrapper">
          {renderContent()}
        </div>

        <footer className="client-footer">
          <p>&copy; 2026 WOD. All rights reserved. | <Link to="/privacy" className="client-footer-link">Privacy Policy</Link></p>
        </footer>
      </main>
    </div>
  );
};

export default ClientDashboard;