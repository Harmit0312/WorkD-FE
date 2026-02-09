import React, { useState, useEffect } from 'react';
import api from "../services/api";
import { FaEdit, FaCheck, FaTimes, FaRupeeSign } from 'react-icons/fa';
import './ClientUpdateJob.css'; // Import the separated CSS file

const ClientJobUpdate = () => {
  const [jobs, setJobs] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [editingId, setEditingId] = useState(null); // Track which job is being edited
  const [editForm, setEditForm] = useState({ title: '', description: '', budget: '' }); // Store edit form data

  const fetchJobs = async () => {
    setLoading(true);
    setError("");

    try {
      const res = await api.get("/users/get_my_jobs.php"); // Assumes endpoint returns client's active jobs

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

  const startEdit = (job) => {
    setEditingId(job.id);
    setEditForm({ title: job.title, description: job.description, budget: String(job.budget) });
  };

  const saveEdit = async (jobId) => {
    if (!editForm.title.trim() || !editForm.description.trim() || !editForm.budget.trim()) {
      alert("All fields are required.");
      return;
    }

    try {
      const res = await api.post("/users/update_job.php", {
        job_id: jobId,
        title: editForm.title,
        description: editForm.description,
        budget: editForm.budget,
      });

      alert(res.data.message || "Job updated successfully");
      setEditingId(null);
      fetchJobs(); // Refresh the list
    } catch (err) {
      alert(
        err.response?.data?.message ||
        "Something went wrong while updating the job"
      );
    }
  };

  const cancelEdit = () => {
    setEditingId(null);
    setEditForm({ title: '', description: '', budget: '' });
  };

  return (
    <div className="client-job-container">
      <h2 className="client-job-title">My Active Jobs</h2>
      {loading && <p className="client-job-loading">Loading jobs...</p>}
      {error && <p className="client-job-error">{error}</p>}
      <div className="client-job-list">
        {jobs.map(job => (
          <div key={job.id} className="client-job-card">
            {editingId === job.id ? (
              <div className="client-job-edit-form">
                <input
                  type="text"
                  className="client-job-edit-input"
                  placeholder="Job Title"
                  value={editForm.title}
                  onChange={(e) => setEditForm({ ...editForm, title: e.target.value })}
                />
                <textarea
                  className="client-job-edit-input"
                  placeholder="Job Description"
                  value={editForm.description}
                  onChange={(e) => setEditForm({ ...editForm, description: e.target.value })}
                  rows="4"
                />
                <input
                  type="text"
                  className="client-job-edit-input"
                  placeholder="Budget"
                  value={editForm.budget}
                  onChange={(e) => setEditForm({ ...editForm, budget: e.target.value })}
                />
                <div className="client-job-edit-buttons">
                  <button
                    className="client-job-save-button"
                    onClick={() => saveEdit(job.id)}
                  >
                    <FaCheck /> Save
                  </button>
                  <button
                    className="client-job-cancel-button"
                    onClick={cancelEdit}
                  >
                    <FaTimes /> Cancel
                  </button>
                </div>
              </div>
            ) : (
              <>
                <h3 className="client-job-job-title">{job.title}</h3>
                <p className="client-job-description">{job.description}</p>
                <p className="client-job-budget"><FaRupeeSign className="client-job-budget-icon" />{job.budget}</p>
                <div className="client-job-buttons">
                  <button
                    className="client-job-update-button"
                    onClick={() => startEdit(job)}
                  >
                    <FaEdit /> Update
                  </button>
                </div>
              </>
            )}
          </div>
        ))}
        {jobs.length === 0 && !loading && <p className="client-job-no-jobs">No active jobs found.</p>}
      </div>
    </div>
  );
};

export default ClientJobUpdate;