import React from "react";
import styles from "../assets/styles/Help.module.css";

const UsernamePopup = ({ open, onClose }) => {
  if (!open) return null;
  return (
    <div className={styles.overlay} onClick={onClose}>
             <div onCLick={(e)=>{
                e.stopPropagation()
            }} className={styles.popupContainer}>
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
        </div>
      </div>
    </div>
  );
};

export default UsernamePopup;
