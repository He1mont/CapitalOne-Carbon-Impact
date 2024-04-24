const { app, assert } = require('egg-mock/bootstrap');

describe('TransactionController', () => {
  it('should create random transactions for an account', async () => {
    const mockAccountID = 1;
    // Mock the createRandom method of the transaction service
    app.mockService('transaction', 'createRandom', async () => {
      return { id: mockAccountID, name: 'Transaction 1' };
    });

    // Make a POST request to create a transaction
    const result = await app.httpRequest()
      .post(`/accounts/${mockAccountID}/transactions`)
      .expect(200);

    // Assert that the response body matches the expected result
    assert.deepStrictEqual(result.body, { id: mockAccountID, name: 'Transaction 1' });
  });

  it('should get transactions of an account', async () => {
    const mockAccountID = 1;
    // Mock the getAll method of the transaction service
    app.mockService('transaction', 'getAllTransactions', async () => {
      return [{ id: mockAccountID, name: 'Transaction 1' }];
    });

    // Make a GET request to fetch transactions
    const result = await app.httpRequest()
      .get(`/accounts/${mockAccountID}/transactions`)
      .expect(200);

    // Assert that the response body matches the expected result
    assert.deepStrictEqual(result.body, [{ id: mockAccountID, name: 'Transaction 1' }]);
  });

  it('should get a specified transaction of an account', async () => {
    const mockAccountID = '123';
    const mockTransactionID = '456';
    const expectedTransaction = { id: mockTransactionID, name: 'Transaction Specific' };
    // Mock the getByID method of the transaction service
    app.mockService('transaction', 'getByID', async () => {
      return expectedTransaction;
    });

    // Make a GET request to fetch a specific transaction
    const result = await app.httpRequest()
      .get(`/accounts/${mockAccountID}/transactions/${mockTransactionID}`)
      .expect(200);

    // Assert that the response body matches the expected transaction
    assert.deepStrictEqual(result.body, expectedTransaction);
  });

  it('should get the carbon score of a transaction', async () => {
    const mockAccountID = '123';
    const mockTransactionID = '456';
    // Mock the transactionService.getCarbonImpact method
    app.mockService('transaction', 'getCarbonImpact', async () => {
      return { carbonScore: 55 };
    });

    // Make an GET request to fetch the carbon score
    const result = await app.httpRequest()
      .get(`/accounts/${mockAccountID}/transactions/${mockTransactionID}/carbonScore`)
      .expect(200);

    // Assert that the body of the response matches the expected result
    assert.deepStrictEqual(result.body, { carbonScore: 55 });
  });

  it('should get the carbon score for a specific year and month', async () => {
    const mockAccountID = '123';
    const mockMonth = '01';
    const mockYear = '2022';
    const expectedCarbonScore = 100;

    // Mock the transactionService.getCarbonScoreByMonth method
    app.mockService('transaction', 'getCarbonScoreByMonth', async () => {
      return expectedCarbonScore;
    });

    // Make an GET request fetch carbon score for a month
    const result = await app.httpRequest()
      .get(`/accounts/${mockAccountID}/carbonScores/monthly`)
      .query({ month: mockMonth, year: mockYear })
      .expect(200);

    // Assert that the body of the response matches the expected result
    assert.strictEqual(result.body, expectedCarbonScore);
  });

  it('should get the carbon score for a specific year and month and group by categories', async () => {
    const mockAccountID = '123';
    const mockMonth = '01';
    const mockYear = '2022';
    const expectedCarbonScore = { category1: 50, category2: 50 };

    // Mock the transactionService.getCarbonScoreByMonthInCategories method
    app.mockService('transaction', 'getCarbonScoreByMonthInCategories', async () => {
      return expectedCarbonScore;
    });

    // Make an GET request to fetch carbon score for all categories
    const result = await app.httpRequest()
      .get(`/accounts/${mockAccountID}/carbonScores/monthly/allCategories`)
      .query({ month: mockMonth, year: mockYear })
      .expect(200);

    // Assert that the body of the response matches the expected result
    assert.deepStrictEqual(result.body, expectedCarbonScore);
  });
});
