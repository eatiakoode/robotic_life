const express = require("express");
const {
  createRobot,
  getRobots,
  getRobotById,
  updateRobot,
  deleteRobot
} = require("../controller/robotCtrl");
const { authMiddleware, isAdmin } = require("../middlewares/authMiddleware");

const router = express.Router();

router.post("/", authMiddleware, isAdmin, createRobot);
router.get("/", authMiddleware, isAdmin, getRobots);
router.get("/:id", authMiddleware, isAdmin, getRobotById);
router.put("/:id", authMiddleware, isAdmin, updateRobot);
router.delete("/:id", authMiddleware, isAdmin, deleteRobot);

module.exports = router;
