import { useEffect, useState } from 'react';
import API from '../api';

const UserProfile = () => {
  const [user, setUser] = useState(null);
  const [passwords, setPasswords] = useState({ currentPassword: '', newPassword: '' });
  const [message, setMessage] = useState('');

  useEffect(() => {
    const fetchProfile = async () => {
      try {
        const { data } = await API.get('/users/me');
        setUser(data);
      } catch (err) {
        alert("Failed to load profile");
      }
    };
    fetchProfile();
  }, []);

  const handleUpdateInfo = async (e) => {
    e.preventDefault();
    try {
      await API.put('/users/me', { fullName: user.fullName, email: user.email });
      setMessage("Profile updated successfully!");
    } catch (err) {
      setMessage("Failed to update profile.");
    }
  };

  const handleChangePassword = async (e) => {
    e.preventDefault();
    try {
      await API.put('/users/me/password', passwords);
      setMessage("Password changed successfully!");
      setPasswords({ currentPassword: '', newPassword: '' });
    } catch (err) {
      setMessage(err.response?.data?.error || "Failed to change password");
    }
  };

  if (!user) return <p>Loading...</p>;

  return (
    <div style={{ maxWidth: '500px', margin: 'auto', padding: '20px', border: '1px solid #ddd' }}>
      <h2>My Profile</h2>
      {message && <p style={{ color: 'blue' }}>{message}</p>}

      {/* Update Info Form */}
      <form onSubmit={handleUpdateInfo} style={{ marginBottom: '30px' }}>
        <h3>Update Info</h3>
        <div style={{ marginBottom: '10px' }}>
          <label>Full Name:</label>
          <input 
            type="text" 
            value={user.fullName} 
            onChange={(e) => setUser({...user, fullName: e.target.value})} 
            style={{ width: '100%', padding: '5px' }}
          />
        </div>
        <div style={{ marginBottom: '10px' }}>
          <label>Email:</label>
          <input 
            type="email" 
            value={user.email} 
            onChange={(e) => setUser({...user, email: e.target.value})} 
            style={{ width: '100%', padding: '5px' }}
          />
        </div>
        <button type="submit" style={{ padding: '8px 15px', background: 'blue', color: 'white', border: 'none' }}>Save Changes</button>
      </form>

      <hr />

      {/* Change Password Form */}
      <form onSubmit={handleChangePassword}>
        <h3>Change Password</h3>
        <div style={{ marginBottom: '10px' }}>
          <label>Current Password:</label>
          <input 
            type="password" 
            value={passwords.currentPassword} 
            onChange={(e) => setPasswords({...passwords, currentPassword: e.target.value})} 
            style={{ width: '100%', padding: '5px' }}
          />
        </div>
        <div style={{ marginBottom: '10px' }}>
          <label>New Password:</label>
          <input 
            type="password" 
            value={passwords.newPassword} 
            onChange={(e) => setPasswords({...passwords, newPassword: e.target.value})} 
            style={{ width: '100%', padding: '5px' }}
          />
        </div>
        <button type="submit" style={{ padding: '8px 15px', background: 'orange', color: 'white', border: 'none' }}>Update Password</button>
      </form>
    </div>
  );
};

export default UserProfile;