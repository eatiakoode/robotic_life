const express = require("express");
const router = express.Router();
const { getActiveParentCategories, getFilteredRobotsByParentCategory } = require("../../controller/frontend/categoryFrntCtrl");

router.get("/", getActiveParentCategories);
router.get("/filter/:parentSlug", getFilteredRobotsByParentCategory);

module.exports = router;
