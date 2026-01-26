import React from 'react';
import { FaBriefcase, FaCheckCircle, FaClock, FaDollarSign, FaStar, FaUserTie } from 'react-icons/fa';
import './ClientStats.css';

const ClientStats = () => {
  // Dummy client name (replace with dynamic data)
  const clientName = "Jane Smith";

  // Dummy data for client stats
  const stats = {
    jobsPosted: 15,
    activeJobs: 5,
    completedJobs: 10,
    totalSpent: 25000
  };

  // Dummy recommendations
  const recommendations = [
    { id: 1, name: 'John Doe', skill: 'Web Developer', rating: 4.8, price: '$50/hr' },
    { id: 2, name: 'Jane Smith', skill: 'Graphic Designer', rating: 4.9, price: '$40/hr' },
    { id: 3, name: 'Mike Johnson', skill: 'SEO Expert', rating: 4.7, price: '$35/hr' }
  ];

  // Dummy recent activity
  const activities = [
    'Posted a new job: "Build a React App"',
    'Received 3 proposals for "Logo Design"',
    'Hired freelancer for "Content Writing"'
  ];

  return (
    <section className="client-stats-section">
      <h1 className="client-stats-title">Welcome Client - {clientName}</h1>
      
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
                <div className="client-progress-fill" style={{ width: `${(stats.activeJobs / stats.jobsPosted) * 100}%` }}></div>
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
            <FaDollarSign size={30} color="rgb(2, 140, 140)" />
            <div>
              <h4>Total Spent</h4>
              <p>${stats.totalSpent.toLocaleString()}</p>
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

      {/* Recommendations */}
      <div className="client-recommendations">
        <h2>Recommended Freelancers</h2>
        <div className="client-recommendations-grid">
          {recommendations.map((rec) => (
            <div key={rec.id} className="client-recommendation-card">
              <FaUserTie size={30} color="rgb(2, 140, 140)" />
              <h4>{rec.name}</h4>
              <p>{rec.skill}</p>
              <div className="client-rating">
                <FaStar color="#ffd700" />
                <span>{rec.rating}</span>
              </div>
              <p className="client-price">{rec.price}</p>
              <button className="client-hire-btn">Hire Now</button>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default ClientStats;