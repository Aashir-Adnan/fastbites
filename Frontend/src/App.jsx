import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Layout from './components/Layout'; // Import Layout component
import LandingPage from './components/LandingPage';
import Login from './components/Login';
import StudentLogin from './components/StudentLogin';
import Dashboard from './components/Dashboard';
import CampusDiningHall from './components/CampusDiningHall';
import OrderSummary from './components/OrderSummary';
import StaffLogin from './components/StaffLogin';
import Menus from './components/Menus';
import ItemDetails from './components/ItemDetails';
import Recommendations from './components/Recommendations';
import Review from './components/Review';
import Reviews from './components/Reviews';
import GoogleMaps from './components/GoogleMaps';
import SignupSelection from './components/SignupSelection';
import StudentSignup from './components/StudentSignup';
import StaffSignup from './components/StaffSignup';
import './App.css';

function App() {
  return (
    <Router>
      <div className="app">
        <Routes>
            <Route path="/" element={<LandingPage />} />
            <Route path="/login" element={<Login />} />
            <Route path="/login/student" element={<StudentLogin />} />
            <Route path="/login/staff" element={<StaffLogin />} />
            <Route path="/signup-selection" element={<SignupSelection />} />
            <Route path="/signup/student" element={<StudentSignup />} />
            <Route path="/signup/staff" element={<StaffSignup />} />
          <Route element={<Layout />}>
            {/* All the routes that will share the sidebar */}
            <Route path="/dashboard" element={<Dashboard />} />
            <Route path="/dining-hall" element={<CampusDiningHall />} />
            <Route path="/order-summary" element={<OrderSummary />} />
            <Route path="/menus" element={<Menus />} />
            <Route path="/item-details" element={<ItemDetails />} />
            <Route path="/recommendations" element={<Recommendations />} />
            <Route path="/review" element={<Review />} />
            <Route path="/reviews" element={<Reviews />} />
            <Route path="/locate-food" element={<GoogleMaps />} />
          </Route>
        </Routes>
      </div>
    </Router>
  );
}

export default App;
