const express = require("express");
const router = express.Router();
const {
    createTerrainCapability,
    getAllTerrainCapabilities,
    getTerrainCapability,
    updateTerrainCapability,
    deleteTerrainCapability
} = require("../controller/terrainCapabilityCtrl");
const { authMiddleware, isAdmin } = require("../middlewares/authMiddleware");

router.post("/", authMiddleware, isAdmin, createTerrainCapability);
router.get("/", authMiddleware, isAdmin, getAllTerrainCapabilities);
router.get("/:id", authMiddleware, isAdmin, getTerrainCapability);
router.put("/:id", authMiddleware, isAdmin, updateTerrainCapability);
router.delete("/:id", authMiddleware, isAdmin, deleteTerrainCapability);

module.exports = router;
