import React from "react";
import styles from "../assets/styles/Help.module.css";

const Tickets = ({open, onClose}) => {
    if(!open) return null
    return(
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
                <div className={styles.content2}>
                    <h1 className={styles.title}>Tickets</h1>
                    <p>
                    If you're experiencing issues, try asking the chatbot for help with prompts like "I need help", "I can't log in," "What is my username", or "What is a carbon score?". If the problem persists, consider creating a ticket. Using the command "I want to create a ticket". 
                    </p>
                </div>
            </div>
        </div>
    )
}

export default Tickets
