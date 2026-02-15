import React, { useState, useEffect } from 'react';
import { FaHandshake, FaCheckCircle, FaRupeeSign, FaAward, FaBriefcase, FaStar, FaPaperPlane, FaTimes } from 'react-icons/fa';
import api from "../services/api";
import './FreelancerStats.css';

const FreelancerStats = () => {
  const [userName, setUserName] = useState("");
  const [stats, setStats] = useState({
    activeContracts: 0,
    completedProjects: 0,
    earnings: 0,
    skillsEndorsements: 0
  });
  const [recommendations, setRecommendations] = useState([]);
  const [activities, setActivities] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [messages, setMessages] = useState({}); // Store proposal messages per job
  const [applyingJobId, setApplyingJobId] = useState(null); // Track which job is being applied for

  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = async () => {
    setLoading(true);
    setError("");
    try {
      // Fetch stats and user name
      const statsRes = await api.get('/users/get_freelancer_stats.php');
      if (statsRes.data.status) {
        setStats(statsRes.data.stats || stats);
        setUserName(statsRes.data.user_name || "Freelancer");
      }

      // Fetch recommendations
      const recRes = await api.get('/users/get_recommendations.php');
      if (recRes.data.status) {
        setRecommendations(recRes.data.recommendations || []);
      }

      // Fetch activities
      const actRes = await api.get('/users/get_freelancer_activities.php');
      if (actRes.data.status) {
        setActivities(actRes.data.activities || []);
      }
    } catch (err) {
      console.error("Failed to fetch data", err);
      setError("Failed to load data");
    }
    setLoading(false);
  };

  const handleApplyClick = (jobId) => {
    setApplyingJobId(applyingJobId === jobId ? null : jobId); // Toggle the apply form
  };

  const handleMessageChange = (jobId, value) => {
    setMessages(prev => ({ ...prev, [jobId]: value }));
  };

  const applyJob = async (jobId) => {
    const proposal = messages[jobId]?.trim();
    if (!proposal) {
      alert("Please enter a proposal message.");
      return;
    }

    try {
      const res = await api.post("/users/apply_job.php", {
        job_id: jobId,
        proposal: proposal,
      });

      alert(res.data.message || "Applied successfully");
      setMessages(prev => ({ ...prev, [jobId]: "" })); // Clear the message
      setApplyingJobId(null); // Hide the form
    } catch (err) {
      alert(
        err.response?.data?.message ||
        "Something went wrong while applying"
      );
    }
  };

  const cancelApply = (jobId) => {
    setMessages(prev => ({ ...prev, [jobId]: "" })); // Clear the message
    setApplyingJobId(null); // Hide the form
  };

  return (
    <section className="freelancer-stats-section">
      <h1 className="freelancer-stats-title">Welcome {userName}</h1>

      {loading ? (
        <p className="freelancer-stats-loading">Loading...</p>
      ) : error ? (
        <p className="freelancer-stats-error">{error}</p>
      ) : (
        <>
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
              <FaRupeeSign size={40} color="rgb(2, 140, 140)" />
              <h3>Earnings</h3>
              <p className="freelancer-stat-number">₹{stats.earnings.toLocaleString()}</p>
            </div>
            {/* <div className="freelancer-stat-card">
              <FaAward size={40} color="rgb(2, 140, 140)" />
              <h3>Skills Endorsements</h3>
              <p className="freelancer-stat-number">{stats.skillsEndorsements}</p>
            </div> */}
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
                  {applyingJobId === job.id ? (
                    <div className="freelancer-apply-form">
                      <textarea
                        className="freelancer-proposal-input"
                        placeholder="Write your proposal here..."
                        value={messages[job.id] || ""}
                        onChange={(e) => handleMessageChange(job.id, e.target.value)}
                        rows="4"
                      />
                      <div className="freelancer-apply-buttons">
                        <button
                          className="freelancer-send-btn"
                          onClick={() => applyJob(job.id)}
                        >
                          <FaPaperPlane /> Send Proposal
                        </button>
                        <button
                          className="freelancer-cancel-btn"
                          onClick={() => cancelApply(job.id)}
                        >
                          <FaTimes /> Cancel
                        </button>
                      </div>
                    </div>
                  ) : (
                    <button className="freelancer-apply-btn" onClick={() => handleApplyClick(job.id)}>
                      Apply Now
                    </button>
                  )}
                </div>
              ))}
            </div>
          </div>
        </>
      )}
    </section>
  );
};

export default FreelancerStats;