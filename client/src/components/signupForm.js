import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { useMutation } from '@apollo/client';
import { ADDUSER } from '../mutations';
import auth from "../utils/auth";

const SignupForm = () => {
  // set initial states for each field
  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');
  const [email, setEmail] = useState('');
  const [password,setPassword] = useState('');

 // Invoke `useMutation()` hook to return a Promise-based function and data about the ADDUSER mutation
 const [addUser] = useMutation(ADDUSER);

 
  const handleFormSubmit = async (event) => {
    event.preventDefault();

      const mutationResponse = await addUser({
        variables: { firstName, lastName, email, password },
      });
    const token = mutationResponse.data.addUser.token
    auth.login (token)
   
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
          value={firstName}
          onChange={(event) => setFirstName(event.target.value)}
          required
        />  
        </label>   
          <label className="label">Last Name:
        <input
          type="text"
          name= "lastName"
          className="entryField"
          value={lastName}
          onChange={(event) => setLastName(event.target.value)}
          required
        />   
        </label>
      <label className="label">Email:
        <input
          type="email"
          name= "email"
          className="entryField"
          value={email}
          onChange={(event) => setEmail(event.target.value)}
          required
        />
        </label>

          <label className ="label" >Password:
          <input
          className="entryField"
            type='password'
            placeholder='Your password'
            name='password'
            onChange={(event) => setPassword(event.target.value)}
            value={password}
            required
          />
          </label>
          <div>
        <button
          disabled={!(firstName && lastName && email && password)}
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
