const Service = require("egg").Service;
require("dotenv").config();
const { PrismaClient } = require("@prisma/client");
const prisma = new PrismaClient();

class userGoalService extends Service {
  async createGoal(id, goal, month) {
    try {
      const UserGoal = await prisma.userGoals.findMany({
        where: {
          accountID: id,
          month: month,
        },
      });
      if (UserGoal.length > 0) {
        // If the account already exists , update its goal
        const existingUserGoal = await prisma.userGoals.updateMany({
          where: {
            accountID: id,
            month: month,
          },
          data: {
            goal: goal,
          },
        });
        return { errorCode: 200, message: "Sucessfully updated the user goal" };
      } else {
        // If the account doesn't exist, create it with the goal
        const newUserGoal = await prisma.userGoals.create({
          data: {
            accountID: id,
            goal: goal,
            month: month,
          },
        });
        return newUserGoal;
      }
    } catch (error) {
      throw new Error(error.response ? error.response.data : error.message);
    }
  }
  async deleteUserGoal(id) {
    try {
      // Find the user goal by accountID
      const userGoal = await prisma.userGoals.findMany({
        where: {
          accountID: id,
        },
      });

      if (userGoal) {
        // If user goal is found, delete it
        await prisma.userGoals.deleteMany({
          where: {
            accountID: id,
          },
        });
        throw new Error(
          JSON.stringify({
            errorCode: 200,
            message: "User goal deleted successfully",
          })
        );
      }
      // If user goal is not found, return a 404 Not Found error
      throw new Error(
        JSON.stringify({
          errorCode: 404,
          message: "User goal not found",
        })
      );
    } catch (error) {
      console.error("Error deleting user goal:", error);
      throw new Error(error.response ? error.response.data : error.message);
    }
  }
  // might have to change don't know if we want to get the goals for all the months or the current month
  // just business logic
  async getUserGoals(id) {
    try {
      const userGoal = await prisma.userGoals.findMany({
        where: {
          accountID: id,
        },
      });
      return userGoal;
    } catch (error) {
      console.error("Error retrieving user goal:", error);
      throw new Error(error.response ? error.response.data : error.message);
    }
  }
}
module.exports = userGoalService;
