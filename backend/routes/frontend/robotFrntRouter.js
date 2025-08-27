const express = require("express");
const router = express.Router();
const { getRecentRobots, getallRobots, filterRobots } = require("../../controller/frontend/robotFrntCtrl");

router.get("/recent", getRecentRobots);
router.get("/all", getallRobots);
router.get("/filter", filterRobots);
module.exports = router;
