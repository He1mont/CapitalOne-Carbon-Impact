const { app, assert } = require('egg-mock/bootstrap');

describe('UserGoalController', () => {
  it('should create a goal for a specified month', async () => {
    const mockID = 1;
    const mockGoal = '3000';
    const mockYear = '2024';
    const mockMonth = 'January';
    // Mock the userGoalService.createGoal method
    app.mockService('userGoal', 'createGoal', async () => {
      return { id: mockID, goal: mockGoal, year: mockYear, month: mockMonth };
    });

    // Make an HTTP POST request to the /accounts/:id/userGoal route
    const result = await app
      .httpRequest()
      .post(`/accounts/${mockID}/userGoal`)
      .send({ goal: mockGoal, year: mockYear, month: mockMonth })
      .expect(200);

    // Assert that the body of the response matches the expected result
    assert.deepStrictEqual(result.body, {
      id: mockID,
      goal: mockGoal,
      year: mockYear,
      month: mockMonth,
    });
  });

  it('should get all goals for an account', async () => {
    const mockID = 1;
    const mockGoal = '3000';
    // Mock the userGoalService.getUserGoals method
    app.mockService('userGoal', 'getUserGoals', async () => {
      return { accountID: mockID, goal: mockGoal };
    });

    // Make an HTTP GET request to the /userGoal/:id route
    const result = await app
      .httpRequest()
      .get(`/accounts/${mockID}/userGoal`)
      .expect(200);

    // Assert that the body of the response matches the expected result
    assert.deepStrictEqual(result.body, { accountID: mockID, goal: mockGoal });
  });
});
