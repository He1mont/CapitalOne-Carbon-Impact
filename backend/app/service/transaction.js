// General constants
const Service = require('egg').Service;
const axios = require('axios');
// Constants for the Hackathon API
const authJWT =
  'eyJ0eXAiOiJKV1QiLCJhbGciOiJSUzI1NiJ9.eyJuYmYiOjE2OTYwMzIwMDAsImFwaV9zdWIiOiI5ZmViZWE1ZmQ1MjgxZjY2Y2QxMDY4NTg0MzJmZjRmYzU1YzMxNTBlYzEwZTMzY2NmZGJlZTljODFmZTAxOWRiMTcxNzIwMDAwMDAwMCIsInBsYyI6IjVkY2VjNzRhZTk3NzAxMGUwM2FkNjQ5NSIsImV4cCI6MTcxNzIwMDAwMCwiZGV2ZWxvcGVyX2lkIjoiOWZlYmVhNWZkNTI4MWY2NmNkMTA2ODU4NDMyZmY0ZmM1NWMzMTUwZWMxMGUzM2NjZmRiZWU5YzgxZmUwMTlkYiJ9.XkBwptx8AlmawzOqgGfGh0E6BvI_WDZv-oHWVHmUWtPhBcEKC051nJt0yhRCWq0Ce3Fu_T4cd7WzQQr8uiHG09_42xsq78jzHb0m0-o3CY9aK4ChbXfAHcg7yPDmuHZbaG4168F1BB3hU-w4XZgcfFZL85OM-NMVuVcQt12-H3gsebLGSfsjXnf3dn0XZAScXQFff9zuri18_krnmTyEI2RVhChOHcQpNZMZBKLo8yjQ-OYOjGSSIrqNoXsuXeQUc3he8bhROf0yD5c6bUVRQzNrB1Zda3AGH5MysxIQI7h4YvkoEtjh1If-QQ1lkLhlHxUPBBmvDAortiQHEtua9w';
// Constants for Prisma database
require('dotenv').config();
const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();
// Constants for the Carbon API
const PROGRAM_UUID = 'ddd7027e-2032-4fff-a721-565ac87e7869';
const CARBON_API_KEY = 'sQyPyTxcWvlFiLWFjmUlA';

/**
 * Service class responsible for managing transactions and related operations.
 * @extends {Service}
 */
class TransactionService extends Service {

  /**
   * Generates random transactions for a specified account ID.
   * @param {string} id - The ID of the account.
   * @returns {Object} Information about the generated transactions.
   */
  async createRandom(id) {
    // Set the number of transactions to create
    const quantity = 5;

    // Find the account in the database
    const account = await prisma.account.findMany({
      where: {
        accountID: id,
      },
    });

    // Throw an error if accountID does not exist
    if (account.length === 0) {
      throw new Error(
        JSON.stringify({
          errorCode: 400,
          message: 'The account does not exist.',
        })
      );
    }
    // Throw an error if accountID is suspended or closed
    if ([ 'closed', 'suspended' ].includes(account[0].state)) {
      throw new Error(
        JSON.stringify({
          errorCode: 400,
          message: 'The account is closed or suspended.',
        })
      );
    }

    // Call the Hackathon API to create transactions
    try {
      const response = await axios.post(
        `https://sandbox.capitalone.co.uk/developer-services-platform-pr/api/data/transactions/accounts/${id}/create`,
        {
          quantity,
        },
        {
          headers: {
            'Content-Type': 'application/json',
            Authorization: `Bearer ${authJWT}`,
            version: '1.0',
          },
        }
      );

      // Loop through each created transaction to add it to the Carbon  i.e. generate carbon grams
      // Then add to the database along with carbon score
      for (const item of response.data.Transactions) {
        // create a transaction in the Carbon API, attached to the user's card profile
        await this.addTransactionToCarbonAPI(id, item.transactionUUID);

        await prisma.transaction.create({
          data: {
            transactionUUID: item.transactionUUID,
            accountID: item.accountUUID,
            merchantName: item.merchant.name,
            category: item.merchant.category,
            amount: parseFloat(item.amount),
            date: new Date(item.timestamp),
            // carbonScore: 100.0
            carbonScore: await this.getCarbonImpact(item.accountUUID, item.transactionUUID),
          },
        });
      }
      return response.data;
    } catch (error) {
      throw new Error(error.response ? error.response.data : error.message);
    }
  }

  /**
   * Retrieves all transactions associated with a specified account ID.
   * @param {string} id - The ID of the account.
   * @returns {Array} Array of transactions.
   */
  async getAll(id) {
    const transactions = await prisma.transaction.findMany({
      where: {
        accountID: id,
      },
    });
    return transactions;
  }

  /**
   * Retrieves a transaction by its ID and associated account ID.
   * @param {string} accountID - The ID of the account.
   * @param {string} transactionID - The ID of the transaction.
   * @returns {Object} Transaction information.
   */
  async getByID(accountID, transactionID) {
    const transaction = await prisma.transaction.findMany({
      where: {
        accountID,
        transactionUUID: transactionID,
      },
    });
    return transaction;
  }

    /**
   * Retrieves the carbon impact of a transaction.
   * @param {string} accountID - The ID of the account associated with the transaction.
   * @param {string} transactionID - The ID of the transaction.
   * @returns {number} The carbon impact of the transaction.
   */
    async getCarbonImpact(accountID, transactionID) {
      // Get the specified account from Hackathon API
      try {
        const hackathonResponse = await axios.get(
          `https://sandbox.capitalone.co.uk/developer-services-platform-pr/api/data/accounts/${accountID}`,
          {
            headers: {
              'Content-Type': 'application/json',
              Authorization: `Bearer ${authJWT}`,
              version: '1.0',
            },
          }
        );
  
        if (hackathonResponse.status === 200) {
          // const hackathonData = hackathonResponse.data;
  
          // Get the associated card profile from Carbon API
          const carbonResponse = await axios.get(
            `https://www.carboninterface.com/api/v1/carbon_ledger/programs/${PROGRAM_UUID}/card_profiles`,
            {
              headers: {
                'Content-Type': 'application/json',
                Authorization: `Bearer ${CARBON_API_KEY}`,
              },
            }
          );
  
          const carbonData = carbonResponse.data;
          let cardProfileID = -1;
  
          for (const account of carbonData) {
            if (account.data.attributes.external_id === accountID) {
              cardProfileID = account.data.id;
              break;
            }
          }
  
          if (cardProfileID === -1) {
            throw new Error(
              "Card Profile hasn't been created for this account. Create a Card Profile first."
            );
          }
  
          // Get the specified transaction
          const hackathonTransactionResponse = await axios.get(
            `https://sandbox.capitalone.co.uk/developer-services-platform-pr/api/data/transactions/accounts/${accountID}/transactions/${transactionID}`,
            {
              headers: {
                'Content-Type': 'application/json',
                Authorization: `Bearer ${authJWT}`,
                version: '1.0',
              },
            }
          );
  
          if (hackathonTransactionResponse.status === 200) {
            const carbonTransactionResponse = await axios.get(
              `https://www.carboninterface.com/api/v1/carbon_ledger/programs/${PROGRAM_UUID}/card_profiles/${cardProfileID}/transactions`,
              {
                headers: {
                  'Content-Type': 'application/json',
                  Authorization: `Bearer ${CARBON_API_KEY}`,
                },
              }
            );
  
            const carbonTransactionData = carbonTransactionResponse.data;
            let carbonTransactionID = -1;
  
            let carbonInGrams = 0;
  
            for (const transaction of carbonTransactionData) {
              // Find the transaction in Carbon API that matches the specified one from Hackathon API
              if (transaction.data.attributes.external_id === transactionID) {
                carbonTransactionID = transaction.data.id;
                if (carbonTransactionID === -1) {
                  throw new Error(
                    "Transaction data hasn't been created for this transaction."
                  );
                }
                // Get the carbon grams value
                carbonInGrams = transaction.data.attributes.carbon_grams;
              }
            }
            let carbonScore = Math.abs(carbonInGrams);
  
            // Include point of sale as a multiplier
            if ((hackathonTransactionResponse.data.pointOfSale = 'Online')) {
              carbonScore = carbonScore / 2;
            }
            // Return as a score, not grams value
            return Math.ceil(carbonScore / 1000);
          }
          throw new Error("This transaction ID doesn't exist.");
        } else {
          throw new Error("This account doesn't exist.");
        }
      } catch (error) {
        throw new Error(error.response ? error.response.data : error.message);
      }
    }

    /**
 * Retrieves a list of transactions for a specific month.
 * @param {string} accountID - The ID of the account.
 * @param {number} year - The year of the transactions.
 * @param {number} month - The month of the transactions (1 to 12).
 * @returns {Array} List of transactions for the specified month.
 */
  async getTransactionsByMonth(accountID, year, month) {
    const transactions = await prisma.transaction.findMany({
      where: {
        accountID,
      },
    });
    // getMonth returns 0 for Jan, 1 for Feb, ...
    return transactions.filter(item => {
      return item.date.getFullYear() === year && item.date.getMonth() === month - 1;
    });
  }

  /**
 * Retrieves the total carbon score for a specific month.
 * @param {string} accountID - The ID of the account.
 * @param {number} year - The year of the transactions.
 * @param {number} month - The month of the transactions (1 to 12).
 * @returns {number} Total carbon score for the specified month.
 */
  async getCarbonScoreByMonth(accountID, year, month) {
    const filteredTransactions = await this.getTransactionsByMonth(accountID, year, month);
    return filteredTransactions.reduce((acc, item) => acc + item.carbonScore, 0);
  }

  /**
 * Retrieves the carbon score by category for a specific month.
 * @param {string} accountID - The ID of the account.
 * @param {number} year - The year of the transactions.
 * @param {number} month - The month of the transactions (1 to 12).
 * @returns {Object} Carbon score by category for the specified month.
 */
  async getCarbonScoreByMonthInCategory(accountID, year, month) {
    const filteredTransactions = await this.getTransactionsByMonth(accountID, year, month);
    const ret = {
      Entertainment: 0,
      Education: 0,
      Shopping: 0,
      'Personal Care': 0,
      'Health & Fitness': 0,
      'Food & Dining': 0,
      'Gifts & Donations': 0,
      'Bills & Utilities': 0,
      'Auto & Transport': 0,
      Travel: 0,
    };
    // Calculate carbon score by category
    for (const item of filteredTransactions) {
      ret[item.category] += item.carbonScore;
    }
    return ret;
  }

  /**
   * Groups transactions by date for a specified account ID.
   * @param {string} id - The ID of the account.
   * @returns {Object} Grouped transactions by date.
   */
  async groupByDate(id) {
    try {
      const response = await axios.get(
        `https://sandbox.capitalone.co.uk/developer-services-platform-pr/api/data/transactions/accounts/${id}/transactions`,
        {
          headers: {
            'Content-Type': 'application/json',
            Authorization: `Bearer ${authJWT}`,
            version: '1.0',
          },
        }
      );

      const groupedData = {};

      if (response.data.Transaction && response.data.Transaction.length > 0) {
        response.data.Transaction.forEach(transaction => {
          // extract the date section
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

  /**
 * Adds a transaction to the Carbon API.
 * @param {string} accountID - The ID of the account.
 * @param {string} transactionID - The ID of the transaction.
 * @returns {Object} Response data from the Carbon API.
 * @throws {Error} If the account or transaction doesn't exist or if there's an API error.
 */
  async addTransactionToCarbonAPI(accountID, transactionID) {
    try {
      const hackathonResponse = await axios.get(`https://sandbox.capitalone.co.uk/developer-services-platform-pr/api/data/accounts/${accountID}`, {
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${authJWT}`,
          version: '1.0',
        },
      });

      // Check if the account exists
      if (hackathonResponse.status === 200) {
        // Get card profiles from the Carbon API
        const carbonResponse = await axios.get(`https://www.carboninterface.com/api/v1/carbon_ledger/programs/${PROGRAM_UUID}/card_profiles`, {
          headers: {
            'Content-Type': 'application/json',
            Authorization: `Bearer ${CARBON_API_KEY}`,
          },
        });

        const carbonData = carbonResponse.data;
        let cardProfileID = -1;

        // Find card profile ID matching the account ID
        for (const account of carbonData) {
          if (account.data.attributes.external_id === accountID) {
            cardProfileID = account.data.id;
            break;
          }
        }

        // Throw error if card profile not found
        if (cardProfileID === -1) {
          throw new Error(
            "Card Profile hasn't been created for this account. Create a Card Profile first."
          );
        }

        // Get transaction details from the Hackathon API
        const transactionResponse = await axios.get(
          `https://sandbox.capitalone.co.uk/developer-services-platform-pr/api/data/transactions/accounts/${accountID}/transactions/${transactionID}`,
          {
            headers: {
              'Content-Type': 'application/json',
              Authorization: `Bearer ${authJWT}`,
              version: '1.0',
            },
          }
        );
        // If transaction exists, map its category to a merchant category code (MCC)
        if (transactionResponse.status === 200) {
          const transaction = transactionResponse.data;
          let mcc;
          // Map merchant categories to MCCs
          switch (transaction.merchant.category) {
            case 'Entertainment':
              mcc = '7996';
              break;
            case 'Education':
              mcc = '5942';
              break;
            case 'Shopping':
              mcc = '5691';
              break;
            case 'Personal Care':
              mcc = '8050';
              break;
            case 'Health & Fitness':
              mcc = '7298';
              break;
            case 'Food & Dining':
              mcc = '5812';
              break;
            case 'Gifts & Donations':
              mcc = '5947';
              break;
            case 'Bills & Utilities':
              mcc = '4900';
              break;
            case 'Auto & Transport':
              mcc = '4111';
              break;
            case 'Travel':
              mcc = '4582';
              break;
            default:
              mcc = '5399';
          }

          // Prepare transaction data for Carbon API
          const transactionData = {
            cardProfileID,
            transaction: {
              amount_cents: transaction.amount * 100,
              currency: 'USD',
              external_id: transaction.transactionUUID,
              merchant_category: transaction.merchant.category,
              merchant_category_code: mcc,
              merchant_name: transaction.merchant.name,
              merchant_country: 'US',
              merchant_state: 'CA',
              merchant_city: 'San Francisco',
              merchant_postal_code: '90210',
            },
          };

          // Add transaction to Carbon API
          const addTransactionResponse = await axios.post(
            `https://www.carboninterface.com/api/v1/carbon_ledger/programs/${PROGRAM_UUID}/card_profiles/${cardProfileID}/transactions`,
            transactionData.transaction,
            {
              headers: {
                'Content-Type': 'application/json',
                Authorization: `Bearer ${CARBON_API_KEY}`,
              },
            }
          );

          return addTransactionResponse.data;
        }
        throw new Error("This transaction ID doesn't exist.");
      } else {
        throw new Error("This account doesn't exist.");
      }
    } catch (error) {
      // Handle API errors
      throw new Error(error.response ? error.response.data : error.message);
    }
  }
}

module.exports = TransactionService;
