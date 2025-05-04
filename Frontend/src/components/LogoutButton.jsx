import React from 'react';
import { useNavigate } from 'react-router-dom';
import './LogoutButton.css';

const LogoutButton = () => {
  const navigate = useNavigate();

  const handleLogout = () => {
    // Clear all authentication data
    localStorage.removeItem('currentUser');
    localStorage.removeItem('currentStaff');
    
    // Redirect to landing page
    navigate('/');
  };

  return (
    <button 
      className="logout-button"
      onClick={handleLogout}
    >
      Logout
    </button>
  );
};

export default LogoutButton; 