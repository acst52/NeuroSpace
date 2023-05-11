import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { useMutation } from '@apollo/client';
import { LOGINUSER } from '../mutations';
import auth from "../utils/auth";
 
const LoginForm = (props) => {
  const [formState, setFormState] = useState({ email: '', password: '' });
  const [login, { error, data }] = useMutation(LOGINUSER);

  // update state based on form input changes
  const handleChange = (event) => {
    const { name, value } = event.target;

    setFormState({
      ...formState,
      [name]: value,
    });
  };

  // submit form
  const handleFormSubmit = async (event) => {
    event.preventDefault();
    console.log(formState);
    try {
      const { data } = await login({
        variables: { ...formState },
      });

      auth.login(data.login.token);
    } catch (e) {
      console.error(e);
    }

    // clear form values
    setFormState({
      email: '',
      password: '',
    });
  };
  return (
    <div className="contentBody">
      <h1 className="title">LOGIN</h1>
      <form className="loginForm" onSubmit={handleFormSubmit}>
        <label className="label">
          Email:
          <input
            type="email"
            name="email"
            className="entryField"
            value={formState.email}
            onChange={handleChange}
            required
          />
        </label>
        <label className="label">
          Password:
          <input
            className="entryField"
            type="password"
            placeholder="Your password"
            name="password"
            onChange={handleChange}
            value={formState.password}
            required
          />
        </label>
        <div>
          <button
            disabled={!(formState.email && formState.password)}
            type="submit"
            variant="success"
          >
            Submit
          </button>
        </div>
        <div className="linkContainer">
          <p>Don't have an account yet?</p>
          <Link to="/signup" className="link">
            Sign up instead!
          </Link>
        </div>
      </form>
    </div>
  );
};

export default LoginForm;
