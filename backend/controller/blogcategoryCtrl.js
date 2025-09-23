const Blogcategory = require("../models/blogcategoryModel");
const asyncHandler = require("express-async-handler");
const validateMongoDbId = require("../utils/validateMongodbId");

// Create Blog
const createBlogcategory = asyncHandler(async (req, res) => {
  try {
    const newBlogcategory = await Blogcategory.create(req.body);
    const message = {
      "status": "success",
      "message": "Data Add sucessfully",
      "data": newBlogcategory
    }
    res.json(message);
  } catch (error) {
    throw new Error(error);
  }
});

// Update Blog Category
const updateBlogcategory = asyncHandler(async (req, res) => {
  const { id } = req.params;
  validateMongoDbId(id);
  try {
    const updatedBlogcategory = await Blogcategory.findByIdAndUpdate(id, req.body, {
      new: true,
    });
    const message = {
      "status": "success",
      "message": "Data updated sucessfully",
      "data": updatedBlogcategory
    }
    res.json(message);
  } catch (error) {
    throw new Error(error);
  }
});

// Delete Blog Category
const deleteBlogcategory = asyncHandler(async (req, res) => {
  const { id } = req.params;
  validateMongoDbId(id);
  try {
    const deletedBlogcategory = await Blogcategory.findByIdAndDelete(id);

    const message = {
      "status": "success",
      "message": "Data deleted sucessfully",
      "data": deletedBlogcategory
    }
    res.json(message);
  } catch (error) {
    throw new Error(error);
  }
});

// Get Blog Category
const getBlogcategory = asyncHandler(async (req, res) => {
  const { id } = req.params;
  validateMongoDbId(id);
  try {
    const getaBlogcategory = await Blogcategory.findById(id);
    const message = {
      "status": "success",
      "message": "Data deleted sucessfully",
      "data": getaBlogcategory
    }
    res.json(message);
  } catch (error) {
    throw new Error(error);
  }
});

// Get All Blog Categories
const getallBlogcategory = asyncHandler(async (req, res) => {
  try {
    const getallBlogcategory = await Blogcategory.find({ status: true }).sort({ title: 1 });
    res.json(getallBlogcategory);
  } catch (error) {
    throw new Error(error);
  }
});

module.exports = {
  createBlogcategory,
  updateBlogcategory,
  deleteBlogcategory,
  getBlogcategory,
  getallBlogcategory,
};
