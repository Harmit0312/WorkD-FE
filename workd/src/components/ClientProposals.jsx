import React, { useState, useEffect } from 'react';
import api from "../services/api";
import { FaUser, FaEnvelope, FaCheck, FaRupeeSign } from "react-icons/fa";
import './ClientProposals.css'; // Import the separated CSS file

const ProposalManagement = () => {
  const [jobs, setJobs] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [expandedProposals, setExpandedProposals] = useState(new Set()); // Track expanded proposal messages

  const fetchProposals = async () => {
    setLoading(true);
    setError("");

    try {
      const res = await api.get("/users/get_proposals.php"); // Assumes endpoint returns jobs with proposals
      console.log("PROPOSALS RESPONSE 👉", res.data);
      if (res.data.status) {
        setJobs(res.data.jobs || []);
      } else {
        setJobs([]);
      }
    } catch (err) {
      console.error(err);
      setError("Failed to load proposals");
    }

    setLoading(false);
  };

  const toggleProposal = (jobId, freelancerId) => {
    const key = `${jobId}-${freelancerId}`;
    setExpandedProposals(prev => {
      const newSet = new Set(prev);
      if (newSet.has(key)) {
        newSet.delete(key);
      } else {
        newSet.add(key);
      }
      return newSet;
    });
  };

  useEffect(() => {
    fetchProposals();
  }, []);

  const assignJob = async (jobId, freelancerId) => {
    if (!window.confirm("Assign this job to the freelancer?")) return;

    try {
      const res = await api.post(
        "/users/assign_job.php",
        JSON.stringify({
          job_id: jobId,
          freelancer_id: freelancerId,
        }),
        {
          headers: {
            "Content-Type": "application/json",
          },
        }
      );

      alert(res.data.message || "Job assigned successfully");
      fetchProposals(); // Refresh the list
    } catch (err) {
      alert(
        err.response?.data?.message ||
        "Something went wrong while assigning the job"
      );
    }
  };

  return (
    <div className="proposal-container">
      {/* Jobs List with Proposals */}
      <div className="proposal-list">
        {loading && <p className="proposal-loading">Loading proposals...</p>}
        {error && <p className="proposal-error">{error}</p>}
        {jobs.map(job => (
          <div key={job.id} className="proposal-job-card">
            <h3 className="proposal-job-title">{job.title}</h3>
            <p className="proposal-job-description">{job.description}</p>
            <p className="proposal-job-budget"><FaRupeeSign className="proposal-budget-icon" />{job.budget}</p>
            <h4 className="proposal-freelancers-title">Freelancers Applied ({job.proposals?.length || 0})</h4>
            <div className="proposal-freelancers-list">
              {job.proposals?.map(proposal => (
                <div key={proposal.freelancer_id} className="proposal-freelancer-card">
                  <div className="proposal-freelancer-header">
                    <FaUser className="proposal-icon" />
                    <span className="proposal-freelancer-name">{proposal.freelancer_name}</span>
                  </div>
                  <p className="proposal-freelancer-details">
                    <strong>Skills:</strong> {proposal.skills || 'N/A'}<br />
                    <strong>Experience:</strong> {proposal.experience || 'N/A'}<br />
                    <strong>Email:</strong> {proposal.email || 'N/A'}
                  </p>
                  {expandedProposals.has(`${job.id}-${proposal.freelancer_id}`) && (
                    <p className="proposal-message">{proposal.message}</p>
                  )}
                  <div className="proposal-buttons">
                    <button
                      className="proposal-view-button"
                      onClick={() => toggleProposal(job.id, proposal.freelancer_id)}
                    >
                      {expandedProposals.has(`${job.id}-${proposal.freelancer_id}`) ? 'Hide Proposal' : 'View Proposal'}
                    </button>
                    {proposal.status === "pending" && (
                      <button
                        className="proposal-assign-button"
                        onClick={() => assignJob(job.id, proposal.freelancer_id)}
                      >
                        <FaCheck /> Assign
                      </button>
                    )}
                  </div>
                </div>
              )) || <p className="proposal-no-proposals">No proposals yet.</p>}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default ProposalManagement;