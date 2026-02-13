import React, { useEffect, useState } from "react";
import {
  FaSearch,
  FaChevronLeft,
  FaChevronRight,
  FaUser,
  FaUserTie,
  FaTrash,
} from "react-icons/fa";
import api from "../services/api";
import "./AdminJobs.css";

const AdminJobsMonitoring = () => {
  const [jobs, setJobs] = useState([]);
  const [filter, setFilter] = useState("all");
  const [search, setSearch] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [loading, setLoading] = useState(false);

  /* ================= FETCH JOBS ================= */
  const fetchJobs = async () => {
    setLoading(true);
    try {
      const res = await api.get("/users/admin_get_jobs.php", {
        params: {
          page: currentPage,
          filter,
          search,
        },
      });

      setJobs(res.data.jobs || []);
      setTotalPages(res.data.total_pages || 1);
    } catch (err) {
      console.error("Failed to fetch jobs", err);
    }
    setLoading(false);
  };

  useEffect(() => {
    fetchJobs();
  }, [currentPage, filter, search]);

  useEffect(() => {
    setCurrentPage(1);
  }, [filter, search]);

  useEffect(() => {
    if (currentPage > totalPages) {
      setCurrentPage(1);
    }
  }, [totalPages]);

  const deletePaidJob = async (jobId) => {
    if (!window.confirm("Delete this paid job? This action cannot be undone.")) return;

    try {
      const res = await api.post("/users/admin_delete_paid_job.php", {
        job_id: jobId,
      });

      alert(res.data.message || "Paid job deleted successfully");
      fetchJobs(); // Refresh the list
    } catch (err) {
      alert(
        err.response?.data?.message ||
        "Something went wrong while deleting the paid job"
      );
    }
  };

  const getStatusClass = (status) => {
    switch (status.toLowerCase()) {
      case 'open':
        return 'admin-jobs-status-open';
      case 'assigned':
        return 'admin-jobs-status-assigned';
      case 'completed':
        return 'admin-jobs-status-completed';
      case 'paid':
        return 'admin-jobs-status-paid';
      default:
        return 'admin-jobs-status-pending';
    }
  };

  return (
    <section className="admin-jobs-section">
      <h1 className="admin-jobs-title">Jobs Monitoring</h1>

      {/* ================= CONTROLS ================= */}
      <div className="admin-jobs-controls">
        <div className="admin-jobs-search">
          <FaSearch />
          <input
            type="text"
            placeholder="Search by job title or description"
            value={search}
            onChange={(e) => {
              setSearch(e.target.value);
              setCurrentPage(1);
            }}
          />
        </div>

        <div className="admin-jobs-filters">
          <button
            className={filter === "all" ? "active" : ""}
            onClick={() => {
              setFilter("all");
              setCurrentPage(1);
            }}
          >
            All Jobs
          </button>

          <button
            className={filter === "client" ? "active" : ""}
            onClick={() => {
              setFilter("client");
              setCurrentPage(1);
            }}
          >
            <FaUser /> Client Jobs
          </button>

          <button
            className={filter === "freelancer" ? "active" : ""}
            onClick={() => {
              setFilter("freelancer");
              setCurrentPage(1);
            }}
          >
            <FaUserTie /> Freelancer Jobs
          </button>
        </div>
      </div>

      {/* ================= JOBS ================= */}
      {loading ? (
        <p className="center">Loading...</p>
      ) : jobs.length === 0 ? (
        <p className="center">No jobs found</p>
      ) : (
        <div className="admin-jobs-cards">
          {jobs.map((job) => (
            <div key={job.id} className="admin-jobs-card">
              <div className="admin-jobs-card-header">
                <h3>{job.title}</h3>
                <span className={`admin-jobs-status ${getStatusClass(job.status)}`}>
                  {job.status}
                </span>
              </div>

              <div className="admin-jobs-card-body">
                <p className="admin-jobs-description">{job.description}</p>
                <p className="admin-jobs-budget">Budget: {job.budget}</p>
                <p className="admin-jobs-deadline">Deadline: {job.deadline}</p>
                <p className="admin-jobs-posted-by">
                  <FaUser className="admin-jobs-icon" /> Posted by: {job.client_name}
                </p>
                {job.assigned_freelancer_name && (
                  <p className="admin-jobs-assigned-to">
                    <FaUserTie className="admin-jobs-icon" /> Assigned to: {job.assigned_freelancer_name}
                  </p>
                )}
                {job.status.toLowerCase() === 'paid' && (
                  <div className="admin-jobs-actions">
                    <button
                      className="admin-jobs-delete-button"
                      onClick={() => deletePaidJob(job.id)}
                    >
                      <FaTrash /> Delete
                    </button>
                  </div>
                )}
              </div>
            </div>
          ))}
        </div>
      )}

      {/* ================= PAGINATION ================= */}
      <div className="admin-jobs-pagination">
        <button
          disabled={currentPage === 1}
          onClick={() => setCurrentPage((p) => p - 1)}
        >
          <FaChevronLeft />
        </button>

        <span>
          Page {currentPage} of {totalPages}
        </span>

        <button
          disabled={currentPage === totalPages}
          onClick={() => setCurrentPage((p) => p + 1)}
        >
          <FaChevronRight />
        </button>
      </div>
    </section>
  );
};

export default AdminJobsMonitoring;