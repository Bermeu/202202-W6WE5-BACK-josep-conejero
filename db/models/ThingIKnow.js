const { model, Schema } = require("mongoose");

const ThingIKnowSchema = new Schema({
  thing: {
    type: String,
    required: true,
  },
});

const ThingIKnow = model("ThingIKnow", ThingIKnowSchema, "thingsIKnow");

module.exports = ThingIKnow;
