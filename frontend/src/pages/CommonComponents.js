// CommonComponent.js
import React, { useState } from 'react';
import { useHistory } from 'react-router-dom';
import styles from '../assets/styles/CommonComponent.module.css';

export function GoBackBtn({ name, id }) {
  const history = useHistory();

  function handleGoBackClick() {
    const params = new Proxy(new URLSearchParams(window.location.search), {
      get: (searchParams, prop) => searchParams.get(prop),
    });
    let helpPrev = params.prevPage;

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

  return (
    <div>
      <button onClick={handleGoBackClick} className={styles.go_back_btn}>
        <img src="/images/home.png" alt="Go Back" className={styles.go_back_img} />
      </button>
    </div>
  )
}

export function Logo() {
  return (
    <div className={styles.head_center}>
      <img src='/images/Logo.png' alt='Logo' className={styles.head_img} />
    </div>
  )
}

export function SettingBtn({ name, id }) {
  const history = useHistory();
  const [showDropdown, setShowDropdown] = useState(false);

  // Functions for clicking each button
  function handleMyAccountClick() {
    history.push({
      pathname: '/home/account',
      state: { name: name, id: id }
    });
    
  }
  function handleFriendsClick() {
    history.push({
      pathname: '/home/friends',
      state: { name: name, id: id }
    });
  }
  function handleHelpClick() {
    history.push({
      pathname: '/help',
      search: '?prevPage=home',
      state: { name: name, id: id }
    });
  }
  function handleSignoutClick() {
    history.push('/login');
  }
  function handleSettingsClick() {
    setShowDropdown(!showDropdown);
  }
  // Show the setting dropdown
  function showSettings() {
    if (showDropdown) {
      return (
        <div className={styles.dropdownBox}>
          <div className={styles.triangle}></div>
          {/* <div className={styles.dropdownAccName}><b>{name}</b></div> */}
          <div className={`${styles.dropdownContainer}`}>
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
  return (
    <div className={styles.head_settings_container}>
      <button onClick={handleSettingsClick} className={styles.settings_btn}>
        <img src="/images/settings.png" alt="Settings" className={styles.settings_img} />
      </button>
      {showSettings()}
    </div>
  )
}

export function Footer() {
  return (
    <div className={styles.footer}>
      <p>© 2023-2024 Team7. All rights reserved.</p>
    </div>
  );
}
