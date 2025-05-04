import React from 'react';
import {
  BrowserRouter as Router,
  Routes,
  Route,
  useLocation
} from 'react-router-dom';
import { AnimatePresence } from 'framer-motion';

import Layout from './components/Layout';
import LandingPage from './components/LandingPage';
import Login from './components/Login';
import StudentLogin from './components/StudentLogin';
import Dashboard from './components/Dashboard';
import CampusDiningHall from './components/CampusDiningHall';
import StaffLogin from './components/StaffLogin';
import Menus from './components/Menus';
import Recommendations from './components/Recommendations';
import GoogleMaps from './components/GoogleMaps';
import SignupSelection from './components/SignupSelection';
import StudentSignup from './components/StudentSignup';
import StaffSignup from './components/StaffSignup';
import RestaurantPage from './components/RestaurantPage';

import './App.css';

// Optional: wrap in motion container
import { motion } from 'framer-motion';

const pageTransition = {
  initial: {
    x: '100%',
    opacity: 0,
    backgroundColor: '#90C67C'
  },
  animate: {
    x: 0,
    opacity: 1,
    backgroundColor: '#ffffff', // or whatever your target is
    transition: { duration: 0.4 }
  },
  exit: {
    x: '-100%',
    opacity: 0,
    backgroundColor: '#90C67C',
    transition: { duration: 0.3 }
  }
};

const AnimatedRoute = ({ children }) => (
  <motion.div
    variants={pageTransition}
    initial="initial"
    animate="animate"
    exit="exit"
    style={{
      width: '100%',
      height: '100%',
      flexGrow: 1,
      position: 'relative', // or remove entirely if unnecessary
      overflow: 'hidden'
    }}
    
  >
    {children}
  </motion.div>
);

function AnimatedRoutes() {
  const location = useLocation();

  return (
    <AnimatePresence mode="wait">
      <Routes location={location} key={location.pathname}>
        <Route path="/" element={<AnimatedRoute><LandingPage /></AnimatedRoute>} />
        <Route path="/login" element={<AnimatedRoute><Login /></AnimatedRoute>} />
        <Route path="/login/student" element={<AnimatedRoute><StudentLogin /></AnimatedRoute>} />
        <Route path="/login/staff" element={<AnimatedRoute><StaffLogin /></AnimatedRoute>} />
        <Route path="/signup-selection" element={<AnimatedRoute><SignupSelection /></AnimatedRoute>} />
        <Route path="/signup/student" element={<AnimatedRoute><StudentSignup /></AnimatedRoute>} />
        <Route path="/signup/staff" element={<AnimatedRoute><StaffSignup /></AnimatedRoute>} />

        <Route element={<Layout />}>
          <Route path="/dashboard" element={<AnimatedRoute><Dashboard /></AnimatedRoute>} />
          <Route path="/dining-hall" element={<AnimatedRoute><CampusDiningHall /></AnimatedRoute>} />
          <Route path="/menus" element={<AnimatedRoute><Menus /></AnimatedRoute>} />
          <Route path="/recommendations" element={<AnimatedRoute><Recommendations /></AnimatedRoute>} />
          <Route path="/locate-food" element={<AnimatedRoute><GoogleMaps /></AnimatedRoute>} />
          <Route path="/restaurant/:name" element={<AnimatedRoute><RestaurantPage /></AnimatedRoute>} />
        </Route>
      </Routes>
    </AnimatePresence>
  );
}
function App() {
  return (
    <Router>
      <div className="app">
        <motion.div
          className="page-background"
          initial={{ backgroundColor: '#ffffff' }}
          animate={{ backgroundColor: '#90C67C' }}
          exit={{ backgroundColor: '#ffffff' }}
          transition={{ duration: 0.3 }}
          style={{
            position: 'absolute',
            inset: 0,
            zIndex: 0
          }}
        />
        <AnimatedRoutes />
      </div>
    </Router>
  );
}


export default App;
