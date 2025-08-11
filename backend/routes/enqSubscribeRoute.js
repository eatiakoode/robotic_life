const express = require("express");
const {
  createEnquirySubscribe,
  updateEnquirySubscribe,
  deleteEnquirySubscribe,
  getEnquirySubscribe,
  getallEnquirySubscribe,
} = require("../controller/enqSubscribeCtrl.js");
const { authMiddleware, isAdmin } = require("../middlewares/authMiddleware");
const router = express.Router();

router.post("/", authMiddleware, isAdmin, createEnquirySubscribe);
router.put("/:id", authMiddleware, isAdmin, updateEnquirySubscribe);
router.delete("/:id", authMiddleware, isAdmin, deleteEnquirySubscribe);
router.get("/:id", getEnquirySubscribe);
router.get("/", getallEnquirySubscribe);

module.exports = router;
