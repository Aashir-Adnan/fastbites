import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import './Sidebar.css';
import logo from './logo.png'; // Ensure you have a logo image here

const Sidebar = () => {
  const [collapsed, setCollapsed] = useState(false);

  return (
    <div className={`sidebar ${collapsed ? 'collapsed' : ''}`}>
      <div className="sidebar-header">
        <img src={logo} alt="Logo" className="sidebar-logo" />
        {!collapsed && <h2 className="sidebar-title">Fast Bites</h2>}
        <button className="toggle-button" onClick={() => setCollapsed(!collapsed)}>
          {collapsed ? '➡️' : '⬅️'}
        </button>
      </div>
      <hr className="sidebar-separator" />
      <ul className="sidebar-list">
        <li><Link to="/" className="sidebar-link">🏠 {!collapsed && 'Home'}</Link></li>
        <li><Link to="/dashboard" className="sidebar-link">🖥️ {!collapsed && 'Dashboard'}</Link></li>
        <li><Link to="/menus" className="sidebar-link">🧾 {!collapsed && "Look At The Menu's"}</Link></li>
        <li><Link to="/dining-hall" className="sidebar-link">🍴 {!collapsed && 'The Dining Hall'}</Link></li>
        <li><Link to="/locate-food" className="sidebar-link">🗺️ {!collapsed && 'Find Food Near You!'}</Link></li>
      </ul>
    </div>
  );
};

export default Sidebar;
