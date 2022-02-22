const request = require("supertest");
const { MongoMemoryServer } = require("mongodb-memory-server");
const mongoose = require("mongoose");
const app = require("../index");
const Robot = require("../../db/models/Robot");
const connectRoboMongo = require("../../db");

let mongoServer;
beforeAll(async () => {
  mongoServer = await MongoMemoryServer.create();
  const connectionString = mongoServer.getUri();
  await connectRoboMongo(connectionString);
});

beforeEach(async () => {
  Robot.create({ roboName: "Robocop" });
  Robot.create({ roboName: "HAL 9000" });
});

afterEach(async () => {
  await Robot.deleteMany({});
});
afterAll(async () => {
  await mongoose.connection.close();
  await mongoServer.stop();
});

describe("given a endpoint /robots/", () => {
  describe("when it get the correct token", () => {
    test("then it should response with status 200 and have 2 robots", async () => {
      const { body } = await request(app)
        .get("/robots")
        .set(
          "Authorization",
          "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJuYW1lIjoia2V2aW4iLCJpZCI6IjYyMTNmM2QwYjcxZTBhOWI5NDQ4NGFjOSIsImlhdCI6MTY0NTU1MzQxMCwiZXhwIjoxNjQ1NzI2MjEwfQ.nXP5wKwweoZfGAuVhLAL658Ws34LQcqYKDXPPkYpUkw"
        )
        .expect(200);
      expect(body).toHaveProperty("robots");
      expect(body.robots).toHaveLength(2);
    });
  });

  describe("when it get an empty token", () => {
    test("then it should response with status 401 and error message Token missing", async () => {
      const errorMessage = "Token missing";

      const { body } = await request(app)
        .get("/robots")
        .set("Authorization", "")
        .expect(401);
      expect(body.message).toBe(errorMessage);
    });
  });

  describe("when it get wrong token", () => {
    test("then it should response with status 401 and error message jwt malformed", async () => {
      const errorMessage = "jwt malformed";

      const { body } = await request(app)
        .get("/robots")
        .set("Authorization", "pepe")
        .expect(401);
      expect(body.message).toBe(errorMessage);
    });
  });
});
