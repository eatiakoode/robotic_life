const express = require("express");
const {
  getAllEnquiries,
  updateEnquiry,
  deleteEnquiry,
  getEnquiryById,
} = require("../controller/enqCtrl.js");
const { authMiddleware, isAdmin } = require("../middlewares/authMiddleware");
const router = express.Router();

router.get("/", authMiddleware, isAdmin, getAllEnquiries);
router.put("/:id", authMiddleware, isAdmin, updateEnquiry);
router.delete("/:id", authMiddleware, isAdmin, deleteEnquiry);
router.get("/:id", authMiddleware, isAdmin, getEnquiryById);

module.exports = router;
