const { app, assert } = require('egg-mock/bootstrap');
const UserGoalController = require('../../app/controller/userGoal');

describe('UserGoalController', () => {
  let controller;

  beforeEach(() => {
    app.mockContext({});
    controller = new UserGoalController(app);
  });

  describe('createGoal', () => {
    it('should create a new goal', async () => {
      const mockParams = { id: '1', goal: '3000', month: 'January' };
      const mockServiceResponse = { id: '1', goal: '3000', month: 'January' };

      app.mockContext({
        params: mockParams,
      });

      app.mockService('userGoal', 'createGoal', async () => {
        return mockServiceResponse;
      });

      await controller.createGoal();

      assert.strictEqual(controller.ctx.status, 200);
      assert.deepStrictEqual(controller.ctx.body, mockServiceResponse);
    });
  });

  describe('userGoals', () => {
    it('should delete user goal if method is DELETE', async () => {
      const mockParams = { id: '1' };

      app.mockContext({
        params: mockParams,
        method: 'DELETE',
      });

      app.mockService('userGoal', 'deleteUserGoal', async () => {
        return { message: 'User goal deleted successfully' };
      });

      await controller.userGoals();

      assert.strictEqual(controller.ctx.status, 204);
      assert.strictEqual(controller.ctx.body, '');
    });

    it('should retrieve user goals if method is GET', async () => {
      const mockParams = { id: '1' };
      const mockServiceResponse = [{ id: '1', goal: 'Goal', month: 'January' }];

      app.mockContext({
        params: mockParams,
        method: 'GET',
      });

      app.mockService('userGoal', 'getUserGoals', async () => {
        return mockServiceResponse;
      });

      await controller.userGoals();

      assert.strictEqual(controller.ctx.status, 200);
      assert.deepStrictEqual(controller.ctx.body, mockServiceResponse);
    });

    it('should handle method not allowed', async () => {
      const mockParams = { id: '1' };

      app.mockContext({
        params: mockParams,
        method: 'PUT',
      });

      await controller.userGoals();

      assert.strictEqual(controller.ctx.status, 405);
      assert.deepStrictEqual(controller.ctx.body, { error: 'Method not allowed' });
    });

    it('should handle user goal not found', async () => {
      const mockParams = { id: '2' };

      app.mockContext({
        params: mockParams,
        method: 'GET',
      });

      app.mockService('userGoal', 'getUserGoals', async () => {
        return null;
      });

      await controller.userGoals();

      assert.strictEqual(controller.ctx.status, 404);
      assert.deepStrictEqual(controller.ctx.body, { error: 'User goal not found' });
    });
  });
});
