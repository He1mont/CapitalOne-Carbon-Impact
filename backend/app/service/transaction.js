const Service = require('egg').Service;
const axios = require('axios');
const authJWT = 'eyJ0eXAiOiJKV1QiLCJhbGciOiJSUzI1NiJ9.eyJuYmYiOjE2OTYwMzIwMDAsImFwaV9zdWIiOiI5ZmViZWE1ZmQ1MjgxZjY2Y2QxMDY4NTg0MzJmZjRmYzU1YzMxNTBlYzEwZTMzY2NmZGJlZTljODFmZTAxOWRiMTcxNzIwMDAwMDAwMCIsInBsYyI6IjVkY2VjNzRhZTk3NzAxMGUwM2FkNjQ5NSIsImV4cCI6MTcxNzIwMDAwMCwiZGV2ZWxvcGVyX2lkIjoiOWZlYmVhNWZkNTI4MWY2NmNkMTA2ODU4NDMyZmY0ZmM1NWMzMTUwZWMxMGUzM2NjZmRiZWU5YzgxZmUwMTlkYiJ9.XkBwptx8AlmawzOqgGfGh0E6BvI_WDZv-oHWVHmUWtPhBcEKC051nJt0yhRCWq0Ce3Fu_T4cd7WzQQr8uiHG09_42xsq78jzHb0m0-o3CY9aK4ChbXfAHcg7yPDmuHZbaG4168F1BB3hU-w4XZgcfFZL85OM-NMVuVcQt12-H3gsebLGSfsjXnf3dn0XZAScXQFff9zuri18_krnmTyEI2RVhChOHcQpNZMZBKLo8yjQ-OYOjGSSIrqNoXsuXeQUc3he8bhROf0yD5c6bUVRQzNrB1Zda3AGH5MysxIQI7h4YvkoEtjh1If-QQ1lkLhlHxUPBBmvDAortiQHEtua9w';

// for the Carbon API
const PROGRAM_UUID = "ddd7027e-2032-4fff-a721-565ac87e7869";
const CARBON_API_KEY = "sQyPyTxcWvlFiLWFjmUlA";

class TransactionService extends Service {

  async createRandom(id) {
    const url = `https://sandbox.capitalone.co.uk/developer-services-platform-pr/api/data/transactions/accounts/${id}/create`;
    const quantity = 10;

    try {
      const response = await axios.post(url, {
        quantity: quantity
      }, {
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${authJWT}`,
          version: '1.0',
        }
      });

      // create a transaction in the Carbon API, attached to the user's card profile
      for(let i=0; i<quantity; i++){
        const tranUUID = response.data.Transactions[i].transactionUUID;
        // console.log("tran UUID: ", tranUUID);
        await this.addTransactionToCarbonAPI(id, tranUUID);
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

  async getCarbonImpact(accountID, transactionID){

    // get transaction from carbon API
    // return transaction.carbon_grams

    try {


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
        const timestamp = transaction.timestamp.split(' ')[0]; // 提取日期部分

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
            const hackathonData = hackathonResponse.data;

            const carbonResponse = await axios.get(`https://www.carboninterface.com/api/v1/carbon_ledger/programs/${PROGRAM_UUID}/card_profiles`, {
                headers: {
                    'Content-Type': 'application/json',
                    Authorization: `Bearer ${CARBON_API_KEY}`,
                }
            });

            const carbonData = carbonResponse.data;
            let accountCarbonID = -1;

            for (const account of carbonData) {
                if (account.data.attributes.external_id === accountID) {
                    accountCarbonID = account.data.id;
                    break;
                }
            }

            if (accountCarbonID === -1) {
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
                    accountCarbonID: accountCarbonID,
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

                const addTransactionResponse = await axios.post(`https://www.carboninterface.com/api/v1/carbon_ledger/programs/${PROGRAM_UUID}/card_profiles/${accountCarbonID}/transactions`, transactionData.transaction, {
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
