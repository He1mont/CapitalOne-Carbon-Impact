const express = require('express');
const { PrismaClient } = require('@prisma/client');

const prisma = new PrismaClient();
const app = express();

const PORT = process.env.PORT || 7001;

app.use(express.json());

// Route to create a new user goal
//check if username is not already there if it is just goal and total carbon score
app.post('/user-goals', async (req, res) => {
  const { name, accountID, goal, username, totalCarbonScore } = req.body;
  try {
    const newUserGoal = await prisma.userGoals.create({
      data: {
        name,
        accountID,
        goal,
        username,
        totalCarbonScore,
      },
    });
    res.json(newUserGoal);
  } catch (error) {
    console.error('Error creating user goal:', error);
    res.status(500).json({ error: 'Failed to create user goal' });
  }
});

// Route to create a new transaction in the database
// are first storying the info including genere etc with blank score then calling carbon api then amending the score
//or after the carbon score is created are we storing it in the database 
app.post('/transactions', async (req, res) => {
  const { transactionUUID, accountID, carbonScore } = req.body;
  try {
    const newTransaction = await prisma.transaction.create({
      data: {
        transactionUUID,
        accountID,
        carbonScore,
      },
    });
    res.json(newTransaction);
  } catch (error) {
    console.error('Error creating transaction:', error);
    res.status(500).json({ error: 'Failed to create transaction' });
  }
});

// Route to create a new friend
app.post('/friends', async (req, res) => {
  const { username, usernameID, totalCarbonScore, score } = req.body;
  try {
    const newFriend = await prisma.friends.create({
      data: {
        username,
        usernameID,
        totalCarbonScore,
        score,
      },
    });
    res.json(newFriend);
  } catch (error) {
    console.error('Error creating friend:', error);
    res.status(500).json({ error: 'Failed to create friend' });
  }
});

app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});
