// HomePage.js
import React from 'react';
import { useHistory ,useLocation} from 'react-router-dom';
import '../assets/styles/App.css';

/**
 * Head component
 * Displays the top part of the homepage including the logo and login button.
 * Utilizes useHistory from react-router-dom for navigation.
 */
function Head() {
  const history = useHistory();

  /**
   * handleLoginClick function
   * Redirects user to the login page when the login button is clicked.
   */
  function handleLoginClick() {
    history.push('/Login');
  }
  return (

    <div className="head-bar">
      {/* Logo */}
      <div className="head-center">
        <img src="/images/Logo.png" className="head-img" alt="Logo" />
      </div>

      {/* Login */}
      <div className="head-high-txt-right">
        <button onClick={handleLoginClick} className="login-btn">
          <img src="/images/user.png" alt="Login" />
        </button>
      </div>

    </div>


  );
}
/**
 * Mid component
 * Displays the middle section of the homepage, including user information and button redirecting to other pages.
 */
function Mid({name}) {
  return (
    <div className="mid-bar">

      {/* User Information and Carbon Impact Section */}
      <div className="mid-high">
        <div className="mid-high-txt-left">
          <p>{name }</p> 
          <h1>Your Carbon Impact</h1>
        </div>
        <div className="mid-high-profile"></div>
      </div>

      {/* Carbon Impact Information Box */}
      <div className="mid-center">
        <img src="/images/mid-box.png" className="mid-box" alt="Mid Box" />

        <div className="mid-box-txt">
          <h1 className="mid-box-txt-title">View your Carbon Impact</h1>
          <p className="mid-box-txt-line">
            Find out how your spending habits affect the planet
          </p>
          <p className="mid-box-txt-line">
            and how you can reduce your carbon footprint.
          </p>
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
 * Low component
 * Displays the lower section of the homepage, including buttons for transactions, goals, and history.
 */
function Low({name,id}) {
  const history = useHistory();
 
  /**
   * handleTransactionsClick function
   * Redirects user to the transactions page when the transactions button is clicked.
   */
  function handleTransactionsClick() {
    //history.push('/Transactions');
   
    history.push({
      
      pathname: '/Transactions',
      state: { name:name,  id:id }
    });
  }
  function handleGoalsClick() {
    history.push('/Goals');
  }

  return (
    <div className="low-bar">
      {/* Interactive Buttons for Transactions, Goals, and History */}
      <table className="low-bar-tbl">
        <tbody>
          <tr>
             {/* Transactions Button */}
            <th>
              <button className="low-bar-btn" onClick={handleTransactionsClick}>
                <img
                  src="/images/transactions.png"
                  className="low-bar-btn-img"
                  alt="Transactions"
                />
                <h2 className="low-bar-btn-title"> View Transactions</h2>
                <p className="low-bar-btn-sub">
                  View the individual carbon impact of each transaction you
                  make.
                </p>
              </button>
            </th>

            {/* Goals Button */}
            <th>
              <button className="low-bar-btn" onClick={handleGoalsClick}>
                <img src="/images/goal.png" className="low-bar-btn-img" alt="Goals" />
                <h2 className="low-bar-btn-title"> Carbon Goals</h2>
                <p className="low-bar-btn-sub">
                  Set goals to reduce your carbon impact in different spending
                  categories.
                </p>
              </button>
            </th>

            {/* History Button */}
            <th>
              <button className="low-bar-btn">
                <img
                  src="/images/history.png"
                  className="low-bar-btn-img"
                  alt="History"
                />
                <h2 className="low-bar-btn-title"> Carbon History</h2>
                <p className="low-bar-btn-sub">
                  View your carbon impact over time to see how you’ve improved.
                </p>
              </button>
            </th>
          </tr>
        </tbody>
      </table>
    </div>
  );
}

/**
 * Footer component
 * Displays the footer of the homepage, including copyright information.
 */
function Footer() {
  return (
    <div className="footer">
      <p>© 2023-2024 Team7. All rights reserved.</p>
    </div>
  );
}
/**
 * HomePage component
 * Composes the Head, Mid, Low, and Footer components to form the homepage.
 */
function HomePage() {
  const history = useHistory();
  const location = useLocation();
  const name = location.state?.name || "You need to login"; 
  const id=location.state?.id ;
  return (
    <div>
      <Head />
      <Mid name={name}/>
      <Low name={name} id={id}/>
      <Footer />
    </div>
  );
}

export default HomePage;
