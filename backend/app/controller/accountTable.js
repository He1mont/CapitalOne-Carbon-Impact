const { Controller } = require('egg');

class AccountTableController extends Controller {

  // Gets account ID from username provided
  async getID() {
    const { ctx, service } = this;
    ctx.validate({
      username: 'string'
    },ctx.request.body);
    const username = ctx.request.body.username; // Extracting username from request body
    const res = await service.accountTable.getID(username); // Calling service method to get account by username
    ctx.status = 200;
    ctx.body = res;
  }
}

module.exports = AccountTableController;