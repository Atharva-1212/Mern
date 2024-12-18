import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import HomePage from './pages/HomePage';  // Correct default import
import AddEditProjectPage from './pages/AddEditProjectPage';  // Correct default import
import 'bootstrap/dist/css/bootstrap.min.css';
import './App.css';

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/add" element={<AddEditProjectPage />} />
        <Route path="/edit/:id" element={<AddEditProjectPage />} />
      </Routes>
    </Router>
  );
}

export default App;  // Default export
