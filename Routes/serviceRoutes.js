const express = require("express");
const router = express.Router();
const { createdataplans, getuserscreatedataplans } = require("../Controllers/serviceController");

router.post("/createdataplans", createdataplans); 
router.get("/getuserscreatedataplans", getuserscreatedataplans)


module.exports = router;
