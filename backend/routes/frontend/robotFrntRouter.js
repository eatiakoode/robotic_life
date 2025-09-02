const express = require("express");
const router = express.Router();
const { getRecentRobots, getallRobots, getRobotBySlug, filterRobots, getRecentlyViewed } = require("../../controller/frontend/robotFrntCtrl");

router.get("/recent", getRecentRobots);
router.get("/all", getallRobots);
router.get("/slug/:slug", getRobotBySlug);
router.get("/filter", filterRobots);
router.post("/recentlyviewed", getRecentlyViewed);

module.exports = router;
