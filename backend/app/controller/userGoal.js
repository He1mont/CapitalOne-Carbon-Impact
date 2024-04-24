const { Controller } = require('egg');

class UserGoalController extends Controller {
  // Method to create a user's goal
  async createGoal() {
    const { ctx, service } = this;
    const id = ctx.params.id; // Extracting user id from request parameters
    ctx.validate({
      goal: 'string',
      year: 'string',
      month: 'string',
    }, ctx.request.body);
    const { goal, year, month } = ctx.request.body; // Extracting variables from request body
    const res = await service.userGoal.createGoal(id, goal, year, month); // Calling service method to create user goal
    ctx.status = 200; // Setting HTTP status code to 200 (OK)
    ctx.body = res; // Sending response
  }

  // Method to get user's goals
  async getUserGoals() {
    const { ctx, service } = this;
    const id = ctx.params.id;
    const res = await service.userGoal.getUserGoals(id); // Getting user goals
    ctx.status = 200; // Setting HTTP status code to 200 (OK)
    ctx.body = res; // Sending user goals in response
  }
}

module.exports = UserGoalController; // Exporting UserGoalController class
