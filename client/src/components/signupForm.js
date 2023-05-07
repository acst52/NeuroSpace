import React, { useState } from 'react';
import { Link } from 'react-router-dom';
function SignupForm() {
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
    console.log('Signup form submitted');
    console.log('Email:', email);
    console.log('Password:', password);
  };

  return (
    <div>
      <h1 className="title">SIGNUP</h1>
      <form className="signupForm" onSubmit={handleSubmit}>
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
        <button type="submit">Signup</button>
        <div className="linkContainer">
          <p>Already have an account?</p>
          <Link to="/login" className="link">
            {' '}
            Log in instead!
          </Link>
        </div>
      </form>
    </div>
  );
}

export default SignupForm;
