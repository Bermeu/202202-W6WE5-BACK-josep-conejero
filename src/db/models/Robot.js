const { model, Schema } = require("mongoose");

const RobotSchema = new Schema({
  robot: {
    type: String,
    required: true,
  },
});

const Robot = model("Robot", RobotSchema, "robots");

module.exports = Robot;
