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
    
    const page = parseInt(req.query.page) || 1;
    const limit = parseInt(req.query.limit) || 3;
    const skip = (page - 1) * limit;

    const totalBlogs = await Blog.countDocuments({"status": true});
    
    const getallBlog = await Blog.find({"status": true})
      .select("title slug description source date logoimage createdAt")
      .populate("blogcategory", "title")
      .sort({ createdAt: -1 }) // Sort by newest first
      .skip(skip)
      .limit(limit)
      .lean();

    const transformedBlogs = getallBlog.map(blog => {
      if (blog.logoimage) {
       
        const filename = blog.logoimage.split('/').pop();
        return {
          ...blog,
          logoimage: filename
        };
      }
      return blog;
    });
    
    const totalPages = Math.ceil(totalBlogs / limit);
    const hasNextPage = page < totalPages;
    const hasPrevPage = page > 1;
    
    res.json({
      blogs: transformedBlogs,
      pagination: {
        currentPage: page,
        totalPages: totalPages,
        totalBlogs: totalBlogs,
        hasNextPage: hasNextPage,
        hasPrevPage: hasPrevPage,
        limit: limit
      }
    });
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
