const express = require("express");

const {
  getBlog,
  getallBlog,
  getBlogBySlug,
  getRelatedBlogs,
  getPopularTags
} = require("../../controller/frontend/blogCtrl");
const router = express.Router();

// Get popular tags (must be before /:id route)
router.get("/tags", getPopularTags);

// Get blog by slug
router.get("/slug/:slug", getBlogBySlug);

// Get related blogs
router.get("/related/:blogId", getRelatedBlogs);

// Get blog by ID
router.get("/:id", getBlog);

// Get all blogs
router.get("/", getallBlog);


module.exports = router;
