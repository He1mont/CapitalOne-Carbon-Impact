const Service = require('egg').Service;


const unirest = require('unirest');
const authJWT = 'eyJ0eXAiOiJKV1QiLCJhbGciOiJSUzI1NiJ9.eyJuYmYiOjE2OTYwMzIwMDAsImFwaV9zdWIiOiI5ZmViZWE1ZmQ1MjgxZjY2Y2QxMDY4NTg0MzJmZjRmYzU1YzMxNTBlYzEwZTMzY2NmZGJlZTljODFmZTAxOWRiMTcxNzIwMDAwMDAwMCIsInBsYyI6IjVkY2VjNzRhZTk3NzAxMGUwM2FkNjQ5NSIsImV4cCI6MTcxNzIwMDAwMCwiZGV2ZWxvcGVyX2lkIjoiOWZlYmVhNWZkNTI4MWY2NmNkMTA2ODU4NDMyZmY0ZmM1NWMzMTUwZWMxMGUzM2NjZmRiZWU5YzgxZmUwMTlkYiJ9.XkBwptx8AlmawzOqgGfGh0E6BvI_WDZv-oHWVHmUWtPhBcEKC051nJt0yhRCWq0Ce3Fu_T4cd7WzQQr8uiHG09_42xsq78jzHb0m0-o3CY9aK4ChbXfAHcg7yPDmuHZbaG4168F1BB3hU-w4XZgcfFZL85OM-NMVuVcQt12-H3gsebLGSfsjXnf3dn0XZAScXQFff9zuri18_krnmTyEI2RVhChOHcQpNZMZBKLo8yjQ-OYOjGSSIrqNoXsuXeQUc3he8bhROf0yD5c6bUVRQzNrB1Zda3AGH5MysxIQI7h4YvkoEtjh1If-QQ1lkLhlHxUPBBmvDAortiQHEtua9w'

class AccountService extends Service {
  async createRandom() {
    const quantity = 1
    const numTransactions = 2
    const liveBalance = false

    const response = await new Promise((resolve, reject) => {
      unirest('POST', 'https://sandbox.capitalone.co.uk/developer-services-platform-pr/api/data/accounts/create')
          .headers({
              'Content-Type': 'application/json',
              'Authorization': `Bearer ${authJWT}`,
              'version': '1.0',
          })
          .send(`{
              "quantity": ${quantity},
              "numTransactions": ${numTransactions},
              "liveBalance": ${liveBalance}
          }`)
          .end(function (res) {
              if (res.error) reject(new Error(res.error));
              else resolve(res);
          });
    });
    return response.body;
  }

  async getAll() {
    const response = await new Promise((resolve, reject) => {
      unirest('GET', 'https://sandbox.capitalone.co.uk/developer-services-platform-pr/api/data/accounts')
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
    const id = this.ctx.params.id;
    const response = await new Promise((resolve, reject) => {
      unirest('GET', `https://sandbox.capitalone.co.uk/developer-services-platform-pr/api/data/accounts/${id}`)
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
  async getByEmail() {
    const id = this.ctx.params.id;
    const response = await new Promise((resolve, reject) => {
      unirest('GET', `https://sandbox.capitalone.co.uk/developer-services-platform-pr/api/data/accounts`)
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

    response.body.Accounts.forEach(account => {
        const email = account.email.split(' ')[0]; 
      
       
        if (!groupedData[email]) {
          groupedData[email] = [];
        }

        groupedData[email].push(account);
      });

    return groupedData;
  }

}

module.exports = AccountService;
