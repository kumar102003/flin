const express = require("express");
const router = express.Router();
const { signup, login } = require("../controller/User.controller");

// User signup route
router.post("/signup", signup);

// User login route
router.post("/login", login);

module.exports = router;
