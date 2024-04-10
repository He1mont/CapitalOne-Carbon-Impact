// HomePage.js
import React, { useState, useEffect, useRef, Component }  from 'react';
import { useHistory, useLocation } from 'react-router-dom';
import styles from '../assets/styles/Home.module.css'; // Import CSS file

/**
 * Head component
 * Displays the top part of the homepage including the logo and login button.
 * Utilizes useHistory from react-router-dom for navigation.
 */
function Head() {
  const history = useHistory();
  const params = new Proxy(new URLSearchParams(window.location.search), {
    get: (searchParams, prop) => searchParams.get(prop),
  });
  let settingsToggle = params.st;

  function handleSettingsClick() {
    if (settingsToggle == "t") {
      history.push('/home?st=f');
    } else {
      history.push('/home?st=t');
    }
    
  }
  /**
   * handleLoginClick function
   * Redirects user to the login page when the login button is clicked.
   */

  return (
    <div className={styles.head_bar}>
      {/* Logo */}
      <div className={styles.head_center}>
        <img src="/images/Logo.png" className={styles.head_img} alt="Logo" />
      </div>

      {/* Settings */}
      <div className={styles.head_settings_container}>
        <button onClick={handleSettingsClick} className={styles.settings_btn}>
          <img src="/images/settings.png" alt="Settings" className={styles.settings_img}/>
        </button>
      </div>
    </div>
  );
}

/**
 * Mid component
 * Displays the middle section of the homepage, including user information and button redirecting to other pages.
 */
function Mid({ name }) {
  const history = useHistory();
  const params = new URLSearchParams(useLocation().search);
  const settingsToggle = params.get("st");
  const dropdownRef = useRef(null);

  function handleHelpClick() {
    history.push('/help');
  }
  function handleSignoutClick() {
    history.push('/login');
  }

  function showSettings() {
    if (settingsToggle == "t") {
      return (
        <div className={styles.dropdownBox} ref={dropdownRef}>
          <div className={styles.triangle}></div>
          <div className={styles.dropdownAccName}><b>{name}</b></div>
          <div className={`${styles.dropdownContainer}`}>
            <div className={styles.dropdownBtn} style={{ top: '32px' }}>
              <img src="/images/user.png" alt="Settings" className={styles.dropdownImg}/>
              <div className={styles.dropdownTxt}><b>My Account</b></div>
            </div>
            <div className={styles.dropdownBtn} style={{ top: '82px' }} onClick={handleHelpClick}>
              <img src="/images/help.png" alt="Settings" className={styles.dropdownImg}/>
              <div className={styles.dropdownTxt}><b>Help</b></div>
            </div>
            <div className={styles.dropdownBtn} style={{ top: '130px' }} onClick={handleSignoutClick}>
              <img src="/images/signout.png" alt="Settings" className={styles.dropdownImg}/>
              <div className={styles.dropdownTxt}><b>Sign Out</b></div>
            </div>
          </div> 
        </div>
      )
    } else {
    }
  }

  return (
    <div className={styles.mid_bar}>
      {showSettings()}
      {/* User Information and Carbon Impact Section */}
      <div className={styles.mid_high}>
        
        <div className={styles.mid_high_txt_left}>
          <p>{name}</p>
          <h1>Your Carbon Impact</h1>
        </div>
      </div>

      {/* Carbon Impact Information Box */}
      <div className={styles.mid_center}>
        <img src="/images/mid-box-slim.png" className={styles.mid_box} alt="Mid Box" />
        <div className={styles.mid_box_txt}>
          <h2 className={styles.mid_box_txt_title}>View your Carbon Impact</h2>
          <p className={styles.mid_box_txt_line}>
            Find out how your spending habits affect the planet
          </p>
          <p className={styles.mid_box_txt_line}>
            and how you can reduce your carbon footprint.
          </p>
        </div>
      </div>

      {/* Help Button */}
      <div className={styles.mid_low}>
      </div>
    </div>
  );
}

/**
 * Low component
 * Displays the lower section of the homepage, including buttons for transactions, goals, and history.
 */
function Low({ name, id }) {
  const history = useHistory();

  /**
   * handleTransactionsClick function
   * Redirects user to the transactions page when the transactions button is clicked.
   */
  function handleTransactionsClick() {
    history.push({
      pathname: '/home/transactions',
      state: { name: name, id: id }
    });
  }

  function handleGoalsClick() {
    history.push({
      pathname: '/home/goals',
      state: { name: name, id: id }
    });
  }

  function handleHistoryClick() {
    history.push({
      pathname: '/home/history',
      state: { name: name, id: id }
    });
  }

  return (
    <div className={styles.low_bar}>
      {/* Interactive Buttons for Transactions, Goals, and History */}
      <table className={styles.low_bar_tbl}>
        <tbody>
          <tr>
            {/* Transactions Button */}
            <th>
              <button className={styles.low_bar_btn} onClick={handleTransactionsClick}>
                <img
                  src="/images/transactions.png"
                  className={styles.low_bar_btn_img}
                  alt="Transactions"
                />
                <h2 className={styles.low_bar_btn_title}> View Transactions</h2>
                <p className={styles.low_bar_btn_sub}>
                  View the individual carbon impact of each transaction you
                  make.
                </p>
              </button>
            </th>

            {/* Goals Button */}
            <th>
              <button className={styles.low_bar_btn} onClick={handleGoalsClick}>
                <img src="/images/goal.png" className={styles.low_bar_btn_img} alt="Goals" />
                <h2 className={styles.low_bar_btn_title}> Carbon Goals</h2>
                <p className={styles.low_bar_btn_sub}>
                  Set goals to reduce your carbon impact in different spending
                  categories.
                </p>
              </button>
            </th>

            {/* History Button */}
            <th>
              <button className={styles.low_bar_btn} onClick={handleHistoryClick}>
                <img
                  src="/images/history.png"
                  className={styles.low_bar_btn_img}
                  alt="History"
                />
                <h2 className={styles.low_bar_btn_title}> Carbon History</h2>
                <p className={styles.low_bar_btn_sub}>
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
    <div className={styles.footer}>
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
  const id = location.state?.id;
  return (
    <div>
      <Head />
      <Mid name={name} />
      <Low name={name} id={id} />
      <Footer />
    </div>
  );
}

export default HomePage;
