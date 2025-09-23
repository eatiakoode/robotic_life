const express = require("express");
const router = express.Router();
const {
  getFAQsByRobotId,
  getAllFAQs,
  createFAQ,
  updateFAQ,
  deleteFAQ
} = require("../controller/faqCtrl");

// Get FAQs for a specific robot
router.get("/robot/:robotId", getFAQsByRobotId);

// Get all FAQs
router.get("/", getAllFAQs);

// Create a new FAQ
router.post("/", createFAQ);

// Update FAQ
router.put("/:id", updateFAQ);

// Delete FAQ
router.delete("/:id", deleteFAQ);

module.exports = router;