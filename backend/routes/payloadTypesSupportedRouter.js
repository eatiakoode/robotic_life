const express = require("express");
const router = express.Router();
const {
    createPayloadType,
    getAllPayloadTypes,
    getPayloadType,
    updatePayloadType,
    deletePayloadType
} = require("../controller/payloadTypesSupportedCtrl");
const { authMiddleware, isAdmin } = require("../middlewares/authMiddleware");

router.post("/", authMiddleware, isAdmin, createPayloadType);
router.get("/", authMiddleware, isAdmin, getAllPayloadTypes);
router.get("/:id", authMiddleware, isAdmin, getPayloadType);
router.put("/:id", authMiddleware, isAdmin, updatePayloadType);
router.delete("/:id", authMiddleware, isAdmin, deletePayloadType);

module.exports = router;
