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
      "message":"Blog data retrieved successfully",
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
    const getallBlog = await Blog.find({"status":true}).select("title createdAt logoimage").populate("blogcategory","title").lean().limit(2);
    
    // Transform the data to extract only filename from logoimage path
    const transformedBlogs = getallBlog.map(blog => {
      if (blog.logoimage) {
        // Extract filename from path like "public/images/blogs/upload-1756280684139.png"
        const filename = blog.logoimage.split('/').pop();
        return {
          ...blog,
          logoimage: filename
        };
      }
      return blog;
    });
    
    res.json(transformedBlogs);
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
      "message":"Blog data retrieved successfully",
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
