const express = require("express");
const multer = require("multer");
const {
  createTestimonial,
  getTestimonials,
  getTestimonialById,
  updateTestimonial,
  deleteTestimonial,
} = require("../controller/testimonialCtrl");

const router = express.Router();

// Configure multer for handling FormData
const upload = multer();

router.post("/", upload.none(), createTestimonial);
router.get("/", getTestimonials);          
router.get("/:id", getTestimonialById);
router.put("/:id", upload.none(), updateTestimonial);       
router.delete("/:id", deleteTestimonial);     

module.exports = router;
