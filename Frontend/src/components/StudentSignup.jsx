import React, { useState, useEffect } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import axios from 'axios';
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import './StudentLogin.css';

const StudentLogin = () => {
  const navigate = useNavigate();
  const [credentials, setCredentials] = useState({
    rollNumber: '',
    password: ''
  });
  const [error, setError] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [isAuthenticated, setIsAuthenticated] = useState(false);

  useEffect(() => {
    const currentUser = localStorage.getItem('currentUser');
    if (currentUser) {
      setIsAuthenticated(true);
      navigate('/dashboard');
    }
  }, [navigate]);

  const validateRollNumber = (rollNumber) => {
    const rollRegex = /^[L,l](1[7-9]|2[0-5])-?(?!0000)\d{4}$/;
    return rollRegex.test(rollNumber);
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setCredentials(prev => ({
      ...prev,
      [name]: value
    }));
    // Clear error when user starts typing
    if (error) setError('');
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    setIsLoading(true);

    try {

      if (!validateRollNumber(credentials.rollNumber)) {
        setError('Please enter a valid roll number');
        setIsLoading(false);
        toast.error('Invalid roll number format!');
        return;
      }

      // Validate password length
      if (credentials.password.length < 6) {
        setError('Password must be at least 6 characters long');
        setIsLoading(false);
        toast.error('Password must be at least 6 characters long!');
        return;
      }

      // Hit the API to check if the roll number and password are valid
      const { data } = await axios.get('http://localhost:3000/api/crud/user', {
        params: {
          filter_conditions_and: JSON.stringify(['=', '=']),
          filter_columns_and: JSON.stringify(['roll_no', 'password']),
          filter_values_and: JSON.stringify([credentials.rollNumber, credentials.password])
        }
      });

      const student = data?.payload?.[0]; // Assuming the response contains a "payload" array with student data

      if (!student) {
        setError('Invalid roll number or password');
        setIsLoading(false);
        toast.error('Invalid roll number or password!');
        return;
      }

      // Store the logged-in student's info in localStorage
      const studentInfo = {
        rollNumber: student.roll_no,
        name: student.name,
        email: student.email,
        department: student.department,
        lastLogin: new Date().toISOString()
      };

      localStorage.setItem('currentUser', JSON.stringify(studentInfo));

      // Update authentication state
      setIsAuthenticated(true);

      // Show success message
      toast.success('Login successful! Welcome back, ' + student.name);

      // Navigate to the dashboard
      navigate('/dashboard');
    } catch (error) {
      console.error('Login error:', error);
      setError('An error occurred during login. Please try again.');
      setIsLoading(false);
      toast.error('An error occurred during login. Please try again.');
    }
  };

  // If already authenticated, show loading state
  if (isAuthenticated) {
    return (
      <div className="student-login-container">
        <div className="student-login-card">
          <h1 className="login-title">Redirecting...</h1>
          <div className="loading-spinner">Loading...</div>
        </div>
      </div>
    );
  }

  return (
    <div className="student-login-container">
      <div className="student-login-card">
        <h1 className="login-title">STUDENT LOGIN</h1>
        
        <form onSubmit={handleSubmit} className="login-form">
          <div className="input-group">
            <input
              type="text"
              name="rollNumber"
              placeholder="Enter roll number"
              value={credentials.rollNumber}
              onChange={handleChange}
              className="login-input"
              required
              disabled={isLoading}
              autoComplete="off"
            />
          </div>

          <div className="input-group">
            <input
              type="password"
              name="password"
              placeholder="Enter password"
              value={credentials.password}
              onChange={handleChange}
              className="login-input"
              required
              disabled={isLoading}
              autoComplete="current-password"
            />
          </div>

          {error && <div className="error-message">{error}</div>}

          <button 
            type="submit" 
            className="login-button"
            disabled={isLoading}
          >
            {isLoading ? 'Logging in...' : 'Log in'}
          </button>

          <div className="signup-link">
            Don't have an account? <Link to="/signup/student">Sign up</Link>
          </div>
        </form>

        <div className="fries-icon">
          🍟
        </div>
      </div>
    </div>
  );
};

export default StudentLogin;
