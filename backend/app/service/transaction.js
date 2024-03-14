const Service = require('egg').Service;
const axios = require('axios');
const authJWT = 'eyJ0eXAiOiJKV1QiLCJhbGciOiJSUzI1NiJ9.eyJuYmYiOjE2OTYwMzIwMDAsImFwaV9zdWIiOiI5ZmViZWE1ZmQ1MjgxZjY2Y2QxMDY4NTg0MzJmZjRmYzU1YzMxNTBlYzEwZTMzY2NmZGJlZTljODFmZTAxOWRiMTcxNzIwMDAwMDAwMCIsInBsYyI6IjVkY2VjNzRhZTk3NzAxMGUwM2FkNjQ5NSIsImV4cCI6MTcxNzIwMDAwMCwiZGV2ZWxvcGVyX2lkIjoiOWZlYmVhNWZkNTI4MWY2NmNkMTA2ODU4NDMyZmY0ZmM1NWMzMTUwZWMxMGUzM2NjZmRiZWU5YzgxZmUwMTlkYiJ9.XkBwptx8AlmawzOqgGfGh0E6BvI_WDZv-oHWVHmUWtPhBcEKC051nJt0yhRCWq0Ce3Fu_T4cd7WzQQr8uiHG09_42xsq78jzHb0m0-o3CY9aK4ChbXfAHcg7yPDmuHZbaG4168F1BB3hU-w4XZgcfFZL85OM-NMVuVcQt12-H3gsebLGSfsjXnf3dn0XZAScXQFff9zuri18_krnmTyEI2RVhChOHcQpNZMZBKLo8yjQ-OYOjGSSIrqNoXsuXeQUc3he8bhROf0yD5c6bUVRQzNrB1Zda3AGH5MysxIQI7h4YvkoEtjh1If-QQ1lkLhlHxUPBBmvDAortiQHEtua9w';

// for the Carbon API
const PROGRAM_UUID = "ddd7027e-2032-4fff-a721-565ac87e7869";
const CARBON_API_KEY = "sQyPyTxcWvlFiLWFjmUlA";

class TransactionService extends Service {

  async createRandom(id) {
    const quantity = 3;

    try {
      const response = await axios.post(`https://sandbox.capitalone.co.uk/developer-services-platform-pr/api/data/transactions/accounts/${id}/create`, {
        quantity,
      }, {
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${authJWT}`,
          version: '1.0',
        },
      });

      for (const item of response.data.Transactions) {
        // create a transaction in the Carbon API, attached to the user's card profile
        await this.addTransactionToCarbonAPI(id, item.transactionUUID);
        
        await prisma.transaction.create({
          data: {
            transactionUUID: "unique-uuid-1234",
            accountID: "61068612", 
            merchantName: "Sample Merchant",
            category: "Sample Category",
            amount: 123.45,
            date: new Date(),  
            carbonScore: 9.8
            // transactionUUID: item.transactionUUID,
            // accountID: item.accountUUID,
            // carbonScore: 100.0,
            // // carbonScore: this.getCarbonImpact(tran.accountUUID, tran.transactionUUID),
            // date: date.getTime(),
            // category: item.merchant.category, 
            // merchantName: item.merchant.name,
            // amount: parseFloat(item.amount)
          }
        });
      }

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

  async getCarbonImpact(accountID, transactionID) {
    // get transaction from carbon API
    // return transaction.carbon_grams
    try {

      const hackathonResponse = await axios.get(`https://sandbox.capitalone.co.uk/developer-services-platform-pr/api/data/accounts/${accountID}`, {
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${authJWT}`,
          version: '1.0'
        }
      });

      if (hackathonResponse.status === 200) {
        // const hackathonData = hackathonResponse.data;

        const carbonResponse = await axios.get(`https://www.carboninterface.com/api/v1/carbon_ledger/programs/${PROGRAM_UUID}/card_profiles`, {
          headers: {
            'Content-Type': 'application/json',
            Authorization: `Bearer ${CARBON_API_KEY}`,
          }
        });

        const carbonData = carbonResponse.data;
        let cardProfileID = -1;

        for (const account of carbonData) {
          if (account.data.attributes.external_id === accountID) {
            cardProfileID = account.data.id;
            break;
          }
        }

        if (cardProfileID === -1) {
          throw new Error("Card Profile hasn't been created for this account. Create a Card Profile first.");
        }

        const hackathonTransactionResponse = await axios.get(`https://sandbox.capitalone.co.uk/developer-services-platform-pr/api/data/transactions/accounts/${accountID}/transactions/${transactionID}`, {
          headers: {
            'Content-Type': 'application/json',
            Authorization: `Bearer ${authJWT}`,
            version: '1.0',
          },
        });

        if (hackathonTransactionResponse.status === 200) {
          const carbonTransactionResponse = await axios.get(`https://www.carboninterface.com/api/v1/carbon_ledger/programs/${PROGRAM_UUID}/card_profiles/${cardProfileID}/transactions`, {
            headers: {
              'Content-Type': 'application/json',
              Authorization: `Bearer ${CARBON_API_KEY}`,
            },
          });

          const carbonTransactionData = carbonTransactionResponse.data;
          let carbonTransactionID = -1;

          for (const transaction of carbonTransactionData) {
            if (transaction.data.attributes.external_id === transactionID) {
              carbonTransactionID = transaction.data.id;
              if (carbonTransactionID === -1) {
                throw new Error("Transaction data hasn't been created for this transaction.");
              }
              return transaction.data.attributes.carbon_grams;
            }
          }

        } else {
          throw new Error("This transaction ID doesn't exist.");
        }
      } else {
        throw new Error("This account doesn't exist.");
      }

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

  async addTransactionToCarbonAPI(accountID, transactionID) {
    try {
      const hackathonResponse = await axios.get(`https://sandbox.capitalone.co.uk/developer-services-platform-pr/api/data/accounts/${accountID}`, {
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${authJWT}`,
          version: '1.0'
        }
      });

      if (hackathonResponse.status === 200) {
        // const hackathonData = hackathonResponse.data;

        const carbonResponse = await axios.get(`https://www.carboninterface.com/api/v1/carbon_ledger/programs/${PROGRAM_UUID}/card_profiles`, {
          headers: {
            'Content-Type': 'application/json',
            Authorization: `Bearer ${CARBON_API_KEY}`,
          }
        });

        const carbonData = carbonResponse.data;
        let cardProfileID = -1;

        for (const account of carbonData) {
          if (account.data.attributes.external_id === accountID) {
            cardProfileID = account.data.id;
            break;
          }
        }

        if (cardProfileID === -1) {
          throw new Error("Card Profile hasn't been created for this account. Create a Card Profile first.");
        }

        const transactionResponse = await axios.get(`https://sandbox.capitalone.co.uk/developer-services-platform-pr/api/data/transactions/accounts/${accountID}/transactions/${transactionID}`, {
          headers: {
            'Content-Type': 'application/json',
            Authorization: `Bearer ${authJWT}`,
            version: '1.0',
          },
        });

        if (transactionResponse.status === 200) {
          const transaction = transactionResponse.data;
          let mcc;
          switch (transaction.merchant.category) {
            case "Entertainment":
              mcc = "7996";
              break;
            case "Education":
              mcc = "5942";
              break;
            case "Shopping":
              mcc = "5691";
              break;
            case "Personal Care":
              mcc = "8050";
              break;
            case "Health & Fitness":
              mcc = "7298";
              break;
            case "Food & Dining":
              mcc = "5812";
              break;
            case "Gifts & Donations":
              mcc = "5947";
              break;
            case "Bills & Utilities":
              mcc = "4900";
              break;
            case "Auto & Transport":
              mcc = "4111";
              break;
            case "Travel":
              mcc = "4582";
              break;
            default:
              mcc = "5399";
          }

          const transactionData = {
            cardProfileID: cardProfileID,
            transaction: {
              amount_cents: transaction.amount * 100,
              currency: "USD",
              external_id: transaction.transactionUUID,
              merchant_category: transaction.merchant.category,
              merchant_category_code: mcc,
              merchant_name: transaction.merchant.name,
              merchant_country: "US",
              merchant_state: "CA",
              merchant_city: "San Francisco",
              merchant_postal_code: "90210"
            }
          };

          const addTransactionResponse = await axios.post(`https://www.carboninterface.com/api/v1/carbon_ledger/programs/${PROGRAM_UUID}/card_profiles/${cardProfileID}/transactions`, transactionData.transaction, {
            headers: {
              'Content-Type': 'application/json',
              Authorization: `Bearer ${CARBON_API_KEY}`,
            },
          });

          return addTransactionResponse.data;
        } else {
          throw new Error("This transaction ID doesn't exist.");
        }
      } else {
        throw new Error("This account doesn't exist.");
      }
    } catch (error) {
      throw new Error(error.response ? error.response.data : error.message);
    }
  }

}

module.exports = TransactionService;
