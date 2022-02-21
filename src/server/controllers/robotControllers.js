const bcrypt = require("bcrypt");
const jsonwebtoken = require("jsonwebtoken");
const Robot = require("../../db/models/Robot");
const User = require("../../db/models/User");

const getAllRobots = async (req, res) => {
  const robots = await Robot.find();
  res.json({ robots });
};

const getRobot = async (req, res, next) => {
  const { idRobot } = req.params;
  try {
    const robot = await Robot.findById(idRobot);
    if (robot) {
      res.json(robot);
    } else {
      const error = new Error("No se ha encontrado el robot");
      error.code = 404;
      next(error);
    }
  } catch (error) {
    error.code = 400;
    next(error);
  }
};

const createRobot = async (req, res, next) => {
  try {
    const robot = req.body;
    const newRobot = await Robot.create(robot);
    res.status(201).json(newRobot);
  } catch (error) {
    next(error);
  }
};

const deleteRobot = async (req, res, next) => {
  const { idRobot } = req.params;
  try {
    const robot = await Robot.findByIdAndDelete(idRobot);
    if (robot) {
      res.json(idRobot);
    } else {
      const error = new Error("Robot no encontrado");
      error.code = 404;
      next(error);
    }
  } catch (error) {
    error.code = 400;
    next(error);
  }
};

const updateRobot = async (req, res, next) => {
  const { idRobot } = req.params;
  try {
    const robot = req.body;
    const updatedRobot = await Robot.findByIdAndUpdate(idRobot, robot);
    res.status(200).json(updatedRobot);
  } catch (error) {
    next(error);
  }
};

const getToken = async (req, res, next) => {
  const { username, password } = req.body;

  const user = await User.findOne({ username });

  if (!user) {
    const error = new Error("Usuario incorrecto");
    error.code = 404;
    next(error);
  } else {
    const userData = {
      username: user.name,
      id: user.id,
    };
    const rightPassword = await bcrypt.compare(password, user.password);
    if (!rightPassword) {
      const error = new Error("Contraseña incorrecta");
      error.code = 404;
      next(error);
    } else {
      const token = jsonwebtoken.sign(userData, process.env.SECRET);
      res.json({ token });
    }
  }
};

module.exports = {
  getAllRobots,
  getRobot,
  createRobot,
  deleteRobot,
  updateRobot,
  getToken,
};
