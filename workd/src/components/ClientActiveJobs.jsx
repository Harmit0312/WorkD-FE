import React, { useEffect, useState } from "react";
import api from "../services/api";
import { FaUser, FaCheck, FaRupeeSign, FaCalendarAlt } from "react-icons/fa";
import "./ClientActiveJobs.css";

const ClientActiveJobs = () => {
  const [jobs, setJobs] = useState([]);
  const [loading, setLoading] = useState(true);

  const fetchJobs = async () => {
    setLoading(true);
    try {
      const res = await api.get("/users/get_my_active_jobs.php");
      setJobs(res.data.status ? res.data.jobs : []);
    } catch {
      setJobs([]);
    }
    setLoading(false);
  };

  useEffect(() => {
    fetchJobs();
  }, []);

  const payJob = (job) => {
    if (!window.confirm("Proceed to payment?")) return;

    const options = {
      key: "rzp_test_SIIg0FgQq7RMhD",
      amount: job.budget * 100, // UI ONLY
      currency: "INR",
      name: "WorkD",
      description: `Payment for ${job.title}`,

      handler: async () => {
        try {
          const res = await api.post("/users/pay_job.php", {
            job_id: job.id
          });
          alert(res.data.message);
          fetchJobs();
        } catch {
          alert("Payment failed");
        }
      }
    };

    new window.Razorpay(options).open();
  };

  const getStatusClass = (status) => {
    switch (status.toLowerCase()) {
      case 'open':
        return 'active-job-status-open';
      case 'assigned':
        return 'active-job-status-assigned';
      case 'completed':
        return 'active-job-status-completed';
      case 'paid':
        return 'active-job-status-paid';
      default:
        return 'active-job-status-pending';
    }
  };

  if (loading) return <p className="active-job-loading">Loading jobs...</p>;

  return (
    <div className="active-job-container">
      <h2 className="active-job-title">My Active Jobs</h2>

      {jobs.length === 0 && <p className="active-job-no-jobs">No jobs found.</p>}

      {jobs.map(job => (
        <div key={job.id} className="active-job-card">
          <div className="active-job-card-header">
            <h3 className="active-job-job-title">{job.title}</h3>
            <span className={`active-job-status ${getStatusClass(job.status)}`}>
              {job.status}
            </span>
          </div>
          
          <p className="active-job-description">{job.description}</p>
          
          <p className="active-job-budget">
            <FaRupeeSign className="active-job-budget-icon" /> 
            {job.budget}
          </p>
          
          <p className="active-job-deadline">
            <FaCalendarAlt className="active-job-deadline-icon" />
            Deadline: {job.deadline}
          </p>

          {job.assigned_freelancer_name && (
            <p className="active-job-freelancer">
              <FaUser className="active-job-freelancer-icon" />
              Assigned to: {job.assigned_freelancer_name}
            </p>
          )}

          <div className="active-job-buttons">
            {job.status.toLowerCase() === 'completed' && (
              <button 
                className="active-job-pay-button" 
                onClick={() => payJob(job)}
              >
                <FaCheck /> Pay
              </button>
            )}

            {job.status.toLowerCase() === 'paid' && (
              <button className="active-job-paid-button" disabled>
                <FaCheck /> Paid
              </button>
            )}
          </div>
        </div>
      ))}
    </div>
  );
};

export default ClientActiveJobs;