const express = require("express");
const {
  createEnquiryBrochure,
  updateEnquiryBrochure,
  deleteEnquiryBrochure,
  getEnquiryBrochure,
  getallEnquiryBrochure,
} = require("../controller/enqBrochureCtrl.js");
const { authMiddleware, isAdmin } = require("../middlewares/authMiddleware.js");
const router = express.Router();

router.post("/", authMiddleware, isAdmin, createEnquiryBrochure);
router.put("/:id", authMiddleware, isAdmin, updateEnquiryBrochure);
router.delete("/:id", authMiddleware, isAdmin, deleteEnquiryBrochure);
router.get("/:id", getEnquiryBrochure);
router.get("/", getallEnquiryBrochure);

module.exports = router;
