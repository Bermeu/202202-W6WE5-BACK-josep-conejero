const debug = require("debug")("calculator:server:middlewares:errors");

const notFoundError = (req, res) => {
  res.status(404);
  res.json({ error: "No se ha encontrado" });
};

// eslint-disable-next-line no-unused-vars
const generalError = (err, req, res, next) => {
  debug("Se ha producido un error");
  res.status(500);
  res.json({ error: "Se ha producido un error" });
};

module.exports = {
  notFoundError,
  generalError,
};
