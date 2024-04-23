// Setting.js
import React, { useState } from 'react';
import { useHistory } from 'react-router-dom';
import styles from '../assets/styles/Setting.module.css';
// import { Transactions } from './Transactions';

function Head({ name, id }) {
    const history = useHistory();
    function handleHomeClick() {
        history.push({
            pathname: '/home',
            state: { name: name, id: id }
        });
    }
    return (
        <div className={styles.head_bar}>
            <div className={styles.head_center}>
                <img src='/images/Logo.png' alt='Logo' className={styles.head_img} onClick={handleHomeClick} />
            </div>
        </div>
    )
}

function Mid() {

    return (
        <div className={styles.mid_bar}>

            {/* Carbon Goal */}
            <div className={styles.mid_high}>
                <div className={styles.mid_high_txt_left}>
                    <h1>Carbon Goal</h1>
                </div>
            </div>
        </div>
    );
}

function Low() {
    const [expectedGoal, setExpectedGoal] = useState(0); // State for the expected goal
    const [actualCarbon, setActualCarbon] = useState(0); // State for the actual carbon emissions
    const history = useHistory();

    // Function to handle navigation to the Goal page (Goal.js)
    const handlegoToGoalPageClick = () => {
        history.push('/Goal');
    };

    // Function to handle changing the expected goal
    const handleGoalChangeClick = (event) => {
        setExpectedGoal(event.target.value);
    };

    // Function to set the actual carbon emissions
    const handleActualCarbonChange = (carbonValue) => {
        setActualCarbon(carbonValue);
    };

    // Function to handle comparing expected goal with actual carbon emissions
    const compareGoal = () => {
        // Compare expected goal with actual carbon emissions
        const percentageDifference = ((actualCarbon - expectedGoal) / expectedGoal) * 100;
        if (percentageDifference > 0) {
            return `${Math.abs(percentageDifference).toFixed(2)}% Worse than the goal`;
        } else if (percentageDifference < 0) {
            return `${Math.abs(percentageDifference).toFixed(2)}% Better than the goal`;
        } else {
            return `Equal to the goal`;
        }
    };

    return (
        <div className={styles.low}>
            {/* Set the expected goal */}
            <div className={styles.inputContainer}>
                <label htmlFor="expected-goal">Expected Goal:</label>
                <input
                    type="number"
                    id="expected-goal"
                    value={expectedGoal}
                    onChange={handleGoalChangeClick}
                />
            </div>
            {/* Pass the handler to receive the actual carbon emissions */}
            {/* <div>
                <Transactions onActualCarbonChange={handleActualCarbonChange} />
                <Low actualCarbon={actualCarbon} />
            </div> */}
            {/* Show the comparison result */}
            <div className={styles.resultContainer}>
                <p>{compareGoal()}</p>
            </div>
            {/* 'Details' button to navigate to the Goal page */}
            <button className={styles.detailsButton} onClick={handlegoToGoalPageClick}>Details</button>
        </div>
    );
}

function Footer() {
    return (
        <div className={styles.footer}>
            <p>© 2023-2024 Team7. All rights reserved.</p>
        </div>
    );
}

function CarbonGoal() {
    return (
        <div>
            <Head />
            <Mid />
            <Low />
            <Footer />
        </div>
    );
}

export default CarbonGoal;