require("dotenv").config();
const express = require("express");
const { getToken } = require("../controllers/robotControllers");

const router = express.Router();

router.post("/", getToken);

module.exports = router;
