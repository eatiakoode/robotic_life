const asyncHandler = require("express-async-handler");
const Faq = require("../models/faqModel");

// Get FAQs for a specific robot
const getFAQsByRobotId = asyncHandler(async (req, res) => {
  try {
    const { robotId } = req.params;
    console.log('Fetching FAQs for robot ID:', robotId);

    if (!robotId) {
      return res.status(400).json({
        success: false,
        error: "Robot ID is required"
      });
    }

    const faqs = await Faq.find({ 
      robotid: robotId, 
      status: true 
    })
    .select("title description robotid")
    .sort({ createdAt: -1 });

    console.log('Found FAQs:', faqs.length);

    // Transform the data to match frontend expectations
    const transformedFaqs = faqs.map(faq => ({
      _id: faq._id,
      question: faq.title,
      answer: faq.description,
      robotId: faq.robotid
    }));

    res.status(200).json({
      success: true,
      count: transformedFaqs.length,
      data: transformedFaqs
    });

  } catch (error) {
    console.error('Error fetching FAQs by robot ID:', error);
    res.status(500).json({
      success: false,
      error: error.message
    });
  }
});

// Get all FAQs
const getAllFAQs = asyncHandler(async (req, res) => {
  try {
    const faqs = await Faq.find({ status: true })
      .populate("robotid", "title slug")
      .select("title description robotid")
      .sort({ createdAt: -1 });

    // Transform the data
    const transformedFaqs = faqs.map(faq => ({
      _id: faq._id,
      question: faq.title,
      answer: faq.description,
      robot: faq.robotid
    }));

    res.status(200).json({
      success: true,
      count: transformedFaqs.length,
      data: transformedFaqs
    });

  } catch (error) {
    console.error('Error fetching all FAQs:', error);
    res.status(500).json({
      success: false,
      error: error.message
    });
  }
});

// Create a new FAQ
const createFAQ = asyncHandler(async (req, res) => {
  try {
    const { title, description, robotid } = req.body;

    if (!title || !description || !robotid) {
      return res.status(400).json({
        success: false,
        error: "Title, description, and robot ID are required"
      });
    }

    const faq = await Faq.create({
      title,
      description,
      robotid
    });

    res.status(201).json({
      success: true,
      message: "FAQ created successfully",
      data: {
        _id: faq._id,
        question: faq.title,
        answer: faq.description,
        robotId: faq.robotid
      }
    });

  } catch (error) {
    console.error('Error creating FAQ:', error);
    res.status(400).json({
      success: false,
      error: error.message
    });
  }
});

// Update FAQ
const updateFAQ = asyncHandler(async (req, res) => {
  try {
    const { id } = req.params;
    const { title, description } = req.body;

    const faq = await Faq.findByIdAndUpdate(
      id,
      { title, description },
      { new: true, runValidators: true }
    );

    if (!faq) {
      return res.status(404).json({
        success: false,
        error: "FAQ not found"
      });
    }

    res.status(200).json({
      success: true,
      message: "FAQ updated successfully",
      data: {
        _id: faq._id,
        question: faq.title,
        answer: faq.description,
        robotId: faq.robotid
      }
    });

  } catch (error) {
    console.error('Error updating FAQ:', error);
    res.status(400).json({
      success: false,
      error: error.message
    });
  }
});

// Delete FAQ
const deleteFAQ = asyncHandler(async (req, res) => {
  try {
    const { id } = req.params;

    const faq = await Faq.findByIdAndUpdate(
      id,
      { status: false },
      { new: true }
    );

    if (!faq) {
      return res.status(404).json({
        success: false,
        error: "FAQ not found"
      });
    }

    res.status(200).json({
      success: true,
      message: "FAQ deleted successfully"
    });

  } catch (error) {
    console.error('Error deleting FAQ:', error);
    res.status(500).json({
      success: false,
      error: error.message
    });
  }
});

module.exports = {
  getFAQsByRobotId,
  getAllFAQs,
  createFAQ,
  updateFAQ,
  deleteFAQ
};