const express = require("express");
const {
  createRobot,
  getRobots,
  getRobotById,
  updateRobot,
  deleteRobot
} = require("../controller/robotCtrl");
const { authMiddleware, isAdmin } = require("../middlewares/authMiddleware");
const { uploadPhoto } = require("../middlewares/uploadImage");
const router = express.Router();

router.post("/", authMiddleware, isAdmin, uploadPhoto.array("images", 10), createRobot);
router.get("/", authMiddleware, isAdmin, getRobots);
router.get("/:id", authMiddleware, isAdmin, getRobotById);
router.put("/:id", authMiddleware, isAdmin, uploadPhoto.array("images", 10), updateRobot);
router.delete("/:id", authMiddleware, isAdmin, deleteRobot);

module.exports = router;
