const { app, assert } = require('egg-mock/bootstrap');

describe('TransactionController', () => {
  it('should POST account/:id/transaction', async () => {
    const mockAccountID = 1;
    app.mockService('transaction', 'createRandom', async () => {
      return { id: mockAccountID, name: 'Transaction 1' };
    });

    const result = await app.httpRequest()
      .post(`/account/${mockAccountID}/transaction`)
      .expect(200);

    assert.deepStrictEqual(result.body, { id: mockAccountID, name: 'Transaction 1' });
    assert.strictEqual(result.headers['access-control-allow-origin'], '*');
  });

  it('should GET account/:id/transaction', async () => {
    const mockId = 1;
    app.mockService('transaction', 'getAll', async () => {
      return [{ id: mockId, name: 'Transaction 1' }];
    });

    const result = await app.httpRequest()
      .get(`/account/${mockId}/transaction`)
      .expect(200);

    assert.deepStrictEqual(result.body, [{ id: mockId, name: 'Transaction 1' }]);
    assert.strictEqual(result.headers['access-control-allow-origin'], '*');
  });

  it('should GET /account/:accountID/transaction/:transactionID', async () => {
    const mockAccountID = '123';
    const mockTransactionID = '456';
    const expectedTransaction = { id: mockTransactionID, name: 'Transaction Specific' };
    app.mockService('transaction', 'getByID', async () => {
      return expectedTransaction;
    });

    const result = await app.httpRequest()
      .get(`/account/${mockAccountID}/transaction/${mockTransactionID}`)
      .expect(200);

    assert.deepStrictEqual(result.body, expectedTransaction);
    assert.strictEqual(result.headers['access-control-allow-origin'], '*');
  });

  it('should GET account/:id/transaction/group-by-date', async () => {
    const mockId = 1;
    const expectedGroupedData = {
      '2020-01-01': [{ id: mockId, name: 'Transaction Grouped' }],
    };
    app.mockService('transaction', 'groupByDate', async () => {
      return expectedGroupedData;
    });

    const result = await app.httpRequest()
      .get(`account/${mockId}/transaction/group-by-date`)
      .expect(200);

    assert.deepStrictEqual(result.body, expectedGroupedData);
    assert.strictEqual(result.headers['access-control-allow-origin'], '*');
  });
});
