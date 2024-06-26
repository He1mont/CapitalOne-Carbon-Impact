// MyAccount.js
import React, { useState, useEffect } from 'react';
import { useLocation } from "react-router-dom";
import styles from "../assets/styles/MyAccount.module.css";     // CSS modules
import { Logo, Footer, GoBackBtn } from './CommonComponents';   // Reusable components
import * as API from '../services/api';   // API functions for server-side interactions

/**
 * Renders the header of the MyAccount page, which includes the go back button and logo.
 * @param {string} name - Username of the user.
 * @param {string} id - AccountID of the user.
 */
function Head({ name, id }) {
  return (
    <div className={styles.headBar}>
      <GoBackBtn name={name} id={id} />
      <Logo />
    </div>
  );
}

/**
 * The main component of the MyAccount page that displays user account and transaction details.
 * @param {string} id - AccountID of the user.
 */
function Mid({ id }) {
  // State hooks for various account and transaction details
  const [account, setAccount] = useState(null);
  const [firstTran, setFirst] = useState('N/A');
  const [recentTran, setRecent] = useState('N/A');
  const [amount, setAmount] = useState(0.0);
  const [balance, setBalance] = useState(0.0)
  const [colorTheme, setColorTheme] = useState("0");
  const [currency, setCurrency] = useState("");
  const [refreshTrigger, setRefreshTrigger] = useState(0);

  // Helper function to convert a datetime into a formatted string
  const formatDate = (dateString) => {
    const date = new Date(dateString);
    return `${date.getDate()}/${date.getMonth() + 1}/${date.getFullYear()}`;
  }

  const formatDateYMD = (dateString) => {
    const date = new Date(dateString);
    const year = date.getFullYear();
    const month = (date.getMonth() + 1).toString().padStart(2, '0');
    const day = date.getDate().toString().padStart(2, '0');
    return `${year}-${month}-${day}`;
  }

  // Effect hook to fetch account and transaction data from the API
  useEffect(() => {
    const fetchData = async () => {
      // Load account info
      const account = await API.getAccountByID(id);
      setAccount(account[0]);
      setColorTheme(account[0].colorMode);
      setCurrency(account[0].currency);

      // Load transactions info
      const transactions = await API.getAllTransactions(id);
      if (transactions.length > 0) {
        const sortedTransactions = transactions.sort((a, b) => new Date(a.date) - new Date(b.date));
        const total = await Promise.all(sortedTransactions.map(async item => {
          const currencyRate = await API.getHistoricalCurrencyRates(account[0].currency, formatDateYMD(item.date));
          return item.amount / currencyRate[item.currency];
        })).then(amounts => {
          return amounts.reduce((acc, amount) => acc + amount, 0)
        });

        setBalance(account[0].balance);
        setAmount(total)
        setFirst(formatDate(sortedTransactions[0].date))
        setRecent(formatDate(sortedTransactions[sortedTransactions.length - 1].date))
      };
    };
    fetchData();
  }, [id, refreshTrigger]);

  // Update selected color theme
  const handleColorThemeChange = (event) => {
    setColorTheme(event.target.value);
  };

  // Update selected currency
  const handleCurrencyChange = (event) => {
    setCurrency(event.target.value);
  };

  // Handle form submission
  const handleSubmit = async (event) => {
    event.preventDefault(); // Prevent the form from actually submitting
    const data = await API.getAccountByID(id)
    const account = data[0]

    if (account.colorMode !== parseInt(colorTheme)) {
      await API.updateColorTheme(id, parseInt(colorTheme))
    }
    if (account.currency !== currency) {
      await API.updateCurrency(id, currency)
    }
    setRefreshTrigger(oldTrigger => oldTrigger + 1);  // refresh the page everytime the form is submitted
  };

  // Renders account information and transaction data, and allows user settings adjustments
  return (
    <div className={styles.midBody}>
      <div className={styles.midHigh} />
      <div className={styles.midLow} />
      <div className={styles.midCenter}>
        <div className={styles.centerContainer}>
          {/* Section header for account information */}
          <div className={styles.titleText}>My Account</div>
          <div className={styles.sectionHeader}>Personal</div>

          {/* Table displaying basic personal information */}
          <table className={styles.AccInfoTable}>
            <tr>
              <td className={styles.AccTableHeads}> Firstname(s): </td>
              <td className={styles.AccTableHeads}> Phone Number: </td>
            </tr>
            <tr>
              <td>{account?.firstName}</td>
              <td>{account?.phone}</td>
            </tr>
            <br />
            <tr>
              <td className={styles.AccTableHeads}> Lastname(s): </td>
              <td className={styles.AccTableHeads}> Email Address: </td>
            </tr>
            <tr>
              <td>{account?.lastName}</td>
              <td>{account?.email}</td>
            </tr>
            <br />
            <tr>
              <td className={styles.AccTableHeads}> Account ID: </td>
              <td className={styles.AccTableHeads}> Home Address: </td>
            </tr>
            <tr>
              <td>{account?.accountID}</td>
              <td>{account?.address}</td>
            </tr>
          </table>

          {/* Section header for transaction information */}
          <div className={styles.sectionHeader}>Transactions</div>

          {/* Table displaying transaction details */}
          <table className={styles.AccInfoTable}>
            <tr>
              <td className={styles.AccTableHeads}> First Transaction: </td>
              <td className={styles.AccTableHeads}> Total Amount</td>
            </tr>
            <tr>
              <td>{firstTran}</td>
              <td>{amount.toFixed(2)}</td>
            </tr>
            <br />
            <tr>
              <td className={styles.AccTableHeads}> Most Recent Transaction: </td>
              <td className={styles.AccTableHeads}> Balance </td>
            </tr>
            <tr>
              <td>{recentTran}</td>
              <td>{balance}</td>
            </tr>
          </table>

          {/* Section header for additional user-configurable options */}
          <div className={styles.sectionHeader}>Additional Options</div>

          {/* Form for updating user preferences such as color correction and primary currency */}
          <form onSubmit={handleSubmit}>
            <table className={styles.AccInfoTable}>
              <tr>
                <td className={styles.AccTableHeads}> Colour Correction: </td>
                <td className={styles.AccTableHeads}> Primary Currency: </td>
              </tr>
              <tr>
                <td>
                  <select
                    className={styles.AccTableDropdown}
                    id="ColourCorrection"
                    value={colorTheme}
                    onChange={handleColorThemeChange}
                  >
                    <option value="0">Off</option>
                    <option value="1">Protanopia / Deuteranopia</option>
                    <option value="2">Tritanopia</option>
                    <option value="3">Monochromatism</option>
                  </select>
                </td>
                <td>
                  <select
                    className={styles.AccTableDropdown}
                    id="Currency"
                    value={currency}
                    onChange={handleCurrencyChange}
                  >
                    <option value="AUD">AUD</option>
                    <option value="CAD">CAD</option>
                    <option value="CHF">CHF</option>
                    <option value="CNY">CNY</option>
                    <option value="EUR">EUR</option>
                    <option value="GBP">GBP</option>
                    <option value="INR">INR</option>
                    <option value="JPY">JPY</option>
                    <option value="MYR">MYR</option>
                    <option value="SGD">SGD</option>
                    <option value="USD">USD</option>
                  </select>
                </td>
              </tr>
            </table>
            <br />
            <input className={styles.AccTableSubmit} type="submit" value="Save Changes"></input>
          </form>
        </div>
      </div>
    </div>
  )
}

/**
 * Main MyAccount component assembling header, mid, and footer components for the account management page.
 */
function MyAccount() {
  const location = useLocation();
  const name = location.state?.name || "You need to login";
  const id = location.state?.id;
  return (
    <div>
      <Head name={name} id={id} />
      <Mid name={name} id={id} />
      <Footer />
    </div>
  );
}

export default MyAccount;