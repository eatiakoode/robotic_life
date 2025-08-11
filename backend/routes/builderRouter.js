const express = require("express");

// const multer = require("multer");
// const upload = multer({ storage: multer.memoryStorage() });
const { uploadPhoto } = require("../middlewares/uploadImage");

const {
  createBuilder,
  updateBuilder,
  deleteBuilder,
  getBuilder,
  getallBuilder,
} = require("../controller/builderCtrl");
const { authMiddleware, isAdmin } = require("../middlewares/authMiddleware");
const router = express.Router();

router.post("/", authMiddleware, isAdmin, uploadPhoto.array("logo", 10),
 createBuilder);
router.put("/:id", authMiddleware, isAdmin,uploadPhoto.array("logo", 10), updateBuilder);
router.delete("/:id", authMiddleware, isAdmin, deleteBuilder);
router.get("/:id", getBuilder);
router.get("/", getallBuilder);

module.exports = router;
