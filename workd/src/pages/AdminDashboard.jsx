import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { FaUserFriends, FaClipboardList, FaMoneyBillWave, FaCog, FaHome } from 'react-icons/fa';
import AdminStats from '../components/AdminStats';
import AdminSettings from '../components/AdminSettings';
import AdminManageUsers from '../components/AdminManageUsers';
import AdminJobs from '../components/AdminJobs';
import AdminEarnings from '../components/AdminEarnings';
import './AdminDashboard.css';
import logo from '../assets/WOD-Logo.png';

const AdminDashboard = () => {
  // Refactored to a single state for cleaner logic
  const [activeTab, setActiveTab] = useState('home');

  // Function to render the correct component based on the active tab
  const renderContent = () => {
    switch (activeTab) {
      case 'home': return <AdminStats />;
      case 'users': return <AdminManageUsers />;
      case 'jobs': return <AdminJobs />;
      case 'earnings': return <AdminEarnings />;
      case 'settings': return <AdminSettings />;
      default: return <AdminStats />;
    }
  };

  return (
    <div className="admin-layout">
      {/* Sidebar Navigation */}
      <aside className="admin-sidebar">
        <div className="admin-logo-container">
          <img src={logo} alt="WOD Logo" className="admin-logo" />
        </div>

        <nav className="admin-nav-menu">
          <button 
            className={`admin-nav-link ${activeTab === 'home' ? 'active' : ''}`} 
            onClick={() => setActiveTab('home')}
          >
            <FaHome className="nav-icon" /> Home
          </button>
          
          <button 
            className={`admin-nav-link ${activeTab === 'users' ? 'active' : ''}`} 
            onClick={() => setActiveTab('users')}
          >
            <FaUserFriends className="nav-icon" /> Manage Users
          </button>
          
          <button 
            className={`admin-nav-link ${activeTab === 'jobs' ? 'active' : ''}`} 
            onClick={() => setActiveTab('jobs')}
          >
            <FaClipboardList className="nav-icon" /> Jobs
          </button>
          
          <button 
            className={`admin-nav-link ${activeTab === 'earnings' ? 'active' : ''}`} 
            onClick={() => setActiveTab('earnings')}
          >
            <FaMoneyBillWave className="nav-icon" /> Earnings
          </button>
          
          <button 
            className={`admin-nav-link ${activeTab === 'settings' ? 'active' : ''}`} 
            onClick={() => setActiveTab('settings')}
          >
            <FaCog className="nav-icon" /> Settings
          </button>
        </nav>
      </aside>

      {/* Main Content Area */}
      <main className="admin-main">
        <header className="admin-topbar">
          <h2>Dashboard Overview</h2>
          {/* You can add a user profile or logout button here later */}
        </header>

        <div className="admin-content-wrapper">
          {renderContent()}
        </div>

        <footer className="admin-footer">
          <p>&copy; 2026 WOD. All rights reserved. | <Link to="/privacy" className="admin-footer-link">Privacy Policy</Link></p>
        </footer>
      </main>
    </div>
  );
};

export default AdminDashboard;