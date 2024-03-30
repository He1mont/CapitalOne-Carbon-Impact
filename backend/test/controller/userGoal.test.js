const { app, assert } = require('egg-mock/bootstrap');

describe('UserGoalController', () => {
  it('should POST /userGoal/set-goal/:id/:goal/:month', async () => {
    const mockID = 1;
    const mockgoal = '3000';
    const mockmonth = 'January';

    app.mockService('userGoal', 'createGoal', async () => {
      return { id: mockID, goal: mockgoal, month: mockmonth };
    });

    const result = await app
      .httpRequest()
      .post(`/userGoal/set-goal/${mockID}/${mockgoal}/${mockmonth}`)
      .expect(200);

    assert.deepStrictEqual(result.body, {
      id: mockID,
      goal: mockgoal,
      month: mockmonth,
    });
  });

  it('should GET /userGoal/:id', async () => {
    const mockID = 1;

    app.mockService('userGoal', 'getUserGoals', async () => {
      return { id: mockID };
    });
    const result = await app
      .httpRequest()
      .get(`/userGoal/${mockID}`)
      .expect(200);
    assert.deepStrictEqual(result.body, {
      id: mockID,
    });
  });

  it('should DELETE /userGoal/:id', async () => {
    const mockID = 1;

    app.mockService('userGoal', 'deleteUserGoal', async () => {
      // throw new Error('{"errorCode":200,"message":"User goal deleted successfully"}');

    });
    const result = await app
      .httpRequest()
      .delete(`/userGoal/${mockID}`)
      .expect(204);
    assert.deepStrictEqual(result.body, {});
  });


});
