const express = require("express")
const { userWelcome, userRegister, userLogin } = require("../Controllers/user.controllers")
const router = express.Router()

router.get("/user", userWelcome);
router.post("/register", userRegister)
router.post("/login", userLogin)
module.exports = router