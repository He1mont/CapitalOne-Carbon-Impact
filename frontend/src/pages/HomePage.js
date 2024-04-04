// HomePage.js
import React from 'react';
import { useHistory, useLocation } from 'react-router-dom';
import styles from '../assets/styles/Home.module.css'; // Import CSS file

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
    history.push('/');
  }
  return (
    <div className={styles.head_bar}>
      {/* Logo */}
      <div className={styles.head_center}>
        <img src="/images/Logo.png" className={styles.head_img} alt="Logo" />
      </div>

      {/* Login */}
      <div className={styles.head_high_txt_right}>
        <button onClick={handleLoginClick} className={styles.login_btn}>
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
function Mid({ name }) {
  const history = useHistory();
  function handleHelpClick() {
    history.push('/Help');
    console.log("AHHH")
  }
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
        <img src="/images/mid-box.png" className={styles.mid_box} alt="Mid Box" />
        <div className={styles.mid_box_txt}>
          <h1 className={styles.mid_box_txt_title}>View your Carbon Impact</h1>
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
        <button className={styles.small_help_btn} onClick={handleHelpClick}>? Help</button>
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
      pathname: '/Transactions',
      state: { name: name, id: id }
    });
  }

  function handleGoalsClick() {
    history.push({
      pathname: '/Goals',
      state: { name: name, id: id }
    });
  }

  function handleHistoryClick() {
    history.push({
      pathname: '/History',
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
