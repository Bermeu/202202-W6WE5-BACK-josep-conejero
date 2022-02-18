const express = require("express");
const ThingIKnow = require("../../db/models/ThingIKnow");

const router = express.Router();

router.get("/robots", async (req, res) => {
  const robots = await Robot.find();
  res.json({ robots });
});

router.post("/robots", async (req, res) => {
  const newRobot = req.body;
  const createdRobot = await Robot.create(newRobot);
  res.status(201);
  res.json(createdRobot);
});

module.exports = router;
