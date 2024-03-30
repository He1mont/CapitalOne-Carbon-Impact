const { app, assert } = require('egg-mock/bootstrap');

describe('FriendController', () => {
  it('should POST /friend/add-by-id/:accountID/:friendID', async () => {
    const mockAccountID = 1;
    const mockFriendID = 2;
    app.mockService('friend', 'addByID', async () => {
      return { accountID: mockAccountID, friendID: mockFriendID };
    });

    const result = await app.httpRequest()
      .post(`/friend/add-by-id/${mockAccountID}/${mockFriendID}`)
      .expect(200);

    assert.deepStrictEqual(result.body,
      { accountID: mockAccountID, friendID: mockFriendID });
  });

  it('should GET /friend/get-all/:id', async () => {
    const mockId = 1;
    const mockFollowing1 = 2;
    const mockFollowing2 = 3;
    app.mockService('friend', 'getAll', async () => {
      return [{ id: mockFollowing1 }, { id: mockFollowing2 }];
    });

    const result = await app.httpRequest()
      .get(`/friend/get-all/${mockId}`)
      .expect(200);

    assert.deepStrictEqual(result.body,
      [{ id: mockFollowing1 }, { id: mockFollowing2 }]);
  });

  it('should DELETE /friend/delete/:accountID/:friendID', async () => {
    const mockAccountID = 1;
    const mockFriendID = 2;
    app.mockService('friend', 'deleteFriend', async () => {
      return 1;
    });

    const result = await app.httpRequest()
      .delete(`/friend/delete/${mockAccountID}/${mockFriendID}`)
      .expect(200);

    assert.deepStrictEqual(result.body, 1);
  });

});
