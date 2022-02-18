const debug = require("debug")("things:db");
const mongoose = require("mongoose");

const connectToDataBase = (connectionString) =>
  new Promise((resolve, reject) => {
    mongoose.connect(connectionString, (error) => {
      if (error) {
        reject(
          new Error(`No se puede conectar a la base de datos: ${error.message}`)
        );
        return;
      }
      debug("Se ha conectado a la base de datos");
      resolve();
    });
  });

module.exports = connectToDataBase;
