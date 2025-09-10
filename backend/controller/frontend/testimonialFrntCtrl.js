const Testimonial = require("../../models/testimonialModel");

const getTestimonials = async (req, res) => {
  try {
    const testimonials = await Testimonial.find({ status: true })
      .sort({ createdAt: -1 });

    res.status(200).json({
      success: true,
      count: testimonials.length,
      data: testimonials,
    });
  } catch (error) {
    console.error("Error fetching testimonials:", error);
    res.status(500).json({
      success: false,
      message: "Server Error",
      error: error.message,
    });
  }
};

module.exports = { getTestimonials };
