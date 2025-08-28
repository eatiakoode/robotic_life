const express = require("express");
const {
    createPowerSource,
    getAllPowerSources,
    getPowerSourceById,
    updatePowerSource,
    deletePowerSource
} = require("../controller/powerSourceCtrl");
const { authMiddleware, isAdmin } = require("../middlewares/authMiddleware");

const router = express.Router();

router.get("/", authMiddleware, isAdmin, getAllPowerSources);
router.get("/:id", authMiddleware, isAdmin, getPowerSourceById);
router.post("/", authMiddleware, isAdmin, createPowerSource);
router.put("/:id", authMiddleware, isAdmin, updatePowerSource);
router.delete("/:id", authMiddleware, isAdmin, deletePowerSource);

module.exports = router;
