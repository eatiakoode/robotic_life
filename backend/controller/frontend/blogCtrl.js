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
const getBlogBySlug = asyncHandler(async (req, res) => {
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

const getRelatedBlogs = asyncHandler(async (req, res) => {
  try {
    const { blogId } = req.params;

    const currentBlog = await Blog.findById(blogId);
    if (!currentBlog) {
      return res.status(404).json({
        success: false,
        message: "Blog not found",
      });
    }

    const relatedBlogs = await Blog.find({
      blogcategory: currentBlog.blogcategory,
      _id: { $ne: currentBlog._id },
      status: true,
    })
      .select("logoimage date source title description")
      .limit(3) 
      .lean();

    res.json({
      success: true,
      count: relatedBlogs.length,
      data: relatedBlogs,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "Server Error",
      error: error.message,
    });
  }
});

module.exports = {
  getBlog,
  getallBlog,
  getBlogBySlug,
  getRelatedBlogs
};
