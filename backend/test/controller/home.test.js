const { app, assert } = require('egg-mock/bootstrap');

describe('HomeController', () => {
  it('index should return "Hello from Egg.js backend"', async () => {
    const result = await app.httpRequest()
      .get('/')
      .expect(200);

    assert.deepStrictEqual(result.body, { message: 'Hello from Egg.js backend' });
  });
});
