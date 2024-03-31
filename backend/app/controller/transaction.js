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

  async getCarbonImpact() {
    const { ctx, service } = this;
    const accountID = this.ctx.params.accountID;
    const transactionID = this.ctx.params.transactionID;
    const res = await service.transaction.getCarbonImpact(accountID, transactionID);
    ctx.set('Access-Control-Allow-Origin', '*');
    ctx.status = 200;
    ctx.body = res;
  }

  async getTransactionsByMonth() {
    const { ctx, service } = this;
    const accountID = this.ctx.params.accountID;
    const year = parseInt(this.ctx.params.year, 10);
    const month = parseInt(this.ctx.params.month, 10);
    const res = await service.transaction.getTransactionsByMonth(accountID, year, month);
    ctx.set('Access-Control-Allow-Origin', '*');
    ctx.status = 200;
    ctx.body = res;
  }

  async getCarbonScoreByMonth() {
    const { ctx, service } = this;
    const accountID = this.ctx.params.accountID;
    const year = parseInt(this.ctx.params.year, 10);
    const month = parseInt(this.ctx.params.month, 10);
    const res = await service.transaction.getCarbonScoreByMonth(accountID, year, month);
    ctx.set('Access-Control-Allow-Origin', '*');
    ctx.status = 200;
    ctx.body = res;
  }

  async getCarbonScoreByMonthInCategory() {
    const { ctx, service } = this;
    const accountID = this.ctx.params.accountID;
    const year = parseInt(this.ctx.params.year, 10);
    const month = parseInt(this.ctx.params.month, 10);
    const res = await service.transaction.getCarbonScoreByMonthInCategory(accountID, year, month);
    ctx.set('Access-Control-Allow-Origin', '*');
    ctx.status = 200;
    ctx.body = res;
  }
}

module.exports = TransactionController;
