const { app, assert } = require('egg-mock/bootstrap');

describe('AccountController', () => {
  it('createRandom should create a random account', async () => {
    // Mock the account service's createRandom method to return a predefined result
    app.mockService('account', 'createRandom', async () => {
      return { id: 1, name: 'John Doe' };
    });

    // Make an HTTP POST request to the /accounts/createRandom route
    const result = await app.httpRequest()
      .post('/accounts/create-random')
      .expect(200);

    // Assert that the body of the response matches the expected result
    assert.deepStrictEqual(result.body, { id: 1, name: 'John Doe' });
  });

  it('getAll should output all existing accounts', async () => {
    app.mockService('account', 'getAll', async () => {
      return [{ id: 1, name: 'John Doe' }, { id: 2, name: 'Jane Smith' }];
    });

    // GET /accounts/getAll
    const result = await app.httpRequest()
      .get('/accounts/get-all')
      .expect(200);

    assert.deepStrictEqual(result.body,
      [{ id: 1, name: 'John Doe' }, { id: 2, name: 'Jane Smith' }]);
  });

  it('getByID should return the account specified', async () => {
    app.mockService('account', 'getByID', async () => {
      return { id: 1, name: 'John Doe' };
    });

    // GET /accounts/getByID
    const result = await app.httpRequest()
      .get('/accounts/:1/get-by-id ')
      .expect(200);

    assert.deepStrictEqual(result.body, { id: 1, name: 'John Doe' });
  });

  it('getByEmail should return the account specified', async () => {
    app.mockService('account', 'getByEmail', async () => {
      return { id: 1, name: 'John Doe', email: 'john@email.com' };
    });

    // GET /accounts/getByEmail
    const result = await app.httpRequest()
      .get('/accounts/get-by-email')
      .send({"email":"john@email.com"})
      .expect(200);

    assert.deepStrictEqual(result.body,
      { id: 1, name: 'John Doe', email: 'john@email.com' });
  });

});
