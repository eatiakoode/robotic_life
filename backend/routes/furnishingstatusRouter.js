const express = require("express");
const {
  createFurnishingstatus,
  updateFurnishingstatus,
  deleteFurnishingstatus,
  getFurnishingstatus,
  getallFurnishingstatus,
} = require("../controller/furnishingstatusCtrl");
const { authMiddleware, isAdmin } = require("../middlewares/authMiddleware");
const router = express.Router();

router.post("/", authMiddleware, isAdmin, createFurnishingstatus);
router.put("/:id", authMiddleware, isAdmin, updateFurnishingstatus);
router.delete("/:id", authMiddleware, isAdmin, deleteFurnishingstatus);
router.get("/:id", getFurnishingstatus);
router.get("/", getallFurnishingstatus);

module.exports = router;
