// src/services/api.js
import axios from 'axios';

// account
export async function getAccountByEmail(email) {
  try {
    const response = await axios.get(`http://127.0.0.1:7001/account/get-by-email/${email}`);
    return response.data

  } catch (error) {
    console.error("Error fetching account by email:", error);
  }
}

export async function getAccountByUsername(username) {
  try {
    const response = await axios.get(`http://127.0.0.1:7001/account/get-by-username/${username}`);
    return response.data[0]

  } catch (error) {
    console.error("Error fetching account by email:", error);
  }
}

// transaction
export async function getAllTransactions(accountID) {
  try {
    const response = await axios.get(`http://localhost:7001/transaction/get-all/${accountID}`);
    return response.data;
    
  } catch (error) {
    console.error('Error fetching transactions:', error);
    throw error;
  }
}

// friend
export async function getAllFollowings(accountID) {
  try {
    const response = await axios.get(`http://localhost:7001/friend/get-all/${accountID}`);
    return response.data;
    
  } catch (error) {
    console.error('Error fetching following users:', error);
    throw error;
  }
}

export async function addFollowing(accountID, friendID) {
  try {
    const response = await axios.post(`http://localhost:7001/friend/add-by-id/${accountID}/${friendID}`);
    return response.data;
    
  } catch (error) {
    console.error('Error fetching following users:', error);
    throw error;
  }
}

export async function deleteFollowing(accountID, username) {
  try {
    const response = await axios.delete(`http://localhost:7001/friend/delete/${accountID}/${username}`);
    return response.data;
    
  } catch (error) {
    console.error('Error fetching following users:', error);
    throw error;
  }
}

// user goal
