import React, { useState, useEffect } from 'react';
import api from "../services/api";
import { FaRupeeSign, FaDollarSign } from "react-icons/fa";
import './FreelancerFindJobs.css'; // Import the separated CSS file

const JobFinding = () => {
  const [jobs, setJobs] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [budgetFilter, setBudgetFilter] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [expandedJobs, setExpandedJobs] = useState(new Set()); // Track which jobs have details expanded
  const [messages, setMessages] = useState({}); // Store messages per job

  const fetchJobs = async () => {
    setLoading(true);
    setError("");

    try {
      const res = await api.get("/users/get_jobs.php", {
        params: {
          search: searchTerm,
          budget: budgetFilter,
        },
      });

      if (res.data.status) {
        setJobs(res.data.jobs || []);
      } else {
        setJobs([]);
      }
    } catch (err) {
      console.error(err);
      setError("Failed to load jobs");
    }

    setLoading(false);
  };

  // Filter jobs based on search and budget
  const filteredJobs = jobs.filter(job => {
    const matchesSearch = job.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
      job.description.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesBudget = budgetFilter === '' || job.budgetValue === budgetFilter;
    return matchesSearch && matchesBudget;
  });

  const toggleDetails = (jobId) => {
    setExpandedJobs(prev => {
      const newSet = new Set(prev);
      if (newSet.has(jobId)) {
        newSet.delete(jobId);
      } else {
        newSet.add(jobId);
      }
      return newSet;
    });
  };

  useEffect(() => {
    fetchJobs();
  }, [searchTerm, budgetFilter]);

  const applyJob = async (jobId) => {
    if (!window.confirm("Apply for this job?")) return;
    const proposal = messages[jobId]?.trim();
    if (!proposal) {
      alert("Please enter a message.");
      return;
    }

    try {
      const res = await api.post("/users/apply_job.php", {
        job_id: jobId,
        proposal: proposal,
      });

      alert(res.data.message || "Applied successfully");
      setMessages(prev => ({ ...prev, [jobId]: "" }));
    } catch (err) {
      alert(
        err.response?.data?.message ||
        "Something went wrong while applying"
      );
    }
  };

  const handleMessageChange = (jobId, value) => {
    setMessages(prev => ({ ...prev, [jobId]: value }));
  };

  return (
    <div className="job-container">
      {/* Search and Filter Section */}
      <div className="job-search-section">
        <input
          type="text"
          className="job-search-bar"
          placeholder="Search for jobs..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
        />
        <div className="job-filter-group">
          <select
            className="job-budget-filter"
            value={budgetFilter}
            onChange={(e) => setBudgetFilter(e.target.value)}
          >
            <option value="">Filter by Budget</option>
            <option value="low">$0 - $50k</option>
            <option value="mid">$50k - $100k</option>
            <option value="high">$100k+</option>
          </select>
        </div>
      </div>

      {/* Loading and Error States */}
      {loading && <p className="job-loading">Loading jobs...</p>}
      {error && <p className="job-error">{error}</p>}

      {/* Jobs List */}
      <div className="job-list">
        {filteredJobs.map(job => (
          <div key={job.id} className="job-card">
            <h3 className="job-title">{job.title}</h3>
            <p className="job-description">{job.description}</p>
            {expandedJobs.has(job.id) && (
              <>
                <p className="job-full-details">{job.fullDetails}</p>
                {/* Message Section */}
                <div className="job-message-section">
                  <textarea
                    className="job-message-input"
                    placeholder="Type your message here..."
                    value={messages[job.id] || ""}
                    onChange={(e) => handleMessageChange(job.id, e.target.value)}
                    rows="3"
                  />
                  {/* <button
                    className="job-send-message-button"
                    onClick={() => sendMessage(job.id)}
                  >
                    Send Message
                  </button> */}
                </div>
              </>
            )}
            <p className="job-budget"><FaRupeeSign className="job-budget-icon" />{job.budget}</p>
            <div className="job-buttons">
              <button
                className="job-details-button"
                onClick={() => toggleDetails(job.id)}
              >
                {expandedJobs.has(job.id) ? 'Hide Details' : 'Show Details'}
              </button>
              <button
                className="job-apply-button"
                onClick={() => applyJob(job.id)}
              >
                Apply
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default JobFinding;