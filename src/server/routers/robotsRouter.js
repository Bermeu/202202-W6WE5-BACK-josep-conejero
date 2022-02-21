const express = require("express");
const debug = require("debug")("robots:router");
const Robot = require("../../db/models/Robot");
const {
  getAllRobots,
  getRobot,
  createRobot,
  updateRobot,
  deleteRobot,
} = require("../controllers/robotControllers");

const robotsRouter = express.Router();

robotsRouter.get("/", getAllRobots);
robotsRouter.get("/:idRobot", getRobot);
robotsRouter.post("/new-robot", createRobot);
robotsRouter.put("/robot/:idRobot", updateRobot);
robotsRouter.delete("/robot/:idRobot", deleteRobot);

module.exports = robotsRouter;
