import React, { useState, useEffect } from 'react';
import logo from './images/neuroSpaceLogo4.png';
import '../App.css';

function Navbar() {
        const [darkMode, setDarkMode] = useState(false);
      
        const toggleDarkMode = () => {
          setDarkMode(!darkMode);
        }
      
        useEffect(() => {
          if (darkMode) {
            document.body.classList.remove('lightMode')
            document.body.classList.add('darkMode');
          } else {
            document.body.classList.remove('darkMode');
            document.body.classList.add('lightMode');
          }
        }, [darkMode]);
  return (
    <div className={darkMode ? 'darkMode' : 'lightMode'}>
      <div className="header">
        <section className="logoSection">
          <img className="logo" src={logo} alt="LOGO" />
        </section>
        <section className="navSection">
          <button className="navButton">MAIN</button>
          <button className="navButton">DASHBOARD</button>
          <button className="navButton">LOGIN</button>
          <div className={darkMode ? 'darkMode' : 'lightMode'}>
            <button className="navButton" onClick={toggleDarkMode}>
              Toggle Mode
            </button>
          </div>
        </section>
      </div>
    </div>
  );
}

export default Navbar;
