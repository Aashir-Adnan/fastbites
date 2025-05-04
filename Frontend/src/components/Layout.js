import React from 'react';
import Sidebar from './Sidebar';
import { Outlet } from 'react-router-dom'; // If you're using React Router v6
import './Layout.css';

const Layout = () => {
  return (
    <div className="layout">
      <Sidebar />
      <div className="content-area">
        <Outlet /> {/* This will render the specific page component */}
      </div>
    </div>
  );
};

export default Layout;
