import React, { Component, useState, useEffect } from 'react';
import moment from 'moment';
import styles from '../assets/styles/Transactions.module.css';
import { useLocation } from 'react-router-dom';
import { Logo, GoBackBtn, SettingBtn, Footer } from './CommonComponents';
// Helper functions
import * as API from '../services/api';
import * as Sorter from '../services/sorter';
// MUI component
import Box from '@mui/material/Box';
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

  async componentDidMount() {
    await this.loadCurrency();
    await this.loadTransactions();
  }

  componentDidUpdate(prevProps) {
    if (!this.props.month.isSame(prevProps.month)) {
      this.loadTransactions();
    }
  }

  loadCurrency = async () => {
    const data = await API.getAccountByID(this.props.id);
    const myCurrency = data[0].currency
    this.setState({ myCurrency });
  }

  loadTransactions = async () => {
    this.setState({ loading: true });
    const year = this.props.month.year();
    const month = this.props.month.month();
    const transactions = await API.getTransactionsByMonth(this.props.id, year, month);
    const formattedTransactions = await Promise.all(transactions.map(async item => {
      const currencyRate = await API.getHistoricalCurrencyRates(this.state.myCurrency,this.formatDateYMD(item.date));
      return {
        ...item,
        date: this.formatDateDM(item.date),
        amount: (item.amount / currencyRate[item.currency]).toFixed(2)
      };
    }));
    this.setState({ transactions: formattedTransactions, loading: false });
  }

  formatDateDM = (timestamp) => {
    const date = new Date(timestamp);
    const month = (date.getMonth() + 1).toString().padStart(2, '0');
    const day = date.getDate().toString().padStart(2, '0');
    return `${day}/${month}`;
  }

  formatDateYMD = (timestamp) => {
    const date = new Date(timestamp);
    const year = date.getFullYear();
    const month = (date.getMonth() + 1).toString().padStart(2, '0');
    const day = date.getDate().toString().padStart(2, '0');
    return `${year}-${month}-${day}`;
  }

  handleInputChange = (event) => {
    this.setState({ searchInput: event.target.value });
  }

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
        date: this.formatDateDM(item.date)    // format date
      };
    });
    this.setState({ transactions: filteredTransactions, searchInput: '', loading: false });
  }

  // Automatically click button search when pressing enter
  handleKeyPress = (event) => {
    if (event.key === 'Enter') {
      this.handleClickSearch();
    }
  }

  render() {
    const columns = [
      { field: 'date', headerName: 'Date', width: 150 },
      { field: 'merchantName', headerName: 'Merchant Name', width: 250 },
      { field: 'category', headerName: 'Category', width: 250 },
      { field: 'amount', headerName: `Amount (${this.state.myCurrency})`, width: 200 },
      { field: 'carbonScore', headerName: 'Carbon Score', width: 150 },
    ];

    return (
      <div>
        {/* Search frame and click button */}
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
          <Box sx={{ height: 500, width: '100%' }}>
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
  /**
   * Decrease the currently selected month by one month and invoke the onMonthChange callback.
   */
  decreaseMonth = () => {
    const { month, onMonthChange } = this.props;
    const nextMonth = month.clone().subtract(1, 'month');
    const minDate = moment('2021-01-01');
    // Only allow month reduction if it goes to a data after the start of 2021
    if (nextMonth.isSameOrAfter(minDate)) {
      onMonthChange(nextMonth);
    }
  };

  /**
   * Increase the currently selected month by one month and invoke the onMonthChange callback.
   */
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
 */
function Mid({ name, id, month, onMonthChange }) {
  const [carbonScore, setCarbonScore] = useState(null);

  useEffect(() => {
    /**
     * Fetches the carbon score for the specified month and updates the state.
     */
    const fetchCarbonScore = async () => {
      const data = await API.getCarbonScoreByMonth(id, month.year(), month.month());
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

  /**
   * Handles the change in selected month.
   * @param {Moment} newMonth - The new selected month.
   */
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