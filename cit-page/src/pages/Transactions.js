import React from 'react';
import styles from '../assets/styles/Transactions.module.css';
import '../utils/Tools'
import  {useHistory}  from 'react-router-dom';
import getAllAccounts from '../utils/Tools';

function TransactionTbl() {
  return(
    <div>
      <div className={styles.transaction_btns}>
        <input className={styles.transaction_btns_search} placeholder='Search'></input>
        <button className={styles.transaction_btns_filter}>Filter</button>
      </div>
      <div className={styles.transaction_tbl_container}>
        <table className={styles.transaction_tbl}>
          <tr>
            <th className={styles.c}>Date</th>
            <th className={styles.l}>Description</th>
            <th className={styles.l}>Category</th>
            <th className={styles.r}>Carbon Impact (kgco2)</th>
            <th className={styles.r}>Cost</th>
          </tr>
          <tr>
            <td className={styles.c}>1</td>
            <td className={styles.l}>2</td>
            <td className={styles.l}>3</td>
            <td className={styles.r}>4</td>
            <td className={styles.r}>5</td>
          </tr>
        </table>
      </div>
    </div>
  );
}

function Head() {
  return (
    <div className="head-bar">
      <div className="head-center">
        <img src='CapitaloneLogo.png' className="head-img"/>
      </div>
    </div>
  )
}

function Mid() {
  return (
    <div className="mid-bar">
      <div className="mid-high">
        <div className="mid-high-txt-left">
          <p>Benjamin ... 1234</p>
          <h1>View Transactions</h1>
        </div>
        <div className="mid-high-center">
          <table className="month-select">
            <tr>
              <th>  
                <button className="month-select-btn">O</button>
              </th>
              <th>-  Month  -</th>
              <th>  
                <button className="month-select-btn">O</button>
              </th>
            </tr>
          </table>
        </div>
        <div className="mid-high-profile">

        </div>
      </div>

      <div className="mid-center">
        <img src="transactions-mid-box.png" className="mid-box"/>
        <div className="mid-box-txt">
          <p>1000</p>
          <p>kgco2</p>
          <p>estimate</p>
        </div>
      </div>

      <div className="mid-low"></div>
    </div>
  )
}

function Low() {
  return (
    <div className={styles.low_bar}>
      <TransactionTbl />
    </div>
  )
}

function Transactions(){
  return (
    <div>
      <Head />
      {/* <Mid /> */}
      <Low />

      {/* <h1>Hello, World!</h1>
      <p>Welcome to Transaction Page</p>
      <button onClick={getAllAccounts}>
        Request for API
      </button> */}
    </div>
  )
}

export default Transactions;