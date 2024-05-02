const { Controller } = require('egg');

class FriendController extends Controller {

  // Method to add a new friend by their ID
  async addByID() {
    const { ctx, service } = this;
    const { accountID, friendID } = ctx.params;
    const res = await service.friend.addByID(accountID, friendID);
    ctx.status = 200;
    ctx.body = res;
  }

  // Method to get all friends of a certain account
  async getAll() {
    const { ctx, service } = this;
    const id = ctx.params.id;
    const res = await service.friend.getAll(id);
    ctx.status = 200;
    ctx.body = res;
  }

  // Method to delete a friend from one's friends list
  async deleteFriend() {
    const { ctx, service } = this;
    const { accountID, friendID } = ctx.params;
    await service.friend.deleteFriend(accountID, friendID);
    ctx.status = 204; // Set status code to 204 for successful deletion
  }
}

module.exports = FriendController;
