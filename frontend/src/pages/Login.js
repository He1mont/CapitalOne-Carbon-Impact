// Login.js
import React, { useState } from 'react';
import { useHistory } from 'react-router-dom';
import '../assets/styles/Login.css';
import axios from 'axios';

/**
 * Head component
 * Displays the top part of the login page including the logo.
 * The logo serves as a button to redirect the user to the home page.
 */
function Head() {
  const history = useHistory();

  /**
   * handleLoginClick function
   * Redirects the user to the home page when the logo is clicked.
   */
  function handleLoginClick() {
    history.push('/');
  }

  return (
    <div className="head-bar">
      <div className="head-center">
        <img src="/images/Logo1.png" className="head-img" alt="Logo" onClick={handleLoginClick} />
      </div>
    </div>
  );
}

/**
 * Mid component
 * Renders the login form including fields for email, password and a remember me checkbox.
 * @param {Object} props - Contains email, setEmail, password, setPassword, rememberMe, setRememberMe, loginMessage, and handleSubmit.
 */
function Mid({ email, setEmail, password, setPassword, rememberMe, setRememberMe, loginMessage, handleSubmit }) {
  // Determines if the login message indicates a successful login
  const isSuccess = loginMessage.includes('success');

  return (
    <div className="mid-bar-login">
      <div className="mid-high-login"></div>

      <div className="mid-center-login">
        <div className={`mid-box-login ${isSuccess ? 'success' : 'error'}`}>
          <h1 className="mid-box-txt-title-login">Login to your account</h1>

          {/* Login Form */}
          <form onSubmit={handleSubmit}>
            {/* Email Input */}
            <div className="mb-3">
              {loginMessage && <p className="login-message">{loginMessage}</p>}
              {/* <div className='login-message-box'> </div> */}
              <div className="login-input-title">Username (email)</div>
              <input
                type="email"
                className="form-control"
                aria-label="Username (email)"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
              />
            </div>

            {/* Password Input */}
            <div className="mb-3">
              <div className="login-input-title">Password</div>
              <input
                type="password"
                className="form-control"
                aria-label="Password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
              />
            </div>

            {/* Remember Me Checkbox */}
            <div className="mb-3">
              <div className="login-remember">
                <div className="custom-control custom-checkbox">
                  <input
                    type="checkbox"
                    className="custom-control-input"
                    id="customCheck1"
                    checked={rememberMe}
                    onChange={() => setRememberMe(!rememberMe)}
                  />
                  <label className="custom-control-label" htmlFor="customCheck1">
                    Remember me
                  </label>
                </div>
              </div>
            </div>

            {/* Submit Button */}
            <div className="d-grid">
              <button type="submit" className="login-btn-submit">
                Sign in
              </button>
            </div>
          </form>

          {/* Forgotten Credentials Links */}
          <div className="login-forgotten-btn">
            <p className="forgot-username text-right">
              <a href="#">Forgot your username?</a>
            </p>
            <p className="forgot-password text-right">
              <a href="#">Forgot your password?</a>
            </p>
          </div>
        </div>
      </div>

      {/* Help Button */}
      <div className="mid-low">
        <div className="mid-low-help">
          <button className="small-help-btn">? Help</button>
        </div>
      </div>
    </div>
  );
}

/**
 * Footer component
 * Displays the footer of the login page, including copyright information.
 */
function Footer() {
  return (
    <div className="footer">
      <p>© 2023-2024 Team7. All rights reserved.</p>
    </div>
  );
}

/**
 * Login component
 * The main component for the login page, integrating Head, Mid, and Footer components.
 * Manages the state for email, password, rememberMe, and loginMessage.
 * Contains the logic for handling the submission of the login form.
 */
function Login() {
  // State for managing login credentials and messages
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [rememberMe, setRememberMe] = useState(false);
  const [loginMessage, setLoginMessage] = useState('');

  /**
   * handleSubmit function
   * Handles the form submission for logging in.
   * Validates the user credentials and sets appropriate login messages.
   * @param {Event} e - Event triggered on form submission.
   */
  const handleSubmit = async(e) => {
    e.preventDefault();

    // For testing purposes,
    const correctEmail = 'Miguel.Christiansen@emailprovider.com';
    const correctPassword = 'Test@123'; // Example password
    try {
      const response = await axios.get(`http://127.0.0.1:7001/accounts/get-by-email/${email}`);
      console.log(response.data);
       // Login validation logic
      if (email === correctEmail && password === correctPassword) {
        setLoginMessage('Logged in successfully!');
        if (email === '') {
          setLoginMessage('Please enter your username.');
          e.preventDefault();
        }
        else if (password === '') {
          setLoginMessage('Please enter your password.');
        }
        else if (email === '' && password === '') {
          setLoginMessage('Please enter your email and password.');
        }
        if (email !== correctEmail && password !== correctPassword) {
          setLoginMessage('Username or password is incorrect.');
        }
        
  
    
      }
    } catch (error) {
      console.error('Error fetching account by email:', error);
    }
      // Clear login message after a delay
      setTimeout(() => {
        setLoginMessage('');
      }, 1000);
   
   
   
  };

  return (
    <div>
      <Head />
      <Mid
        email={email}
        setEmail={setEmail}
        password={password}
        setPassword={setPassword}
        rememberMe={rememberMe}
        setRememberMe={setRememberMe}
        loginMessage={loginMessage}
        handleSubmit={handleSubmit} />
      <Footer />

    </div>
  );
}

export default Login;