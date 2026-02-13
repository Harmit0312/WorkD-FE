import React, { useState, useEffect } from 'react';
import api from "../services/api";
import { FaUser, FaCheck, FaTrash, FaRupeeSign } from 'react-icons/fa';
import './ClientActiveJobs.css'; // Import the separated CSS file

const ClientActiveJobs = () => {
  const [jobs, setJobs] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const fetchJobs = async () => {
    setLoading(true);
    setError("");

    try {
      const res = await api.get("/users/get_my_active_jobs.php"); // Assumes endpoint returns client's active jobs with status and assigned freelancer

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

  const payJob = async (jobId) => {
    if (!window.confirm("Confirm payment for this job?")) return;

    try {
      const res = await api.post("/users/pay_job.php", {
        job_id: jobId,
      });

      alert(res.data.message || "Payment processed successfully");
      fetchJobs(); // Refresh the list
    } catch (err) {
      alert(
        err.response?.data?.message ||
        "Something went wrong while processing payment"
      );
    }
  };

  const deleteJob = async (jobId) => {
    if (!window.confirm("Delete this job? This action cannot be undone.")) return;

    try {
      const res = await api.post("/users/delete_paid_job.php", {
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

  const deleteOpenJob = async (jobId) => {
    if (!window.confirm("Delete this open job? This action cannot be undone.")) return;

    try {
      const res = await api.post("/users/delete_open_job.php", {
        job_id: jobId,
      });

      alert(res.data.message || "Open job deleted successfully");
      fetchJobs(); // Refresh the list
    } catch (err) {
      alert(
        err.response?.data?.message ||
        "Something went wrong while deleting the open job"
      );
    }
  };

  const getStatusClass = (status) => {
    switch (status.toLowerCase()) {
      case 'open':
        return 'active-job-status-open';
      case 'in_progress':
        return 'active-job-status-in-progress';
      case 'paid':
        return 'active-job-status-paid';
      case 'completed':
        return 'active-job-status-completed';
      default:
        return 'active-job-status-pending';
    }
  };

  return (
    <div className="active-job-container">
      <h2 className="active-job-title">My Active Jobs</h2>
      {loading && <p className="active-job-loading">Loading jobs...</p>}
      {error && <p className="active-job-error">{error}</p>}
      <div className="active-job-list">
        {jobs.map(job => (
          <div key={job.id} className="active-job-card">
            <h3 className="active-job-job-title">{job.title}</h3>
            <p className="active-job-description">{job.description}</p>
            <p className="active-job-budget"><FaRupeeSign className="active-job-budget-icon" />{job.budget}</p>
            <p className="active-job-deadline">Deadline: {job.deadline}</p>
            <p className={`active-job-status ${getStatusClass(job.status)}`}>{job.status}</p>
            {job.assigned_freelancer_name && (
              <p className="active-job-freelancer">
                <FaUser className="active-job-icon" /> Assigned to: {job.assigned_freelancer_name}
              </p>
            )}
            <div className="active-job-buttons">
              {job.status.toLowerCase() === 'open' && (
                <button
                  className="active-job-delete-button"
                  onClick={() => deleteOpenJob(job.id)}
                >
                  <FaTrash /> Delete
                </button>
              )}
              {job.status.toLowerCase() === 'completed' && (
                <button
                  className="active-job-pay-button"
                  onClick={() => payJob(job.id)}
                >
                  <FaCheck /> Pay
                </button>
              )}
              {job.status.toLowerCase() === 'paid' && (
                <button
                  className="active-job-delete-button"
                  onClick={() => deleteJob(job.id)}
                >
                  <FaTrash /> Delete
                </button>
              )}
            </div>
          </div>
        ))}
        {jobs.length === 0 && !loading && <p className="active-job-no-jobs">No active jobs found.</p>}
      </div>
    </div>
  );
};

export default ClientActiveJobs;