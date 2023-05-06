import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Login from './components/loginForm';
import SearchResources from './pages/searchResources';
import Navbar from './components/navbar';
import './App.css';


function App() {
  return (
    <Router>
    <div>     
      <Navbar/>
    </div>
    <Routes>
          <Route path="/login" element={<Login/>} />
          <Route path="/" element={<SearchResources/>} />
        </Routes>
    </Router>
  );
}

export default App;
