const express = require("express");
const {
  getFAQsByRobotId,
  getAllFAQs
} = require("../../controller/faqCtrl");
const router = express.Router();

// Get FAQs for a specific robot
router.get("/robot/:robotId", getFAQsByRobotId);

// Get all FAQs
router.get("/list", getAllFAQs);

module.exports = router;
