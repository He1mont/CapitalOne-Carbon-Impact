// HomePage.js
import React, { useState, useEffect, useRef, Component } from 'react';
import { useHistory, useLocation } from 'react-router-dom';
import styles from '../assets/styles/Home.module.css'; // Import CSS file
import { SettingBtn, Logo, Footer } from './CommonComponents';

/**
 * Head component:
 * Displays the top part of the homepage including the logo and login button.
 * Utilizes useHistory from react-router-dom for navigation.
 */
function Head({ name, id }) {
  return (
    <div className={styles.head_bar}>
      <Logo />
      <SettingBtn name={name} id={id} />
    </div>
  );
}

/**
 * Mid component
 * Displays the middle section of the homepage, includes a dropdown for help and user settings.
 */
function Mid({ name }) {
  return (
    <div className={styles.mid_bar}>
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
 * Low component:
 * Displays the lower section of the homepage, including buttons for transactions, goals, and history.
 */
function Low({ name, id }) {
  const history = useHistory();

  /**
   * Handles click event to navigate to the Transactions page.
   */
  function handleTransactionsClick() {
    history.push({
      pathname: '/home/transactions',
      state: { name: name, id: id }
    });
  }

  /**
   * Handles click event to navigate to the Goals page.
   */
  function handleGoalsClick() {
    history.push({
      pathname: '/home/goals',
      state: { name: name, id: id }
    });
  }

  /**
   * Handles click event to navigate to the History page.
   */
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
 * HomePage component
 * Composes the Head, Mid, Low, and Footer components to form the homepage.
 */
function HomePage() {
  const location = useLocation();
  const name = location.state?.name || "You need to login";
  const id = location.state?.id;
  return (
    <div>
      <Head name={name} id={id} />
      <Mid name={name} />
      <Low name={name} id={id} />
      <Footer />
    </div>
  );
}

export default HomePage;
