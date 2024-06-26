const Service = require('egg').Service;
require('dotenv').config();
const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();

/**
 * Service class responsible for managing user goals and related operations.
 * @augments {Service}
 */
class userGoalService extends Service {

  /**
   * Creates a goal for a specified user and month.
   * @param {string} id - The ID of the user.
   * @param {number} goal - The goal value.
   * @param {year} year - The year for which the goal is set.
   * @param {number} month - The month for which the goal is set.
   * @return {Object} The created user goal.
   */
  async createGoal(id, goal, year, month) {
    try {
      const userGoal = await prisma.userGoals.findMany({
        where: {
          accountID: id,
          year,
          month,
        },
      });

      if (userGoal.length > 0) {
        // If the account already exists, update its goal
        await prisma.userGoals.updateMany({
          where: {
            accountID: id,
            year,
            month,
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
   * Retrieves the user goals for the specified user.
   * @param {string} id - The ID of the user.
   * @return {Array} The user goals.
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
      error.message('Error retrieving user goal:', error);
      throw new Error(error.response ? error.response.data : error.message);
    }
  }
}

module.exports = userGoalService;
