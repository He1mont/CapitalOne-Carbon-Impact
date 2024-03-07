const Service = require('egg').Service;
// Load environment variables in the .env file
require('dotenv').config();
const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();

class AccountTableService extends Service {
  
    //when for the friend search by username
    //after getting the username we get the id
    // we also need the front end to give us the current users id
    async getID(username) {
        // Search in the database
        const friend = await prisma.account.findUnique({
            where: { username: username },
            select: { accountID: true },
        });
        
        if (!friend) {
          throw new Error(
            JSON.stringify({
              errorCode: 131,
              message: "Can't find this friend.",
            })
          );
        }
    
        return friend;
    }
    //afterwards
    // create a friendship with userID and the friend id


    // then call the calculate totalcarbon score api 
}

module.exports = AccountTableService;