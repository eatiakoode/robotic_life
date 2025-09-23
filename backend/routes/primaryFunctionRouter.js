const express = require("express");
const router = express.Router();
const {
    createPrimaryFunction,
    getAllPrimaryFunctions,
    getPrimaryFunction,
    updatePrimaryFunction,
    deletePrimaryFunction
} = require("../controller/primaryFunctionCtrl");
const { authMiddleware, isAdmin } = require("../middlewares/authMiddleware");

router.post("/", authMiddleware, isAdmin, createPrimaryFunction);
router.get("/", authMiddleware, isAdmin, getAllPrimaryFunctions);
router.get("/:id", authMiddleware, isAdmin, getPrimaryFunction);
router.put("/:id", authMiddleware, isAdmin, updatePrimaryFunction);
router.delete("/:id", authMiddleware, isAdmin, deletePrimaryFunction);

module.exports = router;
