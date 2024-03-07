const { Controller } = require('egg');

class AccountTableController extends Controller {

  async getID() {
    const { ctx, service } = this;
    const username = ctx.params.username;
    const res = await service.accountTable.getID(username);
    ctx.status = 200;
    ctx.body = res;
  }
}

module.exports = AccountTableController;