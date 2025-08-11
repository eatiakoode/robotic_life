const Blog = require("../../models/blogModel");
const asyncHandler = require("express-async-handler");
const validateMongoDbId = require("../../utils/validateMongodbId");

const getBlog = asyncHandler(async (req, res) => {
  const { id } = req.params;
  validateMongoDbId(id);
  try {
    const getaBlog = await Blog.findById(id).populate("blogcategory").lean();
    const message={
      "status":"success",
      "message":"Data deleted sucessfully",
      "data":getaBlog
    }
    res.json(message);
   //res.json(getaBlog);
  } catch (error) {
    throw new Error(error);
  }
});
const getallBlog = asyncHandler(async (req, res) => {
  try {
    const getallBlog = await Blog.find({"status":true}).populate("blogcategory").lean();
    res.json(getallBlog);
  } catch (error) {
    throw new Error(error);
  }
});
const getBlogSlug = asyncHandler(async (req, res) => {
  const { slug } = req.params;
  // validateMongoDbId(id);
  try {
    const getaBlog = await Blog.findOne({slug:slug}).populate("blogcategory").lean();
    const message={
      "status":"success",
      "message":"Data deleted sucessfully",
      "data":getaBlog
    }
    res.json(message);
   //res.json(getaBlog);
  } catch (error) {
    throw new Error(error);
  }
});
module.exports = {
  getBlog,
  getallBlog,
  getBlogSlug
};
