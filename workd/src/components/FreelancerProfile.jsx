import React, { useState, useEffect } from 'react';
import { FaUser, FaLock, FaTools, FaDollarSign, FaRupeeSign, FaUsers, FaSignOutAlt, FaEdit, FaTimes } from 'react-icons/fa';
import api from "../services/api";
import './FreelancerProfile.css';

const FreelancerProfile = () => {
  const [profile, setProfile] = useState({
    name: '',
    skills: '',
    earnings: 0,
    clients: []
  });
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');
  const [modals, setModals] = useState({
    name: false,
    skills: false,
    password: false
  });
  const [formData, setFormData] = useState({
    name: '',
    skills: '',
    currentPassword: '',
    newPassword: '',
    confirmPassword: ''
  });

  useEffect(() => {
    fetchProfile();
  }, []);

  const fetchProfile = async () => {
    setLoading(true);
    setError('');
    try {
      const res = await api.get('/users/get_freelancer_profile.php');
      if (res.data.status) {
        setProfile(res.data.profile || profile);
        setFormData(prev => ({
          ...prev,
          name: res.data.profile.name || '',
          skills: res.data.profile.skills || ''
        }));
      }
    } catch (err) {
      console.error('Failed to fetch profile', err);
      setError('Failed to load profile');
    }
    setLoading(false);
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const openModal = (modal) => {
    setModals(prev => ({ ...prev, [modal]: true }));
    setError('');
    setSuccess('');
  };

  const closeModal = () => {
    setModals({
      name: false,
      skills: false,
      password: false
    });
    setError('');
    setSuccess('');
  };

  const updateName = async (e) => {
    e.preventDefault();
    if (!formData.name.trim()) {
      setError('Name cannot be empty');
      return;
    }
    setLoading(true);
    setError('');
    setSuccess('');
    try {
      const res = await api.post('/users/update_freelancer_name.php', { name: formData.name });
      alert(res.data.message || 'Name updated successfully');
      closeModal();
      fetchProfile();
    } catch (err) {
      setError(err.response?.data?.message || 'Failed to update name');
    }
    setLoading(false);
  };

  const updateSkills = async (e) => {
    e.preventDefault();
    if (!formData.skills.trim()) {
      setError('Skills cannot be empty');
      return;
    }
    setLoading(true);
    setError('');
    setSuccess('');
    try {
      const res = await api.post('/users/update_freelancer_skills.php', { skills: formData.skills });
      alert(res.data.message || 'Skills updated successfully');
      closeModal();
      fetchProfile();
    } catch (err) {
      setError(err.response?.data?.message || 'Failed to update skills');
    }
    setLoading(false);
  };

  const updatePassword = async (e) => {
    e.preventDefault();
    if (!formData.currentPassword || !formData.newPassword || !formData.confirmPassword) {
      setError('All password fields are required');
      return;
    }
    if (formData.newPassword !== formData.confirmPassword) {
      setError('New passwords do not match');
      return;
    }
    setLoading(true);
    setError('');
    setSuccess('');
    try {
      const res = await api.post('/users/update_freelancer_password.php', {
        current_password: formData.currentPassword,
        new_password: formData.newPassword
      });
      alert(res.data.message || 'Password updated successfully');
      closeModal();
      setFormData(prev => ({ ...prev, currentPassword: '', newPassword: '', confirmPassword: '' }));
    } catch (err) {
      setError(err.response?.data?.message || 'Failed to update password');
    }
    setLoading(false);
  };

  const logout = async () => {
    if (!window.confirm('Are you sure you want to logout?')) return;
    try {
      await api.post('/users/logout.php');
      window.location.href = '/login';
    } catch (err) {
      console.error('Logout failed', err);
    }
  };

  return (
    <div className="freelancer-profile-container">
      <h1 className="freelancer-profile-title">My Profile</h1>
      {success && <p className="freelancer-profile-success">{success}</p>}

      {loading ? (
        <p className="freelancer-profile-loading">Loading profile...</p>
      ) : error ? (
        <p className="freelancer-profile-error">{error}</p>
      ) : (
        <div className="freelancer-profile-content">
          {/* Profile Info */}
          <div className="freelancer-profile-info">
            <div className="freelancer-profile-item">
              <div className="freelancer-profile-item-content">
                <FaUser className="freelancer-profile-icon" />
                <div>
                  <h3>Name</h3>
                  <p>{profile.name}</p>
                </div>
              </div>
              <button onClick={() => openModal('name')} className="freelancer-profile-edit-button">
                <FaEdit /> Edit
              </button>
            </div>

            <div className="freelancer-profile-item">
              <div className="freelancer-profile-item-content">
                <FaTools className="freelancer-profile-icon" />
                <div>
                  <h3>Skills</h3>
                  <p>{profile.skills}</p>
                </div>
              </div>
              <button onClick={() => openModal('skills')} className="freelancer-profile-edit-button">
                <FaEdit /> Edit
              </button>
            </div>

            <div className="freelancer-profile-item">
              <div className="freelancer-profile-item-content">
                <FaLock className="freelancer-profile-icon" />
                <div>
                  <h3>Password</h3>
                  <p>Change your password</p>
                </div>
              </div>
              <button onClick={() => openModal('password')} className="freelancer-profile-edit-button">
                <FaEdit /> Edit
              </button>
            </div>

            <div className="freelancer-profile-item">
              <div className="freelancer-profile-item-content">
                <FaRupeeSign className="freelancer-profile-icon" />
                <div>
                  <h3>Total Earnings</h3>
                  <p>{profile.earnings.toLocaleString()}</p>
                </div>
              </div>
            </div>

            <div className="freelancer-profile-item">
              <div className="freelancer-profile-item-content">
                <FaSignOutAlt className="freelancer-profile-icon" />
                <div>
                  <h3>Logout</h3>
                  <p>Sign out of your account</p>
                </div>
              </div>
              <button onClick={logout} className="freelancer-profile-logout-button">
                <FaSignOutAlt /> Logout
              </button>
            </div>
          </div>

          {/* Clients Worked With */}
          <div className="freelancer-profile-clients">
            <h2><FaUsers /> Clients Worked With</h2>
            <div className="freelancer-profile-clients-list">
              {profile.clients.length > 0 ? (
                profile.clients.map((client, index) => (
                  <div key={index} className="freelancer-profile-client-card">
                    <FaUser className="freelancer-profile-client-icon" />
                    <div>
                      <h4>{client.name}</h4>
                      <p>{client.email}</p>
                    </div>
                  </div>
                ))
              ) : (
                <p>No clients yet.</p>
              )}
            </div>
          </div>
        </div>
      )}

      {/* Modals */}
      {modals.name && (
        <div className="freelancer-profile-modal">
          <div className="freelancer-profile-modal-content">
            <h2>Update Name</h2>
            {error && <p className="freelancer-profile-error">{error}</p>}
            <form onSubmit={updateName}>
              <input
                type="text"
                name="name"
                placeholder="New Name"
                value={formData.name}
                onChange={handleInputChange}
                required
              />
              <div className="freelancer-profile-modal-buttons">
                <button type="submit" disabled={loading} className="freelancer-profile-save-button">
                  {loading ? 'Saving...' : 'Save'}
                </button>
                <button type="button" onClick={closeModal} className="freelancer-profile-cancel-button">
                  <FaTimes /> Cancel
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {modals.skills && (
        <div className="freelancer-profile-modal">
          <div className="freelancer-profile-modal-content">
            <h2>Update Skills</h2>
            {error && <p className="freelancer-profile-error">{error}</p>}
            <form onSubmit={updateSkills}>
              <textarea
                name="skills"
                placeholder="List your skills (e.g., React, Node.js)"
                value={formData.skills}
                onChange={handleInputChange}
                rows="4"
                required
              />
              <div className="freelancer-profile-modal-buttons">
                <button type="submit" disabled={loading} className="freelancer-profile-save-button">
                  {loading ? 'Saving...' : 'Save'}
                </button>
                <button type="button" onClick={closeModal} className="freelancer-profile-cancel-button">
                  <FaTimes /> Cancel
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {modals.password && (
        <div className="freelancer-profile-modal">
          <div className="freelancer-profile-modal-content">
            <h2>Change Password</h2>
            {error && <p className="freelancer-profile-error">{error}</p>}
            <form onSubmit={updatePassword}>
              <input
                type="password"
                name="currentPassword"
                placeholder="Current Password"
                value={formData.currentPassword}
                onChange={handleInputChange}
                required
              />
              <input
                type="password"
                name="newPassword"
                placeholder="New Password"
                value={formData.newPassword}
                onChange={handleInputChange}
                required
              />
              <input
                type="password"
                name="confirmPassword"
                placeholder="Confirm New Password"
                value={formData.confirmPassword}
                onChange={handleInputChange}
                required
              />
              <div className="freelancer-profile-modal-buttons">
                <button type="submit" disabled={loading} className="freelancer-profile-save-button">
                  {loading ? 'Saving...' : 'Save'}
                </button>
                <button type="button" onClick={closeModal} className="freelancer-profile-cancel-button">
                  <FaTimes /> Cancel
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};

export default FreelancerProfile;