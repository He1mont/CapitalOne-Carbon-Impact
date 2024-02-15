const Service = require('egg').Service;
const axios = require('axios');
const authJWT = 'eyJ0eXAiOiJKV1QiLCJhbGciOiJSUzI1NiJ9.eyJuYmYiOjE2OTYwMzIwMDAsImFwaV9zdWIiOiI5ZmViZWE1ZmQ1MjgxZjY2Y2QxMDY4NTg0MzJmZjRmYzU1YzMxNTBlYzEwZTMzY2NmZGJlZTljODFmZTAxOWRiMTcxNzIwMDAwMDAwMCIsInBsYyI6IjVkY2VjNzRhZTk3NzAxMGUwM2FkNjQ5NSIsImV4cCI6MTcxNzIwMDAwMCwiZGV2ZWxvcGVyX2lkIjoiOWZlYmVhNWZkNTI4MWY2NmNkMTA2ODU4NDMyZmY0ZmM1NWMzMTUwZWMxMGUzM2NjZmRiZWU5YzgxZmUwMTlkYiJ9.XkBwptx8AlmawzOqgGfGh0E6BvI_WDZv-oHWVHmUWtPhBcEKC051nJt0yhRCWq0Ce3Fu_T4cd7WzQQr8uiHG09_42xsq78jzHb0m0-o3CY9aK4ChbXfAHcg7yPDmuHZbaG4168F1BB3hU-w4XZgcfFZL85OM-NMVuVcQt12-H3gsebLGSfsjXnf3dn0XZAScXQFff9zuri18_krnmTyEI2RVhChOHcQpNZMZBKLo8yjQ-OYOjGSSIrqNoXsuXeQUc3he8bhROf0yD5c6bUVRQzNrB1Zda3AGH5MysxIQI7h4YvkoEtjh1If-QQ1lkLhlHxUPBBmvDAortiQHEtua9w';

class TransactionService extends Service {

  async createRandom(id) {
    const quantity = 5;

    try {
      const response = await axios.post(`https://sandbox.capitalone.co.uk/developer-services-platform-pr/api/data/transactions/accounts/${id}/create`, {
        quantity,
      }, {
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${authJWT}`,
          version: '1.0',
        }
      });
      return response.data

    } catch (error) {
      throw new Error(error.response ? error.response.data : error.message);
    }
  }

  async getAll(id) {
    try {
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

  async getByID(accountID, transactionID) {
    try {
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

  async groupByDate(id) {
    try {
      const response = await axios.get(`https://sandbox.capitalone.co.uk/developer-services-platform-pr/api/data/transactions/accounts/${id}/transactions`, {
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${authJWT}`,
          version: '1.0',
        },
      });

      const groupedData = {};

      response.data.Transaction.forEach(transaction => {
        const timestamp = transaction.timestamp.split(' ')[0]; // extract the date section

        if (!groupedData[timestamp]) {
          groupedData[timestamp] = [];
        }

        groupedData[timestamp].push(transaction);
      });
      return groupedData;

    } catch (error) {
      throw new Error(error.response ? error.response.data : error.message);
    }
  }

}

module.exports = TransactionService;
