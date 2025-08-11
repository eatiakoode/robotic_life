const express = require("express");
const {
  createEnquiryBrochure,
  updateEnquiryBrochure,
  deleteEnquiryBrochure,
  getEnquiryBrochure,
  getallEnquiryBrochure,
} = require("../../controller/frontend/enqBrochureCtrl.js");
const { authMiddleware, isAdmin } = require("../../middlewares/authMiddleware");
const router = express.Router();

router.post("/", createEnquiryBrochure);
router.put("/:id", authMiddleware, isAdmin, updateEnquiryBrochure);
router.delete("/:id", authMiddleware, isAdmin, deleteEnquiryBrochure);
router.get("/:id", getEnquiryBrochure);
router.get("/", getallEnquiryBrochure);

module.exports = router;
