import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Login from './components/loginForm';
import SearchResources from './pages/searchResources';
import Signup from './components/signupForm';
import Navbar from './components/navbar';
import Dashboard from './pages/dashboard';
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
          <Route path='/signup' element={<Signup/>} />
          <Route path='/dashboard' element={<Dashboard/>} />
        </Routes>
    </Router>
  );
}

export default App;
