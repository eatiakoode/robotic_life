const express = require("express");
const router = express.Router();
const { getRecentRobots } = require("../../controller/frontend/robotFrntCtrl");

router.get("/recent", getRecentRobots);

module.exports = router;
