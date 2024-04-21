import React from "react";
import styles from "../assets/styles/Help.module.css";

const UsernamePopup = ({ open, onClose }) => {
  if (!open) return null;
  const handleUsernameClick = () => {
    const text =
      "If you want to change your username you should go into your account settings.Please remember that usernames are seen by your friends in their leaderboards. Note that inappropriate usernames are not permitted.";
    const value = new SpeechSynthesisUtterance(text);
    value.voice = speechSynthesis.getVoices()[0];
    value.rate = 1.1;
    value.pitch = 2;
    window.speechSynthesis.speak(value);
   
  };
  return (
    <div className={styles.overlay}>
      <div className={styles.popupContainer}>
        <img src="/images/Logo.png" alt="" className={styles.img} />
        <div className={styles.popupRight}>
          <p onClick={onClose} className={styles.closeBtn}>
            x
          </p>
        </div>
       
        <div className={styles.content}>
          <h1>Username</h1> 
          <p>
            If you want to change your username you should go into your account settings.
            Please remember that usernames are seen by your friends in their
            leaderboards. Note that inappropriate usernames are not permitted.
          </p>
          <button
            className={styles.play_button}
            onClick={handleUsernameClick}
          ></button>
        </div>
      </div>
    </div>
  );
};

export default UsernamePopup;
