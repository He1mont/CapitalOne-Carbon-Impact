import axios from 'axios';

// ####################### Account ############################

/**
 * Retrieves an account by email from the backend.
 * @param {string} email - The email of the account to fetch.
 * @returns {Promise<Object>} A Promise that resolves to the account data.
 */
export async function getAccountByEmail(email) {
  try {
    const response = await axios.get(`http://127.0.0.1:7001/account/get-by-email/${email}`);
    return response.data

  } catch (error) {
    console.error("Error fetching account by email:", error);
  }
}

/**
 * Retrieves an account by username from the backend.
 * @param {string} username - The username of the account to fetch.
 * @returns {Promise<Object>} A Promise that resolves to the account data.
 */
export async function getAccountByUsername(username) {
  try {
    const response = await axios.get(`http://127.0.0.1:7001/account/get-by-username/${username}`);
    return response.data

  } catch (error) {
    console.error("Error fetching account by username:", error);
  }
}

// ####################### Transaction ############################

/**
 * Retrieves all transactions associated with an account from the backend.
 * @param {string} accountID - The ID of the account whose transactions to fetch.
 * @returns {Promise<Array>} A Promise that resolves to an array of transaction data.
 */
export async function getAllTransactions(accountID) {
  try {
    const response = await axios.get(`http://localhost:7001/transaction/get-all/${accountID}`);
    return response.data;
    
  } catch (error) {
    console.error('Error fetching transactions:', error);
    throw error;
  }
}

/**
 * Retrieves the carbon score for a specific month associated with an account from the backend.
 * @param {string} accountID - The ID of the account for which to retrieve the carbon score.
 * @param {string} year - The year of the month.
 * @param {string} month - The month of the year.
 * @returns {Promise<number>} A Promise that resolves to the carbon score for the specified month.
 */
export async function getCarbonScoreByMonth(accountID, year, month) {
  try {
    const response = await axios.get(`http://localhost:7001/transaction/get-carbonscore-by-month/${accountID}/${year}/${month}`);
    return response.data;
    
  } catch (error) {
    console.error('Error fetching carbon scores by month:', error);
    throw error;
  }
}


/**
 * Retrieves the carbon scores by category for a specific month associated with an account from the backend.
 * @param {string} accountID - The ID of the account for which to retrieve the carbon scores.
 * @param {string} year - The year of the month.
 * @param {string} month - The month of the year.
 * @returns {Promise<Object>} A Promise that resolves to an object containing carbon scores by category.
 */
export async function getCarbonScoreByMonthInCategory(accountID, year, month) {
  try {
    const response = await axios.get(`http://localhost:7001/transaction/get-carbonscore-by-month-in-category/${accountID}/${year}/${month}`);
    return response.data;
    
  } catch (error) {
    console.error('Error fetching carbon scores by month:', error);
    throw error;
  }
}

// ####################### Friend ############################

/**
 * Retrieves all followed accounts by the specified account ID from the backend.
 * @param {string} accountID - The ID of the account whose followed accounts to fetch.
 * @returns {Promise<Array>} A Promise that resolves to an array of followed account data.
 */
export async function getAllFollowings(accountID) {
  try {
    const response = await axios.get(`http://localhost:7001/friend/get-all/${accountID}`);
    return response.data;
    
  } catch (error) {
    console.error('Error in fetching following users:', error);
    throw error;
  }
}

/**
 * Adds a followed account by IDs to the specified account from the backend.
 * @param {string} accountID - The ID of the account to add the followed account to.
 * @param {string} friendID - The ID of the account to be followed.
 * @returns {Promise<Object>} A Promise that resolves to the result of the addition operation.
 */
export async function addFollowing(accountID, friendID) {
  try {
    const response = await axios.post(`http://localhost:7001/friend/add-by-id/${accountID}/${friendID}`);
    return response.data;
    
  } catch (error) {
    console.error('Error in adding following users:', error);
    throw error;
  }
}


/**
 * Deletes a followed account by IDs from the specified account from the backend.
 * @param {string} accountID - The ID of the account to remove the followed account from.
 * @param {string} friendID - The ID of the account to be unfollowed.
 * @returns {Promise<Object>} A Promise that resolves to the result of the deletion operation.
 */
export async function deleteFollowing(accountID, friendID) {
  try {
    const response = await axios.delete(`http://localhost:7001/friend/delete/${accountID}/${friendID}`);
    return response.data;
    
  } catch (error) {
    console.error('Error in deleting following users:', error);
    throw error;
  }
}

// ####################### User Goal ############################

/**
 * Retrieves the goal of the specified account from the backend.
 * @param {string} accountID - The ID of the account whose goal to fetch.
 * @returns {Promise<Object>} A Promise that resolves to the goal data.
 */
export async function getUserGoal(accountID) {
  try {
    const response = await axios.get(`http://localhost:7001/userGoal/${accountID}`);
    return response.data;
    
  } catch (error) {
    console.error('Error fetching following users:', error);
    throw error;
  }
}

export async function setUserGoal(accountID, goal, year, month) {
  try {
    const response = await axios.post(`http://localhost:7001/userGoal/set-goal/${accountID}/${goal}/${year}/${month}`);
    return response.data;
    
  } catch (error) {
    console.error('Error fetching following users:', error);
    throw error;
  }
}
