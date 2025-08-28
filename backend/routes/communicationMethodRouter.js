const express = require("express");
const router = express.Router();
const {
    createCommunicationMethod,
    getAllCommunicationMethods,
    getCommunicationMethod,
    updateCommunicationMethod,
    deleteCommunicationMethod
} = require("../controller/communicationMethodCtrl");
const { authMiddleware, isAdmin } = require("../middlewares/authMiddleware");

router.post("/", authMiddleware, isAdmin, createCommunicationMethod);
router.get("/", authMiddleware, isAdmin, getAllCommunicationMethods);
router.get("/:id", authMiddleware, isAdmin, getCommunicationMethod);
router.put("/:id", authMiddleware, isAdmin, updateCommunicationMethod);
router.delete("/:id", authMiddleware, isAdmin, deleteCommunicationMethod);

module.exports = router;
