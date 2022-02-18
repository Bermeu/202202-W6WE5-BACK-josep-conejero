const { model, Schema } = require("mongoose");

const RobotSchema = new Schema({
  name: {
    type: String,
    required: true,
  },
  picture: String,
  velocity: Number,
  resistance: Number,
  creationDate: Date,
});

const Robot = model("Robot", RobotSchema, "robots");

module.exports = Robot;
