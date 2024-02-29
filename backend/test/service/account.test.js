const { app, assert } = require('egg-mock/bootstrap');
const axios = require('axios');
const sinon = require('sinon');

describe('AccountService', () => {
  it('getByEmail should return accountId if account with given email exists', async () => {
    // Bypass actual HTTP requests and directly call service methods
    const ctx = app.mockContext();

    // Get all accounts by calling getAll
    const accountsData = await ctx.service.account.getAll();
    // Extract account array
    const accounts = accountsData.Accounts;

    if (accounts != null) {
      // Select an account randomly
      const randomIndex = Math.floor(Math.random() * accounts.length);
      const targetAccount = accounts[randomIndex];
      const emailToFind = targetAccount.email;
      const expectedAccountId = targetAccount.accountId;

      const returnedAccountId = await ctx.service.account.getByEmail(emailToFind);
      assert.strictEqual(returnedAccountId, expectedAccountId);
    }
  });

  it('getByEmail should return null if input is a part of a valid email', async () => {
    const ctx = app.mockContext();
    const accountsData = await ctx.service.account.getAll();
    const accounts = accountsData.Accounts;

    if (accounts != null) {
      // Select an account randomly
      const randomIndex = Math.floor(Math.random() * accounts.length);
      const targetAccount = accounts[randomIndex];

      // Obtain the username section of the email
      const emailPart = targetAccount.email.split('@')[0];

      const result = await ctx.service.account.getByEmail(emailPart);
      assert.strictEqual(result, null);
    }
  });

  it('getByEmail should return null if an accountId is used as an input', async () => {
    const ctx = app.mockContext();
    const accountsData = await ctx.service.account.getAll();
    const accounts = accountsData.Accounts;

    if (accounts != null) {
      // Select an account randomly
      const randomIndex = Math.floor(Math.random() * accounts.length);
      const targetAccount = accounts[randomIndex];
      const accountId = targetAccount.accountId;

      const result = await ctx.service.account.getByEmail(accountId);
      assert.strictEqual(result, null);
    }
  });

  it('getByEmail should return null if no account with given email exists', async () => {
    const ctx = app.mockContext();
    const nonExistentEmail = 'nonexistent@example.com';
    const returnedAccountId = await ctx.service.account.getByEmail(nonExistentEmail);
    assert.strictEqual(returnedAccountId, null);
  });

  it('getByEmail should return null if axios.get returns empty account list', async () => {
    const ctx = app.mockContext();
    const emptyResponse = { data: { Accounts: [] } };

    // Simulate `axios.get` using sinon and return an empty account array
    sinon.stub(axios, 'get').resolves(emptyResponse);
    const result = await ctx.service.account.getByEmail('Leann.Fay@emailprovider.com');
    assert.strictEqual(result, null);

    // Restore the original call to axios.get to avoid affecting other test cases
    axios.get.restore();
  });

  it('getByEmail should throw an error if axios request fails', async () => {
    const ctx = app.mockContext();
    const email = 'test@example.com';
    const error = new Error('Failed to get all accounts');

    // Simulate axios.get fails
    const stub = sinon.stub(axios, 'get').rejects(error);

    // Verify if an error is thrown
    await assert.rejects(async () => {
      await ctx.service.account.getByEmail(email);
    }, error);

    stub.restore();
  });
});
