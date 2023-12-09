const Service = require('egg').Service;


const unirest = require('unirest');
const authJWT = 'eyJ0eXAiOiJKV1QiLCJhbGciOiJSUzI1NiJ9.eyJuYmYiOjE2OTYwMzIwMDAsImFwaV9zdWIiOiI5ZmViZWE1ZmQ1MjgxZjY2Y2QxMDY4NTg0MzJmZjRmYzU1YzMxNTBlYzEwZTMzY2NmZGJlZTljODFmZTAxOWRiMTcxNzIwMDAwMDAwMCIsInBsYyI6IjVkY2VjNzRhZTk3NzAxMGUwM2FkNjQ5NSIsImV4cCI6MTcxNzIwMDAwMCwiZGV2ZWxvcGVyX2lkIjoiOWZlYmVhNWZkNTI4MWY2NmNkMTA2ODU4NDMyZmY0ZmM1NWMzMTUwZWMxMGUzM2NjZmRiZWU5YzgxZmUwMTlkYiJ9.XkBwptx8AlmawzOqgGfGh0E6BvI_WDZv-oHWVHmUWtPhBcEKC051nJt0yhRCWq0Ce3Fu_T4cd7WzQQr8uiHG09_42xsq78jzHb0m0-o3CY9aK4ChbXfAHcg7yPDmuHZbaG4168F1BB3hU-w4XZgcfFZL85OM-NMVuVcQt12-H3gsebLGSfsjXnf3dn0XZAScXQFff9zuri18_krnmTyEI2RVhChOHcQpNZMZBKLo8yjQ-OYOjGSSIrqNoXsuXeQUc3he8bhROf0yD5c6bUVRQzNrB1Zda3AGH5MysxIQI7h4YvkoEtjh1If-QQ1lkLhlHxUPBBmvDAortiQHEtua9w'

class TransactionsService extends Service {


  async getAll() {
    const id = this.ctx.params.id;
    const response = await new Promise((resolve, reject) => {
      unirest('GET', `https://sandbox.capitalone.co.uk/developer-services-platform-pr/api/data/transactions/accounts/${id}/transactions`)
          .headers({
              'Content-Type': 'application/json',
              'Authorization': `Bearer ${authJWT}`,
              'version': '1.0',
          })
          .end(function (res) {
            if (res.error) reject(new Error(res.error));
            else resolve(res);
          });
    });

    return response.body;
  }

  async getByID() {
    const accountID = this.ctx.params.accountID;
    const transactionID = this.ctx.params.transactionID;
    const response = await new Promise((resolve, reject) => {
      unirest('GET', `https://sandbox.capitalone.co.uk/developer-services-platform-pr/api/data/transactions/accounts/${accountID}/transactions/${transactionID}`)
          .headers({
              'Content-Type': 'application/json',
              'Authorization': `Bearer ${authJWT}`,
              'version': '1.0',
          })
          .end(function (res) {
            if (res.error) reject(new Error(res.error));
            else resolve(res);
          });
    });

    return response.body;
  }

  async groupByDate() {
    const id = this.ctx.params.id;
    const response = await new Promise((resolve, reject) => {
      unirest('GET', `https://sandbox.capitalone.co.uk/developer-services-platform-pr/api/data/transactions/accounts/${id}/transactions`)
          .headers({
              'Content-Type': 'application/json',
              'Authorization': `Bearer ${authJWT}`,
              'version': '1.0',
          })
          .end(function (res) {
            if (res.error) reject(new Error(res.error));
            else resolve(res);
          });
    });

    const groupedData = {};

    response.body.Transactions.forEach(transaction => {
        const timestamp = transaction.timestamp.split(' ')[0]; // Extract date part
      
        // If the timestamp is not already a key in groupedData, create an empty array
        if (!groupedData[timestamp]) {
          groupedData[timestamp] = [];
        }
      
        // Push the transaction to the array corresponding to its timestamp
        groupedData[timestamp].push(transaction);
      });

    return groupedData;
  }

}

module.exports = TransactionsService;
