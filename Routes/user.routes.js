const express = require("express")
const { userWelcome, userRegister } = require("../Controllers/user.controllers")
const router = express.Router()

router.get("/user", userWelcome);
router.post("/register", userRegister)

module.exports = router