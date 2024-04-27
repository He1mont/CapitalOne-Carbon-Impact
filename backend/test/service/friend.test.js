const { app, assert } = require('egg-mock/bootstrap');
const { PrismaClient } = require('@prisma/client');

describe('FriendService', () => {
  let ctx;
  const testAccountID = '12345';
  const testFriendID = '54321';

  before(async () => {
    ctx = app.mockContext(); // Create a mock context environment
    ctx.prisma = new PrismaClient(); // Set the Prisma instance
    await ctx.prisma.account.create({ // Create an account used for testing
      data: {
        accountID: testFriendID,
        username: 'TestW12345',
        email: 'test@outlook.com',
        colorMode: 0,
        currency: 'Test',
        firstName: 'Test',
        lastName: 'Test',
        phone: 'Test',
        address: 'Test',
        state: 'Test',
      },
    });
  });

  after(async () => {
    await ctx.prisma.account.delete({ // Delete the testing account
      where: { accountID: testFriendID },
    });
    ctx.prisma.$disconnect(); // Disconnect Prisma client after all tests are done
  });

  describe('addByID', () => {
    it('should add a following relationship by accountID and friendID', async () => {
      const addedFriend = await ctx.service.friend.addByID(testAccountID, testFriendID);
      // Assert whether the following relationship is added successfully
      assert(addedFriend);
      assert.equal(addedFriend.accountID, testAccountID);
      assert.equal(addedFriend.followingID, testFriendID);
    });

    it('should throw an error if the following relationship already exists', async () => {
      await assert.rejects(async () => {
        await ctx.service.friend.addByID(testAccountID, testFriendID);
      }, Error, 'You have already followed this account.');
    });
  });

  describe('getAll', () => {
    it('should retrieve all following users of an account', async () => {
      const userFriends = await ctx.service.friend.getAll(testAccountID);
      // Assert whether the user's friends are retrieved successfully
      assert(Array.isArray(userFriends));
      assert.equal(userFriends.length, 1);
      userFriends.forEach(friend => {
        assert.equal(friend.accountID, testFriendID);
      });
    });

    it('should return an empty array if no friends exist for the account', async () => {
      const testInvalidID = 'invalidID';
      const userFriends = await ctx.service.friend.getAll(testInvalidID);
      assert(Array.isArray(userFriends));
      assert.equal(userFriends.length, 0);
    });
  });

  describe('deleteFriend', () => {
    it('should delete a following relationship by accountID and friendID', async () => {
      await ctx.service.friend.deleteFriend(testAccountID, testFriendID);
      // No assertion needed for deletion
    });

    it('should throw an error if the following relationship does not exist', async () => {
      await assert.rejects(async () => {
        await ctx.service.friend.deleteFriend(testAccountID, testFriendID);
      }, Error);
    });
  });
});
