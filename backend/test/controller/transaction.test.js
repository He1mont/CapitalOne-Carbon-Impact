const { app, assert } = require('egg-mock/bootstrap');

describe('TransactionController', () => {
  it('getAll should return transactions with 200 status', async () => {
    app.mockService('transaction', 'getAll', async () => {
      return [{ id: 1, name: 'Transaction 1' }, { id: 2, name: 'Transaction 2' }];
    });

    const result = await app.httpRequest()
      .get('/transaction/all')
      .expect(200);

    assert(result.body.length === 2);
    assert(result.headers['access-control-allow-origin'] === '*');
  });

  it('getByID should return a specific transaction with 200 status', async () => {
    const expectedTransaction = { id: 1, name: 'Transaction 1' };
    app.mockService('transaction', 'getByID', async () => {
      return expectedTransaction;
    });

    const result = await app.httpRequest()
      .get('/transaction/by-id/1')
      .expect(200);

    assert.deepStrictEqual(result.body, expectedTransaction);
    assert(result.headers['access-control-allow-origin'] === '*');
  });

//   it('groupByDate should return transactions grouped by date with 200 status', async () => {
//     const expectedGroupedData = {
//       '2021-01-01': [{ id: 1, name: 'Transaction 1' }],
//       '2021-01-02': [{ id: 2, name: 'Transaction 2' }]
//     };
//     app.mockService('transaction', 'groupByDate', async () => {
//       return expectedGroupedData;
//     });

//     const result = await app.httpRequest()
//       .get('/transaction/group-by-date')
//       .expect(200);

//     assert.deepStrictEqual(result.body, expectedGroupedData);
//     assert(result.headers['access-control-allow-origin'] === '*');
//   });
});
