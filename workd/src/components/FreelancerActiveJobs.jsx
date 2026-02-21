import React, { useState, useEffect } from 'react';
import api from "../services/api";
import {
  FaUser,
  FaTrash,
  FaCheck,
  FaRupeeSign,
  FaUpload,
  FaFile,
  FaEdit
} from 'react-icons/fa';
import './FreelancerActiveJobs.css';

const FreelancerActiveJobs = () => {
  const [jobs, setJobs] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [uploadedJobs, setUploadedJobs] = useState({});

  // Load uploaded jobs from localStorage on mount
  useEffect(() => {
    const savedUploads = localStorage.getItem('freelancer_uploaded_jobs');
    if (savedUploads) {
      setUploadedJobs(JSON.parse(savedUploads));
    }
  }, []);

  const fetchJobs = async () => {
    setLoading(true);
    setError("");

    try {
      const res = await api.get("/users/get_my_assigned_jobs.php");

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

  // Save uploaded jobs to localStorage
  const saveUploadedJob = (jobId) => {
    const newUploadedJobs = { ...uploadedJobs, [jobId]: true };
    setUploadedJobs(newUploadedJobs);
    localStorage.setItem('freelancer_uploaded_jobs', JSON.stringify(newUploadedJobs));
  };

  // MULTIPLE FILE UPLOAD HANDLER (Initial Upload)
  const handleFileUpload = async (jobId, files) => {
    if (!files || files.length === 0) {
      alert("Please select at least one file.");
      return;
    }

    const formData = new FormData();
    formData.append("job_id", jobId);

    for (let i = 0; i < files.length; i++) {
      formData.append("files[]", files[i]);
    }

    try {
      const res = await api.post(
        "/users/upload_job_files.php",
        formData,
        {
          headers: {
            "Content-Type": "multipart/form-data",
          },
        }
      );

      if (res.data.status === true) {
        alert(res.data.message || "Files uploaded successfully");
        saveUploadedJob(jobId);
        fetchJobs();
      } else {
        alert(res.data.message || "Upload failed");
      }
    } catch (err) {
      alert(
        err.response?.data?.message ||
        "Something went wrong while uploading files"
      );
    }
  };

  // UPDATE FILE HANDLER (For jobs with uploaded files AND assigned status)
  const handleFileUpdate = async (jobId, files) => {
    if (!files || files.length === 0) {
      alert("Please select at least one file.");
      return;
    }

    const formData = new FormData();
    formData.append("job_id", jobId);

    for (let i = 0; i < files.length; i++) {
      formData.append("files[]", files[i]);
    }

    try {
      const res = await api.post(
        "/users/update_job_file.php",
        formData,
        {
          headers: {
            "Content-Type": "multipart/form-data",
          },
        }
      );

      if (res.data.status === true) {
        alert(res.data.message || "Files updated successfully");
        fetchJobs();
      } else {
        alert(res.data.message || "Update failed");
      }
    } catch (err) {
      alert(
        err.response?.data?.message ||
        "Something went wrong while updating files"
      );
    }
  };

  const completeJob = async (jobId) => {
    if (!window.confirm("Mark this job as completed?")) return;

    try {
      const res = await api.post("/users/complete_job.php", {
        job_id: jobId,
      });

      alert(res.data.message || "Job marked as completed");
      fetchJobs();
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
      fetchJobs();
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

      {loading && (
        <p className="freelancer-active-job-loading">Loading jobs...</p>
      )}
      {error && (
        <p className="freelancer-active-job-error">{error}</p>
      )}

      <div className="freelancer-active-job-list">
        {jobs.map(job => (
          <div key={job.id} className="freelancer-active-job-card">
            <h3 className="freelancer-active-job-job-title">{job.title}</h3>

            <p className="freelancer-active-job-description">
              {job.description}
            </p>

            <p className="freelancer-active-job-budget">
              <FaRupeeSign /> {job.budget}
            </p>

            <p className={`freelancer-active-job-status ${getStatusClass(job.status)}`}>
              {job.status}
            </p>

            <p className="freelancer-active-job-client">
              <FaUser /> Client: {job.client_name}
            </p>

            <p className="freelancer-active-job-deadline">
              Deadline: {job.deadline}
            </p>

            {/* UPLOAD SECTION (For assigned jobs) */}
            {job.status.toLowerCase() === 'assigned' && (
              <div className="freelancer-active-job-upload-section">
                {uploadedJobs[job.id] ? (
                  <div className="freelancer-active-job-uploaded">
                    <FaFile />
                    <span> Files Uploaded</span>
                  </div>
                ) : (
                  <label className="freelancer-active-job-upload-label">
                    <FaUpload className="freelancer-active-job-upload-icon" />
                    <span>Upload Files</span>
                    <input
                      type="file"
                      multiple
                      onChange={(e) =>
                        handleFileUpload(job.id, e.target.files)
                      }
                      style={{ display: 'none' }}
                    />
                  </label>
                )}
              </div>
            )}

            {/* UPDATE FILES SECTION (For uploaded files AND assigned status) */}
            {uploadedJobs[job.id] && job.status.toLowerCase() === 'assigned' && (
              <div className="freelancer-active-job-update-section">
                <label className="freelancer-active-job-update-label">
                  <FaEdit className="freelancer-active-job-update-icon" />
                  <span>Update Files</span>
                  <input
                    type="file"
                    multiple
                    onChange={(e) =>
                      handleFileUpdate(job.id, e.target.files)
                    }
                    style={{ display: 'none' }}
                  />
                </label>
              </div>
            )}

            {/* ACTION BUTTONS */}
            <div className="freelancer-active-job-buttons">
              {job.status.toLowerCase() === 'assigned' &&
                uploadedJobs[job.id] && (
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

        {jobs.length === 0 && !loading && (
          <p className="freelancer-active-job-no-jobs">
            No active jobs found.
          </p>
        )}
      </div>
    </div>
  );
};

export default FreelancerActiveJobs;