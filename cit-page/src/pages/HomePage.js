import React from 'react';
import  {useHistory}  from 'react-router-dom';
import '../assets/styles/App.css';

function Head() {
  const history = useHistory();

  function handleLoginClick() {
    // Redirect to the login page
    history.push('/Login');
  }
  return (
    
    <div className="head-bar">
      {/* Logo */}
      <div className="head-center">
        <img src="Logo1.png" className="head-img" alt="Logo" />
      </div>

        {/* Login */}
      <div className="head-high-txt-right">
        <button onClick={handleLoginClick} className="login-btn">
          <img src="user.png" alt="Login" />
        </button>
      </div>

    </div>

    
  );
}

function Mid() {

  return (
    
    <div className="mid-bar">
        
      <div className="mid-high">
         {/*User name & Carbon Impact*/}
        <div className="mid-high-txt-left">
          <p>Fahad... 1234</p>
          <h1>Your Carbon Impact</h1>
        </div>

      <div className="mid-high-profile"></div>
    </div>

      <div className="mid-center">
        <img src="mid-box.png" className="mid-box" alt="Mid Box" />
        <div className="mid-box-txt">
          <h1 className="mid-box-txt-title">View your Carbon Impact</h1>
          <p>
            Find out how your spending habits affect the planet
          </p>
          <p>and how you can reduce your carbon footprint.</p>
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

function Low() {
  const history = useHistory();

  function handleTransactionsClick() {
    history.push('/Transactions');
  }

  return (
    <div className="low-bar">
      <table className="low-bar-tbl">
        <tbody>
          <tr>
            <th>
              <button className="low-bar-btn" onClick={handleTransactionsClick}>
                <img
                  src="transactions.png"
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

            <th>
              <button className="low-bar-btn">
                <img src="goal.png" className="low-bar-btn-img" alt="Goals" />
                <h2 className="low-bar-btn-title"> Carbon Goals</h2>
                <p className="low-bar-btn-sub">
                  Set goals to reduce your carbon impact in different spending
                  categories.
                </p>
              </button>
            </th>

            <th>
              <button className="low-bar-btn">
                <img
                  src="history.png"
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

function Footer() {
  return (
    <div className="footer">
      <p>© 2023-2024 Team7. All rights reserved.</p>
    </div>
  );
}

function HomePage() {
  return (
    <div>
      <Head />
      <Mid />
      <Low />
      <Footer />
    </div>
  );
}

export default HomePage;
