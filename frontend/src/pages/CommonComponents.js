// CommonComponent.js
import React, { useState } from 'react';
import { useHistory } from 'react-router-dom';
import styles from '../assets/styles/CommonComponent.module.css';

/**
 * Renders a Go Back button that navigates the user to the home page.
 * @param {string} name - username of the user
 * @param {string} id - accountID of the user
 */
export function GoBackBtn({ name, id }) {
  const history = useHistory();

  // Handles the click event on the Go Back button
  function handleGoBackClick() {
    // Using a Proxy to read URL search parameters
    const params = new Proxy(new URLSearchParams(window.location.search), {
      get: (searchParams, prop) => searchParams.get(prop),
    });
    let helpPrev = params.prevPage;  // Get previous page from URL search parameters

    // Redirect based on the previous page
    if (helpPrev === "login") {
      history.push({
        pathname: '/login',
      });
    } else {
      history.push({
        pathname: '/home',
        state: { name: name, id: id }
      });
    }
  }

  // Render Go Back button
  return (
    <div>
      <button onClick={handleGoBackClick} className={styles.go_back_btn}>
        <img src="/images/home.png" alt="Go Back" className={styles.go_back_img} />
      </button>
    </div>
  )
}

/**
 * Renders the logo of this project
 */
export function Logo() {
  return (
    <div className={styles.head_center}>
      <img src='/images/Logo.png' alt='Logo' className={styles.head_img} />
    </div>
  )
}

/**
 * Render and manage a settings button with a dropdown menu
 * @param {string} name - username of the user
 * @param {string} id - accountID of the user
 */
export function SettingBtn({ name, id }) {
  const history = useHistory();
  const [showDropdown, setShowDropdown] = useState(false);

  // Handlers for clicking button MyAccount
  function handleMyAccountClick() {
    history.push({
      pathname: '/home/account',
      state: { name: name, id: id }
    });
  }
  // Handlers for clicking button Friend
  function handleFriendsClick() {
    history.push({
      pathname: '/home/friends',
      state: { name: name, id: id }
    });
  }
  // Handlers for clicking button Help
  function handleHelpClick() {
    history.push({
      pathname: '/help',
      search: '?prevPage=home',
      state: { name: name, id: id }
    });
  }
  // Handlers for clicking button Sign Out
  function handleSignoutClick() {
    history.push('/login');
  }
  // Handlers for clicking button setting
  function handleSettingsClick() {
    setShowDropdown(!showDropdown);
  }

  // Render the settings dropdown if it is visible
  function showSettings() {
    if (showDropdown) {
      return (
        <div className={styles.dropdownBox}>
          <div className={styles.triangle}></div>
          <div className={`${styles.dropdownContainer}`}>
            {/* Button elements for different settings options */}
            <div className={styles.dropdownBtn} style={{ top: '30px' }} onClick={handleMyAccountClick}>
              <img src="/images/user.png" alt="Settings" className={styles.dropdownImg} />
              <div className={styles.dropdownTxt}><b>My Account</b></div>
            </div>
            <div className={styles.dropdownBtn} style={{ top: '80px' }} onClick={handleFriendsClick}>
              <img src="/images/friends.png" alt="Settings" className={styles.dropdownImg} />
              <div className={styles.dropdownTxt}><b>Friends</b></div>
            </div>
            <div className={styles.dropdownBtn} style={{ top: '130px' }} onClick={handleHelpClick}>
              <img src="/images/help.png" alt="Settings" className={styles.dropdownImg} />
              <div className={styles.dropdownTxt}><b>Help</b></div>
            </div>
            <div className={styles.dropdownBtn} style={{ top: '180px' }} onClick={handleSignoutClick}>
              <img src="/images/signout.png" alt="Settings" className={styles.dropdownImg} />
              <div className={styles.dropdownTxt}><b>Sign Out</b></div>
            </div>
          </div>
        </div>
      )
    }
  }
  
  // Render the settings button with conditional dropdown rendering
  return (
    <div className={styles.head_settings_container}>
      <button onClick={handleSettingsClick} className={styles.settings_btn}>
        <img src="/images/settings.png" alt="Settings" className={styles.settings_img} />
      </button>
      {showSettings()}
    </div>
  )
}

/**
 * Renders a Footer that shows at the bottom of the page
 */
export function Footer() {
  return (
    <div className={styles.footer}>
      <p>© 2023-2024 Team7. All rights reserved.</p>
    </div>
  );
}
