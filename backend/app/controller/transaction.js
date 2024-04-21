const { Controller } = require('egg');

class TransactionController extends Controller {
<<<<<<< HEAD
=======

  // Method to create a random transaction for a specific account
>>>>>>> modify-routes-rest
  async createRandom() {
    const { ctx, service } = this;
    const id = ctx.params.id; // Extracting account ID from request parameters
    const res = await service.transaction.createRandom(id); // Calling service method to create a random transaction
    ctx.set('Access-Control-Allow-Origin', '*'); // Allowing cross-origin requests
    ctx.status = 200; // Setting HTTP status code to 200 (OK)
    ctx.body = res; // Sending response
  }

  // Method to get all transactions for a specific account
  async getTransactions() {
    const { ctx, service } = this;
    const id = ctx.params.id; // Extracting account ID from request parameters
    var res;
    console.log(ctx.request.body);
    try{
      ctx.validate({
        group_by_date : 'boolean'
      }, ctx.request.body);
      const group = ctx.request.body.group_by_date;
      console.log(group);
      if(group){
        console.log("Group by date");
        res = await service.transaction.groupByDate(id);
      }
      else{
        console.log("Get ALL");
        res = await service.transaction.getAll(id);
      }
    } catch (err) {
      console.log(err);
      res = await service.transaction.getAll(id); // Calling service method to get all transactions for the account
    }
    
    ctx.set('Access-Control-Allow-Origin', '*'); 
    ctx.status = 200; 
    ctx.body = res; 
  }
  
  // Method to get all transactions for a specific account
  async getAll() {
    const { ctx, service } = this;
    const id = ctx.params.id; // Extracting account ID from request parameters
    const res = await service.transaction.getAll(id); // Calling service method to get all transactions for the account
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

  // Method to group transactions by date for a specific account
  async groupByDate() {
    const { ctx, service } = this;
    const id = ctx.params.id; // Extracting account ID from request parameters
    const res = await service.transaction.groupByDate(id); // Calling service method to group transactions by date
    ctx.set('Access-Control-Allow-Origin', '*'); 
    ctx.status = 200; 
    ctx.body = res; 
  }

  // Method to get the carbon impact of a transaction for a specific account
  async getCarbonImpact() {
    const { ctx, service } = this;
    const accountID = this.ctx.params.accountID; // Extracting account ID from request parameters
    const transactionID = this.ctx.params.transactionID; // Extracting transaction ID from request parameters
    const res = await service.transaction.getCarbonImpact(accountID, transactionID); // Calling service method to get carbon impact of transaction
    ctx.set('Access-Control-Allow-Origin', '*'); 
    ctx.status = 200; 
    ctx.body = res; 
  }

  async getTransactionsByMonth() {
    const { ctx, service } = this;
    const accountID = this.ctx.params.accountID;
    const year = parseInt(this.ctx.params.year, 10);
    const month = parseInt(this.ctx.params.month, 10);
    const res = await service.transaction.getTransactionsByMonth(accountID, year, month);
    ctx.set('Access-Control-Allow-Origin', '*');
    ctx.status = 200;
    ctx.body = res;
  }

  async getCarbonScoreByMonth() {
    const { ctx, service } = this;
    const accountID = this.ctx.params.accountID;
    const year = parseInt(this.ctx.params.year, 10);
    const month = parseInt(this.ctx.params.month, 10);
    const res = await service.transaction.getCarbonScoreByMonth(accountID, year, month);
    ctx.set('Access-Control-Allow-Origin', '*');
    ctx.status = 200;
    ctx.body = res;
  }

  async getCarbonScoreByMonthInCategory() {
    const { ctx, service } = this;
    const accountID = this.ctx.params.accountID;
    const year = parseInt(this.ctx.params.year, 10);
    const month = parseInt(this.ctx.params.month, 10);
    const res = await service.transaction.getCarbonScoreByMonthInCategory(accountID, year, month);
    ctx.set('Access-Control-Allow-Origin', '*');
    ctx.status = 200;
    ctx.body = res;
  }
}

module.exports = TransactionController; // Exporting TransactionController class
