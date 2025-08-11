const express = require("express");
const {
  createEnquiryProperty,
  updateEnquiryProperty,
  deleteEnquiryProperty,
  getEnquiryProperty,
  getallEnquiryProperty,
} = require("../controller/enqCtrlProperty.js");
const { authMiddleware, isAdmin } = require("../middlewares/authMiddleware");
const router = express.Router();

router.post("/", createEnquiryProperty);
router.put("/:id", authMiddleware, isAdmin, updateEnquiryProperty);
router.delete("/:id", authMiddleware, isAdmin, deleteEnquiryProperty);
router.get("/:id", getEnquiryProperty);
router.get("/", getallEnquiryProperty);

module.exports = router;
