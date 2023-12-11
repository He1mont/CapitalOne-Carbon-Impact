// Transactions.js
import React from 'react';
import styles from '../assets/styles/Transactions.module.css';
import '../utils/Tools'
import { useHistory } from 'react-router-dom';
import getAllAccounts from '../utils/Tools';

/**
 * TransactionTbl component
 * Renders a table displaying transaction details such as date, description, category, carbon impact, and cost.
 */
function TransactionTbl() {
  return (
    <div>
      {/* Search and Filter Functionality */}
      <div className={styles.transaction_btns}>
        <input className={styles.transaction_btns_search} placeholder='Search'></input>
        <button className={styles.transaction_btns_filter}>Filter</button>
      </div>

      {/* Transaction Table Container */}
      <div className={styles.transaction_tbl_container}>
        <table className={styles.transaction_tbl}>
          <thead>
            <tr>
              <th className={styles.c}>Date</th>
              <th className={styles.l}>Description</th>
              <th className={styles.l}>Category</th>
              <th className={styles.r}>Carbon Impact (kgco2)</th>
              <th className={styles.r}>Cost</th>
            </tr>
          </thead>
          <tbody>
            {/* Sample Row - Dynamic Data should replace this in a real-world scenario */}
            <tr>
              <td className={styles.c}>1</td>
              <td className={styles.l}>2</td>
              <td className={styles.l}>3</td>
              <td className={styles.r}>4</td>
              <td className={styles.r}>5</td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>
  );
}

/**
 * Head component
 * Renders the header of the Transactions page, including a logo.
 */
function Head() {
  return (
    <div className={styles.head_bar}>
      <div className={styles.head_center}>
        <img src='/images/Logo1.png' alt='Logo' className={styles.head_img} />
      </div>
    </div>
  )
}

/**
 * Mid component
 * Renders the middle section of the Transactions page, providing contextual information and additional controls.
 */
function Mid() {
  return (
    <div className={styles.mid_bar}>
      {/* User Information and Transaction Overview */}
      <div className={styles.mid_high}>
        <div className={styles.mid_high_txt_left}>
          <p>Benjamin ... 1234</p>
          <h1>View Transactions</h1>
        </div>
        <div className={styles.mid_high_center}>
          {/* Month Selection for Transaction Filtering */}
          <table className={styles.month_select}>
            <tbody>
              <tr>
                <th>
                  <button className={styles.month_select_btn}>O</button>
                </th>
                <th>-  Month  -</th>
                <th>
                  <button className={styles.month_select_btn}>O</button>
                </th>
              </tr>
            </tbody>
          </table>
        </div>
        <div className={styles.mid_high_profile}>
        </div>
      </div>

      {/* Transaction Summary Box */}
      <div className={styles.mid_center}>
        <img src="/images/transactions-mid-box.png" className={styles.mid_box} />
        <div className={styles.mid_box_txt}>
          <p>1000</p>
          <p>kgco2</p>
          <p>estimate</p>
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
      <TransactionTbl />
    </div>
  )
}

/**
 * Transactions component
 * Main component aggregating Head, Mid, and Low components to form the complete Transactions page.
 */
function Transactions() {
  return (
    <div>
      <Head />
      <Mid />
      <Low />
    </div>
  )
}

export default Transactions;