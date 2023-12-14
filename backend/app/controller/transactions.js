const { Controller } = require('egg');

class TransactionsController extends Controller {

  async getAll() {
    const { ctx, service } = this;
    const res = await service.transactions.getAll();
    ctx.set('Access-Control-Allow-Origin', '*');
    ctx.status = 200;
    ctx.body = res;
  }

  async getByID() {
    const { ctx, service } = this;
    const res = await service.transactions.getByID();
    ctx.set('Access-Control-Allow-Origin', '*');
    ctx.status = 200;
    ctx.body = res;
  }

  async groupByDate() {
    const { ctx, service } = this;
    const res = await service.transactions.groupByDate();
    ctx.set('Access-Control-Allow-Origin', '*');
    ctx.status = 200;
    ctx.body = res;
  }

}

module.exports = TransactionsController;
