const Service = require('egg').Service;
// Load environment variables in the .env file
require('dotenv').config();
const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();

class FriendService extends Service {

    async createUsername(id) {  
        // Check duplication
        const isExisted = await prisma.friends.findUnique({
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
            // Extract account from Accounts array
            const account = accountData.Accounts[0];
            const userName = account.firstname + account.lastname + '_' + id;

            // Store the username into database
            const createdFriend = await prisma.friends.create({
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

    async getID(username) {
        // Search in the database
        const friend = await prisma.friends.findUnique({
            where: { username: username },
            select: { accountID: true },
        });
        
        if (!friend) {
          throw new Error(
            JSON.stringify({
              errorCode: 132,
              message: "Can't find this friend.",
            })
          );
        }
    
        return friend;
    }
}

module.exports = FriendService;