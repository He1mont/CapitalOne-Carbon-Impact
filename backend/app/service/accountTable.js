const Service = require('egg').Service;
// Load environment variables in the .env file
require('dotenv').config();
const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();

class AccountTableService extends Service {

    //should create username when the user logs in 
    // only if doesn't have a username previously
    async createUsername(id) {  
        // Check duplication
        const isExisted = await prisma.account.findUnique({
            where: {
                accountID: id,
            },
        }).then((res) => !!res);

        if (isExisted) {
            throw new Error(
                JSON.stringify({
                    errorCode: 130,
                    message: "This user has already have a username.",
                })
            );
        }

        try {
            // Create username
            // Get the specified account by calling getByID
            const accountData = await this.service.account.getByID(id);
            const randomNumber =Math.random()*10;
            // Extract account from Accounts array
            const account = accountData.Accounts[0];
            const userName = account.firstname + account.lastname[0] + randomNumber;

            // Store the username into database
            const createdFriend = await prisma.account.create({
                data: {
                username: userName,
                accountID: id,
                },
            });
            return createdFriend;

        } catch (error) {
            error.message = "Error when creating the username.";
            throw new Error(error.response ? error.response.data : error.message);
        }
    }
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