const express = require("express");
const {
  createEnquiryLanding,
  updateEnquiryLanding,
  deleteEnquiryLanding,
  getEnquiryLanding,
  getallEnquiryLanding,
} = require("../../controller/frontend/enqLandingCtrl");
const { authMiddleware, isAdmin } = require("../../middlewares/authMiddleware");
const router = express.Router();

router.post("/", createEnquiryLanding);
router.put("/:id", authMiddleware, isAdmin, updateEnquiryLanding);
router.delete("/:id", authMiddleware, isAdmin, deleteEnquiryLanding);
router.get("/:id", getEnquiryLanding);
router.get("/", getallEnquiryLanding);

module.exports = router;
