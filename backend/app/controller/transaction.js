const { Controller } = require('egg');

class TransactionController extends Controller {

  async getAll() {
    const { ctx, service } = this;
    const res = await service.transaction.getAll();
    ctx.set('Access-Control-Allow-Origin', '*');
    ctx.status = 200;
    ctx.body = res;
  }

  async getByID() {
    const { ctx, service } = this;
    const res = await service.transaction.getByID();
    ctx.set('Access-Control-Allow-Origin', '*');
    ctx.status = 200;
    ctx.body = res;
  }

  async groupByDate() {
    const { ctx, service } = this;
    const res = await service.transaction.groupByDate();
    ctx.set('Access-Control-Allow-Origin', '*');
    ctx.status = 200;
    ctx.body = res;
  }
}

module.exports = TransactionController;
