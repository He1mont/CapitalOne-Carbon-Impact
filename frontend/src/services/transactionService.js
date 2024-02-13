// src/services/transactionService.js
import axios from 'axios';

export async function getTransactions(account_id) {
  try {
    const response = await axios.get(`http://localhost:7001/transaction/get-all/${account_id}`);
    return response.data;
  } catch (error) {
    console.error('Error fetching transactions:', error);
    throw error;
  }
}
