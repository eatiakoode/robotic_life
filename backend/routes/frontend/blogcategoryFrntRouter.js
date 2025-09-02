const express = require("express");
const { getActiveBlogCategories } = require("../../controller/frontend/blogcategoryFrntCtrl");
const router = express.Router();

// Get all active blog categories
router.get("/", getActiveBlogCategories);

module.exports = router;
