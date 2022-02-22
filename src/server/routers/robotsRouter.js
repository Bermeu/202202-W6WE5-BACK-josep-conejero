const express = require("express");
const verifyToken = require("../middlewares/verifyToken");

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
robotsRouter.post("/new-robot", verifyToken, createRobot);
robotsRouter.put("/robot/:idRobot", verifyToken, updateRobot);
robotsRouter.delete("/robot/:idRobot", verifyToken, deleteRobot);

module.exports = robotsRouter;
