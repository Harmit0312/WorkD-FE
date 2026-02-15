import React, { useState, useEffect } from 'react';
import { FaUser, FaLock, FaDollarSign, FaRupeeSign, FaUsers, FaSignOutAlt, FaEdit, FaTimes } from 'react-icons/fa';
import api from "../services/api";
import './ClientProfile.css';

const ClientProfile = () => {
  const [profile, setProfile] = useState({
    name: '',
    earnings: 0,
    freelancers: []
  });
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');
  const [modals, setModals] = useState({
    name: false,
    password: false
  });
  const [formData, setFormData] = useState({
    name: '',
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
      const res = await api.get('/users/get_client_profile.php');
      if (res.data.status) {
        setProfile(res.data.profile || profile);
        setFormData(prev => ({
          ...prev,
          name: res.data.profile.name || ''
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
      const res = await api.post('/users/update_client_name.php', { name: formData.name });
      alert(res.data.message || 'Name updated successfully');
      closeModal();
      fetchProfile();
    } catch (err) {
      setError(err.response?.data?.message || 'Failed to update name');
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
      const res = await api.post('/users/update_client_password.php', {
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
    <div className="client-profile-container">
      <h1 className="client-profile-title">My Profile</h1>
      {success && <p className="client-profile-success">{success}</p>}

      {loading ? (
        <p className="client-profile-loading">Loading profile...</p>
      ) : error ? (
        <p className="client-profile-error">{error}</p>
      ) : (
        <div className="client-profile-content">
          {/* Profile Info */}
          <div className="client-profile-info">
            <div className="client-profile-item">
              <div className="client-profile-item-content">
                <FaUser className="client-profile-icon" />
                <div>
                  <h3>Name</h3>
                  <p>{profile.name}</p>
                </div>
              </div>
              <button onClick={() => openModal('name')} className="client-profile-edit-button">
                <FaEdit /> Edit
              </button>
            </div>

            <div className="client-profile-item">
              <div className="client-profile-item-content">
                <FaLock className="client-profile-icon" />
                <div>
                  <h3>Password</h3>
                  <p>Change your password</p>
                </div>
              </div>
              <button onClick={() => openModal('password')} className="client-profile-edit-button">
                <FaEdit /> Edit
              </button>
            </div>

            <div className="client-profile-item">
              <div className="client-profile-item-content">
                <FaRupeeSign className="client-profile-icon" />
                <div>
                  <h3>Total Spent</h3>
                  <p>₹{profile.earnings.toLocaleString()}</p>
                </div>
              </div>
            </div>

            <div className="client-profile-item">
              <div className="client-profile-item-content">
                <FaSignOutAlt className="client-profile-icon" />
                <div>
                  <h3>Logout</h3>
                  <p>Sign out of your account</p>
                </div>
              </div>
              <button onClick={logout} className="client-profile-logout-button">
                <FaSignOutAlt /> Logout
              </button>
            </div>
          </div>

          {/* Freelancers Worked With */}
          <div className="client-profile-freelancers">
            <h2><FaUsers /> Freelancers Worked With</h2>
            <div className="client-profile-freelancers-list">
              {profile.freelancers.length > 0 ? (
                profile.freelancers.map((freelancer, index) => (
                  <div key={index} className="client-profile-freelancer-card">
                    <FaUser className="client-profile-freelancer-icon" />
                    <div>
                      <h4>{freelancer.name}</h4>
                      <p>{freelancer.email}</p>
                      <p>Skills: {freelancer.skills}</p>
                    </div>
                  </div>
                ))
              ) : (
                <p>No freelancers yet.</p>
              )}
            </div>
          </div>
        </div>
      )}

      {/* Modals */}
      {modals.name && (
        <div className="client-profile-modal">
          <div className="client-profile-modal-content">
            <h2>Update Name</h2>
            {error && <p className="client-profile-error">{error}</p>}
            <form onSubmit={updateName}>
              <input
                type="text"
                name="name"
                placeholder="New Name"
                value={formData.name}
                onChange={handleInputChange}
                required
              />
              <div className="client-profile-modal-buttons">
                <button type="submit" disabled={loading} className="client-profile-save-button">
                  {loading ? 'Saving...' : 'Save'}
                </button>
                <button type="button" onClick={closeModal} className="client-profile-cancel-button">
                  <FaTimes /> Cancel
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {modals.password && (
        <div className="client-profile-modal">
          <div className="client-profile-modal-content">
            <h2>Change Password</h2>
            {error && <p className="client-profile-error">{error}</p>}
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
              <div className="client-profile-modal-buttons">
                <button type="submit" disabled={loading} className="client-profile-save-button">
                  {loading ? 'Saving...' : 'Save'}
                </button>
                <button type="button" onClick={closeModal} className="client-profile-cancel-button">
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

export default ClientProfile;