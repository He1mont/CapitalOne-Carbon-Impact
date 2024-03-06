const { Controller } = require('egg');

class AccountTableController extends Controller {

  async createUsername() {
    const { ctx, service } = this;
    const id = ctx.params.id;
    const res = await service.accountTable.createUsername(id);
    ctx.status = 200;
    ctx.body = res;
  }

  async getID() {
    const { ctx, service } = this;
    const username = ctx.params.username;
    const res = await service.accountTable.getID(username);
    ctx.status = 200;
    ctx.body = res;
  }
}

module.exports = AccountTableController;