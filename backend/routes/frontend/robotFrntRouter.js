const express = require("express");
const router = express.Router();
const { getRecentRobots, getallRobots } = require("../../controller/frontend/robotFrntCtrl");

router.get("/recent", getRecentRobots);
router.get("/all", getallRobots);

module.exports = router;
