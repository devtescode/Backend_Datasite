const express = require("express");
const router = express.Router();
const { createdataplans, getuserscreatedataplans, userbuydata } = require("../Controllers/serviceController");

router.post("/createdataplans", createdataplans); 
router.get("/getuserscreatedataplans", getuserscreatedataplans)
router.post("/userbuydata", userbuydata)

module.exports = router;
