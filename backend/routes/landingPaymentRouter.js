const express = require("express");
const { uploadPhoto ,photoUploadMiddleware1} = require("../middlewares/uploadImage");
const {
  createLandingpayment,
  updateLandingpayment,
  deleteLandingpayment,
  getLandingpayment,
  getallLandingpayment,
} = require("../controller/landingpaymentCtrl");
const { authMiddleware, isAdmin } = require("../middlewares/authMiddleware.js");
const router = express.Router();

router.post("/", authMiddleware,  isAdmin, photoUploadMiddleware1,createLandingpayment);
router.put("/:id", authMiddleware, isAdmin, updateLandingpayment);
router.delete("/:id", authMiddleware, isAdmin, deleteLandingpayment);
router.get("/:id", getLandingpayment);
router.get("/", getallLandingpayment);

module.exports = router;
