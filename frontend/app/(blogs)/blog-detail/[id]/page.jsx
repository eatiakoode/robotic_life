import BlogDetail1 from "@/components/blogs/BlogDetail1";
import BlogGrid from "@/components/blogs/BlogGrid";
import RelatedBlogs from "@/components/blogs/RelatedBlogs";

import Footer1 from "@/components/footers/Footer1";
import Header1 from "@/components/headers/Header1";
// import Topbar6 from "@/components/headers/Topbar6";
import { getBlogById } from "@/api/blog";
import React from "react";

export default async function BlogDetailsPage1({ params }) {
  const { id } = await params;

  // Fetch blog data from backend
  const blog = await getBlogById(id);
  
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
        <Footer1 />
      </>
    );
  }

  return (
    <>
      {/* <Topbar6 bgColor="bg-main" /> */}
      {/* <Header1 /> */}
      <BlogDetail1 blog={blog} />
      <RelatedBlogs />
      <Footer1 />
    </>
  );
}
