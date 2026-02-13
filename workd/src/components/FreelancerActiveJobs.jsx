import React, { useState, useEffect } from 'react';
import api from "../services/api";
import { FaUser, FaTrash, FaCheck, FaRupeeSign } from 'react-icons/fa'; // Added FaCheck for complete button
import './FreelancerActiveJobs.css'; // Import the separated CSS file

const FreelancerActiveJobs = () => {
  const [jobs, setJobs] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const fetchJobs = async () => {
    setLoading(true);
    setError("");

    try {
      const res = await api.get("/users/get_my_assigned_jobs.php"); // Assumes endpoint returns freelancer's assigned jobs with client details and status

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

  useEffect(() => {
    fetchJobs();
  }, []);

  const completeJob = async (jobId) => {
    if (!window.confirm("Mark this job as completed?")) return;

    try {
      const res = await api.post("/users/complete_job.php", {
        job_id: jobId,
      });

      alert(res.data.message || "Job marked as completed");
      fetchJobs(); // Refresh the list
    } catch (err) {
      alert(
        err.response?.data?.message ||
        "Something went wrong while completing the job"
      );
    }
  };

  const deleteJob = async (jobId) => {
    if (!window.confirm("Delete this job? This action cannot be undone.")) return;

    try {
      const res = await api.post("/users/freelancer_delete_paid_job.php", {
        job_id: jobId,
      });

      alert(res.data.message || "Job deleted successfully");
      fetchJobs(); // Refresh the list
    } catch (err) {
      alert(
        err.response?.data?.message ||
        "Something went wrong while deleting the job"
      );
    }
  };

  const getStatusClass = (status) => {
    switch (status.toLowerCase()) {
      case 'assigned':
        return 'freelancer-active-job-status-assigned';
      case 'completed':
        return 'freelancer-active-job-status-completed';
      case 'paid':
        return 'freelancer-active-job-status-paid';
      case 'open':
        return 'freelancer-active-job-status-open';
      default:
        return 'freelancer-active-job-status-pending';
    }
  };

  return (
    <div className="freelancer-active-job-container">
      <h2 className="freelancer-active-job-title">My Active Jobs</h2>
      {loading && <p className="freelancer-active-job-loading">Loading jobs...</p>}
      {error && <p className="freelancer-active-job-error">{error}</p>}
      <div className="freelancer-active-job-list">
        {jobs.map(job => (
          <div key={job.id} className="freelancer-active-job-card">
            <h3 className="freelancer-active-job-job-title">{job.title}</h3>
            <p className="freelancer-active-job-description">{job.description}</p>
            <p className="freelancer-active-job-budget"><FaRupeeSign className="freelancer-active-job-budget-icon" />{job.budget}</p>
            <p className={`freelancer-active-job-status ${getStatusClass(job.status)}`}>{job.status}</p>
            <p className="freelancer-active-job-client">
              <FaUser className="freelancer-active-job-icon" /> Client: {job.client_name}
            </p>
            <div className="freelancer-active-job-buttons">
              {job.status.toLowerCase() === 'assigned' && (
                <button
                  className="freelancer-active-job-complete-button"
                  onClick={() => completeJob(job.id)}
                >
                  <FaCheck /> Complete
                </button>
              )}
              {job.status.toLowerCase() === 'paid' && (
                <button
                  className="freelancer-active-job-delete-button"
                  onClick={() => deleteJob(job.id)}
                >
                  <FaTrash /> Delete
                </button>
              )}
            </div>
          </div>
        ))}
        {jobs.length === 0 && !loading && <p className="freelancer-active-job-no-jobs">No active jobs found.</p>}
      </div>
    </div>
  );
};

export default FreelancerActiveJobs;