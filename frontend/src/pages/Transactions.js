// Transactions.js
import React, { Component, useState, useEffect } from 'react';
import moment from 'moment';
import styles from '../assets/styles/Transactions.module.css';
import { useHistory, useLocation } from 'react-router-dom';
// helper functions
import * as API from '../services/api';
import * as Sorter from '../services/sorter';

/**
 * TransactionTbl component
 * Renders a table displaying transaction details such as date, description, category, carbon impact, and cost.
 */
class TransactionTbl extends Component {
  constructor(props) {
    super(props);
    this.state = {
      currentCol: null,   // currently selected column
      currentDir: 0,
      transactions: [],   // create an attribute to store all transactions
      searchInput: '',    // input in search bar
    };
  }

  // intialize transactions using backend API
  componentDidMount = async () => {
    const data = await API.getAllTransactions(this.props.id);
    this.setState({ transactions: data });
  }

  // helper function to convert timestamp into format DD/MM
  formatDate = (timestamp) => {
    const date = new Date(timestamp);
    const month = (date.getMonth() + 1).toString().padStart(2, '0');
    const day = date.getDate().toString().padStart(2, '0');
    return `${day}/${month}`;
  }

  // change ascending/descending order by clicking the title of each column
  changeSort = async (col) => {
    const { currentCol, currentDir } = this.state;

    // initialize temporary variables
    const column = parseInt(col, 10);   // currently selected column
    let newTransactions;
    let newDir;

    if (currentCol !== column || currentDir === 0) {    // if disordered
      newDir = 1;
      newTransactions = Sorter.colSort(this.state.transactions, column, true);    // true for ascending
    } else if (currentDir === 1) {  // if ascending order
      newDir = 2;
      newTransactions = Sorter.colSort(this.state.transactions, column, false);   // false for descending
    } else {                        // if descending order
      newDir = 0;
      newTransactions = await API.getAllTransactions(this.props.id)
    }

    // update all states
    this.setState({
      currentCol: column,
      currentDir: newDir,
      transactions: newTransactions
    });
  }

  // show the direction of arrow in the title of each column
  showArrow = () => {
    const { currentDir } = this.state;
    if (currentDir === 0) {     // disordered
      return
    }
    if (currentDir === 1) {     // ascending order
      return <img src='/images/transaction-up.png' alt="up" style={{ height: "15px" }} />
    }
    if (currentDir === 2) {     // descending order
      return <img src='/images/transaction-down.png' alt="down" style={{ height: "15px" }} />
    }
  }

  // live update searchInput state when typing words in search frame
  handleInputChange = (event) => {
    this.setState({ searchInput: event.target.value });
  }

  // call searchSort in Sorter when clicking search button
  handleClickSearch = async () => {
    // fetch all transactions
    const transactions = await API.getAllTransactions(this.props.id)
    const data = Sorter.searchSort(transactions, this.state.searchInput);
    this.setState({
      transactions: data,
      searchInput: ''
    });
  }

  // automatically click button search when pressing enter
  handleKeyPress = (event) => {
    if (event.key === 'Enter') {
      this.handleClickSearch();
    }
  }

  render() {
    // Filter transactions of the corresponding month
    const { month } = this.props;
    const startOfMonth = month.clone().startOf('month');
    const endOfMonth = month.clone().endOf('month');
    const filteredTransactions = this.state.transactions.filter(transaction => {
      const transactionDate = moment(transaction.date);
      return transactionDate.isSameOrAfter(startOfMonth) && transactionDate.isSameOrBefore(endOfMonth);
    });

    // Render "No Data" if filteredTransactions length is 0
    let tableBody;
    if (filteredTransactions.length === 0) {
      tableBody = (
        <tr>
          <td colSpan="5" className={styles.noDataCell}>No Data</td>
        </tr>
      );
    } else {
      tableBody = filteredTransactions.map((transaction) => (
        <tr key={transaction.transactionUUID}>
          <td>{this.formatDate(transaction.date)}</td>
          <td>{transaction.merchantName}</td>
          <td>{transaction.category}</td>
          <td>{transaction.amount}</td>
          <td>{transaction.carbonScore}</td>
        </tr>
      ));
    }

    return (
      <div>
        {/* Search and Filter Functionality */}
        <div className={styles.transaction_btns}>
          <input
            className={styles.transaction_btns_search}
            type="text"
            value={this.state.searchInput}
            onChange={this.handleInputChange}
            onKeyPress={this.handleKeyPress}
            placeholder='Search transaction id, date or description'>
          </input>
          <button
            className={styles.transaction_btns_download}
            onClick={this.handleClickSearch}>
            Search
          </button>
        </div>

        {/* Transaction Table Container */}
        <div className={styles.transaction_tbl_border}>
          <div className={styles.transaction_tbl_container}>
            <table className={styles.transaction_tbl}>
              <thead>
                <tr>
                  <th className={styles.h} style={{ width: '10%' }} onClick={() => this.changeSort("1")}>
                    <div className={styles.header_text}>Date</div>
                    <div className={styles.sort_arrow}>{this.state.currentCol === 1 && this.showArrow()}</div>
                  </th>
                  <th className={styles.h} style={{ width: '20%' }} onClick={() => this.changeSort("2")}>
                    <div className={styles.header_text}>Merchant Name</div>
                    <div className={styles.sort_arrow}>{this.state.currentCol === 2 && this.showArrow()}</div>
                  </th>
                  <th className={styles.h} style={{ width: '15%' }} onClick={() => this.changeSort("3")}>
                    <div className={styles.header_text}>Category</div>
                    <div className={styles.sort_arrow}>{this.state.currentCol === 3 && this.showArrow()}</div>
                  </th>
                  <th className={styles.h} style={{ width: '20%' }} onClick={() => this.changeSort("4")}>
                    <div className={styles.header_text}>Amount</div>
                    <div className={styles.sort_arrow}>{this.state.currentCol === 4 && this.showArrow()}</div>
                  </th>
                  <th className={styles.h} style={{ width: '35%' }} onClick={() => this.changeSort("5")}>
                    <div className={styles.header_text}>Carbon Score</div>
                    <div className={styles.sort_arrow}>{this.state.currentCol === 5 && this.showArrow()}</div>
                  </th>
                </tr>
              </thead>
              <tbody>
                {tableBody}
              </tbody>
            </table>
          </div>
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
    if (nextMonth.isSameOrAfter(minDate)) {
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
function Head({ name, id }) {
  const history = useHistory();
  function handleGoBackClick() {
    history.push({
      pathname: '/home',
      state: { name: name, id: id }
    });
  }
  return (
    <div className={styles.head_bar}>
      <div>
        <button onClick={handleGoBackClick} className={styles.go_back_btn}>
          <img src="/images/goBack.png" alt="Go Back" className={styles.go_back_img} />
        </button>
      </div>
      <div className={styles.head_center}>
        <img src='/images/Logo.png' alt='Logo' className={styles.head_img} />
      </div>
    </div>
  )
}

/**
 * Mid component
 * Renders the middle section of the Transactions page, providing contextual information and additional controls.
 */
function Mid({ name, id, month, onMonthChange }) {
  const [carbonScore, setCarbonScore] = useState(null);

  useEffect(() => {
    const fetchCarbonScore = async () => {
      const data = await API.getCarbonScoreByMonth(id, month.format('YYYY'), month.format('MM'));
      setCarbonScore(data);
    };

    fetchCarbonScore();
  }, [month]);    // recall useEffect when `month` is changed

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
          <p><b>{carbonScore} kgco2</b></p>
          <p><b>Estimate</b></p>
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
function Low({ name, id, month }) {

  return (
    <div className={styles.low_bar}>
      <TransactionTbl name={name} id={id} month={month} />
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
  const id = location.state?.id;
  const [month, setMonth] = useState(moment());

  const handleMonthChange = (newMonth) => {
    setMonth(newMonth);
  };

  return (
    <div>
      <Head name={name} id={id} />
      <Mid name={name} id={id} month={month} onMonthChange={handleMonthChange} />
      <Low name={name} id={id} month={month} />
    </div>
  )
}

export default Transactions;
export { TransactionTbl };