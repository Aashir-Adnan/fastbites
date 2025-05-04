import React, { useState, useEffect } from 'react';
import { useNavigate, Link } from 'react-router-dom';
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

  // Check if user is already logged in
  useEffect(() => {
    const currentStudent = localStorage.getItem('currentStudent');
    if (currentStudent) {
      setIsAuthenticated(true);
      navigate('/dashboard');
    }
  }, [navigate]);

  const validateRollNumber = (rollNumber) => {
    // Basic roll number validation (adjust pattern as needed)
    const rollNumberPattern = /^[A-Za-z0-9]{6,10}$/;
    return rollNumberPattern.test(rollNumber);
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
      // Validate roll number format
      if (!validateRollNumber(credentials.rollNumber)) {
        setError('Please enter a valid roll number (6-10 alphanumeric characters)');
        setIsLoading(false);
        return;
      }

      // Validate password length
      if (credentials.password.length < 6) {
        setError('Password must be at least 6 characters long');
        setIsLoading(false);
        return;
      }

      // Get stored student data
      const storedStudents = JSON.parse(localStorage.getItem('students') || '[]');
      
      if (storedStudents.length === 0) {
        setError('No student accounts found. Please sign up first.');
        setIsLoading(false);
        return;
      }

      // Find the student with matching roll number
      const student = storedStudents.find(s => s.rollNumber === credentials.rollNumber);

      if (!student) {
        setError('Invalid roll number or password');
        setIsLoading(false);
        return;
      }

      // In a real application, you would hash the password and compare hashes
      if (student.password !== credentials.password) {
        setError('Invalid roll number or password');
        setIsLoading(false);
        return;
      }

      // Store the logged-in student's info in localStorage
      const studentInfo = {
        rollNumber: student.rollNumber,
        name: student.name,
        email: student.email,
        department: student.department,
        lastLogin: new Date().toISOString()
      };
      
      localStorage.setItem('currentStudent', JSON.stringify(studentInfo));

      // Update authentication state
      setIsAuthenticated(true);

      // Show success message
      alert('Login successful! Welcome back, ' + student.name);

      // Navigate to unified dashboard
      navigate('/dashboard');
    } catch (error) {
      console.error('Login error:', error);
      setError('An error occurred during login. Please try again.');
      setIsLoading(false);
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