import React, { useState, useEffect } from 'react';
import { FaBriefcase, FaCheckCircle, FaClock, FaDollarSign, FaRupeeSign } from 'react-icons/fa';
import api from "../services/api";
import './ClientStats.css';

const ClientStats = () => {
  const [clientName, setClientName] = useState("");
  const [stats, setStats] = useState({
    jobsPosted: 0,
    activeJobs: 0,
    completedJobs: 0,
    totalSpent: 0
  });
  const [activities, setActivities] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = async () => {
    setLoading(true);
    setError("");
    try {
      // Fetch stats and client name
      const statsRes = await api.get('/users/get_client_stats.php');
      if (statsRes.data.status) {
        setStats(statsRes.data.stats || stats);
        setClientName(statsRes.data.client_name || "Client");
      }

      // Fetch activities
      const actRes = await api.get('/users/get_client_activities.php');
      if (actRes.data.status) {
        setActivities(actRes.data.activities || []);
      }
    } catch (err) {
      console.error("Failed to fetch data", err);
      setError("Failed to load data");
    }
    setLoading(false);
  };

  return (
    <section className="client-stats-section">
      <h1 className="client-stats-title">Welcome {clientName}</h1>

      {loading ? (
        <p className="client-stats-loading">Loading...</p>
      ) : error ? (
        <p className="client-stats-error">{error}</p>
      ) : (
        <>
          {/* Stats Overview */}
          <div className="client-overview">
            <div className="client-stat-row">
              <div className="client-stat-item">
                <FaBriefcase size={30} color="rgb(2, 140, 140)" />
                <div>
                  <h4>Jobs Posted</h4>
                  <p>{stats.jobsPosted}</p>
                </div>
              </div>
              <div className="client-stat-item">
                <FaClock size={30} color="rgb(2, 140, 140)" />
                <div>
                  <h4>Active Jobs</h4>
                  <p>{stats.activeJobs}</p>
                  <div className="client-progress-bar">
                    <div className="client-progress-fill" style={{ width: `${stats.jobsPosted > 0 ? (stats.activeJobs / stats.jobsPosted) * 100 : 0}%` }}></div>
                  </div>
                </div>
              </div>
              <div className="client-stat-item">
                <FaCheckCircle size={30} color="rgb(2, 140, 140)" />
                <div>
                  <h4>Completed Jobs</h4>
                  <p>{stats.completedJobs}</p>
                </div>
              </div>
              <div className="client-stat-item">
                <FaRupeeSign size={30} color="rgb(2, 140, 140)" />
                <div>
                  <h4>Total Spent</h4>
                  <p>₹{stats.totalSpent.toLocaleString()}</p>
                </div>
              </div>
            </div>
          </div>

          {/* Recent Activity */}
          <div className="client-activity">
            <h2>Recent Activity</h2>
            <ul className="client-activity-list">
              {activities.map((activity, index) => (
                <li key={index} className="client-activity-item">
                  <FaClock style={{ marginRight: '10px', color: 'rgb(2, 140, 140)' }} />
                  {activity}
                </li>
              ))}
            </ul>
          </div>
        </>
      )}
    </section>
  );
};

export default ClientStats;