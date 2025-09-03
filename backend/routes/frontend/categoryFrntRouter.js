const express = require("express");
const router = express.Router();
const { getActiveParentCategories, getFilteredRobotsByParentCategory, getRobotsByCategorySlug } = require("../../controller/frontend/categoryFrntCtrl");

router.get("/", getActiveParentCategories);
router.get("/filter/:parentSlug", getFilteredRobotsByParentCategory);
router.get("/:slug", getRobotsByCategorySlug);

module.exports = router;
