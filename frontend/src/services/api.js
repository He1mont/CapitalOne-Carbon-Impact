import axios from 'axios';

// ####################### Account ############################

/**
 * Retrieves an account by email from the backend.
 * @param {string} email - The email of the account to fetch.
 * @returns {Promise<Object>} A Promise that resolves to the account data.
 */
export async function getAccountByEmail(email) {
  try {
    const data = { params: { email } };
    const response = await axios.get(`http://127.0.0.1:7001/accounts/email`, data);
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
    const data = { params: { username } };
    const response = await axios.get(`http://127.0.0.1:7001/accounts/username`, data);
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
    const response = await axios.get(`http://localhost:7001/accounts/${accountID}/transactions`);
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
    const data = { params: { year, month } };
    const response = await axios.get(`http://localhost:7001/accounts/${accountID}/carbonScores/monthly`, data);
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
    const data = { params: { year, month } };
    const response = await axios.get(`http://localhost:7001/accounts/${accountID}/carbonScores/monthly/allCategories`, data);
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
    const response = await axios.get(`http://localhost:7001/accounts/${accountID}/friends`);
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
    const response = await axios.post(`http://localhost:7001/accounts/${accountID}/friends/${friendID}`);
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
    const response = await axios.delete(`http://localhost:7001/accounts/${accountID}/friends/${friendID}`);
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
    const response = await axios.get(`http://localhost:7001/accounts/${accountID}/userGoal`);
    return response.data;

  } catch (error) {
    console.error('Error fetching following users:', error);
    throw error;
  }
}

export async function setUserGoal(accountID, goal, year, month) {
  try {
    const data = { params: { goal, year, month } };
    const response = await axios.post(`http://localhost:7001/accounts/${accountID}/userGoal`, data);
    return response.data;

  } catch (error) {
    console.error('Error fetching following users:', error);
    throw error;
  }
}
