const { app, assert } = require('egg-mock/bootstrap');

describe('FriendController', () => {
  it('should POST /friend/add-by-username/:id/:username', async () => {
    const mockAccountID = 1;
    const mockUsername = 'Mike';
    app.mockService('friend', 'addByUsername', async () => {
      return { id: mockAccountID, username: mockUsername };
    });

    const result = await app.httpRequest()
      .post(`/friend/add-by-username/${mockAccountID}/${mockUsername}`)
      .expect(200);

    assert.deepStrictEqual(result.body,
      { id: mockAccountID, username: mockUsername });
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

  it('should DELETE /friend/delete/:id/:username', async () => {
    const mockAccountID = 1;
    const mockUsername = 'Mike';
    app.mockService('friend', 'delete', async () => {
      return 1;
    });

    const result = await app.httpRequest()
      .delete(`/friend/delete/${mockAccountID}/${mockUsername}`)
      .expect(200);

    assert.deepStrictEqual(result.body, 1);
  });

});
