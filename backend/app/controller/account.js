const { Controller } = require('egg');

class AccountController extends Controller {

  async createRandom() {
    const { ctx, service } = this;
    const res = await service.account.createRandom();
    ctx.status = 200;
    ctx.body = res;
  }

  async getAll() {
    const { ctx, service } = this;
    const res = await service.account.getAll();
    ctx.set('Access-Control-Allow-Origin', '*');
    ctx.status = 200;
    ctx.body = res;
  }

  async getByID() {
    const { ctx, service } = this;
    const id = ctx.params.id;
    const res = await service.account.getByID(id);
    ctx.set('Access-Control-Allow-Origin', '*');
    ctx.status = 200;
    ctx.body = res;
  }

  async getByEmail() {
    const { ctx, service } = this;
    const emailToFind = ctx.params.email;
    const res = await service.account.getByEmail(emailToFind);
    ctx.set('Access-Control-Allow-Origin', '*');
    ctx.status = 200;
    ctx.body = res;
  }

  async getByUserName() {
    const { ctx, service } = this;
    const username = ctx.params.username;
    const res = await service.account.getByUserName(username);
    ctx.set('Access-Control-Allow-Origin', '*');
    ctx.status = 200;
    ctx.body = res;
  }
}

module.exports = AccountController;
