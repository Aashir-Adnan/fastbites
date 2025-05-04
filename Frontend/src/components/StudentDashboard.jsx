import React from 'react';
import { useNavigate } from 'react-router-dom';
import LogoutButton from './LogoutButton';
import './StudentDashboard.css';

const StudentDashboard = () => {
  const navigate = useNavigate();

  const menuItems = [
    { id: 1, title: "Locate Food", path: "/locate-food" },
    { id: 2, title: "Menus and Discounts", path: "/menus" },
    { id: 3, title: "See Recommendations", path: "/recommendations" },
    { id: 4, title: "Review and Rate Food", path: "/review" },
    { id: 5, title: "Campus Dinning Hall", path: "/dining-hall" }
  ];

  const handleMenuClick = (path) => {
    navigate(path);
  };

  return (
    <div className="dashboard-container">
      <LogoutButton />
      <div className="menu-container">
        {menuItems.map((item) => (
          <button
            key={item.id}
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

export default StudentDashboard; 