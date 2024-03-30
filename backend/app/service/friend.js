const Service = require('egg').Service;
// Load environment variables in the .env file
require('dotenv').config();
const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();

class FriendService extends Service {

  async addByID(accountID, friendID) {
    try {
      // Check the following relation
      const following = await prisma.following.findUnique({
        where: {
          Unique_accountID_followingID: {
            accountID,
            followingID: friendID,
          },
        },
      });

      if (following) {
        throw new Error(
          JSON.stringify({
            errorCode: 400,
            message: 'You have already followed this account.',
          })
        );
      }

      // Store the following relation into database
      const followingRelation = await prisma.following.create({
        data: {
          accountID,
          followingID: friendID,
        },
      });

      // Return information of following user's
      return followingRelation;

    } catch (error) {
      throw new Error(error.response ? error.response.data : error.message);
    }
  }

  // then call the calculate totalcarbon score api
  async getAll(id) {
    const allfollowings = await prisma.following.findMany({
      where: { accountID: id },
      include: { account: true },
    });
    return allfollowings.map(item => item.account);
  }

  async deleteFriend(accountID, friendID) {
    try {
      await prisma.following.delete({
        where: {
          Unique_accountID_followingID: {
            accountID,
            followingID: friendID,
          },
        },
      });
    } catch (error) {
      throw new Error(error.response ? error.response.data : error.message);
    }
  }
}

module.exports = FriendService;
