const Service = require('egg').Service;
const axios = require('axios');
const authJWT = 'eyJ0eXAiOiJKV1QiLCJhbGciOiJSUzI1NiJ9.eyJuYmYiOjE2OTYwMzIwMDAsImFwaV9zdWIiOiI5ZmViZWE1ZmQ1MjgxZjY2Y2QxMDY4NTg0MzJmZjRmYzU1YzMxNTBlYzEwZTMzY2NmZGJlZTljODFmZTAxOWRiMTcxNzIwMDAwMDAwMCIsInBsYyI6IjVkY2VjNzRhZTk3NzAxMGUwM2FkNjQ5NSIsImV4cCI6MTcxNzIwMDAwMCwiZGV2ZWxvcGVyX2lkIjoiOWZlYmVhNWZkNTI4MWY2NmNkMTA2ODU4NDMyZmY0ZmM1NWMzMTUwZWMxMGUzM2NjZmRiZWU5YzgxZmUwMTlkYiJ9.XkBwptx8AlmawzOqgGfGh0E6BvI_WDZv-oHWVHmUWtPhBcEKC051nJt0yhRCWq0Ce3Fu_T4cd7WzQQr8uiHG09_42xsq78jzHb0m0-o3CY9aK4ChbXfAHcg7yPDmuHZbaG4168F1BB3hU-w4XZgcfFZL85OM-NMVuVcQt12-H3gsebLGSfsjXnf3dn0XZAScXQFff9zuri18_krnmTyEI2RVhChOHcQpNZMZBKLo8yjQ-OYOjGSSIrqNoXsuXeQUc3he8bhROf0yD5c6bUVRQzNrB1Zda3AGH5MysxIQI7h4YvkoEtjh1If-QQ1lkLhlHxUPBBmvDAortiQHEtua9w';
require("dotenv").config();
const { PrismaClient } = require("@prisma/client");
const prisma = new PrismaClient();

class AccountService extends Service {

  async createRandom() {
    const quantity = 1;
    const numTransactions = 2;
    const liveBalance = false;
    let account = null;

    try {
      // Create an account through Hackathon API
      const response = await axios.post('https://sandbox.capitalone.co.uk/developer-services-platform-pr/api/data/accounts/create', {
        quantity,
        numTransactions,
        liveBalance,
      }, {
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${authJWT}`,
          version: '1.0',
        },
      });

      account = response.data.Accounts[0]

      // Create username for the new account
      const randomNumber = Math.floor(Math.random() * 90000) + 10000;
      const userName = account.firstname + account.lastname[0] + randomNumber;

      // Store the username into database
      await prisma.account.create({
          data: {
          username: userName,
          accountID: account.accountId,
          },
      });
    } catch (error) {
        throw new Error(error.response ? error.response.data : error.message);
    }

    return account;
  }

  async getAll() {
    try {
      const response = await axios.get('https://sandbox.capitalone.co.uk/developer-services-platform-pr/api/data/accounts', {
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

  async getByID(id) {
    try {
      const response = await axios.get(`https://sandbox.capitalone.co.uk/developer-services-platform-pr/api/data/accounts/${id}`, {
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

  async getByEmail(emailToFind) {
    try {
      const response = await axios.get('https://sandbox.capitalone.co.uk/developer-services-platform-pr/api/data/accounts', {
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${authJWT}`,
          version: '1.0',
        },
      });
      const foundAccounts = response.data.Accounts.filter(account => account.email === emailToFind);

      if (foundAccounts.length > 0) {
        return foundAccounts[0].accountId;
      }
      return null; // or handle the case when no matching account is found differently
    } catch (error) {
      throw new Error(error.response ? error.response.data : error.message);
    }
  }

}

module.exports = AccountService;
