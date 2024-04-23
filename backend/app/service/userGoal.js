const Service = require('egg').Service;
require('dotenv').config();
const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();

/**
 * Service class responsible for managing user goals and related operations.
 * @extends {Service}
 */
class userGoalService extends Service {

  /**
   * Creates a goal for a specified user and month.
   * @param {string} id - The ID of the user.
   * @param {number} goal - The goal value.
   * @param {number} month - The month for which the goal is set.
   * @returns {Object} The created user goal.
   */
  async createGoal(id, goal, month, year) {
    try {
      const UserGoal = await prisma.userGoals.findMany({
        where: {
          accountID: id,
          year,
          month,
        },
      });
      if (UserGoal.length > 0) {
        // If the account already exists , update its goal
        await prisma.userGoals.updateMany({
          where: {
            accountID: id,
            year,
            month
          },
          data: {
            goal,
          },
        });
        return { status: 200, message: 'Sucessfully updated the user goal' };
      }
      // If the account doesn't exist, create it with the goal
      const newUserGoal = await prisma.userGoals.create({
        data: {
          accountID: id,
          goal,
          year,
          month,
        },
      });
      return newUserGoal;

    } catch (error) {
      throw new Error(error.response ? error.response.data : error.message);
    }
  }

  /**
   * Deletes the user goal for the specified user.
   * @param {string} id - The ID of the user.
   * @returns {Object} The result of the deletion operation.
   */
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
            message: 'User goal deleted successfully',
          })
        );
      }
      // If user goal is not found, return a 404 Not Found error
      throw new Error(
        JSON.stringify({
          errorCode: 404,
          message: 'User goal not found',
        })
      );
    } catch (error) {
      console.error('Error deleting user goal:', error);
      throw new Error(error.response ? error.response.data : error.message);
    }
  }

  /**
   * Retrieves the user goals for the specified user.
   * @param {string} id - The ID of the user.
   * @returns {Array} The user goals.
   */
  async getUserGoals(id) {
    try {
      const userGoal = await prisma.userGoals.findMany({
        where: {
          accountID: id,
        },
      });
      return userGoal;

    } catch (error) {
      console.error('Error retrieving user goal:', error);
      throw new Error(error.response ? error.response.data : error.message);
    }
  }
}

module.exports = userGoalService;
