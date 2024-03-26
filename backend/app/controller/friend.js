const { Controller } = require('egg');

class FriendController extends Controller {
  
  async addByID() {
    const { ctx, service } = this;
    const { accountID, friendID} = ctx.params;
    const res = await service.friend.addByID(accountID, friendID);
    ctx.status = 200;
    ctx.body = res;
  }

  async getAll() {
    const { ctx, service } = this;
    const id = ctx.params.id;
    const res = await service.friend.getAll(id);
    ctx.status = 200;
    ctx.body = res;
  }

  async deleteFriend() {
    const { ctx, service } = this;
    const username = ctx.params.username;
    const id = ctx.params.id;
    const res = await service.friend.deleteFriend(id, username);
    ctx.status = 200;
    ctx.body = res;
  }
}

module.exports = FriendController;
