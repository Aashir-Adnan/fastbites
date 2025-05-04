import React, { useState } from 'react';
import Sidebar from './Sidebar';
import { Outlet } from 'react-router-dom';
import './Layout.css';

const Layout = () => {
  const [collapsed, setCollapsed] = useState(false);

  return (
    <div className={`layout ${collapsed ? 'with-collapsed' : 'with-expanded'}`}>
      <Sidebar collapsed={collapsed} setCollapsed={setCollapsed} />
      <div className="content-area">
        <div className="content-container">
          <Outlet />
        </div>
      </div>
    </div>
  );
};

export default Layout;
