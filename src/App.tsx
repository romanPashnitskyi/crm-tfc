import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import 'bootstrap/dist/css/bootstrap.min.css';
import Dashboard from './pages/Dashboard';
import UserDetails from './pages/UserDetails';
import './App.css';

const App: React.FC = () => {
  return (
    <Router>
      <div className="container mt-4">
        <Routes>
          <Route path="/" element={<Dashboard />} />
          <Route path="/user/:userName" element={<UserDetails />} />
        </Routes>
      </div>
    </Router>
  );
};

export default App;
