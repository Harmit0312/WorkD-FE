import React, { useEffect, useState } from "react";
import api from "../services/api";
import { FaUser, FaCheck, FaRupeeSign, FaCalendarAlt, FaEye, FaDownload, FaTrash, FaTimes, FaExternalLinkAlt } from "react-icons/fa";
import "./ClientActiveJobs.css";

const ClientActiveJobs = () => {
  const [jobs, setJobs] = useState([]);
  const [loading, setLoading] = useState(true);
  const [selectedJobFiles, setSelectedJobFiles] = useState(null);
  const [selectedJobStatus, setSelectedJobStatus] = useState(null);
  const [showFilesModal, setShowFilesModal] = useState(false);

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
      amount: job.budget * 100,
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

  const viewFiles = async (jobId, status) => {
    try {
      const res = await api.get("/users/get_job_files.php", {
        params: { job_id: jobId }
      });

      if (res.data.status) {
        setSelectedJobFiles(res.data.files || []);
        setSelectedJobStatus(status);
        setShowFilesModal(true);
      } else {
        alert(res.data.message || "No files found");
      }
    } catch (err) {
      alert("Failed to load files");
    }
  };

  // View file in browser (opens in new tab)
  const viewFile = (fileId) => {
  window.open(
    `http://localhost/WorkD-BE/users/client_view_file.php?file_id=${fileId}`,
    "_blank"
  );
};

  const downloadFile = (fileId) => {
  window.location.href =
    `http://localhost/WorkD-BE/users/download_job_file.php?file_id=${fileId}`;
};

  const deleteJob = async (jobId) => {
    if (!window.confirm("Delete this job? This action cannot be undone.")) return;

    try {
      const res = await api.post("/users/delete_paid_job.php", {
        job_id: jobId
      });

      alert(res.data.message || "Job deleted successfully");
      fetchJobs();
    } catch (err) {
      alert(
        err.response?.data?.message ||
        "Something went wrong while deleting the job"
      );
    }
  };

  const closeFilesModal = () => {
    setShowFilesModal(false);
    setSelectedJobFiles(null);
    setSelectedJobStatus(null);
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
            {/* View Files Button - For Completed Jobs */}
            {job.status.toLowerCase() === 'completed' && (
              <button 
                className="active-job-view-button" 
                onClick={() => viewFiles(job.id, job.status)}
              >
                <FaEye /> View Files
              </button>
            )}

            {/* Pay Button - For Completed Jobs */}
            {job.status.toLowerCase() === 'completed' && (
              <button 
                className="active-job-pay-button" 
                onClick={() => payJob(job)}
              >
                <FaCheck /> Pay
              </button>
            )}

            {/* View & Download Buttons - For Paid Jobs */}
            {job.status.toLowerCase() === 'paid' && (
              <button 
                className="active-job-view-button" 
                onClick={() => viewFiles(job.id, job.status)}
              >
                <FaEye /> View & Download
              </button>
            )}

            {/* Delete Button - For Paid Jobs */}
            {job.status.toLowerCase() === 'paid' && (
              <button 
                className="active-job-delete-button" 
                onClick={() => deleteJob(job.id)}
              >
                <FaTrash /> Delete
              </button>
            )}

            {/* Paid Badge - For Paid Jobs */}
            {job.status.toLowerCase() === 'paid' && (
              <button className="active-job-paid-button" disabled>
                <FaCheck /> Paid
              </button>
            )}
          </div>
        </div>
      ))}

      {/* Files Modal */}
      {showFilesModal && selectedJobFiles && (
        <div className="active-job-modal">
          <div className="active-job-modal-content">
            <div className="active-job-modal-header">
              <h3>
                {selectedJobStatus?.toLowerCase() === 'completed' 
                  ? 'View Files (Preview Only)' 
                  : 'View & Download Files'}
              </h3>
              <button className="active-job-modal-close" onClick={closeFilesModal}>
                <FaTimes />
              </button>
            </div>
            
            {/* Warning for completed jobs */}
            {selectedJobStatus?.toLowerCase() === 'completed' && (
              <div className="active-job-modal-warning">
                <p>💡 Files can only be previewed. Download available after payment.</p>
              </div>
            )}
            
            <div className="active-job-modal-body">
              {selectedJobFiles.length > 0 ? (
                <ul className="active-job-files-list">
                  {selectedJobFiles.map((file, index) => (
                    <li key={index} className="active-job-file-item">
                      <div className="active-job-file-info">
                        <span className="active-job-file-name">{file.file_name}</span>
                      </div>
                      
                      <div className="active-job-file-actions">
                        {/* View button - for both completed and paid jobs */}
                        <button 
                          className="active-job-file-view-btn"
                          onClick={() => viewFile(file.id)}
                        >
                          <FaEye /> View
                        </button>
                        
                        {/* Download button - only for paid jobs */}
                        {selectedJobStatus?.toLowerCase() === 'paid' && (
                          <button 
                            className="active-job-file-download-btn"
                            onClick={() => downloadFile(file.id, file.file_name)}
                          >
                            <FaDownload /> Download
                          </button>
                        )}
                      </div>
                    </li>
                  ))}
                </ul>
              ) : (
                <p className="active-job-no-files">No files available.</p>
              )}
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default ClientActiveJobs;