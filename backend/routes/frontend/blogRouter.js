const express = require("express");

const {
  getBlog,
  getallBlog,
  getBlogSlug,
  getRelatedBlogs
} = require("../../controller/frontend/blogCtrl");
const router = express.Router();

// Get blog by ID
router.get("/:id", getBlog);

// Get all blogs
router.get("/", getallBlog);

// Get blog by slug
router.get("/slug/:slug", getBlogSlug);

// Get related blogs
router.get("/related/:blogId", getRelatedBlogs);

module.exports = router;
