import React from "react";
import styles from "../assets/styles/Help.module.css";

const ResponsePopup = ({ open, onClose, response }) => {
  console.log("Response prop:", response);
  if (!open) return null;

  return (
    <div className={styles.overlay} onClick={onClose}>
      <div
        onClick={(e) => {
          e.stopPropagation();
        }}
        className={styles.popupContainer}
      >
        {/* Logo */}
        <img src="/images/Logo.png" alt="" className={styles.img} />

        {/* Close button */}
        <div className={styles.popupRight}>
          <p onClick={onClose} className={styles.closeBtn}>
            x
          </p>
        </div>

        {/* Popup content */}
        <div className={styles.content}>
          <h1>Response</h1>
          <p>{response}</p>
        </div>
      </div>
    </div>
  );
};

export default ResponsePopup;
