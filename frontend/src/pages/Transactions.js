// Transactions.js
import React, { Component, useState } from 'react';
import moment from 'moment';
import styles from '../assets/styles/Transactions.module.css';
import { useHistory ,useLocation} from 'react-router-dom';
import * as tranAPI from '../services/transactionService';

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
      transactions: [],   // create an attribute to store all transactions
    };
  }

  // intialize transactions using tranAPI
  componentDidMount() {
    const id = this.props.id;
    tranAPI.getTransactions(id)
      .then(data => {
        this.setState({ transactions: data.Transactions });
      })
      .catch(error => {
        console.error('Error fetching transactions:', error);
      });
  }

  // helper function to convert timestamp into format DD/MM
  formatDate(timestamp) {
    const date = new Date(timestamp);
    const month = (date.getMonth() + 1).toString().padStart(2, '0');
    const day = date.getDate().toString().padStart(2, '0');
    return `${day}/${month}`;
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

  showArrow() {
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
    // show transaction of the corresponding month
    const { month } = this.props;
    const startOfMonth = month.clone().startOf('month');
    const endOfMonth = month.clone().endOf('month');  
    const filteredTransactions = this.state.transactions.filter(transaction => {
      const transactionDate = moment(transaction.timestamp);
      return transactionDate.isSameOrAfter(startOfMonth) && transactionDate.isSameOrBefore(endOfMonth);
    });

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
              {filteredTransactions.map((transaction) => (
                <tr key={transaction.transactionUUID}>
                  <td>{this.formatDate(transaction.timestamp)}</td>
                  <td>{transaction.merchant.name}</td>
                  <td>{transaction.merchant.category}</td>
                  <td>{'To Be Confirmed'}</td>
                  <td>{transaction.amount}</td>
                </tr>
              ))}
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
  decreaseMonth = () => {
    const { month, onMonthChange } = this.props;
    const nextMonth = month.clone().subtract(1, 'month');
    const minDate = moment('2021-01-01');
    //Only allow month reduction if it goes to a data after the start of 2021
    if (nextMonth.isSameOrAfter(minDate)){ 
      onMonthChange(nextMonth);
    } 
  };

  increaseMonth = () => {
    const { month, onMonthChange } = this.props;
    const nextMonth = month.clone().add(1, 'month');
    if (nextMonth <= moment()) {
      onMonthChange(nextMonth);
    }
  };

  render() {
    const { month } = this.props;
    return (
      <table className={styles.month_select}>
        <tbody>
          <tr>
            <th style={{ width: '33%' }}>
              <button className={styles.month_select_btn} onClick={this.decreaseMonth}>
                <img src="/images/month-left.png" alt="Left Arrow" width="30px" />
              </button>
            </th>
            <th style={{ width: '34%' }}><span>{month.format('MMM YYYY')}</span></th>
            <th style={{ width: '33%' }}>
              <button
                className={styles.month_select_btn}
                onClick={this.increaseMonth}
                disabled={month.clone().add(1, 'hour') > moment()}
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
function Mid({name, month, onMonthChange}) {
  return (
    <div className={styles.mid_bar}>
      {/* User Information and Transaction Overview */}
      <div className={styles.mid_high}>
        <div className={styles.mid_high_txt_left}>
          <p>{name}</p>
          <h1>View Transactions</h1>
        </div>
        <div className={styles.mid_high_center}>
          <MonthSelect month={month} onMonthChange={onMonthChange} />
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
function Low({name, id, month}) {
  return (
    <div className={styles.low_bar}>
      <TransactionTbl name={name} id={id} month={month}/>
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
  const id = location.state?.id ;
  const [month, setMonth] = useState(moment()); // 使用useState管理月份状态

  const handleMonthChange = (newMonth) => {
    setMonth(newMonth);
  };

  return (
    <div>
      <Head name={name} id={id} />
      <Mid name={name} month={month} onMonthChange={handleMonthChange}/>
      <Low name={name} id={id} month={month}/>
    </div>
  )
}

export default Transactions;