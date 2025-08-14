const express = require("express");
const router = express.Router();
const {
    createSensor,
    getAllSensors,
    getSensor,
    updateSensor,
    deleteSensor
} = require("../controller/sensorCtrl");
const { authMiddleware, isAdmin } = require("../middlewares/authMiddleware");

router.post("/", authMiddleware, isAdmin, createSensor);
router.get("/", authMiddleware, isAdmin, getAllSensors);
router.get("/:id", authMiddleware, isAdmin, getSensor);
router.put("/:id", authMiddleware, isAdmin, updateSensor);
router.delete("/:id", authMiddleware, isAdmin, deleteSensor);

module.exports = router;