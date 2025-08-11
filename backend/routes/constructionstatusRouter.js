const express = require("express");
const {
  createConstructionstatus,
  updateConstructionstatus,
  deleteConstructionstatus,
  getConstructionstatus,
  getallConstructionstatus,
} = require("../controller/constructionstatusCtrl");
const { authMiddleware, isAdmin } = require("../middlewares/authMiddleware");
const router = express.Router();

router.post("/", authMiddleware, isAdmin, createConstructionstatus);
router.put("/:id", authMiddleware, isAdmin, updateConstructionstatus);
router.delete("/:id", authMiddleware, isAdmin, deleteConstructionstatus);
router.get("/:id", getConstructionstatus);
router.get("/", getallConstructionstatus);

module.exports = router;
