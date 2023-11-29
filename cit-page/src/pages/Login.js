import React, { useState } from 'react';
import '../assets/styles/Login.css';
function Head() {
  return (
    <div className="head-bar">
      <div className="head-center">
        <img src="Logo1.png" className="head-img" alt="Logo" />
      </div>
    </div>
  );
}

function Mid({ email, setEmail, password, setPassword, rememberMe, setRememberMe, loginMessage, handleSubmit }) {
  const isSuccess = loginMessage.includes('success');

  return (
    <div className="mid-bar-login">
      <div className="mid-high-login">
        <div className="mid-high-profile-login"></div>
      </div>

      <div className="mid-center-login">
        <div className={`mid-box-login ${isSuccess ? 'success' : 'error'}`}>
          <h1 className="mid-box-txt-title-login">Login page</h1>
          {loginMessage && <p className="login-message">{loginMessage}</p>}
          <form onSubmit={handleSubmit}>
            <div className="mb-3">
              <label>Email address</label>
              <br></br>
              <input
                type="email"
                className="form-control"
                placeholder="Enter email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
              />
            </div>
            <div className="mb-3">
              <label>Password</label>
              <br></br>
              <input
                type="password"
                className="form-control"
                placeholder="Enter password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
              />
            </div>
            <div className="mb-3">
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
            <div className="d-grid">
              <button type="submit" className="btn btn-primary">
                Submit
              </button>
            </div>
          </form>
          <p className="forgot-password text-right">
            Forgot <a href="#">password?</a>
          </p>
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

// function Low() {
//   return (
//     <div className="low-bar">
//       <table className="low-bar-tbl">
//         <tbody>
//           <tr>
//             <th>
//               <button className="low-bar-btn">
//                 <img
//                   src="transactions.png"
//                   className="low-bar-btn-img"
//                   alt="Login"
//                 />
//                 <h2 className="low-bar-btn-title">Login</h2>
//                 <p className="low-bar-btn-sub">
//                   test
//                 </p>
//               </button>
//             </th>

          
//           </tr>
//         </tbody>
//       </table>
//     </div>
//   );
//}

function Footer() {
  return (
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
   const handleEmailChange = (e) => setEmail(e.target.value);
   const handlePasswordChange = (e) => setPassword(e.target.value);
   const handleRememberMeChange = () => setRememberMe(!rememberMe);
 
   const handleSubmit = (e) => {
     e.preventDefault();
 
     // For testing purposes, you can check hardcoded values
     const correctEmail = 'test@example.com';
     const correctPassword = 'Test@123'; // Example password with special character, number, and capital letter
 
     if (email === correctEmail && password === correctPassword) {
       // Successful login
       setLoginMessage('Logged in successfully!');
       // You might want to redirect or perform other actions here
     } else {
       // Failed login
       setLoginMessage('Username or password is incorrect.');
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
        handleSubmit={handleSubmit}/>
       <Footer/>
      
   </div>
   
   
  );
}
// function HomePage() {
//   return (
//     <div>
//       <Head />
//       <Mid />
//       <Low />
//     </div>
//   );
// }

export default Login;