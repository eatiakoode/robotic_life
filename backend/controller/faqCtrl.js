const Faq = require("../models/faqModel");
const asyncHandler = require("express-async-handler");
const validateMongoDbId = require("../utils/validateMongodbId");

// Create FAQ
const createFaq = asyncHandler(async (req, res) => {
  try {
    const newFaq = await Faq.create(req.body);
    res.status(201).json({
      status: "success",
      message: "FAQ added successfully",
      data: newFaq,
    });
  } catch (error) {
    throw new Error(error);
  }
});

// Update FAQ
const updateFaq = asyncHandler(async (req, res) => {
  const { id } = req.params;
  validateMongoDbId(id);

  try {
    const updatedFaq = await Faq.findByIdAndUpdate(id, req.body, {
      new: true,
      runValidators: true,
    });

    if (!updatedFaq) {
      return res.status(404).json({
        status: "fail",
        message: "FAQ not found",
      });
    }

    res.json({
      status: "success",
      message: "FAQ updated successfully",
      data: updatedFaq,
    });
  } catch (error) {
    throw new Error(error);
  }
});

// Delete FAQ
const deleteFaq = asyncHandler(async (req, res) => {
  const { id } = req.params;
  validateMongoDbId(id);

  try {
    const deletedFaq = await Faq.findByIdAndDelete(id);

    if (!deletedFaq) {
      return res.status(404).json({
        status: "fail",
        message: "FAQ not found",
      });
    }

    res.json({
      status: "success",
      message: "FAQ deleted successfully",
      data: deletedFaq,
    });
  } catch (error) {
    throw new Error(error);
  }
});

// Get Single FAQ
const getFaq = asyncHandler(async (req, res) => {
  const { id } = req.params;
  validateMongoDbId(id);

  try {
    const getaFaq = await Faq.findById(id).populate("robotid", "name");

    if (!getaFaq) {
      return res.status(404).json({
        status: "fail",
        message: "FAQ not found",
      });
    }

    res.json({
      status: "success",
      message: "FAQ fetched successfully",
      data: getaFaq,
    });
  } catch (error) {
    throw new Error(error);
  }
});

// Get All FAQs (with pagination)
const getallFaq = asyncHandler(async (req, res) => {
  try {
    let limit = parseInt(req.query.limit) || 100;
    let skip = parseInt(req.query.skip) || 1;

    const [faqList, totalCount] = await Promise.all([
      Faq.find()
        .sort({ createdAt: -1 })
        .skip((skip - 1) * limit)
        .limit(limit)
        .lean(),

      Faq.countDocuments(),
    ]);

    res.status(200).json({
      status: "success",
      message: "FAQ list fetched successfully",
      items: faqList,
      totalCount,
      currentPage: skip,
      totalPages: Math.ceil(totalCount / limit),
    });
  } catch (error) {
    throw new Error(error);
  }
});

module.exports = {
  createFaq,
  updateFaq,
  deleteFaq,
  getFaq,
  getallFaq,
};
