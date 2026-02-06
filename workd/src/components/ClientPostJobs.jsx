import React, { useState } from 'react';
import { FaBriefcase, FaDollarSign, FaCalendarAlt, FaFileAlt, FaRupeeSign } from 'react-icons/fa';
import api from "../services/api";
import './ClientPostJobs.css';

const JobPosting = () => {
  const [form, setForm] = useState({
    title: '',
    description: '',
    budget: '',
    deadline: ''
  });
  const [error, setError] = useState('');

  const validate = () => {
    if (!form.title || !form.description || !form.budget || !form.deadline) {
      setError('All fields are required');
      return false;
    }
    if (form.title.length < 5) {
      setError('Job title must be at least 5 characters');
      return false;
    }
    if (form.description.length < 20) {
      setError('Description must be at least 20 characters');
      return false;
    }
    if (isNaN(form.budget) || form.budget <= 0) {
      setError('Budget must be a positive number');
      return false;
    }
    const deadlineDate = new Date(form.deadline);
    if (deadlineDate <= new Date()) {
      setError('Deadline must be in the future');
      return false;
    }
    setError('');
    return true;
  };

  const submit = async (e) => {
    e.preventDefault();
    if (!validate()) return;

    try {
      const res = await api.post("/users/post_job.php", form);

      console.log("API RESPONSE:", res.data);

      if (res.data.success === true) {
        alert(res.data.message);
        setForm({ title: "", description: "", budget: "", deadline: "" });
      } else {
        alert(res.data.message || "Something went wrong");
      }

    } catch (error) {
      console.error("POST JOB ERROR:", error);
      alert("Server error");
    }
  };



  return (
    <section className="job-post-section">
      <h1 className="job-post-title">Post a New Job</h1>
      <form onSubmit={submit} className="job-post-form">
        {error && <p className="job-post-error">{error}</p>}
        <div className="job-post-group">
          <FaBriefcase className="job-post-icon" />
          <input
            type="text"
            placeholder="Job Title"
            value={form.title}
            onChange={(e) => setForm({ ...form, title: e.target.value })}
            required
          />
        </div>
        <div className="job-post-group">
          <FaFileAlt className="job-post-icon" />
          <textarea
            placeholder="Job Description"
            value={form.description}
            onChange={(e) => setForm({ ...form, description: e.target.value })}
            rows="5"
            required
          />
        </div>
        <div className="job-post-group">
          <FaRupeeSign className="job-post-icon" />
          <input
            type="number"
            placeholder="Budget (Rupees)"
            value={form.budget}
            onChange={(e) => setForm({ ...form, budget: e.target.value })}
            required
          />
        </div>
        <div className="job-post-group">
          <FaCalendarAlt className="job-post-icon" />
          <input
            type="date"
            value={form.deadline}
            onChange={(e) => setForm({ ...form, deadline: e.target.value })}
            required
          />
        </div>
        <button type="submit" className="job-post-btn">Post Job</button>
      </form>
    </section>
  );
};

export default JobPosting;