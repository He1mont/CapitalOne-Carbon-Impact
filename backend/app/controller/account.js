const { Controller } = require('egg');

class AccountController extends Controller {

  async createRandom() {
    const { ctx, service } = this
    const res = await service.account.createRandom();
    ctx.status = 200;
    ctx.body = res;
  }
  
  async getAll() {
    const { ctx, service } = this
    const res = await service.account.getAll();
    ctx.status = 200;
    ctx.body = res;
  }
}

module.exports = AccountController;
