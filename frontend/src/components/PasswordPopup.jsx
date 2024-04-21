import React from "react";
import styles from "../assets/styles/Help.module.css";

const PasswordPopup = ({open, onClose}) => {
    if(!open) return null
    return(
        <div className={styles.overlay} onClick={onClose}>
        <div onCLick={(e)=>{
           e.stopPropagation()
       }} className={styles.passwordContainer}>
                <img src="/images/Logo.png" alt="" className={styles.img} />
                <div className={styles.popupRight}>
                    <p onClick={onClose} className={styles.closeBtn}>
                    x
                    </p>
                </div>
                <div className={styles.content2}>
                    <h1 className={styles.title}>Password recovery</h1>
                    <p>
                    If you've forgotten your password or are having trouble logging in, don't worry, we're here to help you regain access to your account.
                    Visit the Login Page: Navigate to the login page.
                    </p>
                    <ul>
                        <li>Visit the Login Page: Navigate to the login page of our platform.</li>
                        <li>Click on "Forgot Password?": Below the login form, you'll find a "Forgot Password?" link. Click on it.</li>
                        <li>Enter Your Email: Provide the email address associated with your account.</li>
                        <li>Check Your Inbox: We'll send you an email with instructions on how to reset your password.</li>
                    </ul>
                </div>
            </div>
        </div>
    )
}

export default PasswordPopup;
