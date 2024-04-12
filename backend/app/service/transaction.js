const Service = require('egg').Service;
const axios = require('axios');

// Authorization token for Capital One API
const authJWT = 'eyJ0eXAiOiJKV1QiLCJhbGciOiJSUzI1NiJ9.eyJuYmYiOjE2OTYwMzIwMDAsImFwaV9zdWIiOiI5ZmViZWE1ZmQ1MjgxZjY2Y2QxMDY4NTg0MzJmZjRmYzU1YzMxNTBlYzEwZTMzY2NmZGJlZTljODFmZTAxOWRiMTcxNzIwMDAwMDAwMCIsInBsYyI6IjVkY2VjNzRhZTk3NzAxMGUwM2FkNjQ5NSIsImV4cCI6MTcxNzIwMDAwMCwiZGV2ZWxvcGVyX2lkIjoiOWZlYmVhNWZkNTI4MWY2NmNkMTA2ODU4NDMyZmY0ZmM1NWMzMTUwZWMxMGUzM2NjZmRiZWU5YzgxZmUwMTlkYiJ9.XkBwptx8AlmawzOqgGfGh0E6BvI_WDZv-oHWVHmUWtPhBcEKC051nJt0yhRCWq0Ce3Fu_T4cd7WzQQr8uiHG09_42xsq78jzHb0m0-o3CY9aK4ChbXfAHcg7yPDmuHZbaG4168F1BB3hU-w4XZgcfFZL85OM-NMVuVcQt12-H3gsebLGSfsjXnf3dn0XZAScXQFff9zuri18_krnmTyEI2RVhChOHcQpNZMZBKLo8yjQ-OYOjGSSIrqNoXsuXeQUc3he8bhROf0yD5c6bUVRQzNrB1Zda3AGH5MysxIQI7h4YvkoEtjh1If-QQ1lkLhlHxUPBBmvDAortiQHEtua9w';

// Constants for Carbon API
const PROGRAM_UUID = "ddd7027e-2032-4fff-a721-565ac87e7869";
const CARBON_API_KEY = "sQyPyTxcWvlFiLWFjmUlA";

class TransactionService extends Service {

  // Method to create a random transaction for a specific account
  async createRandom(id) {
    const quantity = 3; // Quantity of random transactions to create

    try {
      // Send request to Capital One API to create random transactions
      const response = await axios.post(`https://sandbox.capitalone.co.uk/developer-services-platform-pr/api/data/transactions/accounts/${id}/create`, {
        quantity,
      }, {
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${authJWT}`,
          version: '1.0',
        },
      });

      // Loop through the created transactions and add them to the Carbon API
      for (let i = 0; i < quantity; i++) {
        const tranUUID = response.data.Transactions[i].transactionUUID;
        await this.addTransactionToCarbonAPI(id, tranUUID);
      }
      
      return response.data;

    } catch (error) {
      // Throw error if request fails
      throw new Error(error.response ? error.response.data : error.message);
    }
  }

  // Method to get all transactions for a specific account
  async getAll(id) {
    try {
      // Send request to Capital One API to get all transactions
      const response = await axios.get(`https://sandbox.capitalone.co.uk/developer-services-platform-pr/api/data/transactions/accounts/${id}/transactions`, {
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${authJWT}`,
          version: '1.0',
        },
      });
      return response.data;

    } catch (error) {
      throw new Error(error.response ? error.response.data : error.message);
    }
  }

  // Method to get a transaction by its ID for a specific account
  async getByID(accountID, transactionID) {
    try {
      // Send request to Capital One API to get transaction by ID
      const response = await axios.get(`https://sandbox.capitalone.co.uk/developer-services-platform-pr/api/data/transactions/accounts/${accountID}/transactions/${transactionID}`, {
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${authJWT}`,
          version: '1.0',
        },
      });
      return response.data;

    } catch (error) {
      throw new Error(error.response ? error.response.data : error.message);
    }
  }

  // Method to get the carbon impact of a transaction for a specific account
  async getCarbonImpact(accountID, transactionID) {
    try {
      // Implementing logic to calculate carbon impact
      
    } catch (error) {
      throw new Error(error.response ? error.response.data : error.message);
    }
  }

  // Method to group transactions by date for a specific account
  async groupByDate(id) {
    try {
      // Send request to Capital One API to get transactions
      const response = await axios.get(`https://sandbox.capitalone.co.uk/developer-services-platform-pr/api/data/transactions/accounts/${id}/transactions`, {
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${authJWT}`,
          version: '1.0',
        },
      });

      // Group transactions by date
      const groupedData = {};
      if (response.data.Transaction && response.data.Transaction.length > 0) {
        response.data.Transaction.forEach(transaction => {
          const timestamp = transaction.timestamp.split(' ')[0];
          if (!groupedData[timestamp]) {
            groupedData[timestamp] = [];
          }
          groupedData[timestamp].push(transaction);
        });
      }
      return groupedData;

    } catch (error) {
      throw new Error(error.response ? error.response.data : error.message);
    }
  }

  // Method to add a transaction to the Carbon API
  async addTransactionToCarbonAPI(accountID, transactionID) {
    try {
      // Implementing logic to add transaction to Carbon API
      
    } catch (error) {
      throw new Error(error.response ? error.response.data : error.message);
    }
  }

}

module.exports = TransactionService;
