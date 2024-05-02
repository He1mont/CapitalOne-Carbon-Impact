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

  it('should get the account specified by ID', async () => {
    // Mock the accountService.getByID method
    app.mockService('account', 'getByID', async () => {
      return { id: 1, username: 'JohnD12345' };
    });
    // Make an HTTP GET request to the /accounts/:id route
    const accountID = '12345';
    const result = await app.httpRequest()
      .get(`/accounts/${accountID}`)
      .expect(200);

    // Assert that the body of the response matches the expected result
    assert.deepStrictEqual(result.body, { id: 1, username: 'JohnD12345' });
  });

  it('should get the account specified by email', async () => {
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

  it('should get the account by username', async () => {
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

  it('should get the balance by account ID', async () => {
    // Mock the accountService.getBalance method
    app.mockService('account', 'getBalance', async () => {
      return 1000;
    });

    // Make an HTTP GET request to the /accounts/username route with a query parameter
    const accountID = '12345';
    const result = await app.httpRequest()
      .get(`/accounts/${accountID}/balance`)
      .expect(200);

    // Assert that the body of the response matches the expected result
    assert.deepStrictEqual(result.body, 1000);
  });

  // Test for updating color theme by account ID
  it('should update color theme by account ID', async () => {
    // Mock the accountService.updateColorTheme method
    app.mockService('account', 'updateColorTheme', async () => {
      return { message: 'Color theme updated successfully' };
    });

    // Set the account ID and the new color theme
    const accountID = '12345';
    const newTheme = { newTheme: 2 }; // Wrap newTheme in an object

    // Send an HTTP PATCH request to the /accounts/:id/color-theme route and expect status code 200
    const result = await app.httpRequest()
      .patch(`/accounts/${accountID}/color-theme`)
      .send(newTheme)
      .expect(200);

    // Assert that the response body matches the expected result
    assert.deepStrictEqual(result.body, { message: 'Color theme updated successfully' });
  });

  // Test for updating currency by account ID
  it('should update currency by account ID', async () => {
    // Mock the accountService.updateCurrency method
    app.mockService('account', 'updateCurrency', async () => {
      return { message: 'Currency updated successfully' };
    });

    // Set the account ID and the new currency information
    const accountID = '12345';
    const newCurr = { newCurr: 'USD' }; // Wrap newCurr in an object

    // Send an HTTP PATCH request to the /accounts/:id/currency route and expect status code 200
    const result = await app.httpRequest()
      .patch(`/accounts/${accountID}/currency`)
      .send(newCurr)
      .expect(200);

    // Assert that the response body matches the expected result
    assert.deepStrictEqual(result.body, { message: 'Currency updated successfully' });
  });

});
