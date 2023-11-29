import React from 'react';
import '../assets/styles/Login.css';

function Head() {
  return (
    <div className="head-bar">
      <div className="head-center">
        <img src="CapitalOneLogo.png" className="head-img" alt="Logo" />
      </div>
    </div>
  );
}
function Mid() {
  return (
    <div className="mid-bar-login">
      <div className="mid-high-login">
      </div>

      <div className="mid-center-login">
        <div className="mid-box-login">
          <h1 className="mid-box-txt-title-login">Login to your account</h1>
          <form className="login-form">
            <div className="mb-3">
              <div className="login-input-title">Username (email)</div>
              <input
              type="email"
              className="form-control"
              />
            </div>
          <div className="mb-3">
            <div className="login-input-title">Password</div>
          <input
            type="password"
            className="form-control"
          />
        </div>

        <div className="mb-3">
          <div className="login-remember">
            <div className="custom-control custom-checkbox">
              <input
                type="checkbox"
                className="custom-control-input"
                id="customCheck1"
              />
              <label className="custom-control-label" htmlFor="customCheck1">
                Remember me
              </label>
            </div>
          </div>
        </div>
        
        <div className="d-grid">
          <button type="submit" className="login-btn-submit">
            Sign in
          </button>
        </div>
        </form>
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

      <div className="mid-low">
        <div className="mid-low-help">
          <button className="small-help-btn">? Help</button>
        </div>
      </div>
    </div>
  );
}


function Login() {
  return (
    <div>
       <Head />
       <Mid/>  
   </div>
  );
}

export default Login;