// Transaction.js
import React, { Component, useState, useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import styles from '../assets/styles/Transactions.module.css';            // CSS modules
import { Logo, GoBackBtn, SettingBtn, Footer } from './CommonComponents'; // Reused components
import * as API from '../services/api';   // API functions for server-side interactions
import moment from 'moment';              // External libraries
import Box from '@mui/material/Box';      // Material UI components
import { DataGrid } from '@mui/x-data-grid';

/**
 * TransactionTbl component:
 * Renders a table displaying transaction details such as date, description, category, carbon impact, and cost.
 */
class TransactionTbl extends Component {
  constructor(props) {
    super(props);
    this.state = {
      transactions: [],
      searchInput: '',
      myCurrency: '',
      currencyRate: '',
      loading: true,
    };
  }

  // Fetch currency and transactions when the component mounts.
  async componentDidMount() {
    await this.loadCurrency();
    await this.loadTransactions();
  }

  // Reload transactions when the month prop changes, indicating a change in the period viewed.
  componentDidUpdate(prevProps) {
    if (!this.props.month.isSame(prevProps.month)) {
      this.loadTransactions();
    }
  }

  // Load the user's preferred currency from the backend using their user ID.
  loadCurrency = async () => {
    const data = await API.getAccountByID(this.props.id);
    const myCurrency = data[0].currency
    this.setState({ myCurrency });
  }

  // Fetch transactions for a given month and format them for display.
  loadTransactions = async () => {
    this.setState({ loading: true });
    const year = this.props.month.year();
    const month = this.props.month.month();
    const transactions = await API.getTransactionsByMonth(this.props.id, year, month);
    const formattedTransactions = await Promise.all(transactions.map(async item => {
      const currencyRate = await API.getHistoricalCurrencyRates(this.state.myCurrency, this.formatDateYMD(item.date));
      return {
        ...item,
        date: this.formatDateDM(item.date),
        amount: (item.amount / currencyRate[item.currency]).toFixed(2)
      };
    }));
    this.setState({ transactions: formattedTransactions, loading: false });
  }

  // Format a timestamp into day/month format for display purposes.
  formatDateDM = (timestamp) => {
    const date = new Date(timestamp);
    const month = (date.getMonth() + 1).toString().padStart(2, '0');
    const day = date.getDate().toString().padStart(2, '0');
    return `${day}/${month}`;
  }

  // Format a timestamp into year-month-day format for compatibility with backend or other processes.
  formatDateYMD = (timestamp) => {
    const date = new Date(timestamp);
    const year = date.getFullYear();
    const month = (date.getMonth() + 1).toString().padStart(2, '0');
    const day = date.getDate().toString().padStart(2, '0');
    return `${year}-${month}-${day}`;
  }

  // Update the search input state as the user types.
  handleInputChange = (event) => {
    this.setState({ searchInput: event.target.value });
  }

  // Search transactions based on the user input and update the transaction display.
  handleClickSearch = async () => {
    this.setState({ loading: true });
    const year = this.props.month.year();
    const month = this.props.month.month();
    const transactions = await API.getTransactionsByMonth(this.props.id, year, month);
    const input = this.state.searchInput.toLowerCase();

    const filteredTransactions = transactions.filter(item => {
      return this.formatDateDM(item.date).includes(input) ||
        item.merchantName.toLowerCase().includes(input) ||
        item.category.toLowerCase().includes(input) ||
        String(item.amount).includes(input) ||
        String(item.carbonScore).includes(input)
    }).map(item => {
      return {
        ...item,
        date: this.formatDateDM(item.date)
      };
    });
    this.setState({ transactions: filteredTransactions, searchInput: '', loading: false });
  }

  // Trigger search when 'Enter' is pressed in the search input field.
  handleKeyPress = (event) => {
    if (event.key === 'Enter') {
      this.handleClickSearch();
    }
  }

  render() {
    // Define the column configuration for the DataGrid component
    const columns = [
      { field: 'date', renderHeader: () => (<strong>{'Data'}</strong>), width: 100, headerClassName: 'super-app-theme--header' },
      { field: 'merchantName', renderHeader: () => (<strong>{'Merchant Name'}</strong>), width: 230, headerClassName: 'super-app-theme--header' },
      { field: 'category', renderHeader: () => (<strong>{'Category'}</strong>), width: 230, headerClassName: 'super-app-theme--header' },
      { field: 'amount', renderHeader: () => (<strong>{`Amount (${this.state.myCurrency})`}</strong>), width: 180, headerClassName: 'super-app-theme--header' },
      { field: 'carbonScore', renderHeader: () => (<strong>{'Carbon Score'}</strong>), flex: 1, minWidth: 150, headerClassName: 'super-app-theme--header' },
    ];

    return (
      <div>
        {/* Search input and button for filtering transactions */}
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

        {/* Transaction Table */}
        <div className={styles.transaction_tbl_border}>
          <Box
            sx={{
              height: 500,
              width: '100%',
              '& .super-app-theme--header': {
                backgroundColor: '#f0f0f0',
              }
            }}>
            <DataGrid
              rows={this.state.transactions}
              columns={columns}
              pageSize={5}
              rowsPerPageOptions={[5, 10, 20]}
              disableSelectionOnClick
              loading={this.state.loading}
            />
          </Box>
        </div>
      </div>
    );
  }
}

/**
 * Month selector component:
 * Renders a month selector for the user to use to view data from a given month
 */
class MonthSelect extends Component {

  // Decrease the currently selected month by one month and invoke the onMonthChange callback.
  decreaseMonth = () => {
    const { month, onMonthChange } = this.props;
    const nextMonth = month.clone().subtract(1, 'month');
    const minDate = moment('2021-01-01');
    // Only allow month reduction if it goes to a data after the start of 2021
    if (nextMonth.isSameOrAfter(minDate)) {
      onMonthChange(nextMonth);
    }
  };

  // Increase the currently selected month by one month and invoke the onMonthChange callback.
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
            {/* Button to decrease the month with an image of a left arrow */}
            <th style={{ width: '33%' }}>
              <button className={styles.month_select_btn} onClick={this.decreaseMonth}>
                <img src="/images/month-left.png" alt="Left Arrow" width="30px" />
              </button>
            </th>
            {/* Display the currently selected month in 'MMM YYYY' format */}
            <th style={{ width: '34%' }}>
              <span>{month.format('MMM YYYY')}</span>
            </th>
            {/* Button to increase the month with an image of a right arrow */}
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
 * Head component:
 * Displays the top part including the logo and GoBack button and a Setting button.
 * @param {string} name - Username of the user.
 * @param {string} id - AccountID of the user.
 */
function Head({ name, id }) {
  return (
    <div className={styles.head_bar}>
      <Logo />
      <GoBackBtn name={name} id={id} />
      <SettingBtn name={name} id={id} />
    </div>
  );
}

/**
 * Mid component:
 * Renders the middle section of the Transactions page, providing contextual information and additional controls.
 * @param {string} name - Username of the user.
 * @param {string} id - AccountID of the user.
 * @param {object} month - Currently selected month object, typically a moment.js object.
 * @param {function} onMonthChange - Callback function to handle changes to the selected month.
 */
function Mid({ name, id, month, onMonthChange }) {
  // State to hold the carbon score for the currently selected month.
  const [carbonScore, setCarbonScore] = useState(null);

  // Effect to fetch the carbon score when the selected month changes.
  useEffect(() => {
    // Fetches the carbon score for the specified month and updates the state.
    const fetchCarbonScore = async () => {
      const data = await API.getCarbonScoreByMonth(id, month.year(), month.month());
      setCarbonScore(data);
    };

    fetchCarbonScore();
  }, [month, id]);  // Dependency array, useEffect is called again if 'month' changes.

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
          <p><b>{carbonScore} kg CO2</b></p>
          <p><b>Estimate</b></p>
        </div>
      </div>

      <div className={styles.mid_low}></div>
    </div>
  )
}

/**
 * Low component:
 * Renders the lower section of the Transactions page, mainly comprising the TransactionTbl component.
 * @param {string} name - Username of the user.
 * @param {string} id - AccountID of the user.
 */
function Low({ name, id, month }) {
  return (
    <div className={styles.low_bar}>
      <div className={styles.table_container}>
        <TransactionTbl name={name} id={id} month={month} />
      </div>
    </div>
  )
}

/**
 * Transactions component:
 * Main component aggregating Head, Mid, and Low components to form the complete Transactions page.
 */
function Transactions() {
  const location = useLocation();
  const name = location.state?.name || "You need to login";
  const id = location.state?.id;
  const [month, setMonth] = useState(moment());

  // Handles the change in selected month.
  const handleMonthChange = (newMonth) => {
    setMonth(newMonth);
  };

  return (
    <div>
      <Head name={name} id={id} />
      <Mid name={name} id={id} month={month} onMonthChange={handleMonthChange} />
      <Low name={name} id={id} month={month} />
      <Footer />
    </div>
  )
}

export default Transactions;
export { TransactionTbl };