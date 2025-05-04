import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import './Login.css';

const Login = () => {
  const navigate = useNavigate();
  const [selectedOption, setSelectedOption] = useState('');

  const handleLogin = () => {
    if (selectedOption) {
      navigate(`/login/${selectedOption}`);
    }
  };

  return (
    <div className="login-container">
      <div className="login-card">
        <h1 className="login-title">LOGIN</h1>
        
        <div className="login-options">
          <div className="login-option">
            <input
              type="radio"
              id="student"
              name="loginType"
              value="student"
              checked={selectedOption === 'student'}
              onChange={(e) => setSelectedOption(e.target.value)}
            />
            <label htmlFor="student">student login</label>
          </div>
          
          <div className="login-option">
            <input
              type="radio"
              id="staff"
              name="loginType"
              value="staff"
              checked={selectedOption === 'staff'}
              onChange={(e) => setSelectedOption(e.target.value)}
            />
            <label htmlFor="staff">staff login</label>
          </div>
        </div>

        <button 
          className="login-submit-btn"
          onClick={handleLogin}
          disabled={!selectedOption}
        >
          log in
        </button>

        <div className="fries-icon">
          🍟
        </div>
      </div>
    </div>
  );
};

export default Login; 