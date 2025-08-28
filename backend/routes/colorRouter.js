const express = require("express");
const router = express.Router();
const {
    createColor,
    getAllColors,
    getColorById,
    updateColor,
    deleteColor
} = require("../controller/colorCtrl");
const { authMiddleware, isAdmin } = require("../middlewares/authMiddleware");

router.post("/", authMiddleware, isAdmin, createColor);
router.get("/", authMiddleware, isAdmin, getAllColors);
router.get("/:id", authMiddleware, isAdmin, getColorById);
router.put("/:id", authMiddleware, isAdmin, updateColor);
router.delete("/:id", authMiddleware, isAdmin, deleteColor);

module.exports = router;
