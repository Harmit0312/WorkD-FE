import React from 'react';
import { FaHandshake, FaCheckCircle, FaDollarSign, FaAward, FaBriefcase, FaStar } from 'react-icons/fa';
import './FreelancerStats.css';

const FreelancerStats = () => {
  // Dummy freelancer name (replace with dynamic data)
  const freelancerName = "John Doe";

  // Dummy data for freelancer stats
  const stats = {
    activeContracts: 3,
    completedProjects: 25,
    earnings: 15000,
    skillsEndorsements: 42
  };

  // Dummy recommendations (jobs)
  const recommendations = [
    { id: 1, title: 'Build a React Website', client: 'TechCorp', budget: '$500', deadline: '2 weeks' },
    { id: 2, title: 'Logo Design for Startup', client: 'StartupXYZ', budget: '$200', deadline: '1 week' },
    { id: 3, title: 'SEO Optimization', client: 'BizBoost', budget: '$300', deadline: '3 weeks' }
  ];

  // Dummy recent activity
  const activities = [
    { time: '2 hours ago', action: 'Submitted proposal for "Mobile App Development"' },
    { time: '1 day ago', action: 'Completed project "E-commerce Site"' },
    { time: '3 days ago', action: 'Received endorsement for "JavaScript"' }
  ];

  return (
    <section className="freelancer-stats-section">
      <h1 className="freelancer-stats-title">Welcome Freelancer - {freelancerName}</h1>
      
      {/* Stats Cards */}
      <div className="freelancer-stats-cards">
        <div className="freelancer-stat-card">
          <FaHandshake size={40} color="rgb(2, 140, 140)" />
          <h3>Active Contracts</h3>
          <p className="freelancer-stat-number">{stats.activeContracts}</p>
        </div>
        <div className="freelancer-stat-card">
          <FaCheckCircle size={40} color="rgb(2, 140, 140)" />
          <h3>Completed Projects</h3>
          <p className="freelancer-stat-number">{stats.completedProjects}</p>
        </div>
        <div className="freelancer-stat-card">
          <FaDollarSign size={40} color="rgb(2, 140, 140)" />
          <h3>Earnings</h3>
          <p className="freelancer-stat-number">${stats.earnings.toLocaleString()}</p>
        </div>
        <div className="freelancer-stat-card">
          <FaAward size={40} color="rgb(2, 140, 140)" />
          <h3>Skills Endorsements</h3>
          <p className="freelancer-stat-number">{stats.skillsEndorsements}</p>
        </div>
      </div>

      {/* Recent Activity Timeline */}
      <div className="freelancer-activity">
        <h2>Recent Activity</h2>
        <div className="freelancer-timeline">
          {activities.map((activity, index) => (
            <div key={index} className="freelancer-timeline-item">
              <div className="freelancer-timeline-dot"></div>
              <div className="freelancer-timeline-content">
                <small>{activity.time}</small>
                <p>{activity.action}</p>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Job Recommendations */}
      <div className="freelancer-recommendations">
        <h2>Recommended Jobs</h2>
        <div className="freelancer-recommendations-grid">
          {recommendations.map((job) => (
            <div key={job.id} className="freelancer-recommendation-card">
              <FaBriefcase size={40} color="rgb(2, 140, 140)" />
              <h4>{job.title}</h4>
              <p>Client: {job.client}</p>
              <p>Budget: {job.budget}</p>
              <p>Deadline: {job.deadline}</p>
              <button className="freelancer-apply-btn">Apply Now</button>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default FreelancerStats;