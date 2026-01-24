import React from 'react';
import { FaUsers, FaUserTie, FaBriefcase, FaDollarSign } from 'react-icons/fa';
import './AdminStats.css';

const AdminStats = () => {
  // Dummy data for widgets
  const stats = {
    totalClients: 1250,
    totalFreelancers: 3400,
    jobsPosted: 890,
    totalRevenue: 125000
  };

  return (
    <section className="admin-stats-section">
      <h1 className="admin-stats-title">WOD Admin Dashboard</h1>
      <div className="admin-stats-grid">
        <div className="admin-stats-card">
          <FaUsers size={40} color="rgb(2, 140, 140)" />
          <h3>Total Clients</h3>
          <p className="admin-stats-number">{stats.totalClients}</p>
        </div>
        <div className="admin-stats-card">
          <FaUserTie size={40} color="rgb(2, 140, 140)" />
          <h3>Total Freelancers</h3>
          <p className="admin-stats-number">{stats.totalFreelancers}</p>
        </div>
        <div className="admin-stats-card">
          <FaBriefcase size={40} color="rgb(2, 140, 140)" />
          <h3>Jobs Posted</h3>
          <p className="admin-stats-number">{stats.jobsPosted}</p>
        </div>
        <div className="admin-stats-card">
          <FaDollarSign size={40} color="rgb(2, 140, 140)" />
          <h3>Total Revenue</h3>
          <p className="admin-stats-number">${stats.totalRevenue.toLocaleString()}</p>
        </div>
      </div>
    </section>
  );
};

export default AdminStats;