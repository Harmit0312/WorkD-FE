import React from 'react';
import { useState } from 'react';
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

  const [DefaultComponent, setDefaultComponent] = useState(true);
  const [showSettings, setShowSettings] = useState(false);
  const [showEarnings, setShowEarnings] = useState(false);
  const [showJobs, setShowJobs] = useState(false);
  const [showUsers, setShowUsers] = useState(false);

  const handleButtonClick = (temp,temp1,temp2,temp3,temp4) => {
    temp(true);
    temp1(false);
    temp2(false);
    temp3(false);
    temp4(false);
  }

  return (
    <div className="admin-container">
      <nav className="admin-navbar">
        <img src={logo} alt="WOD Logo" className="admin-logo" />
        <div className="admin-nav-links">
          <Link to="" className="admin-nav-link" onClick={() => handleButtonClick(setDefaultComponent, setShowSettings, setShowEarnings, setShowJobs, setShowUsers)}>
            <FaHome style={{ marginRight: '8px' }} />
            Home
          </Link>
          <Link to="" className="admin-nav-link" onClick={() => handleButtonClick(setShowUsers, setDefaultComponent, setShowSettings, setShowEarnings, setShowJobs)}>
            <FaUserFriends style={{ marginRight: '8px' }} />
            Manage Users
          </Link>
          <Link to="" className="admin-nav-link" onClick={() => handleButtonClick(setShowJobs, setDefaultComponent, setShowSettings, setShowEarnings, setShowUsers)}>
            <FaClipboardList style={{ marginRight: '8px' }} />
            Jobs
          </Link>
          <Link to="" className="admin-nav-link" onClick={() => handleButtonClick(setShowEarnings, setDefaultComponent, setShowSettings, setShowJobs, setShowUsers)}>
            <FaMoneyBillWave style={{ marginRight: '8px' }} />
            Earnings
          </Link>
          <Link to="" className="admin-nav-link" onClick={() => handleButtonClick(setShowSettings, setDefaultComponent, setShowEarnings, setShowJobs, setShowUsers)}>
            <FaCog style={{ marginRight: '8px' }} />
            Settings
          </Link>
        </div>
      </nav>

      {DefaultComponent && <AdminStats />}
      {showSettings && <AdminSettings />}
      {showEarnings && <AdminEarnings />}
      {showJobs && <AdminJobs />}
      {showUsers && <AdminManageUsers />}

      <footer className="admin-footer">
        <p>&copy; 2026 WOD. All rights reserved. | <a href="/privacy" className="admin-footer-link">Privacy Policy</a></p>
      </footer>
    </div>
  );
};

export default AdminDashboard;