const { Controller } = require("egg");

class UserGoalController extends Controller {
  async createGoal() {
    const { ctx, service } = this;
    const id = ctx.params.id;
    const goal = ctx.params.goal;
    const month=ctx.params.month;
    const res = await service.userGoal.createGoal(id, goal,month);
    ctx.status = 200;
    ctx.body = res;
  }

  async deleteUserGoal() {
    const { ctx, service } = this;
    const id = ctx.params.id;
    const res = await service.userGoal.deleteUserGoal(id);
    ctx.status = 200;
    ctx.body = res;
  }
  async getUserGoal() {
    const { ctx, service } = this;
    const id = ctx.params.id;
    const userGoal = await service.userGoal.getUserGoals(id);
    if (userGoal) {
      ctx.status = 200;
      ctx.body = userGoal;
    } else {
      ctx.status = 404;
      ctx.body = { error: "User goal not found" };
    }
  }
}

module.exports = UserGoalController;
