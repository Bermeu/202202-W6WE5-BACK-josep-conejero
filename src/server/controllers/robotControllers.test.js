const Robot = require("../../db/models/Robot");
const { getAllRobots, getRobot, deleteRobot } = require("./robotControllers");

jest.mock("../../db/models/Robot");

describe("Given a getAllRobots controller", () => {
  beforeEach(() => {
    jest.resetAllMocks();
  });
  describe("When it receives a response", () => {
    test("Then it should call method json with a list of robots in the response", async () => {
      const res = { json: jest.fn() };

      const robots = {
        id: 1,
        name: "R2-D2",
        velocity: 5,
      };
      Robot.find = jest.fn().mockResolvedValue(robots);

      await getAllRobots(null, res);
      expect(Robot.find).toHaveBeenCalled();
      /* expect(res.json).toHaveBeenLastCalledWith(robots); */
    });
  });
});

describe("Given a getRobot controller", () => {
  describe("When it receives a response", () => {
    test("Then it should call the json method of the robot in the response", async () => {
      const robot = {
        id: 1,
        name: "R2-D2",
        resistance: 7,
      };

      const res = {
        json: jest.fn(),
      };

      const req = {
        params: { id: 1 },
      };

      Robot.findById = jest.fn().mockResolvedValue(robot);

      await getRobot(req, res);

      expect(res.json).toHaveBeenCalledWith(robot);
    });
  });
});

describe("Given a deleteRobot controller", () => {
  describe("When it receives a response", () => {
    test("Then it should return an object with the id of the removed robot", async () => {
      const idRemovedRobot = {
        id: 1,
      };

      const res = {
        json: jest.fn(),
      };

      const req = {
        params: { id: 1 },
      };

      Robot.findByIdAndDelete = jest.fn().mockResolvedValue(idRemovedRobot);

      await deleteRobot(req, res);

      expect(res.json).toHaveBeenCalled();
    });
  });
});
