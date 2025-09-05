const express = require("express");
const {
  createTestimonial,
  getTestimonials,
  getTestimonialById,
  updateTestimonial,
  deleteTestimonial,
} = require("../controller/testimonialCtrl");

const router = express.Router();

router.post("/", createTestimonial);
router.get("/", getTestimonials);          
router.get("/:id", getTestimonialById);
router.put("/:id", updateTestimonial);       
router.delete("/:id", deleteTestimonial);     

module.exports = router;
