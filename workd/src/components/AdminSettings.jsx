import React, { useState, useEffect } from 'react';
import { FaUser, FaLock, FaPercent, FaTrash, FaPlus, FaSignOutAlt, FaEdit, FaTimes } from 'react-icons/fa';
import api from "../services/api";
import './AdminSettings.css';

const AdminSettings = () => {
  const [settings, setSettings] = useState({
    name: '',
    currentPassword: '',
    newPassword: '',
    confirmPassword: '',
    commission: '',
    deleteAdminEmail: '',
    newAdminName: '',
    newAdminEmail: '',
    newAdminPassword: ''
  });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');
  const [modals, setModals] = useState({
    name: false,
    password: false,
    commission: false,
    deleteAdmin: false,
    createAdmin: false
  });

  useEffect(() => {
    fetchCurrentSettings();
  }, []);

  const fetchCurrentSettings = async () => {
    try {
      const res = await api.get('/users/get_admin_settings.php');
      if (res.data.status) {
        setSettings(prev => ({
          ...prev,
          name: res.data.name || '',
          commission: res.data.commission || ''
        }));
      }
    } catch (err) {
      console.error('Failed to fetch settings', err);
    }
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setSettings(prev => ({ ...prev, [name]: value }));
  };

  const openModal = (modal) => {
    setModals(prev => ({ ...prev, [modal]: true }));
    setError('');
    setSuccess('');
  };

  const closeModal = () => {
    setModals({
      name: false,
      password: false,
      commission: false,
      deleteAdmin: false,
      createAdmin: false
    });
    setError('');
    // setSuccess('');
  };

  const updateName = async (e) => {
    e.preventDefault();
    if (!settings.name.trim()) {
      setError('Name cannot be empty');
      return;
    }
    setLoading(true);
    setError('');
    setSuccess('');
    try {
      const res = await api.post('/users/update_admin_name.php', { name: settings.name });
      setSuccess(res.data.message || 'Name updated successfully');
      closeModal();
      fetchCurrentSettings();
    } catch (err) {
      setError(err.response?.data?.message || 'Failed to update name');
    }
    setLoading(false);
  };

  const updatePassword = async (e) => {
    e.preventDefault();
    if (!settings.currentPassword || !settings.newPassword || !settings.confirmPassword) {
      setError('All password fields are required');
      return;
    }
    if (settings.newPassword !== settings.confirmPassword) {
      setError('New passwords do not match');
      return;
    }
    setLoading(true);
    setError('');
    setSuccess('');
    try {
      const res = await api.post('/users/update_admin_password.php', {
        current_password: settings.currentPassword,
        new_password: settings.newPassword
      });
      setSuccess(res.data.message || 'Password updated successfully');
      closeModal();
      setSettings(prev => ({ ...prev, currentPassword: '', newPassword: '', confirmPassword: '' }));
    } catch (err) {
      setError(err.response?.data?.message || 'Failed to update password');
    }
    setLoading(false);
  };

  const updateCommission = async (e) => {
    e.preventDefault();
    if (!settings.commission || isNaN(settings.commission) || settings.commission < 0 || settings.commission > 100) {
      setError('Commission must be a number between 0 and 100');
      return;
    }
    setLoading(true);
    setError('');
    setSuccess('');
    try {
      const res = await api.post('/users/update_admin_commission.php', { commission: settings.commission });
      setSuccess(res.data.message || 'Commission updated successfully');
      closeModal();
      fetchCurrentSettings();
    } catch (err) {
      setError(err.response?.data?.message || 'Failed to update commission');
    }
    setLoading(false);
  };

  const deleteAdmin = async (e) => {
    e.preventDefault();

    if (!settings.deleteAdminEmail) {
      setError('Admin email is required');
      return;
    }

    if (!window.confirm('Are you sure you want to delete this admin? This action cannot be undone.')) return;

    setLoading(true);
    setError('');
    setSuccess('');

    try {
      const res = await api.post('/users/delete_admin.php', {
        email: settings.deleteAdminEmail
      });

      if (res.data.status) {
        closeModal();
        alert(res.data.message);
        setSettings(prev => ({ ...prev, deleteAdminEmail: '' }));
      } else {
        setError(res.data.message);
      }

    } catch (err) {
      setError('Server error');
    }

    setLoading(false);
  };


  const createAdmin = async (e) => {
    e.preventDefault();

    if (!settings.newAdminName || !settings.newAdminEmail || !settings.newAdminPassword) {
      setError('All fields are required for creating admin');
      return;
    }

    setLoading(true);
    setError('');
    setSuccess('');

    try {
      const res = await api.post('/users/create_admin.php', {
        name: settings.newAdminName,
        email: settings.newAdminEmail,
        password: settings.newAdminPassword
      });

      if (res.data.status) {
        closeModal();   // ✅ close first
        alert(res.data.message);  // ✅ show success outside
        setSettings(prev => ({
          ...prev,
          newAdminName: '',
          newAdminEmail: '',
          newAdminPassword: ''
        }));
      } else {
        setError(res.data.message);
      }

    } catch (err) {
      setError('Server error');
    }

    setLoading(false);
  };



  const logout = async () => {
    if (!window.confirm('Are you sure you want to logout?')) return;
    try {
      await api.post('/users/logout.php');
      // Redirect to login or clear session
      window.location.href = '/login';
    } catch (err) {
      console.error('Logout failed', err);
    }
  };

  return (
    <div className="admin-settings-container">
      <h1 className="admin-settings-title">Admin Settings</h1>
      {success && <p className="admin-settings-success">{success}</p>}

      <div className="admin-settings-list">
        {/* Change Name */}
        <div className="admin-settings-item">
          <div className="admin-settings-item-content">
            <FaUser className="admin-settings-icon" />
            <div>
              <h3>Name</h3>
              <p>{settings.name || 'Not set'}</p>
            </div>
          </div>
          <button onClick={() => openModal('name')} className="admin-settings-edit-button">
            <FaEdit /> Edit
          </button>
        </div>

        {/* Change Password */}
        <div className="admin-settings-item">
          <div className="admin-settings-item-content">
            <FaLock className="admin-settings-icon" />
            <div>
              <h3>Password</h3>
              <p>Change your password</p>
            </div>
          </div>
          <button onClick={() => openModal('password')} className="admin-settings-edit-button">
            <FaEdit /> Edit
          </button>
        </div>

        {/* Platform Commission */}
        <div className="admin-settings-item">
          <div className="admin-settings-item-content">
            <FaPercent className="admin-settings-icon" />
            <div>
              <h3>Platform Commission</h3>
              <p>{settings.commission}%</p>
            </div>
          </div>
          <button onClick={() => openModal('commission')} className="admin-settings-edit-button">
            <FaEdit /> Edit
          </button>
        </div>

        {/* Delete Admin */}
        <div className="admin-settings-item">
          <div className="admin-settings-item-content">
            <FaTrash className="admin-settings-icon" />
            <div>
              <h3>Delete Admin</h3>
              <p>Remove another admin account</p>
            </div>
          </div>
          <button onClick={() => openModal('deleteAdmin')} className="admin-settings-edit-button">
            <FaEdit /> Edit
          </button>
        </div>

        {/* Create Admin */}
        <div className="admin-settings-item">
          <div className="admin-settings-item-content">
            <FaPlus className="admin-settings-icon" />
            <div>
              <h3>Create Admin</h3>
              <p>Add a new admin account</p>
            </div>
          </div>
          <button onClick={() => openModal('createAdmin')} className="admin-settings-edit-button">
            <FaEdit /> Edit
          </button>
        </div>

        {/* Logout */}
        <div className="admin-settings-item">
          <div className="admin-settings-item-content">
            <FaSignOutAlt className="admin-settings-icon" />
            <div>
              <h3>Logout</h3>
              <p>Sign out of your account</p>
            </div>
          </div>
          <button onClick={logout} className="admin-settings-logout-button">
            <FaSignOutAlt /> Logout
          </button>
        </div>
      </div>

      {/* Modals */}
      {modals.name && (
        <div className="admin-settings-modal">
          <div className="admin-settings-modal-content">
            <h2>Change Name</h2>
            {error && <p className="admin-settings-error">{error}</p>}
            <form onSubmit={updateName}>
              <input
                type="text"
                name="name"
                placeholder="New Name"
                value={settings.name}
                onChange={handleInputChange}
                required
              />
              <div className="admin-settings-modal-buttons">
                <button type="submit" disabled={loading} className="admin-settings-save-button">
                  {loading ? 'Saving...' : 'Save'}
                </button>
                <button type="button" onClick={closeModal} className="admin-settings-cancel-button">
                  <FaTimes /> Cancel
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {modals.password && (
        <div className="admin-settings-modal">
          <div className="admin-settings-modal-content">
            <h2>Change Password</h2>
            {error && <p className="admin-settings-error">{error}</p>}
            <form onSubmit={updatePassword}>
              <input
                type="password"
                name="currentPassword"
                placeholder="Current Password"
                value={settings.currentPassword}
                onChange={handleInputChange}
                required
              />
              <input
                type="password"
                name="newPassword"
                placeholder="New Password"
                value={settings.newPassword}
                onChange={handleInputChange}
                required
              />
              <input
                type="password"
                name="confirmPassword"
                placeholder="Confirm New Password"
                value={settings.confirmPassword}
                onChange={handleInputChange}
                required
              />
              <div className="admin-settings-modal-buttons">
                <button type="submit" disabled={loading} className="admin-settings-save-button">
                  {loading ? 'Saving...' : 'Save'}
                </button>
                <button type="button" onClick={closeModal} className="admin-settings-cancel-button">
                  <FaTimes /> Cancel
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {modals.commission && (
        <div className="admin-settings-modal">
          <div className="admin-settings-modal-content">
            <h2>Update Commission</h2>
            {error && <p className="admin-settings-error">{error}</p>}
            <form onSubmit={updateCommission}>
              <input
                type="number"
                name="commission"
                placeholder="Commission %"
                value={settings.commission}
                onChange={handleInputChange}
                min="0"
                max="100"
                required
              />
              <div className="admin-settings-modal-buttons">
                <button type="submit" disabled={loading} className="admin-settings-save-button">
                  {loading ? 'Saving...' : 'Save'}
                </button>
                <button type="button" onClick={closeModal} className="admin-settings-cancel-button">
                  <FaTimes /> Cancel
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {modals.deleteAdmin && (
        <div className="admin-settings-modal">
          <div className="admin-settings-modal-content">
            <h2>Delete Admin</h2>
            {error && <p className="admin-settings-error">{error}</p>}
            <form onSubmit={deleteAdmin}>
              <input
                type="email"
                name="deleteAdminEmail"
                placeholder="Admin Email to Delete"
                value={settings.deleteAdminEmail || ''}
                onChange={handleInputChange}
                required
              />

              <div className="admin-settings-modal-buttons">
                <button type="submit" disabled={loading} className="admin-settings-danger-button">
                  {loading ? 'Deleting...' : 'Delete'}
                </button>
                <button type="button" onClick={closeModal} className="admin-settings-cancel-button">
                  <FaTimes /> Cancel
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {modals.createAdmin && (
        <div className="admin-settings-modal">
          <div className="admin-settings-modal-content">
            <h2>Create Admin</h2>
            {error && <p className="admin-settings-error">{error}</p>}
            <form onSubmit={createAdmin}>
              <input
                type="text"
                name="newAdminName"
                placeholder="Name"
                value={settings.newAdminName}
                onChange={handleInputChange}
                required
              />
              <input
                type="email"
                name="newAdminEmail"
                placeholder="Email"
                value={settings.newAdminEmail}
                onChange={handleInputChange}
                required
              />
              <input
                type="password"
                name="newAdminPassword"
                placeholder="Password"
                value={settings.newAdminPassword}
                onChange={handleInputChange}
                required
              />
              <div className="admin-settings-modal-buttons">
                <button type="submit" disabled={loading} className="admin-settings-save-button">
                  {loading ? 'Creating...' : 'Create'}
                </button>
                <button type="button" onClick={closeModal} className="admin-settings-cancel-button">
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

export default AdminSettings;