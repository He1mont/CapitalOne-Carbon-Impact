const { Controller } = require('egg');

class FriendController extends Controller {
  async addByUsername() {
    const { ctx, service } = this;
    const username = ctx.params.username;
    const id = ctx.params.id;
    const res = await service.friend.addByUsername(id, username);
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
