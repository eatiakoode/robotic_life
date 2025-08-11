const express = require("express");

// const multer = require("multer");
// const upload = multer({ storage: multer.memoryStorage() });
const { uploadPhoto } = require("../middlewares/uploadImage");

const {
  createTestimonial,
  updateTestimonial,
  deleteTestimonial,
  getTestimonial,
  getallTestimonial,
} = require("../controller/testimonialCtrl");
const { authMiddleware, isAdmin } = require("../middlewares/authMiddleware");
const router = express.Router();

router.post("/", authMiddleware, isAdmin, uploadPhoto.array("logo", 10),
 createTestimonial);
router.put("/:id", authMiddleware, isAdmin,uploadPhoto.array("logo", 10), updateTestimonial);
router.delete("/:id", authMiddleware, isAdmin, deleteTestimonial);
router.get("/:id", getTestimonial);
router.get("/", getallTestimonial);

module.exports = router;
