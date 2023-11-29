import React from 'react';
import './Login.css';
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
  // const history = useHistory();

  // function handleLoginClick() {
  //   // Redirect to the login page
  //   history.push('/login');
  // }

  return (
    <div className="mid-bar-login">
      <div className="mid-high-login">
        {/* <div className="mid-high-txt-left">
          <p>Benjamin ... 1234</p>
          <h1>Your Carbon Impact</h1>
        </div> */}
        {/* <div className="mid-high-txt-right">
          <button className="login-btn" onClick={handleLoginClick}>
            Login
          </button>
        </div> */}
        <div className="mid-high-profile-login"></div>
      </div>

      <div className="mid-center-login">
        <div className="mid-box-login">
        <h1 className="mid-box-txt-title-login">Login page</h1>
        <form>
          <div className="mb-3">
            <label>Email address</label>
            <br></br>
            <input
              type="email"
              className="form-control"
              placeholder="Enter email"
            />
          </div>
          <div className="mb-3">
          <label>Password</label>
          <br></br>
          <input
            type="password"
            className="form-control"
            placeholder="Enter password"
  
          />
        </div>

        <div className="mb-3">
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
        <div className="d-grid">
          <button type="submit" className="btn btn-primary">
            Submit
          </button>
        </div>
        {/* <p className="forgot-password text-right">
          Forgot <a href="#">password?</a>
        </p> */}
        </form>
        <p className="forgot-password text-right">
          Forgot <a href="#">password?</a>
        </p>
        </div>
        <div className="mid-box-txt-login">
          
          {/* <p>
            Find out how your spending habits affect the planet
          </p>
          <p>and how you can reduce your carbon footprint.</p> */}
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
function Login() {
  return (
    <div>
       <Head />
       <Mid/>
      
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