// routes/navigationTypeRoutes.js
const express = require("express");
const router = express.Router();
const {
    createNavigationType,
    getAllNavigationTypes,
    getNavigationType,
    updateNavigationType,
    deleteNavigationType
} = require("../controller/navigationTypeCtrl");
const { authMiddleware, isAdmin } = require("../middlewares/authMiddleware");

router.post("/", authMiddleware, isAdmin, createNavigationType);
router.get("/", authMiddleware, isAdmin, getAllNavigationTypes);
router.get("/:id", authMiddleware, isAdmin, getNavigationType);
router.put("/:id", authMiddleware, isAdmin, updateNavigationType);
router.delete("/:id", authMiddleware, isAdmin, deleteNavigationType);

module.exports = router;