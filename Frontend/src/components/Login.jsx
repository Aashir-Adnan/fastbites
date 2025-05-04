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

  const options = [
    { id: 'student', label: 'Student Login' },
    { id: 'staff', label: 'Staff Login' }
  ];

  return (
    <div className="login-container">
      <div className="login-card">
        <h1 className="login-title">LOGIN</h1>

        <div className="login-options">
          {options.map(({ id, label }) => (
            <div
              key={id}
              className={`login-option-box ${selectedOption === id ? 'selected' : ''}`}
              onClick={() => setSelectedOption(id)}
            >
              {label}
            </div>
          ))}
        </div>

        <button
          className="login-submit-btn"
          onClick={handleLogin}
          disabled={!selectedOption}
        >
          Login
        </button>

        <div className="fries-icon">🍟</div>
      </div>
    </div>
  );
};

export default Login;
