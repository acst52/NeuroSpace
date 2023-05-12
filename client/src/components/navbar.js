import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import logo from './images/neuroSpaceLogo4.png';
import sunIcon from './images/sunIcon2.png';
import moonIcon from './images/moonIcon2.png';
import '../App.css';
import auth from '../utils/auth';

function Navbar() {
  const logout = (event) => {
    event.preventDefault();
    auth.logout();
  };

  const [darkMode, setDarkMode] = useState(false);
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);

  const toggleDarkMode = () => {
    setDarkMode(!darkMode);
  };

  const handleMouseEnter = () => {
    setIsDropdownOpen(true);
  };

  const handleMouseLeave = () => {
    setIsDropdownOpen(false);
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
        <button className="toggleButton" onClick={toggleDarkMode}>
          {darkMode ? (
            <img className="sunIcon" src={sunIcon} alt="Light Mode" />
          ) : (
            <img className="moonIcon" src={moonIcon} alt="Dark Mode" />
          )}
        </button>
      </section>
      <section className="navSection">
        <button className="navButton">
          <Link to="/" className="btnLink">SEARCH</Link>
        </button>
        <div
          className="dropdownContainer"
          onMouseEnter={handleMouseEnter}
          onMouseLeave={handleMouseLeave}
        >
          <button className="navButton dropdownButton">
            DASHBOARD
          </button>
          {auth.loggedIn() ? (
            <>
              {isDropdownOpen && (
                <div className="dropdownContent">
                  <Link to="/messages" className="dropdownLink" onClick={handleMouseLeave}>Messages</Link>
                  <Link to="/calendar" className="dropdownLink" onClick={handleMouseLeave}>Schedule</Link>
                  <Link to="/resources" className="dropdownLink" onClick={handleMouseLeave}>Resources</Link>
                </div>
              )}
            </>
          ) : (
            <>
              {isDropdownOpen && (
                <div className="dropdownContent">
                  <Link to="/login" className="dropdownLink" onClick={handleMouseLeave}> Login First! </Link>
                </div>
              )}
            </>
          )}
        </div>
        {auth.loggedIn() ? (
          <button className="navButton" onClick={logout}>
            LOGOUT
          </button>
        ) : (
          <button className="navButton">
            <Link to="/login" className="btnLink">
              LOGIN
            </Link>
          </button>
        )}
      </section>
    </div>
  );
}

export default Navbar;

