const { Controller } = require('egg');

class UserGoalController extends Controller {
  // Method to create a user's goal
  async createGoal() {
    const { ctx, service } = this;
    const id = ctx.params.id; // Extracting user id from request parameters
    ctx.validate({
      goal: 'string',
      month: 'string',
      year: 'string'
    }, ctx.request.body);
    const { goal, month, year } = ctx.request.body;   // Extracting variables from request body
    const res = await service.userGoal.createGoal(id, goal, month, year); // Calling service method to create user goal
    ctx.status = 200;     // Setting HTTP status code to 200 (OK)
    ctx.body = res;       // Sending response
  }

  // Method to handle different user goals requests
  async userGoals() {
    const { ctx, service } = this;
    const id = ctx.params.id;

    switch (ctx.method) {
      // If the request method is DELETE
      case "DELETE":
        const deleteRes = await service.userGoal.deleteUserGoal(id); // Deleting user goal
        ctx.status = 200;       // Setting HTTP status code to 200 (OK)
        ctx.body = deleteRes;   // Sending response
        break;
      // If the request method is GET
      case "GET":
        const userGoal = await service.userGoal.getUserGoals(id); // Getting user goals
        if (userGoal) {         // If user goals are found
          ctx.status = 200;     // Setting HTTP status code to 200 (OK)
          ctx.body = userGoal;  // Sending user goals in response
        } else {                // If user goals are not found
          ctx.status = 404;     // Setting HTTP status code to 404 (Not Found)
          ctx.body = { error: "User goal not found" }; // Sending error message in response
        }
        break;
      // If the request method is not DELETE or GET
      default:
        ctx.status = 405;       // Setting HTTP status code to 405 (Method Not Allowed)
        ctx.body = { error: "Method not allowed" }; // Sending error message in response
    }
  }
}

module.exports = UserGoalController; // Exporting UserGoalController class
