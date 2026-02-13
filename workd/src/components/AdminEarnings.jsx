import React, { useEffect, useState } from "react";
import {
  FaSearch,
  FaChevronLeft,
  FaChevronRight,
  FaRupeeSign,
} from "react-icons/fa";
import api from "../services/api";
import "./AdminEarnings.css";

const AdminEarningsDashboard = () => {
  const [earnings, setEarnings] = useState([]);
  const [totalEarnings, setTotalEarnings] = useState(0);
  const [search, setSearch] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [loading, setLoading] = useState(false);

  /* ================= FETCH EARNINGS ================= */
  const fetchEarnings = async () => {
    setLoading(true);
    try {
      const res = await api.get("/users/get_earnings.php", {
        params: {
          page: currentPage,
          search,
        },
      });

      setEarnings(res.data.earnings || []);
      setTotalEarnings(res.data.total_earnings || 0);
      setTotalPages(res.data.total_pages || 1);
    } catch (err) {
      console.error("Failed to fetch earnings", err);
    }
    setLoading(false);
  };

  useEffect(() => {
    fetchEarnings();
  }, [currentPage, search]);

  useEffect(() => {
    setCurrentPage(1);
  }, [search]);

  useEffect(() => {
    if (currentPage > totalPages) {
      setCurrentPage(1);
    }
  }, [totalPages]);

  return (
    <section className="admin-earnings-section">
      <h1 className="admin-earnings-title">Earnings Dashboard</h1>

      {/* ================= SUMMARY ================= */}
      <div className="admin-earnings-summary">
        <div className="admin-earnings-summary-card">
          <h3>Total Earnings</h3>
          <p><FaRupeeSign /> {totalEarnings}</p>
        </div>
      </div>

      {/* ================= CONTROLS ================= */}
      <div className="admin-earnings-controls">
        <div className="admin-earnings-search">
          <FaSearch />
          <input
            type="text"
            placeholder="Search by job title, client, or freelancer"
            value={search}
            onChange={(e) => {
              setSearch(e.target.value);
              setCurrentPage(1);
            }}
          />
        </div>
      </div>

      {/* ================= EARNINGS ================= */}
      {loading ? (
        <p className="center">Loading...</p>
      ) : earnings.length === 0 ? (
        <p className="center">No earnings found</p>
      ) : (
        <div className="admin-earnings-cards">
          {earnings.map((earning) => (
            <div key={earning.id} className="admin-earnings-card">
              <div className="admin-earnings-card-header">
                <h3>{earning.job_title}</h3>
                <span className="admin-earnings-status">Paid</span>
              </div>

              <div className="admin-earnings-card-body">
                <p className="admin-earnings-client">Client: {earning.client_name}</p>
                <p className="admin-earnings-freelancer">Freelancer: {earning.freelancer_name}</p>
                <p className="admin-earnings-total-price">Total Price: <FaRupeeSign /> {earning.total_price}</p>
                <p className="admin-earnings-commission">Commission: <FaRupeeSign /> {earning.commission_price}</p>
                {/* <p className="admin-earnings-date">Paid on: {earning.paid_date}</p> */}
              </div>
            </div>
          ))}
        </div>
      )}

      {/* ================= PAGINATION ================= */}
      <div className="admin-earnings-pagination">
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

export default AdminEarningsDashboard;