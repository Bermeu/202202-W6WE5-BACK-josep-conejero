const express = require("express");
const Robot = require("../../db/models/Robot");

const robotsRouter = express.Router();

robotsRouter.get("/robots", async (req, res) => {
  const robots = await Robot.find();
  res.json({ robots });
});

robotsRouter.post("/robots", async (req, res) => {
  const newRobot = req.body;
  const createdRobot = await Robot.create(newRobot);
  res.status(201);
  res.json(createdRobot);
});

module.exports = robotsRouter;
