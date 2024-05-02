const { app, assert } = require('egg-mock/bootstrap');
const { PrismaClient } = require('@prisma/client');

describe('UserGoalService', () => {
  let ctx;
  const testAccountID = '12345'; // only used for testing
  const testYear = '2020';
  const testMonth = 'January';

  before(async () => {
    ctx = app.mockContext(); // Create a mock context environment
    ctx.prisma = new PrismaClient(); // Set the Prisma instance
    await ctx.prisma.account.create({ // Create an account used for testing
      data: {
        accountID: testAccountID,
        username: 'TestW12345',
        email: 'test@outlook.com',
        colorMode: 0,
        currency: 'Test',
        firstName: 'Test',
        lastName: 'Test',
        phone: 'Test',
        address: 'Test',
        state: 'Test',
      },
    });
  });

  after(async () => {
    await ctx.prisma.userGoals.delete({ // Delete testing records
      where: {
        Unique_year_month: {
          accountID: testAccountID,
          year: testYear,
          month: testMonth,
        },
      },
    });
    await ctx.prisma.account.delete({ // Delete the testing account
      where: { accountID: testAccountID },
    });
    ctx.prisma.$disconnect(); // Disconnect Prisma client after all tests are done
  });

  describe('createGoal', () => {
    it('should create a goal for a specified user and month', async () => {
      const testGoal = 3000;
      // Call the createGoal method
      const createdGoal = await ctx.service.userGoal.createGoal(testAccountID, testGoal, testYear, testMonth);
      // Assert whether the goal is created successfully
      assert(createdGoal);
      assert.equal(createdGoal.accountID, testAccountID);
      assert.equal(createdGoal.goal, testGoal);
      assert.equal(createdGoal.year, testYear);
      assert.equal(createdGoal.month, testMonth);
    });

    it('should update a goal for a specified user and month', async () => {
      const testGoal = 2000;
      // Call the createGoal method to update the existing goal
      await ctx.service.userGoal.createGoal(testAccountID, testGoal, testYear, testMonth);
      // Get the specified goal from database
      const updatedGoal = await ctx.prisma.userGoals.findUnique({
        where: {
          Unique_year_month: {
            accountID: testAccountID,
            year: testYear,
            month: testMonth,
          },
        },
      });
      // Assert whether the existing goal is updated successfully
      assert(updatedGoal);
      assert.equal(updatedGoal.accountID, testAccountID);
      assert.equal(updatedGoal.goal, testGoal);
      assert.equal(updatedGoal.year, testYear);
      assert.equal(updatedGoal.month, testMonth);
    });

    it('should throw an error if accountID does not exist', async () => {
      await assert.rejects(async () => {
        const testInvalidID = 'invalidID';
        await ctx.service.userGoal.createGoal(testInvalidID, 2000, testYear, testMonth);
      });
    });
  });

  describe('getUserGoals', () => {
    it('should retrieve all goals for a specified account', async () => {
      const testGoal = 2000;
      // Call the getUserGoals method
      const userGoals = await ctx.service.userGoal.getUserGoals(testAccountID);
      // Assert whether the user goals are retrieved successfully
      assert(Array.isArray(userGoals));
      assert.equal(userGoals.length, 1);
      assert.equal(userGoals[0].accountID, testAccountID);
      assert.equal(userGoals[0].goal, testGoal);
      assert.equal(userGoals[0].year, testYear);
      assert.equal(userGoals[0].month, testMonth);
    });

    it('should return an empty array if retrieving user does not exist', async () => {
      const testInvalidID = 'invalidID';
      // Call the getUserGoals method
      const userGoals = await ctx.service.userGoal.getUserGoals(testInvalidID);
      assert(Array.isArray(userGoals));
      assert.equal(userGoals.length, 0);
    });
  });
});
