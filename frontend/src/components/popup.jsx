import React from "react";
import styles from "../assets/styles/Help.module.css";

const Popup = ({open, onClose}) => {
    if(!open) return null
    return(
        <div className={styles.overlay}>
            <div className={styles.popupContainer}>
                <img src="/images/Logo.png" alt="" className={styles.img} />
                <div className={styles.popupRight}>
                    <p onClick={onClose} className={styles.closeBtn}>
                    x
                    </p>
                </div>
                <div className={styles.content}>
                    <h1>About us</h1>
                    <p>
                        We are Team 7, entrusted with Capital One's project: carbon impact
                        of transactions. Guided by our team lead Andy, supported by team
                        admin Tanaya, and Lucas is our Git lead, our team includes Yanqian,
                        Timi, Benji, Fahad, and Anqi
                    </p>
                </div>
            </div>
        </div>
    )
}

export default Popup
