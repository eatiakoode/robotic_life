const express = require("express");

const {
  getBlog,
  getallBlog,
  getBlogSlug
} = require("../../controller/frontend/blogCtrl");
const router = express.Router();
router.get("/byid/:id", getBlog);
router.get("/list", getallBlog);
router.get("/slug/:slug", getBlogSlug);

module.exports = router;
