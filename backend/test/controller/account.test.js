const { app, assert } = require('egg-mock/bootstrap');

describe('AccountController', () => {
  // Define a test case for the createRandom method
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

  // Define a test case for the getAll method
  it('getAll should output all existing accounts', async () => {
    // Mock the account service's getAll method to return a predefined result
    app.mockService('account', 'getAll', async () => {
      return [{ id: 1, name: 'John Doe' }, { id: 2, name: 'Jane Smith' }];
    });

    // Make an HTTP GET request to the /account/getAll route
    const result = await app.httpRequest()
      .get('/account/get-all')
      .expect(200);

    // Assert that the body of the response matches the expected result
    assert.deepStrictEqual(result.body, [{ id: 1, name: 'John Doe' }, { id: 2, name: 'Jane Smith' }]);
  });

  // Define a test case for the getByID method
  it('getByID should return the account specified', async () => {
    // Mock the account service's getByID method to return a predefined result
    app.mockService('account', 'getByID', async () => {
      return { id: 1, name: 'John Doe' };
    });

    // Make an HTTP GET request to the /account/getByID route
    const result = await app.httpRequest()
      .get('/account/get-by-id/:1')
      .expect(200);

    // Assert that the body of the response matches the expected result
    assert.deepStrictEqual(result.body, { id: 1, name: 'John Doe' });
  });

  // Define a test case for the getByEmail method
  it('getByEmail should return the account specified', async () => {
    // Mock the account service's getByEmail method to return a predefined result
    app.mockService('account', 'getByEmail', async () => {
      return { id: 1, name: 'John Doe', email: 'john@email.com' };
    });

    // Make an HTTP GET request to the /account/getByEmail route
    const result = await app.httpRequest()
      .get('/account/get-by-email/:john@email.com')
      .expect(200);

    // Assert that the body of the response matches the expected result
    assert.deepStrictEqual(result.body, { id: 1, name: 'John Doe', email: 'john@email.com' });
  });

});
