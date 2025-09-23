const Blog = require("../models/blogModel");
const asyncHandler = require("express-async-handler");
const validateMongoDbId = require("../utils/validateMongodbId");
const { uploadPhoto, blogImgResize } = require("../middlewares/uploadImage");
const slugify = require("slugify");

// Create Blog
const createBlog = asyncHandler(async (req, res) => {
  try {

    if (req.files) {
      const processedImages = await blogImgResize(req);
      if (processedImages.length > 0) {
        req.body.logoimage = "public/images/blogs/" + processedImages[0];
      }
    }
    if (req.body.slug) {
      req.body.slug = slugify(req.body.slug.toLowerCase());
    } else if (req.body.title) {
      req.body.slug = slugify(req.body.title.toLowerCase());
    } else {
      req.body.slug = "";
    }
    const newBlog = await Blog.create(req.body);
    const message = {
      "status": "success",
      "message": "Data Add sucessfully",
      "data": newBlog
    }
    res.json(message);
  } catch (error) {
    throw new Error(error);
  }
});

// Update Blog
const updateBlog = asyncHandler(async (req, res) => {
  const { id } = req.params;
  validateMongoDbId(id);
  try {


    if (req.files) {
      const processedImages = await blogImgResize(req);
      console.log("newBlogimage")
      console.log(processedImages)
      if (processedImages.length > 0) {
        req.body.logoimage = "public/images/blogs/" + processedImages[0];
      }
    }
    if (req.body.slug) {
      req.body.slug = slugify(req.body.slug.toLowerCase());
    } else if (req.body.title) {
      req.body.slug = slugify(req.body.title.toLowerCase());
    }
    const updatedBlog = await Blog.findByIdAndUpdate(id, req.body, {
      new: true,
    });
    const message = {
      "status": "success",
      "message": "Data updated sucessfully",
      "data": updatedBlog
    }
    res.json(message);
  } catch (error) {
    throw new Error(error);
  }
});

// Delete Blog
const deleteBlog = asyncHandler(async (req, res) => {
  const { id } = req.params;
  validateMongoDbId(id);
  try {
    const deletedBlog = await Blog.findByIdAndDelete(id);

    const message = {
      "status": "success",
      "message": "Data deleted sucessfully",
      "data": deletedBlog
    }
    res.json(message);
  } catch (error) {
    throw new Error(error);
  }
});

// Get Blog
const getBlog = asyncHandler(async (req, res) => {
  const { id } = req.params;
  validateMongoDbId(id);
  try {
    const getaBlog = await Blog.findById(id);
    const message = {
      "status": "success",
      "message": "Data deleted sucessfully",
      "data": getaBlog
    }
    res.json(message);
  } catch (error) {
    throw new Error(error);
  }
});

// Get All
const getallBlog = asyncHandler(async (req, res) => {
  try {
    const getallBlog = await Blog.find();
    res.json(getallBlog);
  } catch (error) {
    throw new Error(error);
  }
});

module.exports = {
  createBlog,
  updateBlog,
  deleteBlog,
  getBlog,
  getallBlog,
};
