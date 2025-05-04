import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import './Dashboard.css';

const Dashboard = () => {
  const navigate = useNavigate();
  const [user, setUser] = useState(null);
  const [isLoading, setIsLoading] = useState(true);

  
  useEffect(() => {
    // Check for both student and staff login
    const currentUser = JSON.parse(localStorage.getItem('currentUser'));
    const loggedInStaff = JSON.parse(localStorage.getItem('loggedInStaff'));

    if (currentUser) {
      setUser({ ...currentUser, role: 'student' });
    } else if (loggedInStaff) {
      setUser(loggedInStaff);
    } else {
      // If no user is logged in, redirect to login page
      navigate('/login');
    }
    setIsLoading(false);
  }, [navigate]);

  const handleLogout = () => {
    // Clear both student and staff data
    localStorage.removeItem('currentUser');
    localStorage.removeItem('loggedInStaff');
    navigate('/login');
  };

  if (isLoading) {
    return (
      <div className="dashboard-container">
        <div className="loading">Loading...</div>
      </div>
    );
  }

  return (
    <div className="dashboard-container">
      <header className="dashboard-header">
        <div className="header-left">
          <h1>Welcome, {user?.name}!</h1>
          <div className="user-info">
            <span className="user-role">{user?.role === 'student' ? 'Student' : 'Staff'}</span>
            {user?.role === 'student' && <span className="user-roll">Roll No: {user?.rollNumber}</span>}
            {user?.role === 'staff' && <span className="user-position">{user?.position}</span>}
          </div>
        </div>
        <button className="logout-button" onClick={handleLogout}>Logout</button>
      </header>

      <div className="dashboard-content">
        <div className="dashboard-grid">
          <div className="dashboard-card" onClick={() => navigate('/dining-hall')}>
            <h3>Campus Dining Hall</h3>
            <p>View and order from campus dining options</p>
          </div>

          <div className="dashboard-card" onClick={() => navigate('/locate-food')}>
            <h3>Locate Food</h3>
            <p>Find food outlets on campus</p>
          </div>

          <div className="dashboard-card" onClick={() => navigate('/menus')}>
            <h3>Menus & Discounts</h3>
            <p>View current menus and special offers</p>
          </div>

          <div className="dashboard-card" onClick={() => navigate('/recommendations')}>
            <h3>See Recommendations</h3>
            <p>Get personalized food recommendations</p>
          </div>

        </div>
      </div>
    </div>
  );
};

export default Dashboard;
