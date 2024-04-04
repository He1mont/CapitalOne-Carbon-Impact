// Login.js
import React, { useState } from "react";
import { useHistory } from "react-router-dom";
import styles from "../assets/styles/Login.module.css";
import axios from "axios";
import * as API from '../services/api';
import Sorter from '../services/sorter';


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

  return (
    <div className={styles.headBar}>
      <div className={styles.headCenter}>
        <img
          src="/images/Logo.png"
          className={styles.headImg}
          alt="Logo"
        />
      </div>
    </div>
  );
}

/**
 * Mid component
 * Renders the login form including fields for email, password and a remember me checkbox.
 * @param {Object} props - Contains email, setEmail, password, setPassword, rememberMe, setRememberMe, loginMessage, and handleSubmit.
 */
function Mid({
  email,
  setEmail,
  password,
  setPassword,
  rememberMe,
  setRememberMe,
  loginMessage,
  handleSubmit,
}) {
  // Determines if the login message indicates a successful login
  const isSuccess = loginMessage.includes("success");
  const history = useHistory();
  function handleHelpClick() {
    history.push('/Help?prevPage=login');
  }

  return (
    <div className={styles.midBarLogin}>
      <div className={styles.midHighLogin}></div>

      <div className={styles.midCenterLogin}>
        <div className={`${styles.midBoxLogin} ${isSuccess ? styles.success : styles.error}`}>
          <h1 className={styles.midBoxTxtTitleLogin}>Login to your account</h1>

          {/* Login Form */}
          <form onSubmit={handleSubmit}>
            {/* Email Input */}
            <div className={styles.mb3}>
              {loginMessage && <p className={styles.loginMessage}>{loginMessage}</p>}
              {/* <div className='login-message-box'> </div> */}
              <div className={styles.loginInputTitle}>Email</div>
              <input
                type="email"
                className={styles.formControl}
                aria-label="Email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
              />
            </div>

            {/* Password Input */}
            <div className={styles.mb3}>
              <div className={styles.loginInputTitle}>Password</div>
              <input
                type="password"
                className={styles.formControl}
                aria-label="Password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
              />
            </div>

            {/* Remember Me Checkbox */}
            <div className={styles.mb3}>
              <div className={styles.loginRemember}>
                <div className={styles.customControl}>
                  <input
                    type="checkbox"
                    className={styles.customControlInput}
                    id="customCheck1"
                    checked={rememberMe}
                    onChange={() => setRememberMe(!rememberMe)}
                  />
                  <label
                    className={styles.customControlLabel}
                    htmlFor="customCheck1"
                  >
                    Remember me
                  </label>
                </div>
              </div>
            </div>

            {/* Submit Button */}
            <div className={styles.dGrid}>
              <button type="submit" className={styles.loginBtnSubmit}>
                Sign in
              </button>
            </div>
          </form>

          {/* Forgotten Credentials Links */}
          <div className={styles.loginForgottenBtn}>
            <p className={styles.forgotUsername + " " + styles.textRight}>
              <a href="#">Forgot your username?</a>
            </p>
            <p className={styles.forgotPassword + " " + styles.textRight}>
              <a href="#">Forgot your password?</a>
            </p>
          </div>

          {/* Help Button */}
          <button className={styles.smallHelpBtn} onClick={handleHelpClick}>? Help</button>
          
        </div>
      </div>

      
      <div className={styles.midLow}>
        <div className={styles.midLowHelp}>
          
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
    <div className={styles.footer}>
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
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [rememberMe, setRememberMe] = useState(false);
  const [loginMessage, setLoginMessage] = useState("");
  const history = useHistory();

  /**
   * handleSubmit function
   * Handles the form submission for logging in.
   * Validates the user credentials and sets appropriate login messages.
   * @param {Event} e - Event triggered on form submission.
   */
  const handleSubmit = async (e) => {
    e.preventDefault();

    if (email === "" && password === "") {
      setLoginMessage("Please enter your email and password.");
    } else if (password === "") {
      setLoginMessage("Please enter your password.");
    } else if (email === "") {
      setLoginMessage("Please enter your email.");
    }

    // call backend API
    const data = await API.getAccountByEmail(email);

    // email does not exist
    if (data.length === 0) {
      setLoginMessage("Email Not Found!");

    } else {
      const account = data[0]

      // email is suspended or closed
      if (account.state === "closed") {
        setLoginMessage("Your account has been closed!");
  
      } else if (account.state === "suspended") {
        setLoginMessage("Your account has been suspended!");
  
      // email is open or flagged
      } else {
        const username = account.username;
        setLoginMessage("Log in successfully!");
        history.push({
          pathname: "/",
          state: { name: username, id: account.accountID },
        });
      }
    }



    // Clear login message after a delay
    setTimeout(() => {
      setLoginMessage("");
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
        handleSubmit={handleSubmit}
      />
      <Footer />
    </div>
  );
}

export default Login;
