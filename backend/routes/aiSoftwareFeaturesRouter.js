const express = require("express");
const router = express.Router();
const {
  createAiSoftwareFeature,
  getAllAiSoftwareFeatures,
  getAiSoftwareFeature,
  updateAiSoftwareFeature,
  deleteAiSoftwareFeature
} = require("../controller/aiSoftwareFeaturesCtrl");
const { authMiddleware, isAdmin } = require("../middlewares/authMiddleware");

router.post("/", authMiddleware, isAdmin, createAiSoftwareFeature);
router.get("/", authMiddleware, isAdmin, getAllAiSoftwareFeatures);
router.get("/:id", authMiddleware, isAdmin, getAiSoftwareFeature);
router.put("/:id", authMiddleware, isAdmin, updateAiSoftwareFeature);
router.delete("/:id", authMiddleware, isAdmin, deleteAiSoftwareFeature);

module.exports = router;
