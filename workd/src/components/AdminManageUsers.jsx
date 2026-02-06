import React, { useEffect, useState } from "react";
import {
  FaTrash,
  FaUser,
  FaUserTie,
  FaEye,
  FaSearch,
  FaChevronLeft,
  FaChevronRight,
} from "react-icons/fa";
import api from "../services/api";
import "./AdminUserManagement.css";

const AdminUserManagement = () => {
  const [users, setUsers] = useState([]);
  const [filter, setFilter] = useState("all");
  const [search, setSearch] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [loading, setLoading] = useState(false);

  const [selectedUser, setSelectedUser] = useState(null);
  const [showModal, setShowModal] = useState(false);

  // const USERS_PER_PAGE = 4;

  /* ================= FETCH USERS ================= */
  const fetchUsers = async () => {
    setLoading(true);
    try {
      const res = await api.get("/admin/get_users.php", {
        params: {
          page: currentPage,
          // limit: USERS_PER_PAGE,
          role: filter,
          search,
        },
      });

      setUsers(res.data.users || []);
      setTotalPages(res.data.total_Pages || 1);
    } catch (err) {
      console.error("Failed to fetch users", err);
    }
    setLoading(false);
  };

  useEffect(() => {
    fetchUsers();
  }, [currentPage, filter, search]);

  useEffect(() => {
    setCurrentPage(1);
  }, [filter, search]);

  useEffect(() => {
    if (currentPage > totalPages) {
      setCurrentPage(1);
    }
  }, [totalPages]);

  /* ================= SOFT DELETE ================= */
  const softDelete = async (id) => {
    if (!window.confirm("Soft delete this user?")) return;

    try {
      await api.post("/admin/soft_delete.php", {
        ids: [id],
      });
      alert("User soft deleted");
      fetchUsers();

    } catch (err) {
      alert("Delete failed");
    }
  };

  /* ================= VIEW ACTIVITY ================= */
  const viewActivity = async (id) => {
    try {
      const res = await api.get("/admin/get_user_activity.php", {
        params: { id },
      });

      if (res.data.status) {
        setSelectedUser(res.data.user);
        setShowModal(true);
      }
    } catch (err) {
      console.error("Activity load failed", err);
    }
  };

  return (
    <section className="admin-um-section">
      <h1 className="admin-um-title">User Management</h1>

      {/* ================= CONTROLS ================= */}
      <div className="admin-um-controls">
        <div className="admin-um-search">
          <FaSearch />
          <input
            type="text"
            placeholder="Search by name or email"
            value={search}
            onChange={(e) => {
              setSearch(e.target.value);
              setCurrentPage(1);
            }}
          />
        </div>

        <div className="admin-um-filters">
          <button
            className={filter === "all" ? "active" : ""}
            onClick={() => {
              setFilter("all");
              setCurrentPage(1);
            }}
          >
            All
          </button>

          <button
            className={filter === "client" ? "active" : ""}
            onClick={() => {
              setFilter("client");
              setCurrentPage(1);
            }}
          >
            <FaUser /> Clients
          </button>

          <button
            className={filter === "freelancer" ? "active" : ""}
            onClick={() => {
              setFilter("freelancer");
              setCurrentPage(1);
            }}
          >
            <FaUserTie /> Freelancers
          </button>

          <button
            className={filter === "deleted" ? "active" : ""}
            onClick={() => {
              setFilter("deleted");
              setCurrentPage(1);
            }}
          >
            Deleted
          </button>
        </div>
      </div>

      {/* ================= USERS ================= */}
      {loading ? (
        <p className="center">Loading...</p>
      ) : users.length === 0 ? (
        <p className="center">No users found</p>
      ) : (
        <div className="admin-um-cards">
          {users.map((user) => (
            <div key={user.id} className="admin-um-card">
              <div className="admin-um-card-header">
                <img
                  src={user.avatar || "https://via.placeholder.com/50"}
                  alt={user.name}
                  className="admin-um-avatar"
                />

                <div>
                  <h3>{user.name}</h3>
                  <p>{user.email}</p>
                  <small>Joined: {user.join_date}</small>
                </div>

                <span className={`admin-um-role ${user.role}`}>
                  {user.role}
                </span>
              </div>

              <div className="admin-um-card-body">
                <span>Jobs: {user.jobs_posted}</span>
                <span>Proposals: {user.proposals_sent}</span>
                <span>Completed: {user.completed_orders}</span>
              </div>

              <div className="admin-um-card-actions">
                <button onClick={() => viewActivity(user.id)}>
                  <FaEye /> View
                </button>

                {!user.deleted_at && (
                  <button
                    className="danger"
                    onClick={() => softDelete(user.id)}
                  >
                    <FaTrash /> Delete
                  </button>
                )}
              </div>
            </div>
          ))}
        </div>
      )}

      {/* ================= PAGINATION ================= */}
      <div className="admin-um-pagination">
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

      {/* ================= ACTIVITY MODAL ================= */}
      {showModal && selectedUser && (
        <div className="admin-um-modal">
          <div className="admin-um-modal-content">
            <h2>{selectedUser.name} – Activity</h2>
            <p>Email: {selectedUser.email}</p>
            <p>Role: {selectedUser.role}</p>
            <p>Jobs Posted: {selectedUser.jobs_posted}</p>
            <p>Proposals Sent: {selectedUser.proposals_sent}</p>
            <p>Completed Orders: {selectedUser.completed_orders}</p>

            <button onClick={() => setShowModal(false)}>Close</button>
          </div>
        </div>
      )}
    </section>
  );
};

export default AdminUserManagement;
