import React, { useState } from 'react';
import { Link } from 'react-router-dom';
function LoginForm() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const handleEmailChange = (e) => {
    setEmail(e.target.value);
  };

  const handlePasswordChange = (e) => {
    setPassword(e.target.value);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    // Perform login logic with email and password
    console.log('Login form submitted');
    console.log('Email:', email);
    console.log('Password:', password);
  };

  return (
    <div>
    <h1 className='title'>LOGIN</h1>
    <form className="loginForm" onSubmit={handleSubmit}>
        
      <div>
        <label className="label">Email:</label>
        <input
          type="email"
          className="entryField"
          value={email}
          onChange={handleEmailChange}
          required
        />
      </div>
      <div>
        <label className="label">Password:</label>
        <input
          type="password"
          className="entryField"
          value={password}
          onChange={handlePasswordChange}
          required
        />
      </div>
      <button type="submit">Login</button>
      <div className="linkContainer">
        <p>Don't have an account yet?</p>
        <Link to="/signup" className="link">
          {' '}
          Sign up instead!
        </Link>
      </div>
    </form>
    </div>
  );
}

export default LoginForm;
