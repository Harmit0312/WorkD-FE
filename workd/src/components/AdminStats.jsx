import React, { useState, useEffect } from 'react';
import { FaUsers, FaUserTie, FaBriefcase, FaDollarSign, FaRupeeSign } from 'react-icons/fa';
import api from "../services/api";
import './AdminStats.css';

const AdminStats = () => {
  const [stats, setStats] = useState({
    totalClients: 0,
    totalFreelancers: 0,
    jobsPosted: 0,
    totalRevenue: 0
  });
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    fetchStats();
  }, []);

  const fetchStats = async () => {
    setLoading(true);
    setError("");
    try {
      const res = await api.get('/users/get_admin_stats.php');
      if (res.data.status) {
        setStats(res.data.stats || stats);
      } else {
        setError("Failed to load stats");
      }
    } catch (err) {
      console.error("Failed to fetch stats", err);
      setError("Failed to load stats");
    }
    setLoading(false);
  };

  return (
    <section className="admin-stats-section">
      <h1 className="admin-stats-title">Welcome, Admin</h1>
      {loading ? (
        <p className="admin-stats-loading">Loading stats...</p>
      ) : error ? (
        <p className="admin-stats-error">{error}</p>
      ) : (
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
            <FaRupeeSign size={40} color="rgb(2, 140, 140)" />
            <h3>Total Revenue</h3>
            <p className="admin-stats-number">₹{stats.totalRevenue.toLocaleString()}</p>
          </div>
        </div>
      )}
    </section>
  );
};

export default AdminStats;