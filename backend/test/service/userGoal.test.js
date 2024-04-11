const express = require('express');
const request = require('supertest');
const UserGoalService = require('../../app/service/userGoal');

// Mock the UserGoalService
jest.mock('../../app/service/userGoal');
const userGoalService = new UserGoalService();

// Create an Express application
const app = express();
app.use(express.json());

// Define routes
app.post('/createGoal/:id/:goal/:month', async (req, res) => {
  const { id, goal, month } = req.params;

  try {
    const result = await userGoalService.createGoal(parseInt(id), goal, month);
    res.json(result);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
});

app.delete('/deleteUserGoal/:id', async (req, res) => {
  const { id } = req.params;

  try {
    const result = await userGoalService.deleteUserGoal(parseInt(id));
    res.json(result);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
});

app.get('/getUserGoals/:id', async (req, res) => {
  const { id } = req.params;

  try {
    const result = await userGoalService.getUserGoals(parseInt(id));
    res.json(result);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
});

// Test the routes
describe('UserGoalService', () => {
  it('should create a new user goal', async () => {
    // Mock the implementation of createGoal
    userGoalService.createGoal.mockResolvedValue({ accountID: 1, goal: '3000', month: 'January' });

    const response = await request(app)
      .post('/createGoal/1/3000/January');

    expect(response.statusCode).toBe(200);
    expect(response.body).toHaveProperty('accountID', 1);
    expect(response.body).toHaveProperty('goal', '3000');
    expect(response.body).toHaveProperty('month', 'January');
  });

  it('should delete an existing user goal', async () => {
    // Mock the implementation of deleteUserGoal
    userGoalService.deleteUserGoal.mockResolvedValue({ errorCode: 200, message: 'User goal deleted successfully' });

    const response = await request(app).delete('/deleteUserGoal/1');

    expect(response.statusCode).toBe(200);
    expect(response.body).toHaveProperty('errorCode', 200);
    expect(response.body).toHaveProperty('message', 'User goal deleted successfully');
  });

  it('should retrieve user goals for a given account ID', async () => {
    // Mock the implementation of getUserGoals
    userGoalService.getUserGoals.mockResolvedValue([{ id: 1, goal: '3000', month: 'January' }, { id: 2, goal: '5000', month: 'February' }]);

    const response = await request(app).get('/getUserGoals/1');

    expect(response.statusCode).toBe(200);
    expect(Array.isArray(response.body)).toBe(true);
    expect(response.body).toHaveLength(2);
  });
});
