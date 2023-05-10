import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { createUser } from '../utils/API';
import Auth from '../utils/auth';

const SignupForm = () => {
  // set initial form state
  const [userFormData, setUserFormData] = useState({ username: '', email: '', password: '' });
  // set state for form validation
  const [validated] = useState(false);
  // set state for alert
  const [showAlert, setShowAlert] = useState(false);

  const handleInputChange = (event) => {
    const { name, value } = event.target;
    setUserFormData({ ...userFormData, [name]: value });
  };

  const handleFormSubmit = async (event) => {
    event.preventDefault();

    // check if form has everything (as per react-bootstrap docs)
    const form = event.currentTarget;
    if (form.checkValidity() === false) {
      event.preventDefault();
      event.stopPropagation();
    }

    try {
      const response = await createUser(userFormData);

      if (!response.ok) {
        throw new Error('something went wrong!');
      }

      const { token, user } = await response.json();
      console.log(user);
      Auth.login(token);
    } catch (err) {
      console.error(err);
      setShowAlert(true);
    }

    setUserFormData({
      username: '',
      email: '',
      password: '',
    });
  };


/* function SignupForm() {
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
  }; */

  return (
    <div>
      <h1 className="title">SIGNUP</h1>
      <form className="signupForm" onSubmit={handleFormSubmit}>
              
      <label className="label">Email:</label>
        <input
          type="email"
          name= "email"
          className="entryField"
          value={userFormData.email}
          onChange={handleInputChange}
          required
        />

          <label className ="label" htmlFor='password'>Password:</label>
          <input
          className="entryField"
            type='password'
            placeholder='Your password'
            name='password'
            onChange={handleInputChange}
            value={userFormData.password}
            required
          />
          <div>
        <button
          disabled={!(userFormData.email && userFormData.password)}
          type='submit'
          variant='success'>
          Submit
        </button>
        </div>
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
