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

const getPopularTags = async (req, res) => {
  try {
    // First check if there are any blogs with tags
    const blogsWithTags = await Blog.countDocuments({ 
      tags: { $exists: true, $ne: [], $not: { $size: 0 } } 
    });
    
    let tags = [];
    
    if (blogsWithTags > 0) {
      tags = await Blog.aggregate([
        { $match: { tags: { $exists: true, $ne: [], $not: { $size: 0 } } } },
        { $unwind: "$tags" },
        { $match: { tags: { $ne: null, $ne: "" } } }, // Filter out empty tags
        { $group: { _id: "$tags", count: { $sum: 1 } } }, 
        { $sort: { count: -1 } },
        { $limit: 10 }
      ]);
    }
 
    res.status(200).json({
      success: true,
      data: tags
    });

  } catch (error) {
    res.status(500).json({
      success: false,
      message: "Server Error",
      error: error.message
    });
  }
};

module.exports = {
  getBlog,
  getallBlog,
  getBlogBySlug,
  getRelatedBlogs,
  getPopularTags
};
