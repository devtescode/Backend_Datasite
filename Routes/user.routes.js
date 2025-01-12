const express = require("express")
const { userWelcome, userRegister, userLogin, dashboard, adminlogin } = require("../Controllers/user.controllers")
const router = express.Router()

router.get("/user", userWelcome);
router.post("/register", userRegister)
router.post("/login", userLogin)
router.get("/dashboard", dashboard)
router.post("/adminlogin", adminlogin)

module.exports = router