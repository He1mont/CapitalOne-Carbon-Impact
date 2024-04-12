const { app, assert } = require('egg-mock/bootstrap');

describe('AccountController', () => {
  it('createRandom should create a random account', async () => {
    // Mock the account service's createRandom method to return a predefined result
    app.mockService('account', 'createRandom', async () => {
      return { id: 1, name: 'John Doe' };
    });

    // Make an HTTP POST request to the /account/createRandom route
    const result = await app.httpRequest()
      .post('/account/create-random')
      .expect(200);

    // Assert that the body of the response matches the expected result
    assert.deepStrictEqual(result.body, { id: 1, name: 'John Doe' });
  });

  it('getAll should output all existing accounts', async () => {
    app.mockService('account', 'getAll', async () => {
      return [{ id: 1, name: 'John Doe' }, { id: 2, name: 'Jane Smith' }];
    });

    // GET /account/getAll
    const result = await app.httpRequest()
      .get('/account/get-all')
      .expect(200);

    assert.deepStrictEqual(result.body,
      [{ id: 1, name: 'John Doe' }, { id: 2, name: 'Jane Smith' }]);
  });

  it('getByID should return the account specified', async () => {
    app.mockService('account', 'getByID', async () => {
      return { id: 1, name: 'John Doe' };
    });

    // GET /account/getByID
    const result = await app.httpRequest()
      .get('/account/:1/get-by-id ')
      .expect(200);

    assert.deepStrictEqual(result.body, { id: 1, name: 'John Doe' });
  });

  it('getByEmail should return the account specified', async () => {
    app.mockService('account', 'getByEmail', async () => {
      return { id: 1, name: 'John Doe', email: 'john@email.com' };
    });

    // GET /account/getByEmail
    const result = await app.httpRequest()
      .get('/account/get-by-email')
      .send({"email":"john@email.com"})
      .expect(200);

    assert.deepStrictEqual(result.body,
      { id: 1, name: 'John Doe', email: 'john@email.com' });
  });

});
