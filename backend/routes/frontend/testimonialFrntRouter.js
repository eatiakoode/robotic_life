const express = require("express");
const router = express.Router();
const { getTestimonials } = require("../../controller/frontend/testimonialFrntCtrl");

router.get("/", getTestimonials);

module.exports = router;