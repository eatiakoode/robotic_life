import BlogDetail1 from "@/components/blogs/BlogDetail1";
import BlogGrid from "@/components/blogs/BlogGrid";
import RelatedBlogs from "@/components/blogs/RelatedBlogs";

import Footer1 from "@/components/footers/Footer1";
import Header1 from "@/components/headers/Header1";
import { getBlogById, getBlogBySlug } from "@/api/blog";
import React from "react";

export default async function BlogDetailsPage1({ params }) {
  const { id } = await params;

  // Try to fetch blog by slug first, then by ID as fallback
  let blog = null;
  try {
    
    if (!blog) {
      blog = await getBlogById(id);
    }
  } catch (error) {
    console.error('Error fetching blog:', error);
    blog = null;
  }
  
  // Fallback to default blog if not found
  if (!blog) {
    return (
      <>
        <div className="container mt-5">
          <div className="row">
            <div className="col-12">
              <h1>Blog not found</h1>
              <p>The blog you're looking for doesn't exist.</p>
            </div>
          </div>
        </div>
        <Footer1 dark />
      </>
    );
  }

  return (
    <>
      {/* <Topbar6 bgColor="bg-main" /> */}
      {/* <Header1 /> */}
      <BlogDetail1 blog={blog} />
      <RelatedBlogs blogId={blog._id} />
      <Footer1 dark />
    </>
  );
}
