import React from "react";
import styles from "../assets/styles/Help.module.css";

const ContactPopup = ({open, onClose}) => {
    if(!open) return null
    return(
        <div className={styles.overlay}>
            <div className={styles.contactContainer}>
                <img src="/images/Logo.png" alt="" className={styles.img} />
                <div className={styles.popupRight}>
                    <p onClick={onClose} className={styles.closeBtn}>
                    x
                    </p>
                </div>
                <div className={styles.content}>
                    <h1>Contact us</h1>
                    <p>
                    We're here to assist you with any questions, concerns, or feedback you may have. Feel free to reach out to us through any of the following channels:
                    </p>
                    <p>
                    Email: support@example.com
                    </p>
                    <p>Live Chat bot: Available on our website</p>
                </div>
        
            </div>
        </div>
    )
}

export default ContactPopup;
