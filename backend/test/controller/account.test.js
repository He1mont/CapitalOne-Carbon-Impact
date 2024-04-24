const { app, assert } = require('egg-mock/bootstrap');

describe('AccountController', () => {
  it('should create a random account', async () => {
    // Mock the accountService.createRandom method
    app.mockService('account', 'createRandom', async () => {
      return { id: 1, username: 'JohnD12345' };
    });

    // Make an HTTP POST request to the /accounts route
    const result = await app.httpRequest()
      .post('/accounts')
      .expect(200);

    // Assert that the body of the response matches the expected result
    assert.deepStrictEqual(result.body, { id: 1, username: 'JohnD12345' });
  });

  it('should get all existing accounts', async () => {
    // Mock the accountService.getAll method
    app.mockService('account', 'getAll', async () => {
      return [{ id: 1, username: 'JohnD12345' }, { id: 2, username: 'JaneS12345' }];
    });

    // Make an HTTP GET request to the /accounts route
    const result = await app.httpRequest()
      .get('/accounts')
      .expect(200);

    // Assert that the body of the response matches the expected result
    assert.deepStrictEqual(result.body, [
      { id: 1, username: 'JohnD12345' },
      { id: 2, username: 'JaneS12345' },
    ]);
  });

  it('should return the account specified by ID', async () => {
    // Mock the accountService.getByID method
    app.mockService('account', 'getByID', async () => {
      return { id: 1, username: 'JohnD12345' };
    });
    // Make an HTTP GET request to the /accounts/:id route
    const result = await app.httpRequest()
      .get('/accounts/1')
      .expect(200);

    // Assert that the body of the response matches the expected result
    assert.deepStrictEqual(result.body, { id: 1, username: 'JohnD12345' });
  });

  it('should return the account specified by email', async () => {
    // Mock the accountService.getByEmail method
    app.mockService('account', 'getByEmail', async () => {
      return { id: 1, username: 'JohnD12345', email: 'john@email.com' };
    });

    // Make an HTTP GET request to the /accounts/email route
    const result = await app.httpRequest()
      .get('/accounts/email')
      .query({ email: 'john@email.com' }) // Use the query method to add query parameters
      .expect(200);

    // Assert that the body of the response matches the expected result
    assert.deepStrictEqual(result.body, { id: 1, username: 'JohnD12345', email: 'john@email.com' });
  });

  it('should get account by username', async () => {
    // Mock the accountService.getByUserName method
    app.mockService('account', 'getByUserName', async () => {
      return { id: 1, username: 'JohnD12345', email: 'john@email.com' };
    });

    // Make an HTTP GET request to the /accounts/username route with a query parameter
    const result = await app.httpRequest()
      .get('/accounts/username')
      .query({ username: 'JohnD12345' })
      .expect(200);

    // Assert that the body of the response matches the expected result
    assert.deepStrictEqual(result.body, { id: 1, username: 'JohnD12345', email: 'john@email.com' });
  });
});
