const express = require("express");
const router = express.Router();
const {
    createMaterial,
    getAllMaterials,
    getMaterialById,
    updateMaterial,
    deleteMaterial
} = require("../controller/materialCtrl");
const { authMiddleware, isAdmin } = require("../middlewares/authMiddleware");

router.post("/", authMiddleware, isAdmin, createMaterial);
router.get("/", authMiddleware, isAdmin, getAllMaterials);
router.get("/:id", authMiddleware, isAdmin, getMaterialById);
router.put("/:id", authMiddleware, isAdmin, updateMaterial);
router.delete("/:id", authMiddleware, isAdmin, deleteMaterial);

module.exports = router;