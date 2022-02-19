const express = require("express");
const debug = require("debug")("robots:router");
const Robot = require("../../db/models/Robot");
const { getAllRobots, getRobot } = require("../controllers/robotControllers");

const robotsRouter = express.Router();

robotsRouter.get("/", getAllRobots);

robotsRouter.get("/:idRobot", getRobot);

robotsRouter.post("/robots", async (req, res) => {
  const newRobot = req.body;
  const createdRobot = await Robot.create(newRobot);
  res.status(201);
  res.json(createdRobot);
});

module.exports = robotsRouter;
