import React from "react";
import styles from "../assets/styles/Help.module.css";

const FAQ = ({open, onClose}) => {
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
                    <h1>Frequently Asked Questions (FAQs)</h1>
                    <h2>1. How does the platform calculate my carbon impact?</h2>
                    <p>Our platform analyses your transaction data and calculates the carbon emissions associated with your purchases based on factors such as merchant code and is it was an online or in person purchase.</p>
                    <h2>2. How can I set carbon goals?</h2>
                    <p>Setting carbon goals is easy! Simply navigate to your carbon goals page. From there, you can set targets carbon score for that month.</p>
                    
                    <h2>3. Can I compare my carbon scores with my friends?</h2>
                    <p>Absolutely! Our platform allows you to compare your carbon scores with your friends in a leaderboard format. You can see how your carbon impact stacks up against your peers and motivate each other to make sustainable choices. It's a fun and engaging way to track your progress and work towards a greener future together!</p>
                    
                    <h2>4. How often are carbon scores updated?</h2>
                    <p>Your carbon scores are updated regularly based on the latest transaction data. Our website calculates your carbon impact in real-time. This ensures that you have up-to-date information to track your progress and make informed decisions about reducing your carbon footprint.</p>
                    <h2>5. How does the platform work?</h2>
                    <p>Our platform is designed to help users understand and reduce their carbon footprint by providing insights into the environmental impact of their transactions.</p> 
                    <h2>6. Is my data secure on the platform?</h2>
                    <p>We take the security and privacy of your data very seriously. Our platform uses industry-standard encryption and security measures to protect your information. We adhere to strict data protection regulations and do not share your personal data with third parties without your consent.</p>
                </div>
            </div>
        </div>
    )
}

export default FAQ
