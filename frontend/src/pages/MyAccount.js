import React, { Component, useState, useEffect } from 'react';
import { useHistory, useLocation } from "react-router-dom";
import styles from "../assets/styles/MyAccount.module.css";
import * as API from '../services/api';
import { Logo, Footer, GoBackBtn } from './CommonComponents';
import { Converter } from '../services/currencyConverter';
import { filterStateInitializer } from '@mui/x-data-grid/internals';

function Head({ name, id }) {
  return (
    <div className={styles.headBar}>
      <GoBackBtn name={name} id={id} />
      <Logo />
    </div>
  );
}

function Mid({ name, id }) {
  const [account, setAccount] = useState(null);
  const [firstTran, setFirst] = useState(null);
  const [recentTran, setRecent] = useState(null);
  const [numberOfTran, setNumber] = useState(null);
  const [ammount, setAmmount] = useState(null);

  // Helper function to convert a datetime into a formatted string
  const formatDate = (dateString) => {
    const date = new Date(dateString);
    const year = date.getFullYear();
    const month = date.getMonth() + 1;
    const day = date.getDate();
    return `${day}/${month}/${year}`;
  }

  // Load info for account
  useEffect(() => {
    const fetchData = async () => {
      const data = await API.getAccountByID(id);
      setAccount(data[0]);
    };
    fetchData();
  }, [id]);

  // Load info for transactions
  useEffect(() => {
    const fetchTransactions = async () => {
      const data = await API.getAllTransactions(id);
      const transactions = data.sort((a, b) => new Date(a.date) - new Date(b.date));
      const total = transactions.reduce((acc, transaction) => acc + transaction.amount, 0);

      setNumber(transactions.length)
      setAmmount(total)

      if (transactions.length > 0) {
        setFirst(formatDate(transactions[0].date))
        setRecent(formatDate(transactions[transactions.length - 1].date))
      } else {
        setFirst('N/A')
        setRecent('N/A')
      }
    };
    fetchTransactions();
  }, [id]);

  return (
    <div className={styles.midBody}>
      <div className={styles.midHigh} />
      <div className={styles.midLow} />
      <div className={styles.midCenter}>
        <div className={styles.centerContainer}>
          <div className={styles.titleText}>My Account</div>
          <div className={styles.sectionHeader}>Personal</div>
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
          <div className={styles.sectionHeader}>Transactions</div>
          <table className={styles.AccInfoTable}>
            <tr>
              <td className={styles.AccTableHeads}> First Transaction: </td>
              <td className={styles.AccTableHeads}> Completed Transactions</td>
            </tr>
            <tr>
              <td>{firstTran}</td>
              <td>{numberOfTran}</td>
            </tr>
            <br />
            <tr>
              <td className={styles.AccTableHeads}> Most Recent Transaction: </td>
              <td className={styles.AccTableHeads}> Value of Transactions</td>
            </tr>
            <tr>
              <td>{recentTran}</td>
              <td>{ammount}</td>
            </tr>
          </table>
          <div className={styles.sectionHeader}>Additional Options</div>
          <form>
            <table className={styles.AccInfoTable}>
              <tr>
                <td className={styles.AccTableHeads}> Colour Correction: </td>
                <td className={styles.AccTableHeads}> Primary Currency: </td>
              </tr>
              <tr>
                <td>
                  <select className={styles.AccTableDropdown} id="ColourCorrection">
                    <option value="0">Off</option>
                    <option value="1">Protanopia</option>
                    <option value="2">Deuteranopia</option>
                    <option value="3">Tritanopia</option>
                  </select>
                </td>
                <td>
                  <select className={styles.AccTableDropdown} id="Currency">
                    <option value="1">CNY</option>
                    <option value="2">EUR</option>
                    <option value="3" selected="selected">GBP</option>
                    <option value="4">HKD</option>
                    <option value="5">JPY</option>
                    <option value="6">USD</option>
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


function MyAccount() {
  const location = useLocation();
  const name = location.state?.name || "You need to login";
  const id = location.state?.id;
  return (
    <div>
      <Head name={name} id={id} />
      <Mid name={name} id={id} />
    </div>
  );
}

export default MyAccount;