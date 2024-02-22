const { app, assert } = require('egg-mock/bootstrap');
const axios = require('axios');
const sinon = require('sinon');

describe('TransactionService', () => {
  it('groupByDate should return grouped transactions if transactions exist', async () => {
    const ctx = app.mockContext();
    const id = 123456;
    const mockResponse = {
      data: {
        Transaction: [
          { timestamp: '2024-02-14 08:30:00', amount: 100 },
          { timestamp: '2024-02-14 12:45:00', amount: 50 },
          { timestamp: '2024-02-15 10:00:00', amount: 75 },
        ],
      },
    };

    // Simulate the axios.get method to return mock transactions
    sinon.stub(axios, 'get').resolves(mockResponse);

    const result = await ctx.service.transaction.groupByDate(id);
    assert.deepStrictEqual(result, {
      '2024-02-14': [
        { timestamp: '2024-02-14 08:30:00', amount: 100 },
        { timestamp: '2024-02-14 12:45:00', amount: 50 },
      ],
      '2024-02-15': [
        { timestamp: '2024-02-15 10:00:00', amount: 75 },
      ],
    });

    axios.get.restore();
  });

  it('groupByDate should return an empty dictionary if there is no transaction', async () => {
    const ctx = app.mockContext();
    const id = 123456;
    const mockResponse = {
      data: {
        Transactions: [],
      },
    };

    // Simulate the axios.get method to return an empty array
    sinon.stub(axios, 'get').resolves(mockResponse);

    const result = await ctx.service.transaction.groupByDate(id);
    assert.deepStrictEqual(result, {});
    axios.get.restore();
  });

  it('groupByDate should throw an error if axios request fails', async () => {
    const ctx = app.mockContext();
    const id = 123456;
    const error = new Error('Failed to fetch transactions');

    // Simulate axios.get fails
    const stub = sinon.stub(axios, 'get').rejects(error);

    // Verify if an error is thrown
    await assert.rejects(async () => {
      await ctx.service.transaction.groupByDate(id);
    }, error);

    stub.restore();
  });
});
