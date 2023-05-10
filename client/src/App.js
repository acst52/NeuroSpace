import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Login from './components/loginForm';
import SearchResources from './pages/searchResources';
import Signup from './components/signupForm';
import Navbar from './components/navbar';
import Messages from './components/messages';
import Calendar from './components/calendar';
import Discussions from './components/discussions';
import Resources from './components/resources';
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
          <Route path='/messages' element={<Messages/>} />
          <Route path='/calendar' element={<Calendar/>} />
          <Route path='discussions' element={<Discussions/>} />
          <Route path='/resources' element={<Resources/>} />
        </Routes>
    </Router>
  );
}

export default App;
