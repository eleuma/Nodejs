import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Navbar from './components/common/Navbar';
import Footer from './components/common/Footer';
import Home from './pages/client/Home';
import Login from './components/auth/Login';
import Register from './components/auth/Register';
import PropertyList from './pages/client/PropertyList';
import PropertyDetail from './pages/client/PropertyDetail';
import ScheduleVisit from './pages/client/ScheduleVisit';
import MyVisits from './pages/client/MyVisits';
import './App.css';

const App = () => {
  return (
    <Router>
      <div className="app">
        <Navbar />
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />
          <Route path="/properties" element={<PropertyList />} />
          <Route path="/properties/:id" element={<PropertyDetail />} />
          <Route path="/schedule-visit" element={<ScheduleVisit />} />
          <Route path="/my-visits" element={<MyVisits />} />
        </Routes>
        <Footer />
      </div>
    </Router>
  );
};

export default App;
