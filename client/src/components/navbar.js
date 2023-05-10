import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import logo from './images/neuroSpaceLogo4.png';
import sunIcon from './images/sunIcon2.png';
import moonIcon from './images/moonIcon2.png';
import '../App.css';

function Navbar() {
  const [darkMode, setDarkMode] = useState(false);
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);

  const toggleDarkMode = () => {
    setDarkMode(!darkMode);
  };

  const toggleDropdown = () => {
    setIsDropdownOpen(!isDropdownOpen);
  };

  useEffect(() => {
    if (darkMode) {
      document.body.classList.remove('lightMode');
      document.body.classList.add('darkMode');
    } else {
      document.body.classList.remove('darkMode');
      document.body.classList.add('lightMode');
    }
  }, [darkMode]);

  return (
    <div className="header">
      <section className="logoSection">
        <img className="logo" src={logo} alt="LOGO" />
        <div className={darkMode ? 'darkMode' : 'lightMode'}>
          <button className="toggleButton" onClick={toggleDarkMode}>
            {darkMode ? (
              <img className="sunIcon" src={sunIcon} alt="Light Mode" />
            ) : (
              <img className="moonIcon" src={moonIcon} alt="Dark Mode" />
            )}
          </button>
        </div>
      </section>
      <section className="navSection">
        <button className="navButton">
          <Link to="/" className="btnLink">SEARCH</Link>
        </button>
        <div className="dropdownContainer">
          <button className="dropdownButton" onClick={toggleDropdown}>
            DASHBOARD
          </button>
          {isDropdownOpen && (
            <div className="dropdownContent">
              <Link to="/" className="dropdownLink">Messages</Link>
              <Link to="/" className="dropdownLink">Calendar</Link>
              <Link to="/" className="dropdownLink">Discussions</Link>
              <Link to="/" className="dropdownLink">Resources</Link>
            </div>
          )}
        </div>
        <button className="navButton">
          <Link to="/login" className="btnLink">LOGIN</Link>
        </button>
      </section>
    </div>
  );
}

export default Navbar;
