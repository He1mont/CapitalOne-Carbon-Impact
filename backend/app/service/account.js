// Constants
const Service = require('egg').Service;
const axios = require('axios');
// Constants for the Hackathon API
const authJWT =
  'eyJ0eXAiOiJKV1QiLCJhbGciOiJSUzI1NiJ9.eyJuYmYiOjE2OTYwMzIwMDAsImFwaV9zdWIiOiI5ZmViZWE1ZmQ1MjgxZjY2Y2QxMDY4NTg0MzJmZjRmYzU1YzMxNTBlYzEwZTMzY2NmZGJlZTljODFmZTAxOWRiMTcxNzIwMDAwMDAwMCIsInBsYyI6IjVkY2VjNzRhZTk3NzAxMGUwM2FkNjQ5NSIsImV4cCI6MTcxNzIwMDAwMCwiZGV2ZWxvcGVyX2lkIjoiOWZlYmVhNWZkNTI4MWY2NmNkMTA2ODU4NDMyZmY0ZmM1NWMzMTUwZWMxMGUzM2NjZmRiZWU5YzgxZmUwMTlkYiJ9.XkBwptx8AlmawzOqgGfGh0E6BvI_WDZv-oHWVHmUWtPhBcEKC051nJt0yhRCWq0Ce3Fu_T4cd7WzQQr8uiHG09_42xsq78jzHb0m0-o3CY9aK4ChbXfAHcg7yPDmuHZbaG4168F1BB3hU-w4XZgcfFZL85OM-NMVuVcQt12-H3gsebLGSfsjXnf3dn0XZAScXQFff9zuri18_krnmTyEI2RVhChOHcQpNZMZBKLo8yjQ-OYOjGSSIrqNoXsuXeQUc3he8bhROf0yD5c6bUVRQzNrB1Zda3AGH5MysxIQI7h4YvkoEtjh1If-QQ1lkLhlHxUPBBmvDAortiQHEtua9w';
// Constants for the Prisma database
require('dotenv').config();
const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();
// Constants for the Carbon API
const PROGRAM_UUID = 'ddd7027e-2032-4fff-a721-565ac87e7869';
const CARBON_API_KEY = 'sQyPyTxcWvlFiLWFjmUlA';

/**
 * Service class responsible for managing user accounts and related operations.
 * @augments {Service}
 */
class AccountService extends Service {

  /**
   * Creates a random user account.
   * @return {Object} The created account.
   */
  async createRandom() {
    const quantity = 1;
    const numTransactions = 0;
    const liveBalance = false;

    try {
      // Create an account through Hackathon API
      const response = await axios.post(
        'https://sandbox.capitalone.co.uk/developer-services-platform-pr/api/data/accounts/create',
        {
          quantity,
          numTransactions,
          liveBalance,
        },
        {
          headers: {
            'Content-Type': 'application/json',
            Authorization: `Bearer ${authJWT}`,
            version: '1.0',
          },
        }
      );

      // Create username for the new account
      const account = response.data.Accounts[0];
      const randomNumber = Math.floor(Math.random() * 90000) + 10000;
      const userName = account.firstname + account.lastname[0] + randomNumber;

      // create a (Carbon API) card profile from the created account
      await this.createCardProfile(account.accountId);

      // Store the username with the account into database
      await prisma.account.create({
        data: {
          accountID: account.accountId,
          username: userName,
          firstName: account.firstname,
          lastName: account.lastname,
          email: account.email,
          phone: account.phoneNumber,
          address: account.homeAddress,
          currency: account.currencyCode,
          state: account.state,
          balance: account.balance,
          colorMode: 0,
        },
      });

      return account;
    } catch (error) {
      throw new Error(error.response ? error.response.data : error.message);
    }
  }

  /**
   * Retrieves all user accounts.
   * @return {Array} Array of user accounts.
   */
  async getAll() {
    const allAccounts = await prisma.account.findMany();
    return allAccounts;
  }

  /**
   * Retrieves a user account by its ID; return empty list if not found.
   * @param {string} id - The ID of the account to retrieve.
   * @return {Array} Array containing the user account matching the ID.
   */
  async getByID(id) {
    const account = await prisma.account.findMany({
      where: {
        accountID: id,
      },
    });
    return account;
  }

  /**
   * Retrieves a user account by its email; return empty list if not found.
   * @param {string} emailToFind - The email of the account to retrieve.
   * @return {Array} Array containing the user account matching the email.
   */
  async getByEmail(emailToFind) {
    const account = await prisma.account.findMany({
      where: {
        email: emailToFind,
      },
    });
    return account;
  }

  /**
   * Retrieves a user account by its username; return empty list if not found.
   * @param {string} userName - The username of the account to retrieve.
   * @return {Array} Array containing the user account matching the username.
   */
  async getByUserName(userName) {
    const account = await prisma.account.findMany({
      where: {
        username: userName,
      },
    });
    return account;
  }

  /**
   * Retrieves a user account by its username; return empty list if not found.
   * @param {string} id - The account ID of the account to retrieve.
   * @return {Array} Array containing the user account matching the username.
   */
  async getBalance(id) {
    const account = await prisma.account.findUnique({
      where: {
        accountID: id,
      },
    });
    return account.balance;
  }

  /**
   * Update the color theme of an account
   * @param {string} id - The ID of the account to retrieve.
   * @param {int} newTheme - The new color theme to update.
   * @return {Object} The updated account.
   */
  async updateColorTheme(id, newTheme) {
    const validThemeNumber = [ 0, 1, 2, 3 ];
    if (validThemeNumber.includes(newTheme)) {
      const updateTheme = await prisma.account.update({
        where: {
          accountID: id,
        },
        data: {
          colorMode: newTheme,
        },
      });
      return updateTheme;
    }
    throw new Error('Invalid Color Theme!');

  }

  /**
   * Update the currency of an account
   * @param {string} id - The ID of the account to retrieve.
   * @param {string} newCurr - The new currency to update.
   * @return {Object} The updated account.
   */
  async updateCurrency(id, newCurr) {
    const validCurr = [ 'USD', 'EUR', 'GBP', 'INR', 'AUD', 'CAD', 'SGD', 'CHF', 'MYR', 'JPY', 'CNY' ];
    if (validCurr.includes(newCurr)) {
      const updateTheme = await prisma.account.update({
        where: {
          accountID: id,
        },
        data: {
          currency: newCurr,
        },
      });
      return updateTheme;
    }
    throw new Error('Invalid Currency!');

  }


  /**
   * Creates a card profile for the specified account.
   * @param {string} accountID - The ID of the account for which to create the card profile.
   */
  async createCardProfile(accountID) {
    // Get the corresponding accountin the Hackathon API
    try {
      const response = await axios.get(
        `https://sandbox.capitalone.co.uk/developer-services-platform-pr/api/data/accounts/${accountID}`,
        {
          headers: {
            'Content-Type': 'application/json',
            Authorization: `Bearer ${authJWT}`,
            version: '1.0',
          },
        }
      );

      if (response.status === 200) {
        const accounts = await axios.get(
          `https://www.carboninterface.com/api/v1/carbon_ledger/programs/${PROGRAM_UUID}/card_profiles`,
          {
            headers: {
              'Content-Type': 'application/json',
              Authorization: `Bearer ${CARBON_API_KEY}`,
            },
          }
        );

        const existingProfile = accounts.data.find(
          account => account.data.attributes.external_id === accountID
        );

        if (existingProfile) {
          console.log(
            'A Card Profile has already been created for this account.'
          );
          return;
        }

        // Create a card profile using the hackathon account ID as an external ID here
        const data = {
          external_id: accountID,
          diet_habit: 'omnivore',
          transportation_method: 'midsize_vehicle',
        };

        const cardProfileResponse = await axios.post(
          `https://www.carboninterface.com/api/v1/carbon_ledger/programs/${PROGRAM_UUID}/card_profiles`,
          data,
          {
            headers: {
              'Content-Type': 'application/json',
              Authorization: `Bearer ${CARBON_API_KEY}`,
            },
          }
        );

        if (cardProfileResponse.status === 201) {
          console.log(cardProfileResponse);
        }
      } else {
        console.log("The account id you entered doesn't exist. Try Again\n");
      }
    } catch (error) {
      throw new Error(error.response ? error.response.data : error.message);
    }
  }

  /**
   * Adds a transaction to the Carbon Interface API.
   * @param {Object} transactionData - Data of the transaction to add.
   * @return {Object} Response from the Carbon Interface API.
   */
  async addTransactionToCarbonInterface(transactionData) {
    try {
      const addTransactionResponse = await axios.post(
        `https://www.carboninterface.com/api/v1/carbon_ledger/programs/${PROGRAM_UUID}/card_profiles/${transactionData.accountCarbonID}/transactions`,
        transactionData.transaction,
        {
          headers: {
            'Content-Type': 'application/json',
            Authorization: `Bearer ${CARBON_API_KEY}`,
          },
        }
      );
      return addTransactionResponse.data;
    } catch (error) {
      throw new Error(error.response ? error.response.data : error.message);
    }
  }

  /**
   * Creates transactions for all accounts and adds them to the Carbon Interface API and the database.
   * @param {string} accountID - The ID of the account for which to create transactions.
   */
  async createTransactionsForAll(accountID) {
    // Get the specified account from the hackathon API
    try {
      // Get all accounts
      const response = await axios.get(`https://sandbox.capitalone.co.uk/developer-services-platform-pr/api/data/accounts/${accountID}`, {
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${authJWT}`,
          version: '1.0',
        },
      }
      );

      if (response.status === 200) {
        // const transactions = await getAll(accountID);
        // get all transactions
        const response = await axios.get(
          `https://sandbox.capitalone.co.uk/developer-services-platform-pr/api/data/transactions/accounts/${accountID}/transactions`,
          {
            headers: {
              'Content-Type': 'application/json',
              Authorization: `Bearer ${authJWT}`,
              version: '1.0',
            },
          }
        );
        const transactions = response.data.Transactions;


        // Get all card profiles
        const accounts = await axios.get(`https://www.carboninterface.com/api/v1/carbon_ledger/programs/${PROGRAM_UUID}/card_profiles`, {
          headers: {
            'Content-Type': 'application/json',
            Authorization: `Bearer ${CARBON_API_KEY}`,
          },
        });
        const accountData = accounts.data;
        const account = accountData.find(account => account.data.attributes.external_id === accountID);

        if (!account) {
          throw new Error(
            "Card Profile hasn't been created for this account. Create a Card Profile first."
          );
        }

        // loops through each transaction of the new account to add it to the carbon API
        // and also adds it to the database transactions table
        for (const transaction of transactions) {
          // Add to carbon API
          const existingTransaction = await axios.get(
            `https://www.carboninterface.com/api/v1/carbon_ledger/programs/${PROGRAM_UUID}/card_profiles/${account.data.id}/transactions`,
            {
              headers: {
                'Content-Type': 'application/json',
                Authorization: `Bearer ${CARBON_API_KEY}`,
              },
            }
          );

          if (!existingTransaction.data.find(tr => tr.data.attributes.external_id === transaction.transactionID)) { // If not, add transaction
            let mcc;
            switch (transaction.merchant.category) { // Picking the merchant code based on merchant category
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

            const transactionData = {
              accountCarbonID: account.data.id,
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

            await this.addTransactionToCarbonInterface(transactionData);
          }

          // const Tran = new TransactionService();
          // add to transactions table of database
          await prisma.transaction.create({
            data: {
              transactionUUID: transaction.transactionUUID,
              accountID: transaction.accountUUID,
              merchantName: transaction.merchant.name,
              category: transaction.merchant.category,
              amount: parseFloat(transaction.amount),
              date: new Date(transaction.timestamp),
              carbonScore: await this.getCarbonImpact(
                transaction.accountUUID,
                transaction.transactionUUID
              ),
              // carbonScore: await Tran.getCarbonImpact(transaction.accountUUID, transaction.transactionUUID)
            },
          });
        }
        // console.log("All transactions added successfully.");
      } else {
        // Account does not exist
      }
    } catch (error) {
      console.error(error.message);
    }
  }

  /**
   * Retrieves the carbon impact of a transaction.
   * @param {string} accountID - The ID of the account associated with the transaction.
   * @param {string} transactionID - The ID of the transaction.
   * @return {number} The carbon impact of the transaction.
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
          if ((hackathonTransactionResponse.data.pointOfSale === 'Online')) {
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
}

module.exports = AccountService;
