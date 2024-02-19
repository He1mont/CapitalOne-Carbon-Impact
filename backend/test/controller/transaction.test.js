const { app, assert } = require('egg-mock/bootstrap');

describe('TransactionController', () => {
  it('should GET /transaction/get-all/:id', async () => {
    const mockId = 1;
    app.mockService('transaction', 'getAll', async () => {
      return [{ id: mockId, name: 'Transaction 1' }];
    });

    const result = await app.httpRequest().get(`/transaction/get-all/${mockId}`).expect(200);

    assert.deepStrictEqual(result.body, [{ id: mockId, name: 'Transaction 1' }]);
    assert.strictEqual(result.headers['access-control-allow-origin'], '*');
  });

  it('should GET /transaction/get-by-id/:accountID/:transactionID', async () => {
    const mockAccountID = '123';
    const mockTransactionID = '456';
    const expectedTransaction = { id: mockTransactionID, name: 'Transaction Specific' };
    app.mockService('transaction', 'getByID', async () => {
      return expectedTransaction;
    });

    const result = await app.httpRequest().get(`/transaction/get-by-id/${mockAccountID}/${mockTransactionID}`).expect(200);

    assert.deepStrictEqual(result.body, expectedTransaction);
    assert.strictEqual(result.headers['access-control-allow-origin'], '*');
  });

  it('should GET /transaction/group-by-date/:id', async () => {
    const mockId = 1; 
    const expectedGroupedData = {
      '2020-01-01': [{ id: mockId, name: 'Transaction Grouped' }],
    };
    app.mockService('transaction', 'groupByDate', async () => {
      return expectedGroupedData;
    });

    const result = await app.httpRequest().get(`/transaction/group-by-date/${mockId}`).expect(200);

    assert.deepStrictEqual(result.body, expectedGroupedData);
    assert.strictEqual(result.headers['access-control-allow-origin'], '*');
  });
});
