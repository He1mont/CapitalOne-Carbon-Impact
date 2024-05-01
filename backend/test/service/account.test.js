const { app, assert } = require('egg-mock/bootstrap');
const { PrismaClient } = require('@prisma/client');

describe('AccountService', () => {
  let ctx;
  const testAccountID = '12345';
  const testUsername = 'TestW12345';
  const testEmail = 'test@outlook.com';

  before(async () => {
    ctx = app.mockContext(); // Create a mock context environment
    ctx.prisma = new PrismaClient(); // Set the Prisma instance
    await ctx.prisma.account.create({ // Create an account used for testing
      data: {
        accountID: testAccountID,
        username: testUsername,
        email: testEmail,
        colorMode: 0, // Initial color mode
        currency: 'USD', // Initial currency
        firstName: 'Test',
        lastName: 'Test',
        phone: 'Test',
        address: 'Test',
        state: 'Test',
      },
    });
  });

  after(async () => {
    await ctx.prisma.account.delete({ // Delete the testing account
      where: { accountID: testAccountID },
    });
    ctx.prisma.$disconnect(); // Disconnect Prisma client
  });

  describe('getAll', () => {
    it('should retrieve all user accounts', async () => {
      const allAccounts = await ctx.service.account.getAll();
      assert(Array.isArray(allAccounts)); // The result should be an array
      assert(allAccounts.length > 0); // There's at least one account in the account table
      // The last account should be the created account
      assert.equal(allAccounts[allAccounts.length - 1].accountID, testAccountID);
      assert.equal(allAccounts[allAccounts.length - 1].username, testUsername);
      assert.equal(allAccounts[allAccounts.length - 1].email, testEmail);
    });
  });

  describe('getByID', () => {
    it('should retrieve a user account by its ID', async () => {
      const account = await ctx.service.account.getByID(testAccountID);
      assert(Array.isArray(account));
      assert.equal(account.length, 1);
      assert.equal(account[0].accountID, testAccountID); // should be the input accountID
    });

    it('should return an empty array if the ID does not exist', async () => {
      const nonExistentID = 'nonExistentID';
      const account = await ctx.service.account.getByID(nonExistentID);
      assert(Array.isArray(account));
      assert.equal(account.length, 0);
    });
  });

  describe('getByEmail', () => {
    it('should retrieve a user account by its email', async () => {
      const account = await ctx.service.account.getByEmail(testEmail);
      assert(Array.isArray(account));
      assert.equal(account.length, 1);
      assert.equal(account[0].email, testEmail); // should be the input email
      assert.equal(account[0].accountID, testAccountID); // should be the corresponding accountID
    });

    it('should return an empty array if the email does not exist', async () => {
      const nonExistentEmail = 'nonExistentEmail@example.com';
      const account = await ctx.service.account.getByEmail(nonExistentEmail);
      assert(Array.isArray(account));
      assert.equal(account.length, 0);
    });
  });

  describe('getByUserName', () => {
    it('should retrieve a user account by its username', async () => {
      const account = await ctx.service.account.getByUserName(testUsername);
      assert(Array.isArray(account));
      assert.equal(account.length, 1);
      assert.equal(account[0].username, testUsername); // should be the input
      assert.equal(account[0].accountID, testAccountID); // should be the corresponding accountID
    });

    it('should return an empty array if the username does not exist', async () => {
      const nonExistentUsername = 'nonExistentUsername';
      const account = await ctx.service.account.getByUserName(nonExistentUsername);
      assert(Array.isArray(account));
      assert.equal(account.length, 0);
    });
  });

  describe('getBalance', () => {
    it('should get the balance by account ID', async () => {
      const returnedBalance = await ctx.service.account.getBalance(testAccountID);
      assert.equal(returnedBalance, 1000); // should be the default balance
    });

    it('should throw an error for invalid account ID', async () => {
      const nonExistentID = 'nonExistentID';
      await assert.rejects(async () => {
        await ctx.service.account.getBalance(nonExistentID);
      }, Error);
    });
  });

  describe('updateColorTheme', () => {
    it('should update the color theme of an account', async () => {
      const newTheme = 2; // Valid new color theme
      const updatedAccount = await ctx.service.account.updateColorTheme(testAccountID, newTheme);
      assert(updatedAccount);
      assert.equal(updatedAccount.colorMode, newTheme);
    });

    it('should throw an error for invalid color theme', async () => {
      const invalidTheme = 5; // Invalid new color theme
      await assert.rejects(async () => {
        await ctx.service.account.updateColorTheme(testAccountID, invalidTheme);
      }, Error, 'Invalid Color Theme!');
    });

    it('should throw an error for invalid account ID', async () => {
      const newTheme = 1; // Valid new color theme
      const invalidAccountID = 'invalidID';
      await assert.rejects(async () => {
        await ctx.service.account.updateColorTheme(invalidAccountID, newTheme);
      }, Error);
    });
  });

  describe('updateCurrency', () => {
    it('should update the currency of an account', async () => {
      const newCurrency = 'EUR'; // Valid new currency
      const updatedAccount = await ctx.service.account.updateCurrency(testAccountID, newCurrency);
      assert(updatedAccount);
      assert.equal(updatedAccount.currency, newCurrency);
    });

    it('should throw an error for invalid currency', async () => {
      const invalidCurrency = 'XYZ'; // Invalid new currency
      await assert.rejects(async () => {
        await ctx.service.account.updateCurrency(testAccountID, invalidCurrency);
      }, Error, 'Invalid Currency!');
    });

    it('should throw an error for invalid account ID', async () => {
      const newCurrency = 'GBP'; // Valid new currency
      const invalidAccountID = 'invalidID';
      await assert.rejects(async () => {
        await ctx.service.account.updateCurrency(invalidAccountID, newCurrency);
      }, Error);
    });
  });
});
