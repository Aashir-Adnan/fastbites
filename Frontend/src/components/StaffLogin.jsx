import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import './StaffLogin.css';

const StaffLogin = () => {
  const navigate = useNavigate();
  const [credentials, setCredentials] = useState({
    email: '',
    password: ''
  });
  const [error, setError] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setCredentials(prev => ({
      ...prev,
      [name]: value
    }));
    setError(''); // Clear error when user types
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    setIsLoading(true);

    try {
      // Get staff data from localStorage
      const staffData = JSON.parse(localStorage.getItem('staff')) || [];

      // Find staff member with matching email
      const staff = staffData.find(s => s.email === credentials.email);

      if (!staff) {
        setError('Invalid email or password');
        return;
      }

      // Check password
      if (staff.password !== credentials.password) {
        setError('Invalid email or password');
        return;
      }

      // Store logged-in staff info in localStorage
      localStorage.setItem('loggedInStaff', JSON.stringify({
        staffId: staff.staffId,
        name: staff.name,
        email: staff.email,
        position: staff.position,
        department: staff.department,
        role: 'staff'
      }));

      // Navigate to unified dashboard
      navigate('/dashboard');
    } catch (err) {
      console.error('Login error:', err);
      setError('An error occurred during login. Please try again.');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="login-container">
      <div className="login-card">
        <h1 className="login-title">STAFF LOGIN</h1>
        <form onSubmit={handleSubmit} className="login-form">
          <div className="input-group">
            <input
              type="email"
              name="email"
              value={credentials.email}
              onChange={handleChange}
              placeholder="Email"
              className="login-input"
              required
              disabled={isLoading}
            />
          </div>
          <div className="input-group">
            <input
              type="password"
              name="password"
              value={credentials.password}
              onChange={handleChange}
              placeholder="Password"
              className="login-input"
              required
              disabled={isLoading}
            />
          </div>
          {error && <div className="error-message">{error}</div>}
          <button 
            type="submit" 
            className="login-button"
            disabled={isLoading}
          >
            {isLoading ? 'Logging in...' : 'Login'}
          </button>
        </form>
        <div className="signup-link">
          Don't have an account? <a href="/signup/staff">Sign up here</a>
        </div>
        <div className="fries-icon">🍟</div>
      </div>
    </div>
  );
};

export default StaffLogin; 