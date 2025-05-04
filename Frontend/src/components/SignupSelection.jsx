import React from 'react';
import { useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import './SignupSelection.css';

const SignupSelection = () => {
  const navigate = useNavigate();

  const handleStudentSignup = () => {
    navigate('/signup/student');
  };

  const handleStaffSignup = () => {
    navigate('/signup/staff');
  };

  return (
    <div className="signup-selection">
      <motion.div 
        initial={{ y: -20, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.8 }}
        className="selection-content"
      >
        <h1>Choose Your Account Type</h1>
        <div className="selection-buttons">
          <button 
            className="student-signup-btn"
            onClick={handleStudentSignup}
          >
            Student Signup
          </button>
          <button 
            className="staff-signup-btn"
            onClick={handleStaffSignup}
          >
            Staff Signup
          </button>
        </div>
      </motion.div>
    </div>
  );
};

export default SignupSelection; 