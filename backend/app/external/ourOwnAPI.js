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
  const { name, accountID, goal, username, totalCarbonScore } = req.body;
  try {
    const newUserGoal = await prisma.userGoals.create({
      data: {
      
        accountID,
        goal,
        
  
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
