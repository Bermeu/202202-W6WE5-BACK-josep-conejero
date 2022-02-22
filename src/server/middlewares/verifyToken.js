require("dotenv").config();

const jsonwebtoken = require("jsonwebtoken");

const verifyToken = async (req, res, next) => {
  const headerAuth = req.header("Authorization");

  const tokenId = headerAuth.split("_")[1];

  if (typeof tokenId !== "undefined") {
    const validatedUser = await jsonwebtoken.verify(
      tokenId,
      process.env.SECRET
    );
    if (!validatedUser) {
      const newError = new Error("Usuario no válido");
      next(newError);
      return;
    }
    next();
  } else {
    res.sendStatus(403);
  }
};

module.exports = verifyToken;
