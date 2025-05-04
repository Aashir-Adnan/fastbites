import React from 'react';
import { useNavigate } from 'react-router-dom';
import LogoutButton from './LogoutButton';
import './StaffDashboard.css';

const StaffDashboard = () => {
  const navigate = useNavigate();

  const menuItems = [
    { title: 'Locate Food', path: '/locate-food' },
    { title: 'Menus and Discounts', path: '/menus' },
    { title: 'See Recommendations', path: '/recommendations' },
    { title: 'Review and Rate Food', path: '/review' },
    { title: 'Campus Dining Hall', path: '/dining-hall' }
  ];

  const handleMenuClick = (path) => {
    navigate(path);
  };

  return (
    <div className="dashboard-container">
      <LogoutButton />
      <h1>Staff Dashboard</h1>
      <div className="menu-container">
        {menuItems.map((item, index) => (
          <button
            key={index}
            className="menu-button"
            onClick={() => handleMenuClick(item.path)}
          >
            {item.title}
          </button>
        ))}
      </div>
    </div>
  );
};

export default StaffDashboard; 