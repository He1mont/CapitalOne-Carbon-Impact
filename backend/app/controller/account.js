const { Controller } = require('egg');

class AccountController extends Controller {

  // Method to create a random account
  async createRandom() {
    const { ctx, service } = this;
    const res = await service.account.createRandom(); // Calling service method to create a random account
    ctx.status = 200;   // Setting HTTP status code to 200 (OK)
    ctx.body = res;     // Sending response
  }

  // Method to get all accounts
  async getAll() {
    const { ctx, service } = this;
    const res = await service.account.getAll();   // Calling service method to get all accounts
    ctx.set('Access-Control-Allow-Origin', '*');  // Allowing cross-origin requests
    ctx.status = 200;
    ctx.body = res;
  }

  // Method to get an account by ID
  async getByID() {
    const { ctx, service } = this;
    const id = ctx.params.id; // Extracting account ID from request parameters
    const res = await service.account.getByID(id); // Calling service method to get account by ID
    ctx.set('Access-Control-Allow-Origin', '*');
    ctx.status = 200;
    ctx.body = res;
  }

  // Method to get an account by email
  async getByEmail() {
    const { ctx, service } = this;
    ctx.validate({
      email: "email"
    }, ctx.request.query);
    const emailToFind = ctx.request.query.email; // Extracting email from request body 
    const res = await service.account.getByEmail(emailToFind); // Calling service method to get account by email
    ctx.set('Access-Control-Allow-Origin', '*');
    ctx.status = 200;
    ctx.body = res;
  }

  // Method to get an account by username
  async getByUserName() {
    const { ctx, service } = this;
    ctx.validate({
      username: "string"
    }, ctx.request.body);
    const username = ctx.request.body.username;
    const res = await service.account.getByUserName(username);
    ctx.set('Access-Control-Allow-Origin', '*');
    ctx.status = 200;
    ctx.body = res;
  }
}

module.exports = AccountController;   // Exporting AccountController class
