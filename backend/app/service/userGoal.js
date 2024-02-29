const Service = require("egg").Service;
require("dotenv").config();
const { PrismaClient } = require("@prisma/client");
const prisma = new PrismaClient();

class userGoalService extends Service {
  async createGoal(id, goal) {
    try {
      let existingUserGoal = await prisma.usergoals.findUnique({
        where: {
          accountID: id,
        },
      });
      if (existingUserGoal) {
        // If the account already exists, update its goal
        existingUserGoal = await prisma.usergoals.update({
          where: {
            accountID: id,
          },
          data: {
            goal: goal,
          },
        });
        return existingUserGoal;
      } else {
        // If the account doesn't exist, create it with the goal
        const newUserGoal = await prisma.usergoals.create({
          data: {
            accountID: id,
            goal: goal,
          },
        });
        return newUserGoal;
      }
    } catch (error) {
      throw error;
    }
  }
  async deleteUserGoal(id) {
    try {
      // Find the user goal by accountID
      const userGoal = await prisma.usergoals.findUnique({
        where: {
          accountID: id
        }
      });

      if (userGoal) {
        // If user goal is found, delete it
        await prisma.usergoals.delete({
          where: {
            accountID: id
          }
        });
        return { message: 'User goal deleted successfully' };
      } else {
        // If user goal is not found, return a 404 Not Found error
        return { error: 'User goal not found' };
      }
    } catch (error) {
      console.error('Error deleting user goal:', error);
      return { error: 'Failed to delete user goal' };
    }
  }
  async getUserGoals(id) {
    try {
      const userGoal = await prisma.usergoals.findUnique({
        where: {
          accountID: id
        }
      });
      return userGoal;
    } catch (error) {
      console.error('Error retrieving user goal:', error);
      throw new Error('Failed to retrieve user goal');
    }
  }
}
module.exports = userGoalService;
