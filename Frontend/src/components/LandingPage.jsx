import React from 'react';
import { useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import './LandingPage.css';

const LandingPage = () => {
  const navigate = useNavigate();

  /*const handleFindFood = () => {
    navigate('/login');
  };
  */

  const handleSignIn = () => {
    navigate('/login');
  };

  const handleSignUp = () => {
    navigate('/signup-selection');
  };

  return (
    <div className="landing-page">
      <div className="hero-section">
        <motion.div 
          initial={{ y: -20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ duration: 0.8 }}
          className="hero-content"
        >
          <div className="logo-container">
            <h1 className="logo">FASTBITES<span className="fries-icon">🍟</span></h1>
          </div>
          <h2 className="tagline">Find it. Eat it. Review it. – Your Campus Food Guide! 🍔❓➡️</h2>
          
          <div className="search-container">
            <div className="auth-buttons">
              <button 
                className="sign-in-btn"
                onClick={handleSignIn}
              >
                Sign In
              </button>
              <button 
                className="sign-up-btn"
                onClick={handleSignUp}
              >
                Sign Up
              </button>
            </div>
          </div>
        </motion.div>
        
      </div>
    </div>
  );
};

export default LandingPage; 