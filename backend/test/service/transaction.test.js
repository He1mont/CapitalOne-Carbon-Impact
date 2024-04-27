const { app, assert } = require('egg-mock/bootstrap');
const { PrismaClient } = require('@prisma/client');

describe('TransactionService', () => {
  let ctx;
  const testAccountID = '12345';
  const testTransactionID1 = 'abcde';
  const testTransactionID2 = 'abcdf';
  const testYear = 2024;
  const testMonth = 3; // April (0-indexed)

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
    // Create some test transactions for the specified month
    await ctx.prisma.transaction.createMany({
      data: [{
        accountID: testAccountID,
        transactionUUID: testTransactionID1,
        date: new Date(testYear, testMonth, 1),
        carbonScore: 10,
        category: 'Food & Dining',
        amount: 100,
        merchantName: 'Test',
        indicator: 'Test',
        currency: 'Test',
        status: 'Test',
      },
      {
        accountID: testAccountID,
        transactionUUID: testTransactionID2,
        date: new Date(testYear, testMonth, 5),
        carbonScore: 5,
        category: 'Entertainment',
        amount: 200,
        merchantName: 'Test',
        indicator: 'Test',
        currency: 'Test',
        status: 'Test',
      }],
    });
  });

  after(async () => {
    await ctx.prisma.transaction.deleteMany({ // Delete the testing transaction
      where: { accountID: testAccountID },
    });
    await ctx.prisma.account.delete({ // Delete the testing account
      where: { accountID: testAccountID },
    });
    ctx.prisma.$disconnect(); // Disconnect Prisma client
  });

  describe('getAllTransactions', () => {
    it('should retrieve all transactions associated with a specified accountID', async () => {
      const transactions = await ctx.service.transaction.getAllTransactions(testAccountID);
      assert(Array.isArray(transactions));
      assert.equal(transactions.length, 2); // There are two transactions created for the test account
      assert.equal(transactions[0].accountID, testAccountID);
      assert.equal(transactions[0].transactionUUID, testTransactionID1);
      assert.equal(transactions[1].accountID, testAccountID);
      assert.equal(transactions[1].transactionUUID, testTransactionID2);
    });

    it('should return an empty array if the account has no transactions', async () => {
      const testInvalidID = 'invalidID';
      const transactions = await ctx.service.transaction.getAllTransactions(testInvalidID);
      assert(Array.isArray(transactions));
      assert.equal(transactions.length, 0);
    });
  });

  describe('getByID', () => {
    it('should retrieve a transaction by its ID and associated accountID', async () => {
      const transaction = await ctx.service.transaction.getByID(testAccountID, testTransactionID1);
      assert(Array.isArray(transaction));
      assert.equal(transaction.length, 1);
      assert.equal(transaction[0].accountID, testAccountID);
      assert.equal(transaction[0].transactionUUID, testTransactionID1);
    });

    it('should return an empty array if the transaction ID does not exist', async () => {
      const testInvalidTransactionID = 'invalidTransactionID';
      const transaction = await ctx.service.transaction.getByID(testAccountID, testInvalidTransactionID);
      assert(Array.isArray(transaction));
      assert.equal(transaction.length, 0);
    });

    it('should return an empty array if the account ID does not exist', async () => {
      const testInvalidID = 'invalidID';
      const transaction = await ctx.service.transaction.getByID(testInvalidID, testTransactionID2);
      assert(Array.isArray(transaction));
      assert.equal(transaction.length, 0);
    });
  });

  describe('getTransactionsByMonth', () => {
    it('should retrieve a list of transactions for a specific month', async () => {
      const transactions = await ctx.service.transaction.getTransactionsByMonth(testAccountID, testYear, testMonth);
      assert(Array.isArray(transactions));
      assert.equal(transactions.length, 2); // There are two transaction created for the specified month
      transactions.forEach(transaction => { // All transactions belong to the specified month
        assert.equal(transaction.date.getFullYear(), testYear);
        assert.equal(transaction.date.getMonth(), testMonth);
      });
    });

    it('should return an empty array if no transactions exist for the specified month', async () => {
      const transactions = await ctx.service.transaction.getTransactionsByMonth(testAccountID, testYear, 0); // January
      assert(Array.isArray(transactions));
      assert.equal(transactions.length, 0);
    });
  });

  describe('getCarbonScoreByMonth', () => {
    it('should retrieve the total carbon score for a specific month', async () => {
      const carbonScore = await ctx.service.transaction.getCarbonScoreByMonth(testAccountID, testYear, testMonth);
      assert(typeof carbonScore === 'number');
      assert.equal(carbonScore, 15);
    });

    it('should return 0 if no transactions exist for the specified month', async () => {
      const carbonScore = await ctx.service.transaction.getCarbonScoreByMonth(testAccountID, testYear, 0); // January
      assert.equal(carbonScore, 0);
    });
  });

  describe('getCarbonScoreByMonthInCategories', () => {
    it('should retrieve the carbon score by category for a specific month', async () => {
      const carbonScoreByCategory = await ctx.service.transaction.getCarbonScoreByMonthInCategories(testAccountID, testYear, testMonth);
      assert(typeof carbonScoreByCategory === 'object');
      // Validate carbon score by category
      assert(carbonScoreByCategory.hasOwnProperty('Food & Dining'));
      assert(carbonScoreByCategory['Food & Dining'] > 0);
      assert(carbonScoreByCategory.hasOwnProperty('Entertainment'));
      assert(carbonScoreByCategory.Entertainment > 0);
    });

    it('should return 0 for all categories if no transactions exist for the specified month', async () => {
      const carbonScoreByCategory = await ctx.service.transaction.getCarbonScoreByMonthInCategories(testAccountID, testYear, 0); // January
      assert(typeof carbonScoreByCategory === 'object');
      // Validate all categories have a carbon score of 0
      assert(Object.values(carbonScoreByCategory).every(score => score === 0));
    });
  });
});
