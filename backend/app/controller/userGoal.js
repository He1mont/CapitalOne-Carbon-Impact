const { Controller } = require('egg');

class UserGoalController extends Controller {

  async createGoal() {
    const { ctx, service } = this;
    const id = ctx.params.id;
    const goal = ctx.params.goal;
    const month = ctx.params.month;
    const res = await service.userGoal.createGoal(id, goal, month);
    ctx.status = 200;
    ctx.body = res;
  }

  async userGoals() {
    const { ctx, service } = this;
    const id = ctx.params.id;
    let userGoal;

    switch (ctx.method) {
      case 'DELETE':
        await service.userGoal.deleteUserGoal(id);
        ctx.status = 204;
        ctx.body = '';
        break;
      case 'GET':
        userGoal = await service.userGoal.getUserGoals(id);
        if (userGoal) {
          ctx.status = 200;
          ctx.body = userGoal;
        } else {
          ctx.status = 404;
          ctx.body = { error: 'User goal not found' };
        }
        break;
      default:
        ctx.status = 405;
        ctx.body = { error: 'Method not allowed' };
    }
  }

}

module.exports = UserGoalController;
