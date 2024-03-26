// src/services/api.js
import axios from 'axios';

export async function getAccountByEmail(email) {
  try {
    const response = await axios.get(`http://127.0.0.1:7001/account/get-by-email/${email}`);
    return response.data

  } catch (error) {
    console.error("Error fetching account by email:", error);
  }
}

export async function getTransactions(account_id) {
  try {
    const response = await axios.get(`http://localhost:7001/transaction/get-all/${account_id}`);
    return response.data;
    
  } catch (error) {
    console.error('Error fetching transactions:', error);
    throw error;
  }
}

