import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import './StaffSignup.css';

const StaffSignup = () => {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    password: '',
    confirmPassword: '',
    position: '',
    department: ''
  });
  const [error, setError] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prevState => ({
      ...prevState,
      [name]: value
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    setIsLoading(true);

    try {
      // Validate passwords match
      if (formData.password !== formData.confirmPassword) {
        setError('Passwords do not match');
        return;
      }

      // Validate password strength
      if (formData.password.length < 8) {
        setError('Password must be at least 8 characters long');
        return;
      }

      // Generate a unique staff ID (in a real app, this would come from the backend)
      const staffId = 'STAFF' + Math.random().toString(36).substr(2, 6).toUpperCase();

      // Create staff data object
      const staffData = {
        staffId,
        name: formData.name,
        email: formData.email,
        password: formData.password, // In a real app, this would be hashed
        position: formData.position,
        department: formData.department,
        createdAt: new Date().toISOString(),
        role: 'staff'
      };

      // Get existing staff data
      const existingStaff = JSON.parse(localStorage.getItem('currentUser') || '[]');

      // Check if email already exists
      if (existingStaff.some(staff => staff.email === formData.email)) {
        setError('Email already registered');
        return;
      }

      // Add new staff member
      existingStaff.push(staffData);
      localStorage.setItem('currentUser', JSON.stringify(existingStaff));

      // Show success message and redirect to login
      alert('Registration successful! Please login with your credentials.');
      navigate('/login/staff');
    } catch (error) {
      console.error('Signup error:', error);
      setError('An error occurred during signup. Please try again.');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="staff-signup-container">
      <div className="staff-signup-card">
        <h1 className="signup-title">STAFF SIGNUP</h1>
        
        <form onSubmit={handleSubmit} className="signup-form">
          <div className="input-group">
            <input
              type="text"
              name="name"
              placeholder="Full Name"
              value={formData.name}
              onChange={handleChange}
              className="signup-input"
              required
              disabled={isLoading}
            />
          </div>

          <div className="input-group">
            <input
              type="email"
              name="email"
              placeholder="Email Address"
              value={formData.email}
              onChange={handleChange}
              className="signup-input"
              required
              disabled={isLoading}
            />
          </div>

          <div className="input-group">
            <input
              type="text"
              name="position"
              placeholder="Position"
              value={formData.position}
              onChange={handleChange}
              className="signup-input"
              required
              disabled={isLoading}
            />
          </div>

          <div className="input-group">
            <input
              type="text"
              name="department"
              placeholder="Department"
              value={formData.department}
              onChange={handleChange}
              className="signup-input"
              required
              disabled={isLoading}
            />
          </div>

          <div className="input-group">
            <input
              type="password"
              name="password"
              placeholder="Password"
              value={formData.password}
              onChange={handleChange}
              className="signup-input"
              required
              disabled={isLoading}
            />
          </div>

          <div className="input-group">
            <input
              type="password"
              name="confirmPassword"
              placeholder="Confirm Password"
              value={formData.confirmPassword}
              onChange={handleChange}
              className="signup-input"
              required
              disabled={isLoading}
            />
          </div>

          {error && <div className="error-message">{error}</div>}

          <button 
            type="submit" 
            className="signup-button"
            disabled={isLoading}
          >
            {isLoading ? 'Signing up...' : 'Sign Up'}
          </button>
        </form>
        <div className="login-link">
          Already have an account? <Link to="/login/staff">Login here</Link>
        </div>
        <div className="fries-icon">🍟</div>
      </div>
    </div>
  );
};

export default StaffSignup; 