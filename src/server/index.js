const debug = require("debug")("robots:server");
const express = require("express");
const morgan = require("morgan");
const cors = require("cors");
const { notFoundError, generalError } = require("./middlewares/errors");
const robotsRouter = require("./routers/robotsRouter");

const app = express();

const risetheServer = (port) =>
  new Promise((resolve, reject) => {
    const server = app.listen(port, () => {
      debug(`Servidor pendiente en http://localhost:${port}`);
      resolve();
    });

    server.on("error", (error) => {
      const errorMessage = `No se puede levantar el servidor.${
        error.code === "EADDRINUSE" ? `Puerto ${port} ocupado` : ""
      }`;
      reject(new Error(errorMessage));
    });
  });

app.use(morgan("dev"));
app.use(express.json());

app.use(cors());
app.use("/robots", robotsRouter);

app.use(notFoundError);
app.use(generalError);

module.exports = risetheServer;
