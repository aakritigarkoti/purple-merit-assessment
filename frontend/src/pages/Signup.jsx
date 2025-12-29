import { useState } from 'react';
import API from '../api';
import { useNavigate, Link } from 'react-router-dom';

const Signup = () => {
  const [formData, setFormData] = useState({ fullName: '', email: '', password: '', confirmPassword: '' });
  const [error, setError] = useState('');
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (formData.password !== formData.confirmPassword) return setError("Passwords do not match");

    try {
      await API.post('/auth/signup', {
        fullName: formData.fullName,
        email: formData.email,
        password: formData.password
      });
      alert('Signup successful! Please login.');
      navigate('/login');
    } catch (err) {
      setError(err.response?.data?.error || 'Signup failed');
    }
  };

  return (
    <div className="container">
      <h2>Create Account</h2>
      <p style={{ color: '#9ca3af', marginBottom: '30px' }}>Get started with Purple Merit</p>

      {error && <div style={{ background: 'rgba(239, 68, 68, 0.1)', color: '#ef4444', padding: '10px', borderRadius: '8px', marginBottom: '20px', fontSize: '0.9rem' }}>{error}</div>}
      
      <form onSubmit={handleSubmit}>
        <div className="form-group">
          <label>Full Name</label>
          <input type="text" onChange={(e) => setFormData({...formData, fullName: e.target.value})} required placeholder="John Doe" />
        </div>
        <div className="form-group">
          <label>Email Address</label>
          <input type="email" onChange={(e) => setFormData({...formData, email: e.target.value})} required placeholder="name@company.com" />
        </div>
        <div className="form-group">
          <label>Password</label>
          <input type="password" onChange={(e) => setFormData({...formData, password: e.target.value})} required placeholder="••••••••" />
        </div>
        <div className="form-group">
          <label>Confirm Password</label>
          <input type="password" onChange={(e) => setFormData({...formData, confirmPassword: e.target.value})} required placeholder="••••••••" />
        </div>
        <button type="submit" className="btn">Create Account</button>
      </form>

      <p style={{ marginTop: '24px', fontSize: '0.9rem', color: '#9ca3af' }}>
        Already have an account? <Link to="/login">Sign in</Link>
      </p>
    </div>
  );
};

export default Signup;