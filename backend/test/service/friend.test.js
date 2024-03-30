const express = require("express");
const request = require("supertest");
const FriendService = require("../../app/service/friend");

// Create an Express application
const app = express();

// Mock FriendService
jest.mock("../../app/service/friend");
const friendService = new FriendService();

// Define routes
app.use(express.json()); // Middleware to parse JSON bodies
app.post("/addFriend", async (req, res) => {
  const { accountID, friendID } = req.body;

  try {
    const result = await friendService.addByID(accountID, friendID);
    res.json(result);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
});

// Route for getting all friends
app.get("/getAllFriends/:id", async (req, res) => {
  const { id } = req.params;

  try {
    const result = await friendService.getAll(parseInt(id));
    res.json(result);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
});

// Route for deleting a friend
app.delete("/deleteFriend/:accountID/:friendID", async (req, res) => {
  const { accountID, friendID } = req.params;

  try {
    await friendService.deleteFriend(parseInt(accountID), parseInt(friendID));
    res.sendStatus(204);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
});
describe("FriendService", () => {
  describe("addByID", () => {
    it("should add a new friend by ID", async () => {
      // Mock the implementation of addByID to return a value
      friendService.addByID.mockResolvedValue({ accountID: 1, followingID: 2 });

      // Send a POST request to the /addFriend endpoint
      const response = await request(app)
        .post("/addFriend")
        .send({ accountID: 1, friendID: 2 });

      // Assert the response
      expect(response.statusCode).toBe(200);
      expect(response.body).toEqual({ accountID: 1, followingID: 2 });
    });

    it("should handle error when already following", async () => {
      // Mock the implementation of addByID to throw an error
      friendService.addByID.mockRejectedValue(
        new Error("You have already followed this account.")
      );

      // Send a POST request to the /addFriend endpoint
      const response = await request(app)
        .post("/addFriend")
        .send({ accountID: 1, friendID: 2 });

      // Assert the response
      expect(response.statusCode).toBe(400);
      expect(response.body).toEqual({
        error: "You have already followed this account.",
      });
    });
  });
  describe("getAll", () => {
    it("should get all friends for a given account ID", async () => {
      // Mock the implementation of getAll to return some dummy data
      friendService.getAll.mockResolvedValue([
        { name: "Friend 1" },
        { name: "Friend 2" },
      ]);

      // Send a GET request to the /getAllFriends endpoint
      const response = await request(app).get("/getAllFriends/1");

      // Assert the response
      expect(response.statusCode).toBe(200);
      expect(response.body).toEqual([
        { name: "Friend 1" },
        { name: "Friend 2" },
      ]);
    });
  });

  describe("deleteFriend", () => {
    it("should delete a friend by account ID and friend ID", async () => {
      // Mock the implementation of deleteFriend
      friendService.deleteFriend.mockResolvedValue();

      // Send a DELETE request to the /deleteFriend endpoint
      const response = await request(app).delete("/deleteFriend/1/2");

      // Assert the response
      expect(response.statusCode).toBe(204);
    });

    it("should handle error when deleting a friend", async () => {
      // Mock the implementation of deleteFriend to throw an error
      friendService.deleteFriend.mockRejectedValue(
        new Error("Failed to delete friend.")
      );

      // Send a DELETE request to the /deleteFriend endpoint
      const response = await request(app).delete("/deleteFriend/1/2");

      // Assert the response
      expect(response.statusCode).toBe(400);
      expect(response.body).toEqual({ error: "Failed to delete friend." });
    });
  });
});
