const express = require("express")
const { userWelcome } = require("../Controllers/user.controllers")
const router = express.Router()

router.get("/user", userWelcome);


module.exports = router