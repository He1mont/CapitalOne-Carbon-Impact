const express = require('express');
const { PrismaClient } = require('@prisma/client');

const prisma = new PrismaClient();
const app = express();

const PORT = process.env.PORT || 7001;

app.use(express.json());

// Route to create a new user goal
//check if account alrady exists if not create else update
//create 
//update
//delete
//get
app.post('/user-goals', async (req, res) => {
  const {accountID, goal} = req.body;
  try {
    let existingUserGoal = await prisma.userGoals.findUnique({
      where: {
        accountID: accountID
      }
    });
    if (existingUserGoal) {
      // If the account already exists, update its goal
      existingUserGoal = await prisma.userGoals.update({
        where: {
          accountID: accountID
        },
        data: {
          goal: goal
        }
      });
    } else {
      // If the account doesn't exist, create it with the goal
      const newUserGoal = await prisma.userGoals.create({
        data: {
          accountID: accountID,
          goal: goal,
        },
      });
      res.json(newUserGoal);
    }
  } catch (error) {
    console.error('Error creating or updating user goal:', error);
    res.status(500).json({ error: 'Failed to create or update user goal' });
  }
});

// API endpoint to get the goal by accountID
app.get('/user-goals/:accountID', async (req, res) => {
  const { accountID } = req.params;
  try {
    // Find the user goal by accountID
    const userGoal = await prisma.userGoals.findUnique({
      where: {
        accountID: accountID
      }
    });

    if (userGoal) {
      // If user goal is found return 
      res.json(userGoal);
    } else {
      // If user goal is not found, return a 404 Not Found error
      res.status(404).json({ error: 'User goal not found' });
    }
  } catch (error) {
    console.error('Error retrieving user goal:', error);
    res.status(500).json({ error: 'Failed to retrieve user goal' });
  }
});
// API endpoint to delete the goal by accountID
app.delete('/delete-user-goals/:accountID', async (req, res) => {
  const { accountID } = req.params;
  try {
    // Find the user goal by accountID
    const userGoal = await prisma.userGoals.findUnique({
      where: {
        accountID: accountID
      }
    });

    if (userGoal) {
      // If user goal is found, delete it
      await prisma.userGoals.delete({
        where: {
          accountID: accountID
        }
      });
      res.json({ message: 'User goal deleted successfully' });
    } else {
      // If user goal is not found, return a 404 Not Found error
      res.status(404).json({ error: 'User goal not found' });
    }
  } catch (error) {
    console.error('Error deleting user goal:', error);
    res.status(500).json({ error: 'Failed to delete user goal' });
  }
});

// Route to create a new transaction in the database
// are first storying the info including genere etc with blank score then calling carbon api then amending the score
// or after the carbon score is created are we storing it in the database 


// in the api only work out total carbon score using the account id

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

//friends
//leaderboard page
// search by username to get id
//then use id to and call the total carbon score api
//then return
//create
//update
//get

//if they try to set a goal make sure they have a username first
//api to create the username which would be the first name first leter of surname and a number
//store in the database and front end
//get
//update
//delete
//make sure unqiue 

app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});
