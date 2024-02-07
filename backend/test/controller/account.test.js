const { app, assert } = require('egg-mock/bootstrap');

describe('AccountController', () => {
  // Define a test case for the createRandom method
  it('createRandom should work properly', async () => {
    // Mock the account service's createRandom method to return a predefined result
    app.mockService('account', 'createRandom', async () => {
      return { success: true };
    });

    // Make an HTTP GET request to the /account/createRandom route
    const result = await app.httpRequest()
      .get('/account/create-random')
      .expect(200);

    // Assert that the body of the response matches the expected result
    assert.deepStrictEqual(result.body, { success: true });
  });
});
