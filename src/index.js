require("dotenv").config();
const debug = require("debug")("robots:root");
const connectToDataBase = require("./db/index");
const risetheServer = require("./server/index");

const port = process.env.PORT || 4000;
const mongoConnection = process.env.MONGO_STRING_PRODUCTION;

(async () => {
  try {
    await connectToDataBase(mongoConnection);
    await risetheServer(port);
  } catch (error) {
    debug(`Error: ${error.message}`);
  }
})();
