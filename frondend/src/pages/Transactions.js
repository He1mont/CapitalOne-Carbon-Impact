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
    <div className={styles.head_bar}>
      <div className={styles.head_center}>
        <img src='CapitaloneLogo.png' className={styles.head_img}/>
      </div>
    </div>
  )
}

function Mid() {
  return (
    <div className={styles.mid_bar}>
      <div className={styles.mid_high}>
        <div className={styles.mid_high_txt_left}>
          <p>Benjamin ... 1234</p>
          <h1>View Transactions</h1>
        </div>
        <div className={styles.mid_high_center}>
          <table className={styles.month_select}>
            <tr>
              <th>  
                <button className={styles.month_select_btn}>O</button>
              </th>
              <th>-  Month  -</th>
              <th>  
                <button className={styles.month_select_btn}>O</button>
              </th>
            </tr>
          </table>
        </div>
        <div className={styles.mid_high_profile}>

        </div>
      </div>

      <div className={styles.mid_center}>
        <img src="transactions-mid-box.png" className={styles.mid_box}/>
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
      <Mid />
      <Low />
    </div>
  )
}

export default Transactions;