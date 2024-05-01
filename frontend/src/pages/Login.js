// Login.js
import React, { useState } from "react";
import { useHistory } from "react-router-dom";
import styles from "../assets/styles/Login.module.css"; // CSS styles
import * as API from '../services/api';                 // API services for backend communication
import { Logo, Footer } from './CommonComponents';      // Reusable components

/**
 * Head component:
 * Displays the top part of the login page including the logo.
 */
function Head() {
  return (
    <div className={styles.headBar}>
      <Logo />
    </div>
  );
}

/**
 * Mid component:
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

  // Redirects user to the Help page
  function handleHelpClick() {
    history.push('/help?prevPage=login');
  }

  return (
    <div className={styles.midBarLogin}>
      <div className={styles.midHighLogin}></div>
      <div className={styles.midCenterLogin}>
        <div className={`${styles.midBoxLogin} ${isSuccess ? styles.success : styles.error}`}>
          <h1 className={styles.midBoxTxtTitleLogin}>Log in to your account</h1>

          {/* Login Form */}
          <form onSubmit={handleSubmit}>
            {/* Email Input */}
            <div>
              {loginMessage && (
                <div className={styles.inputErrorMessage}>
                  {loginMessage}
                </div>
              )}
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
            <div>
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
            <div>
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
                Log in
              </button>
            </div>
          </form>

          {/* Forgotten Credentials Links */}
          <div className={styles.loginForgottenBtn}>
            <p className={styles.forgotUsername + " " + styles.textRight}>
              <a href="#">Forgot your email?</a>
            </p>
            <p className={styles.forgotPassword + " " + styles.textRight}>
              <a href="#">Forgot your password?</a>
            </p>
          </div>

          {/* Help Button */}
          <button className={styles.smallHelpBtn} onClick={handleHelpClick}>? Help</button>
        </div>
      </div>
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

  // Validates user input before submitting
  const isValidInput = () => {
    return email !== "" && password !== ""
  }

  // Handles login form submission
  const handleSubmit = async (e) => {
    e.preventDefault();     // Prevent the default form submission behavior

    if (!isValidInput()) {  // Invalid input
      setLoginMessage("Invalid Email or Password!");

    } else {                                
      const data = await API.getAccountByEmail(email);  // Call backend API

      if (data.length === 0) {  // Email does not exist
        setLoginMessage("Email Not Found!");

      } else {
        const account = data[0]

        if (account.state === "closed") {   // Email is suspended or closed
          setLoginMessage("Your account has been closed!");

        } else if (account.state === "suspended") {
          setLoginMessage("Your account has been suspended!");

        } else {  // Successfully login
          const username = account.username;
          setLoginMessage("Log in successfully!");
          history.push({
            pathname: "/home",
            state: { name: username, id: account.accountID },
          });
        }
      }
    }
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
