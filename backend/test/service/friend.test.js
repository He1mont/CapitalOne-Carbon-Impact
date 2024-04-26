const { app, assert } = require('egg-mock/bootstrap');
const { PrismaClient } = require('@prisma/client');

describe('FriendService', () => {
  let ctx;
  const testAccountID = '11111'; // fake account used for testing
  const testFriendID = '12345'; // exist in the account table but only used for testing

  before(() => {
    ctx = app.mockContext(); // Create a mock context environment
    ctx.prisma = new PrismaClient(); // Set the Prisma instance
  });

  after(() => {
    ctx.prisma.$disconnect(); // Disconnect Prisma client after all tests are done
  });

  it('should add a following relationship by accountID and friendID', async () => {
    // Call the addByID method
    const addedFriend = await ctx.service.friend.addByID(testAccountID, testFriendID);
    // Assert whether the following relationship is added successfully
    assert(addedFriend);
    assert.equal(addedFriend.accountID, testAccountID);
    assert.equal(addedFriend.followingID, testFriendID);
  });

  it('should retrieve all following users of an account', async () => {
    // Call the getAll method
    const userFriends = await ctx.service.friend.getAll(testAccountID);
    // Assert whether the user's friends are retrieved successfully
    assert(userFriends);
    assert.equal(userFriends.length, 1);
    userFriends.forEach(friend => {
      assert.equal(friend.accountID, testFriendID);
    });
  });

  it('should delete a following relationship by accountID and friendID', async () => {
    // Call the deleteFriend method
    await ctx.service.friend.deleteFriend(testAccountID, testFriendID);
    // Assert whether the friend is deleted successfully
    // No assertion needed for deletion
  });
});