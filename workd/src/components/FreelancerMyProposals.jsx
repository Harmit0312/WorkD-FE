import React, { useState, useEffect } from 'react';
import api from "../services/api";
import { FaEdit, FaTrash, FaCheck, FaTimes, FaUser } from 'react-icons/fa'; // Added FaUser for client icon
import './FreelancerMyProposals.css'; // Import the separated CSS file

const FreelancerProposals = () => {
  const [proposals, setProposals] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [editingId, setEditingId] = useState(null); // Track which proposal is being edited
  const [editMessage, setEditMessage] = useState(""); // Store edited message

  const fetchProposals = async () => {
    setLoading(true);
    setError("");

    try {
      const res = await api.get("/users/get_my_proposals.php"); // Assumes endpoint returns freelancer's proposals

      if (res.data.status) {
        setProposals(res.data.proposals || []);
      } else {
        setProposals([]);
      }
    } catch (err) {
      console.error(err);
      setError("Failed to load proposals");
    }

    setLoading(false);
  };

  useEffect(() => {
    fetchProposals();
  }, []);

  const startEdit = (proposalId, currentMessage) => {
    setEditingId(proposalId);
    setEditMessage(currentMessage);
  };

  const saveEdit = async (proposalId) => {
    if (!editMessage.trim()) {
      alert("Message cannot be empty.");
      return;
    }

    try {
      const res = await api.post("/users/update_proposal.php", {
        proposal_id: proposalId,
        message: editMessage,
      });

      alert(res.data.message || "Proposal updated successfully");
      setEditingId(null);
      fetchProposals(); // Refresh the list
    } catch (err) {
      alert(
        err.response?.data?.message ||
        "Something went wrong while updating the proposal"
      );
    }
  };

  const cancelEdit = () => {
    setEditingId(null);
    setEditMessage("");
  };

  const withdrawProposal = async (proposalId) => {
    if (!window.confirm("Withdraw this proposal? This action cannot be undone.")) return;

    try {
      const res = await api.post("/users/withdraw_proposal.php", {
        proposal_id: proposalId,
      });

      alert(res.data.message || "Proposal withdrawn successfully");
      fetchProposals(); // Refresh the list
    } catch (err) {
      alert(
        err.response?.data?.message ||
        "Something went wrong while withdrawing the proposal"
      );
    }
  };

  const getStatusClass = (status) => {
    switch (status.toLowerCase()) {
      case 'accepted':
        return 'freelancer-proposal-status-accepted';
      case 'rejected':
        return 'freelancer-proposal-status-rejected';
      default:
        return 'freelancer-proposal-status-pending';
    }
  };

  return (
    <div className="freelancer-proposal-container">
      <h2 className="freelancer-proposal-title">My Proposals</h2>
      {loading && <p className="freelancer-proposal-loading">Loading proposals...</p>}
      {error && <p className="freelancer-proposal-error">{error}</p>}
      <div className="freelancer-proposal-list">
        {proposals.map(proposal => (
          <div key={proposal.id} className="freelancer-proposal-card">
            <h3 className="freelancer-proposal-job-title">{proposal.job_title}</h3>
            <p className="freelancer-proposal-job-description">{proposal.job_description}</p>
            <p className="freelancer-proposal-client">
              <FaUser className="freelancer-proposal-icon" /> Posted by: {proposal.client_name}
            </p>
            <p className={`freelancer-proposal-status ${getStatusClass(proposal.status)}`}>{proposal.status}</p>
            {editingId === proposal.id ? (
              <div className="freelancer-proposal-edit-section">
                <textarea
                  className="freelancer-proposal-edit-input"
                  value={editMessage}
                  onChange={(e) => setEditMessage(e.target.value)}
                  rows="4"
                />
                <div className="freelancer-proposal-edit-buttons">
                  <button
                    className="freelancer-proposal-save-button"
                    onClick={() => saveEdit(proposal.id)}
                  >
                    <FaCheck /> Save
                  </button>
                  <button
                    className="freelancer-proposal-cancel-button"
                    onClick={cancelEdit}
                  >
                    <FaTimes /> Cancel
                  </button>
                </div>
              </div>
            ) : (
              <p className="freelancer-proposal-message">{proposal.message}</p>
            )}
            <div className="freelancer-proposal-buttons">
              {proposal.status.toLowerCase() === 'pending' && (
                <>
                  <button
                    className="freelancer-proposal-edit-button"
                    onClick={() => startEdit(proposal.id, proposal.message)}
                  >
                    <FaEdit /> Edit Message
                  </button>
                  <button
                    className="freelancer-proposal-withdraw-button"
                    onClick={() => withdrawProposal(proposal.id)}
                  >
                    <FaTrash /> Withdraw
                  </button>
                </>
              )}
            </div>
          </div>
        ))}
        {proposals.length === 0 && !loading && <p className="freelancer-proposal-no-proposals">No proposals found.</p>}
      </div>
    </div>
  );
};

export default FreelancerProposals;