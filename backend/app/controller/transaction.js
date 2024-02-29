const { Controller } = require('egg');

class TransactionController extends Controller {

  async createRandom() {
    const { ctx, service } = this;
    const id = ctx.params.id;
    const res = await service.transaction.createRandom(id);
    ctx.set('Access-Control-Allow-Origin', '*');
    ctx.status = 200;
    ctx.body = res;
  }

  async getAll() {
    const { ctx, service } = this;
    const id = ctx.params.id;
    const res = await service.transaction.getAll(id);
    ctx.set('Access-Control-Allow-Origin', '*');
    ctx.status = 200;
    ctx.body = res;
  }

  async getByID() {
    const { ctx, service } = this;
    const accountID = ctx.params.accountID;
    const transactionID = ctx.params.transactionID;
    const res = await service.transaction.getByID(accountID, transactionID);
    ctx.set('Access-Control-Allow-Origin', '*');
    ctx.status = 200;
    ctx.body = res;
  }

  async groupByDate() {
    const { ctx, service } = this;
    const id = ctx.params.id;
    const res = await service.transaction.groupByDate(id);
    ctx.set('Access-Control-Allow-Origin', '*');
    ctx.status = 200;
    ctx.body = res;
  }
}

module.exports = TransactionController;
