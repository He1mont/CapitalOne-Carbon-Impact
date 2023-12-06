const { Controller } = require('egg');

class HomeController extends Controller {
  async index() {
    this.ctx.body = { message: 'Hello from Egg.js backend' };
  }
}

module.exports = HomeController;
