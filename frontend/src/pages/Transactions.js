// Transactions.js
import React, { Component } from 'react';
import moment from 'moment';
import styles from '../assets/styles/Transactions.module.css';
import '../utils/Tools'
import { useHistory } from 'react-router-dom';
import getAllAccounts from '../utils/Tools';

/**
 * TransactionTbl component
 * Renders a table displaying transaction details such as date, description, category, carbon impact, and cost.
 */
class TransactionTbl extends Component {
  constructor(props) {
    super(props);
    this.state = {
      currentCol: null,
      currentDir: 0,
    };
  }

  changeSort = (col) => {
    const column = parseInt(col, 10);
    const { currentCol, currentDir } = this.state;
  
    let newDir;
    if (currentCol !== column) {
      newDir = 1;
    } else if ((currentDir + 1) <= 2) {
      newDir = currentDir + 1;
    } else {
      newDir = 0;
    }
  
    this.setState({
      currentCol: column,
      currentDir: newDir,
    });
  
    console.log(column, newDir);
  }

  showArrow(){
    const { currentDir } = this.state;
    if (currentDir === 0){
      return
    }
    if (currentDir === 1){
      return <img src='/images/transaction-up.png' alt="up" style={{height:"15px"}}/>
    }
    if (currentDir === 2){
      return <img src='/images/transaction-down.png' alt="down" style={{height:"15px"}}/>
    }
  }
  
  render() {
    return (
      <div>
        {/* Search and Filter Functionality */}
        <div className={styles.transaction_btns}>
          <input className={styles.transaction_btns_search} placeholder='Search transaction id, date or description'></input>
          <button className={styles.transaction_btns_download}>Download transactions</button>
        </div>

        {/* Transaction Table Container */}
        <div className={styles.transaction_tbl_container}>
          <table className={styles.transaction_tbl}>
            <thead>
              <tr>
                  <th className={styles.h} style={{width: '10%'}} onClick={() => this.changeSort("1")}>
                    <div className={styles.header_text}>Date</div>
                    <div className={styles.sort_arrow}>{this.state.currentCol ===1 && this.showArrow()}</div>
                  </th>
                  <th className={styles.h} style={{width: '20%'}} onClick={() => this.changeSort("2")}>
                    <div className={styles.header_text}>Description</div>
                    <div className={styles.sort_arrow}>{this.state.currentCol ===2 && this.showArrow()}</div>
                  </th>
                  <th className={styles.h} style={{width: '15%'}} onClick={() => this.changeSort("3")}>
                    <div className={styles.header_text}>Category</div>
                    <div className={styles.sort_arrow}>{this.state.currentCol ===3 && this.showArrow()}</div>
                  </th>
                  <th className={styles.h} style={{width: '45%'}} onClick={() => this.changeSort("4")}>
                    <div className={styles.header_text}>Carbon Impact (kgco2)</div>
                    <div className={styles.sort_arrow}>{this.state.currentCol ===4 && this.showArrow()}</div>
                  </th>
                  <th className={styles.h} style={{width: '10%'}} onClick={() => this.changeSort("5")}>
                    <div className={styles.header_text}>Amount</div>
                    <div className={styles.sort_arrow}>{this.state.currentCol ===5 && this.showArrow()}</div>
                  </th>
              </tr>
            </thead>
            <tbody>
              {/* Sample Row - Dynamic Data should replace this in a real-world scenario */}
              <tr>
                <td className={styles.c}>11/12/23</td>
                <td className={styles.l}>Uber</td>
                <td className={styles.l}>Transport</td>
                <td className={styles.r}>-</td>
                <td className={styles.r}>$7.99</td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>
    );
  }
}

/**
 * Month selector component
 * Renders a month selector for the user to use to view data from a given month
 */
class MonthSelect extends Component {
  state = {
    month: moment(),
  };
  decreaseMonth = () => {
    const nextMonth = this.state.month.clone().subtract(1, 'month');
    const minDate = moment('2021-01-01');
    if (nextMonth.isSameOrAfter(minDate)){ //Only allow month reduction if it goes to a data after the start of 2021
      this.setState(
      (prevState) => ({ month: prevState.month.clone().subtract(1, 'month') })
      );
    } 
  };
  increaseMonth = () => {
    const nextMonth = this.state.month.clone().add(1, 'month');
    if (nextMonth > moment()) {
      return; // Do nothing if attempting to go to a future month
    }
    this.setState(
      (prevState) => ({ month: nextMonth })
    );
  };

  render() {
    return (
      <table className={styles.month_select}>
        <tbody>
          <tr>
            <th style={{ width: '33%' }}>
              <button className={styles.month_select_btn} onClick={this.decreaseMonth}>
                <img src="/images/month-left.png" alt="Left Arrow" width="30px" />
              </button>
            </th>
            <th style={{ width: '34%' }}><span>{this.state.month.format('MMM YYYY')}</span></th>
            <th style={{ width: '33%' }}>
              <button
                className={styles.month_select_btn}
                onClick={this.increaseMonth}
                disabled={this.state.month.clone().add(1, 'hour') > moment()}
              >
                <img src="/images/month-right.png" alt="Right Arrow" width="30px" />
              </button>
            </th>
          </tr>
        </tbody>
      </table>
    );
  }
}

/**
 * Head component
 * Renders the header of the Transactions page, including a logo.
 */
function Head() {
  const history = useHistory();
  function handleLoginClick() {
    history.push('/');
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
          <MonthSelect />
        </div>
        <div className={styles.mid_high_profile}>
        </div>
      </div>

      {/* Transaction Summary Box */}
      <div className={styles.mid_center}>
        <img src="/images/transaction-mid.png" alt="forest container" className={styles.mid_box} />
        <div className={styles.mid_box_txt}>
          <p>1000 kgco2</p>
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