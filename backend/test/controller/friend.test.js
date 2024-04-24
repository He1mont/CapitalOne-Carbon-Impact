const { app, assert } = require('egg-mock/bootstrap');

describe('FriendController', () => {
  it('should add a friend relationship by their ID', async () => {
    const mockAccountID = 1;
    const mockFriendID = 2;
    // Mock the friendService.addByID method
    app.mockService('friend', 'addByID', async () => {
      return { accountID: mockAccountID, friendID: mockFriendID };
    });

    // Make an HTTP POST request to the /accounts/:accountID/friends/:friendID route
    const result = await app.httpRequest()
      .post(`/accounts/${mockAccountID}/friends/${mockFriendID}`)
      .expect(200);

    // Assert that the body of the response matches the expected result
    assert.deepStrictEqual(result.body, { accountID: mockAccountID, friendID: mockFriendID });
  });

  it('should get all friends for an account', async () => {
    const mockId = 1;
    const mockFollowing1 = 2;
    const mockFollowing2 = 3;
    // Mock the friendService.getAll method
    app.mockService('friend', 'getAll', async () => {
      return [{ id: mockFollowing1 }, { id: mockFollowing2 }];
    });

    // Make an HTTP GET request to the /account/:id/friends route
    const result = await app.httpRequest()
      .get(`/accounts/${mockId}/friends`)
      .expect(200);

    // Assert that the body of the response matches the expected result
    assert.deepStrictEqual(result.body, [{ id: mockFollowing1 }, { id: mockFollowing2 }]);
  });

  it('should delete a friendship relation', async () => {
    const mockAccountID = 1;
    const mockFriendID = 2;
    // Mock the friendService.deleteFriend method
    app.mockService('friend', 'deleteFriend', async () => {
      return {};
    });

    // Make an HTTP DELETE request to the /friend/delete/:accountID/:friendID route
    const result = await app.httpRequest()
      .delete(`/accounts/${mockAccountID}/friends/${mockFriendID}`)
      .expect(204);

    // Assert that the body of the response matches the expected result
    assert.deepStrictEqual(result.body, {});
  });

});
