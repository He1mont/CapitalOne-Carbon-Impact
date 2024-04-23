const { Controller } = require('egg');

class TransactionController extends Controller {

  // Method to create a random transaction for a specific account
  async createRandom() {
    const { ctx, service } = this;
    const id = ctx.params.id; // Extracting account ID from request parameters
    const res = await service.transaction.createRandom(id); // Calling service method to create a random transaction
    ctx.set('Access-Control-Allow-Origin', '*');            // Allowing cross-origin requests
    ctx.status = 200;         // Setting HTTP status code to 200 (OK)
    ctx.body = res;           // Sending response
  }

  // Method to get all transactions for a specific account
  async getAllTransactions() {
    const { ctx, service } = this;
    const id = ctx.params.id; // Extracting account ID from request parameters
    const res = await service.transaction.getAllTransactions(id); // Calling service method to get all transactions for the account
    ctx.set('Access-Control-Allow-Origin', '*');
    ctx.status = 200;
    ctx.body = res;
  }

  // Method to get a transaction by its ID for a specific account
  async getByID() {
    const { ctx, service } = this;
    const accountID = ctx.params.accountID; // Extracting account ID from request parameters
    const transactionID = ctx.params.transactionID; // Extracting transaction ID from request parameters
    const res = await service.transaction.getByID(accountID, transactionID); // Calling service method to get transaction by ID
    ctx.set('Access-Control-Allow-Origin', '*');
    ctx.status = 200;
    ctx.body = res;
  }

  // Method to get the carbon impact of a transaction for a specific account
  async getCarbonImpact() {
    const { ctx, service } = this;
    const accountID = this.ctx.params.accountID;          // Extracting account ID from request parameters
    const transactionID = this.ctx.params.transactionID;  // Extracting transaction ID from request parameters
    const res = await service.transaction.getCarbonImpact(accountID, transactionID); // Calling service method to get carbon impact of transaction
    ctx.set('Access-Control-Allow-Origin', '*');
    ctx.status = 200;
    ctx.body = res;
  }
}

module.exports = TransactionController; // Exporting TransactionController class
