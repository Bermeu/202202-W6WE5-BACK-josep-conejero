const express = require("express");
const ThingIKnow = require("../../db/models/ThingIKnow");

const router = express.Router();

router.get("/things", async (req, res) => {
  const thingsIKnow = await ThingIKnow.find();
  res.json({ thingsIKnow });
});

router.post("/things", async (req, res) => {
  const newThingIKnow = req.body;
  const createdThingIKnow = await ThingIKnow.create(newThingIKnow);
  res.status(201);
  res.json(createdThingIKnow);
});

module.exports = router;
