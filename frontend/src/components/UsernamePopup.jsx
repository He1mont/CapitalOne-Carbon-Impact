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
          To access your account information, navigate to the home page and click on the user icon. From there, a menu will appear with several options. Choose 'My Account' to view your details, where you can also modify your transaction currency and adjust colour settings.
          </p>
        </div>
      </div>
    </div>
  );
};

export default UsernamePopup;
