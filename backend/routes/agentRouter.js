const express = require("express");
const {
  createAgent,
  updateAgent,
  deleteAgent,
  getAgent,
  getallAgent,
} = require("../controller/agentCtrl.js");
const { authMiddleware, isAdmin } = require("../middlewares/authMiddleware");
const router = express.Router();

router.post("/", authMiddleware, isAdmin, createAgent);
router.put("/:id", authMiddleware, isAdmin, updateAgent);
router.delete("/:id", authMiddleware, isAdmin, deleteAgent);
router.get("/:id", getAgent);
router.get("/", getallAgent);

module.exports = router;
