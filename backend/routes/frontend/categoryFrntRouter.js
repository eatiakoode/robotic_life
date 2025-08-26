const express = require("express");
const router = express.Router();
const { getActiveParentCategories } = require("../../controller/frontend/categoryFrntCtrl");

router.get("/", getActiveParentCategories);

module.exports = router;
