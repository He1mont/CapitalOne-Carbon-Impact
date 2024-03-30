const { assert } = require('egg-mock/bootstrap');
// const axios = require('axios');
// const sinon = require('sinon');

// Import the Friend js in Service
const FriendService = require('../../app/service/friend');

describe('FriendService', () => {
  describe('add By ID', () => {
    it('should add a new friend by ID', async () => {
      // const ctx = app.mockContext();

      const prisma = {
        following: {
          findUnique: async () => null, // Simulating that the relation does not exist yet
          create: async () => ({}), // Simulating successful creation of the relation
        },
      };
      const friendService = new FriendService(prisma);

      // Create a mock context with the service injected
      const ctx = {
        service: {
          friend: friendService,
        },
      };
      const accountID = '1';
      const friendID = '2';
      // Mock the behavior of Prisma methods
      // prisma.following.findUnique.mockResolvedValue(null); // Simulating that the relation does not exist yet
      // prisma.following.create.mockResolvedValue({}); // Simulating successful creation of the relation

      const friendsData = await ctx.service.friend.addByID(accountID, friendID);
      assert.strictEqual(friendsData, null);
      // Verify that the Prisma methods were called with the correct parameters
      expect(prisma.following.findUnique).toHaveBeenCalledWith({
        where: {
          Unique_accountID_followingID: {
            accountID,
            followingID: friendID,
          },
        },
      });
      expect(prisma.following.create).toHaveBeenCalledWith({
        data: {
          accountID,
          followingID: friendID,
        },
      });


    });
  });

  // describe('addByID', () => {
  //   it('should add a new friend by ID', async () => {
  //     const ctx = app.mockContext();
  //     const friendService = ctx.service.friend;
  //     const accountID = 1;
  //     const friendID = 2;
  //     sinon.stub(ctx.service.friend.prisma.following, 'findUnique').resolves(undefined);
  //     sinon.stub(ctx.service.friend.prisma.following, 'create').resolves({ accountID, followingID: friendID });

  //     // Act
  //     const result = await friendService.addByID(accountID, friendID);

  //     // Assert
  //     assert.deepStrictEqual(result, { accountID, followingID: friendID });

  //     // Clean up
  //     ctx.service.friend.prisma.following.findUnique.restore();
  //     ctx.service.friend.prisma.following.create.restore();


  //   });


  //   it('should throw an error if the friend is already followed', async () => {
  //    
  //   });

  //   it('should throw an error if an exception occurs during addition', async () => {
  //    
  //   });
  // });

  describe('getAll function', () => {

    it('should return all friends of a given ID', async () => {

    });
   
  });

  it('should return an empty array if no friends exist', async () => {
   
  });
});

describe('deleteFriend', () => {
  it('should delete a friend by ID', async () => {
   
  });

  it('should throw an error if an exception occurs during deletion', async () => {
   
  });
  // });
});
