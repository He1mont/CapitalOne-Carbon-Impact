const Service = require('egg').Service;
// Load environment variables in the .env file
require('dotenv').config();
const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();

class FriendService extends Service {
  async addByUsername(id, username) {
    try {
<<<<<<< HEAD
      // Search username in the database
      const friend = await prisma.account.findUnique({
        where: { username },
        select: { accountID: true },
      });

      if (friend == null) {
        throw new Error(
          JSON.stringify({
            errorCode: 131,
            message: "Can't find this friend: " + username,
          })
        );
      }
      if (friend.accountID == id) {
=======
        // Search username in the database
        const friend = await prisma.account.findUnique({
          where: { username: username },
        });
        
        if (friend == null) {
          throw new Error(
            JSON.stringify({
              errorCode: 131,
              message: "Can't find this friend: " + username,
            })
          );
        }
        if (friend.accountID == id) {
>>>>>>> 195a6827067ccf3dae71b57b318c349287565cc7
        throw new Error(
          JSON.stringify({
            errorCode: 132,
            message: "Can't add yourself as friends.",
          })
        );
      }
<<<<<<< HEAD

      // Check the friendship relation
=======
  
      // Check the following relation
>>>>>>> 195a6827067ccf3dae71b57b318c349287565cc7
      const ifFollowing = await prisma.following.findUnique({
        where: {
          Unique_accountID_followingID: {
            accountID: id,
            followingID: friend.accountID,
          },
        },
      });

      if (ifFollowing) {
        throw new Error(
          JSON.stringify({
            errorCode: 133,
            message: 'This user is already your friend.',
          })
        );
      }

      // Store the following relation into database
      await prisma.following.create({
        data: {
          accountID: id,
          followingID: friend.accountID,
        },
      });

      // Return information of following user's
      return friend;

    } catch (error) {
      throw new Error(error.response ? error.response.data : error.message);
    }
  }

  // then call the calculate totalcarbon score api
  async getAll(id) {
    const allfollowings = await prisma.following.findMany({
      where: { accountID: id },
      include: { account: true }
    });
    return allfollowings.map(item => item.account)
  }

  async deleteFriend(id, username) {
    try {
      // Search username in the database
      const friend = await prisma.account.findUnique({
<<<<<<< HEAD
        where: { username },
        select: { accountID: true },
=======
        where: { username: username },
>>>>>>> 195a6827067ccf3dae71b57b318c349287565cc7
      });

      if (friend == null) {
        throw new Error(
          JSON.stringify({
            errorCode: 131,
            message: "Can't find this friend: " + username,
          })
        );
      }

      await prisma.following.delete({
        where: {
          Unique_accountID_followingID: {
            accountID: id,
            followingID: friend.accountID,
          },
        },
      });
    } catch (error) {
      throw new Error(error.response ? error.response.data : error.message);
    }
  }
}

module.exports = FriendService;
