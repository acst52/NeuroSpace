import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { createUser } from '../utils/API';
import Auth from '../utils/auth';

const SignupForm = () => {
  // set initial form state
  const [userFormData, setUserFormData] = useState({ firstName: '', lastName: '', email: '', password: '' });
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

    // check if form has everything 
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
      firstName: '',
      lastName: '',
      email: '',
      password: '',
    });
  };

  return (
    <div className='contentBody'>
      <h1 className="title">SIGNUP</h1>
      <form className="signupForm" onSubmit={handleFormSubmit}>
      <label className="label">First Name:
        <input
          type="text"
          name= "firstName"
          className="entryField"
          value={userFormData.firstName}
          onChange={handleInputChange}
          required
        />  
        </label>   
          <label className="label">Last Name:
        <input
          type="text"
          name= "lastName"
          className="entryField"
          value={userFormData.lastName}
          onChange={handleInputChange}
          required
        />   
        </label>
      <label className="label">Email:
        <input
          type="email"
          name= "email"
          className="entryField"
          value={userFormData.email}
          onChange={handleInputChange}
          required
        />
        </label>

          <label className ="label" >Password:
          <input
          className="entryField"
            type='password'
            placeholder='Your password'
            name='password'
            onChange={handleInputChange}
            value={userFormData.password}
            required
          />
          </label>
          <div>
        <button
          disabled={!(userFormData.firstName && userFormData.lastName && userFormData.email && userFormData.password)}
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
