const express = require("express")
const { userWelcome, userRegister, userLogin, dashboard } = require("../Controllers/user.controllers")
const router = express.Router()

router.get("/user", userWelcome);
router.post("/register", userRegister)
router.post("/login", userLogin)
router.get("/dashboard", dashboard)

module.exports = router