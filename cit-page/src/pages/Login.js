import React, { useState } from 'react';
import  {useHistory}  from 'react-router-dom';
import '../assets/styles/Login.css';


function Head() {
  const history = useHistory();

  function handleLoginClick() {
    // Redirect to the home page
    history.push('/');
  }
  return (
    <div className="head-bar">
      <div className="head-center">
        <img src="Logo1.png" className="head-img" alt="Logo" onClick={handleLoginClick} />
      </div>
    </div>
  );
}
function Mid({ email, setEmail, password, setPassword, rememberMe, setRememberMe, loginMessage, handleSubmit }) {
  const isSuccess = loginMessage.includes('success');
  return (
    <div className="mid-bar-login">
      <div className="mid-high-login"></div>

      <div className="mid-center-login">
        <div className={`mid-box-login ${isSuccess ? 'success' : 'error'}`}>
          <h1 className="mid-box-txt-title-login">Login to your account</h1>

          <form onSubmit={handleSubmit}>
            <div className="mb-3">
            {loginMessage && <p className="login-message">{loginMessage}</p>}
            {/* <div className='login-message-box'> </div> */}
            <div className="login-input-title">Username (email)</div>
          
              
              <input
                type="email"
                className="form-control"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
              />
            </div>
              <div className="mb-3">
                <div className="login-input-title">Password</div>
                  <input
                    type="password"
                    className="form-control"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                  />
               
                </div>
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


          


function Footer() {
  return(
    <div className="footer">
      <p>© 2023-2024 Team7. All rights reserved.</p>
    </div>
  );
}
function Login() {
   // CREATING LOCAL ID AND PASSWORD
   const [email, setEmail] = useState('');
   const [password, setPassword] = useState('');
   const [rememberMe, setRememberMe] = useState(false);
   const [loginMessage, setLoginMessage] = useState('');
 
   // HANDLING CHANGES
  // const handleEmailChange = (e) => setEmail(e.target.value);
   //const handlePasswordChange = (e) => setPassword(e.target.value);
   //const handleRememberMeChange = () => setRememberMe(!rememberMe);
 
   const handleSubmit = (e) => {
     e.preventDefault();
 
     // For testing purposes, you can check hardcoded values
     const correctEmail = 'test@example.com';
     const correctPassword = 'Test@123'; // Example password with special character, number, and capital letter
 
     if (email === correctEmail && password === correctPassword) {
       // Successful login
       setLoginMessage('Logged in successfully!');
       // You might want to redirect or perform other actions here
    //  } 
     }
     if(email===''){
      setLoginMessage('Please enter your username.');
      e.preventDefault();
     }
     else if(password===''){
      setLoginMessage('Please enter your password.');
     }
     else if(email===''&& password===''){
      setLoginMessage('Please enter your email and password.');
     }
     if (email !== correctEmail && password !== correctPassword) {
      setLoginMessage('Username or password is incorrect.');
    }
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
        handleSubmit={handleSubmit}/>
       <Footer/>
      
   </div>
  );
}

export default Login;