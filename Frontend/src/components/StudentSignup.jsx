import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import axios from 'axios';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';


import './StudentSignup.css';

const StudentSignup = () => {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    id : 0,
    rollNumber: '',
    name: '',
    email: '',
    password: '',
    confirmPassword: '',
    department: ''
  });
  const [errors, setErrors] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  const handleChange = (e) => {
    const { name, value } = e.target;
  
    let error = '';
  
    if (name === "rollNumber") {
      const rollRegex = /^[L,l](1[7-9]|2[0-5])-?(?!0000)\d{4}$/;
      if (!rollRegex.test(value)) {
        error = "Roll No. Must Be In The Format LXX-YYYY";
      }
    }
  
    if (name === "name") {
      if (value.trim().length < 3) {
        error = "Name must be at least 3 characters long";
      }
    }
  
    if (name === "email") {
      const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
      if (!emailRegex.test(value)) {
        error = "Invalid email format";
      }
    }
  
    if (name === "password") {
      if (value.length < 6) {
        error = "Password must be at least 6 characters";
      }
    }
  
    if (name === "confirmPassword") {
      if (value !== formData.password) {
        error = "Passwords do not match";
      }
    }
  
    if (name === "department") {
      if (value.trim() === '') {
        error = "Department is required";
      }
    }
  
    // Update form data and derived email
    setFormData((prevData) => {
      const updated = { ...prevData, [name]: value };
      if (name === "rollNumber" && /^[L,l](1[7-9]|2[0-5])-?(?!0000)\d{4}$/.test(value)) {
        updated.email = value.toLowerCase().replace("-", "") + "@lhr.nu.edu.pk";
      }
      return updated;
    });
  
    // Set error
    setErrors((prevErrors) => ({
      ...prevErrors,
      [name]: error,
      ...(name === "password" || name === "confirmPassword"
        ? {
            confirmPassword:
              name === "password" && formData.confirmPassword && value !== formData.confirmPassword
                ? "Passwords do not match"
                : "",
          }
        : {}),
    }));
  };
  const handleSubmit = async (e) => {
    e.preventDefault();
  
    if (Object.values(errors).some(e => e) || Object.values(formData).some(v => v === '')) {
      toast.error("Please fix the errors before submitting.");
      return;
    }
  
    setIsLoading(true);
    try {
      const { data: existingData } = await axios.get('http://localhost:3000/api/crud/user');
      const existingUsers = existingData?.payload || [];
  
      if (existingUsers.some(user => user.roll_no === formData.rollNumber)) {
        setErrors(prev => ({ ...prev, rollNumber: "Roll number already registered" }));
        return;
      }
  
      if (existingUsers.some(user => user.email === formData.email)) {
        setErrors(prev => ({ ...prev, email: "Email already registered" }));
        return;
      }
  
      const postBody = {
        entry: [{
          name: formData.name,
          roll_no: formData.rollNumber.toLowerCase().replace("-", ""),
          email: formData.email,
          password: formData.password,
          department: formData.department
        }],
        table: "user"
      };
  
      const { data: postResponse } = await axios.post('http://localhost:3000/api/crud/user', postBody);
  
      const insertId = postResponse?.payload?.insertId;
      if (insertId) {
        toast.success(`Registration successful!`);
        setTimeout(() => navigate("/login/student"), 3000);
      } else {
        throw new Error("Insert failed.");
      }
  
    } catch (err) {
      console.error(err);
      toast.error("An error occurred during registration. Please try again.");
    } finally {
      setIsLoading(false);
    }
  };
  
  
  

  return (
    
    <div className="student-signup-container">
      <ToastContainer position="top-right" autoClose={3000} />
      <div className="student-signup-card">
        <h1 className="signup-title">STUDENT SIGNUP</h1>
        <form onSubmit={handleSubmit} className="signup-form">
          
          <div className="input-group">
            <input
              type="text"
              name="rollNumber"
              value={formData.rollNumber}
              onChange={handleChange}
              placeholder="Roll Number"
              className="signup-input"
              required
              disabled={isLoading}
            />
            {errors.rollNumber && (
              <div className="field-error">
                <span className="error-icon">❗</span> {errors.rollNumber}
              </div>
            )}
          </div>
  
          <div className="input-group">
            <input
              type="text"
              name="name"
              value={formData.name}
              onChange={handleChange}
              placeholder="Full Name"
              className="signup-input"
              required
              disabled={isLoading}
            />
            {errors.name && (
              <div className="field-error">
                <span className="error-icon">❗</span> {errors.name}
              </div>
            )}
          </div>
  
          <div className="input-group">
            <input
              type="email"
              name="email"
              value={formData.email}
              onChange={handleChange}
              placeholder="Email"
              className="signup-input"
              required
              disabled={isLoading}
            />
            {errors.email && (
              <div className="field-error">
                <span className="error-icon">❗</span> {errors.email}
              </div>
            )}
          </div>
  
          <div className="input-group">
            <input
              type="password"
              name="password"
              value={formData.password}
              onChange={handleChange}
              placeholder="Password"
              className="signup-input"
              required
              disabled={isLoading}
            />
            {errors.password && (
              <div className="field-error">
                <span className="error-icon">❗</span> {errors.password}
              </div>
            )}
          </div>
  
          <div className="input-group">
            <input
              type="password"
              name="confirmPassword"
              value={formData.confirmPassword}
              onChange={handleChange}
              placeholder="Confirm Password"
              className="signup-input"
              required
              disabled={isLoading}
            />
            {errors.confirmPassword && (
              <div className="field-error">
                <span className="error-icon">❗</span> {errors.confirmPassword}
              </div>
            )}
          </div>
  
          <div className="input-group">
            <input
              type="text"
              name="department"
              value={formData.department}
              onChange={handleChange}
              placeholder="Department"
              className="signup-input"
              required
              disabled={isLoading}
            />
            {errors.department && (
              <div className="field-error">
                <span className="error-icon">❗</span> {errors.department}
              </div>
            )}
          </div>
  
          <button 
            type="submit" 
            className="signup-button"
            disabled={isLoading}
          >
            {isLoading ? 'Signing up...' : 'Sign Up'}
          </button>
        </form>
  
        <div className="login-link">
          Already have an account? <Link to="/login/student">Login here</Link>
        </div>
  
        <div className="fries-icon">🍟</div>
      </div>
    </div>
  );
  
};

export default StudentSignup; 