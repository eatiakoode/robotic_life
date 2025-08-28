const express = require("express");
const router = express.Router();
const {
    createAutonomyLevel,
    getAllAutonomyLevels,
    getAutonomyLevel,
    updateAutonomyLevel,
    deleteAutonomyLevel
} = require("../controller/autonomyLevelCtrl");
const { authMiddleware, isAdmin } = require("../middlewares/authMiddleware");

router.post("/", authMiddleware, isAdmin, createAutonomyLevel);
router.get("/", authMiddleware, isAdmin, getAllAutonomyLevels);
router.get("/:id", authMiddleware, isAdmin, getAutonomyLevel);
router.put("/:id", authMiddleware, isAdmin, updateAutonomyLevel);
router.delete("/:id", authMiddleware, isAdmin, deleteAutonomyLevel);

module.exports = router;
