const express = require("express");
const router = express.Router();
const {
  createOperatingEnvironment,
  getAllOperatingEnvironments,
  getOperatingEnvironment,
  updateOperatingEnvironment,
  deleteOperatingEnvironment
} = require("../controller/operatingEnvironmentCtrl");
const { authMiddleware, isAdmin } = require("../middlewares/authMiddleware");

router.post("/",authMiddleware, isAdmin, createOperatingEnvironment);
router.get("/",authMiddleware, isAdmin, getAllOperatingEnvironments);
router.get("/:id",authMiddleware, isAdmin, getOperatingEnvironment);
router.put("/:id",authMiddleware, isAdmin, updateOperatingEnvironment);
router.delete("/:id",authMiddleware, isAdmin, deleteOperatingEnvironment);

module.exports = router;
