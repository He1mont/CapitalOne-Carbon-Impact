// History.js
import React, { Component } from 'react';
import moment from 'moment';
import styles from '../assets/styles/History.module.css';
import '../utils/Tools'
import { useHistory ,useLocation} from 'react-router-dom';
import getAllAccounts from '../utils/Tools';



/**
 * Head component
 * Renders the header of the Transactions page, including a logo.
 */
function Head({name,id}) {
  const history = useHistory();
  function handleLoginClick() {
    history.push({
      pathname: '/',
      state: { name:name, id:id }
    });
    
  }
  return (
    <div className={styles.head_bar}>
      <div className={styles.head_center}>
        <img src='/images/Logo.png' alt='Logo' className={styles.head_img} onClick={handleLoginClick}/>
      </div>
    </div>
  )
}

/**
 * Mid component
 * Renders the middle section of the Transactions page, providing contextual information and additional controls.
 */
function Mid({name}) {
  return (
    <div className={styles.mid_bar}>
      {/* User Information and Transaction Overview */}
      <div className={styles.mid_high}>
        <div className={styles.mid_high_txt_left}>
          <p>{name}</p>
          <h1>Carbon History</h1>
        </div>
        <div className={styles.mid_high_center}>
          
        </div>
        <div className={styles.mid_high_profile}>
        </div>
      </div>

      

      <div className={styles.mid_low}></div>
    </div>
  )
}

/**
 * Low component
 * Renders the lower section of the Transactions page, mainly comprising the TransactionTbl component.
 */
function Low() {
  return (
    <div className={styles.low_bar}>
      
    </div>
  )
}

/**
 * Transactions component
 * Main component aggregating Head, Mid, and Low components to form the complete Transactions page.
 */
function Transactions() {
  const location = useLocation();
  const name = location.state?.name || "You need to login"; 
  const id=location.state?.id ;
  return (
    <div>
      <Head name={name} id={id} />
      <Mid name={name}/>
      <Low />
    </div>
  )
}

export default Transactions;