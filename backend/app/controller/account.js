const { Controller } = require('egg');

class AccountController extends Controller {

  // Method to create a random account
  async createRandom() {
    const { ctx, service } = this;
    const res = await service.account.createRandom(); // Calling service method to create a random account
    ctx.status = 200; // Setting HTTP status code to 200 (OK)
    ctx.body = res; // Sending response
  }

  // Method to get all accounts
  async getAll() {
    const { ctx, service } = this;
    const res = await service.account.getAll(); // Calling service method to get all accounts
    ctx.status = 200;
    ctx.body = res;
  }

  // Method to get an account by ID
  async getByID() {
    const { ctx, service } = this;
    const id = ctx.params.id; // Extracting account ID from request parameters
    const res = await service.account.getByID(id); // Calling service method to get account by ID
    ctx.status = 200;
    ctx.body = res;
  }

  // Method to get an account by email
  async getByEmail() {
    const { ctx, service } = this;
    const { email } = ctx.request.query; // Extracting email from request query

    // Validate the presence of the email parameter
    // if (!email) {
    //   ctx.status = 400; // Bad Request
    //   ctx.body = { error: 'Email parameter is missing' };
    //   return;
    // }
    ctx.validate({
      email: 'email',
    }, ctx.request.query);
    const res = await service.account.getByEmail(email); // Call the service method to get account by email
    ctx.status = 200;
    ctx.body = res;
  }

  // Method to get an account by username
  async getByUserName() {
    const { ctx, service } = this;
    const { username } = ctx.request.query;

    // Validate the presence of the username parameter
    // if (!username) {
    //   ctx.status = 400; // Bad Request
    //   ctx.body = { error: 'Username parameter is missing' };
    //   return;
    // }
    // Validate the type of the username parameter
    ctx.validate({
      username: 'string',
    }, ctx.request.query);
    const res = await service.account.getByUserName(username); // Call the service method to get account by username
    ctx.status = 200;
    ctx.body = res;
  }
}

module.exports = AccountController; // Exporting AccountController class
