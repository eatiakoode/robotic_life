const express = require("express");
const {
  createEnquirySubscribe,
  updateEnquirySubscribe,
  deleteEnquirySubscribe,
  getEnquirySubscribe,
  getallEnquirySubscribe,
} = require("../../controller/frontend/enqSubscribeCtrl");
const { authMiddleware, isAdmin } = require("../../middlewares/authMiddleware");
const router = express.Router();

router.post("/", createEnquirySubscribe);
router.put("/:id", authMiddleware, isAdmin, updateEnquirySubscribe);
router.delete("/:id", authMiddleware, isAdmin, deleteEnquirySubscribe);
router.get("/:id", getEnquirySubscribe);
router.get("/", getallEnquirySubscribe);

module.exports = router;
