// HomePage.js
import React from 'react';
import { useHistory ,useLocation} from 'react-router-dom';
import styles from '../assets/styles/Help.module.css'; // Import CSS module
import { useCollapse } from 'react-collapsed'


/**
 * Collapsible component
 */
function Collap(props) {
    const config = {
        defaultExpanded: props.defaultExpanded || false,
        collapsedHeight: props.collapsedHeight || 0
    };
    const { getCollapseProps, getToggleProps, isExpanded } = useCollapse(config);
return (
    <div className={styles.collapsible}>
        <div className={styles.header} {...getToggleProps()}>
            <div className={styles.title}>{props.title}</div>
        </div>
        <div {...getCollapseProps()}>
            <div className={styles.content}>
                {props.children}
            </div>
        </div>
    </div>
    );
}
/**
 * Head component
 * Displays the top part of the help including the logo.
 * Utilizes useHistory from react-router-dom for navigation.
 */
function Head() {
    const history = useHistory();
    function handleLoginClick() {
        history.push({
            pathname: '/',
        });
    }

  /**
   * handleLoginClick function
   * Redirects user to the login page when the login button is clicked.
   */
  return (

    <div className={styles.headBar}>
      {/* Logo */}
      <div className={styles.headCenter}>
        <img src="/images/Logo.png" className={styles.headImg} alt="Logo" onClick={handleLoginClick}/>
      </div>
    </div>


  );
}
/**
 * Mid component
 * Displays the middle section of the help page, including user information and button redirecting to other pages.
 */
function Mid({name}) {

  return (
    <div className={styles.midBar}>
      <div className={styles.midHigh}>
      </div>

      {/* Carbon Impact Information Box */}
      <div className={styles.midCenter}>
        <img src="/images/help-center.png" className={styles.midBox} alt="Mid Box" />
      </div>

      {/* Help Button */}
      <div className={styles.midLow}>
      </div>
    </div>
  );
}

/**
 * Low component
 * Displays the lower section of the help page, including buttons for transactions, goals, and history.
 */
function Low({name,id}) {
  const history = useHistory();

  return (
    <div className={styles.lowBar}>
        <div className={styles.helpTable}>
            <div className={styles.helpTableTitle}>
                Profile Help
            </div>
            <Collap title="Changing Username">
                <label>
                Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum
                </label>
            </Collap>
            <Collap title="Password Recovery">
                <label>
                Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum
                </label>
            </Collap>
            <Collap title="How do I ">
                <label>
                Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum
                </label>
            </Collap>

            <div className={styles.helpTableTitle}>
                Site Help
            </div>
            <Collap title="How do I ">
                <label>
                Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum
                </label>
            </Collap>
            <Collap title="How do I ">
                <label>
                Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum
                </label>
            </Collap>

            <div className={styles.break} />
        </div>
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