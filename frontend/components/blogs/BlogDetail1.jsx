import React from "react";
import Comments from "./Comments";
import CommentForm from "./CommentForm";
import Image from "next/image";

export default function BlogDetail1({ blog }) {
  // Helper function to format date
  const formatDate = (dateString) => {
    if (!dateString) return "Unknown Date";
    const date = new Date(dateString);
    return date.toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'long',
      day: 'numeric'
    });
  };

  // Helper function to get image URL
  const getImageUrl = (imagePath) => {
    if (!imagePath) return "/images/blog/blog-details-1.jpg"; // fallback image
    
    // If it's already a full URL, return as is
    if (imagePath.startsWith('http')) {
      return imagePath;
    }
    
    // If it's a filename, construct the backend URL
    if (!imagePath.includes('/')) {
      return `http://localhost:5000/images/blogs/${imagePath}`;
    }
    
    // If it's a full path, extract filename and construct URL
    const filename = imagePath.split('/').pop();
    return `http://localhost:5000/images/blogs/${filename}`;
  };

  return (
    <div className="blog-detail-wrap">
      <div className="image" />
      <div className="inner">
        <div className="heading">
          <ul className="list-tags has-bg justify-content-center">
            <li>
              <a href="#" className="link">
                {blog.blogcategory?.title || "Blog"}
              </a>
            </li>
          </ul>
          <h3 className="fw-5">{blog.title}</h3>
          <div className="meta justify-content-center">
            <div className="meta-item gap-8">
              <div className="icon">
                <i className="icon-calendar" />
              </div>
              <p className="body-text-1">{formatDate(blog.date || blog.createdAt)}</p>
            </div>
            <div className="meta-item gap-8">
              <div className="icon">
                <i className="icon-user" />
              </div>
              <p className="body-text-1">
                by{" "}
                <a className="link" href="#">
                  {blog.source || "Admin"}
                </a>
              </p>
            </div>
          </div>
        </div>
        
        <div className="content">
          <p className="body-text-1 mb_12">
            {blog.description}
          </p>
        </div>
        
        {/* Additional images section - dynamic images within existing dimensions */}
        <div className="group-image d-flex gap-20">
          <div>
            <Image
              alt={`${blog.title} - Additional image 1`}
              src={
                blog.additionalImages && blog.additionalImages.length > 0 
                  ? getImageUrl(blog.additionalImages[0]) 
                  : blog.logoimage 
                    ? getImageUrl(blog.logoimage) 
                    : "/images/blog/blog-details-3.jpg"
              }
              width={623}
              height={468}
              style={{ width: '100%', height: 'auto', objectFit: 'cover' }}
            />
          </div>
          <div>
            <Image
              alt={`${blog.title} - Additional image 2`}
              src={
                blog.additionalImages && blog.additionalImages.length > 1 
                  ? getImageUrl(blog.additionalImages[1]) 
                  : blog.logoimage 
                    ? getImageUrl(blog.logoimage) 
                    : "/images/blog/blog-details-4.jpg"
              }
              width={623}
              height={468}
              style={{ width: '100%', height: 'auto', objectFit: 'cover' }}
            />
          </div>
        </div>
        
        <div className="content">
          {blog.contentTitle && (
            <h3 className="fw-5 mb_16">{blog.contentTitle}</h3>
          )}
          
          {blog.contentParagraphs && (
            // Handle contentParagraphs as a string (from backend model)
            <div className="body-text-1 mb_16" style={{ whiteSpace: 'pre-line' }}>
              {blog.contentParagraphs}
            </div>
          )}
          
          {blog.contentList && blog.contentList.length > 0 && (
            <ul className="list-text type-disc mb_16">
              {blog.contentList.map((item, index) => (
                <li key={index} className="body-text-1">
                  {item}
                </li>
              ))}
            </ul>
          )}
          

        </div>
        <div className="bot d-flex justify-content-between gap-10 flex-wrap">
          <ul className="list-tags has-bg">
            <li>Tag:</li>
            {blog.tags && blog.tags.length > 0 ? (
              // Handle tags as array from backend model
              blog.tags.map((tag, index) => (
                <li key={index}>
                  <a href="#" className="link">
                    {tag}
                  </a>
                </li>
              ))
            ) : blog.tags && typeof blog.tags === 'string' && blog.tags.trim() ? (
              // Handle tags as comma-separated string (from admin form)
              blog.tags.split(',').map((tag, index) => (
                <li key={index}>
                  <a href="#" className="link">
                    {tag.trim()}
                  </a>
                </li>
              ))
            ) : blog.blogcategory?.title ? (
              // Only show category if no tags
              <li>
                <a href="#" className="link">
                  {blog.blogcategory.title}
                </a>
              </li>
            ) : null}
          </ul>
          <div className="d-flex align-items-center justify-content-between gap-16">
            <p>Share this post:</p>
            <ul className="tf-social-icon style-1">
              <li>
                <a href="#" className="social-facebook">
                  <i className="icon icon-fb" />
                </a>
              </li>
              <li>
                <a href="#" className="social-twiter">
                  <i className="icon icon-x" />
                </a>
              </li>
              <li>
                <a href="#" className="social-pinterest">
                  <i className="icon icon-pinterest" />
                </a>
              </li>
              <li>
                <a href="#" className="social-instagram">
                  <i className="icon icon-instagram" />
                </a>
              </li>
            </ul>
          </div>
        </div>
        <div className="related-post">
          <div className="pre w-50">
            <div className="text-btn-uppercase">
              <a href="#">Previous</a>
            </div>
            <h6 className="fw-5">
              <a className="link" href="#">
                How to choose the right customer
              </a>
            </h6>
          </div>
          <div className="next w-50">
            <div className="text-btn-uppercase text-end">
              <a href="#">Next</a>
            </div>
            <h6 className="fw-5 text-end">
              <a className="link" href="#">
                Starting your traveling blog with Vasco
              </a>
            </h6>
          </div>
        </div>
        {/* <Comments /> */}
        {/* <CommentForm /> */}
      </div>
    </div>
  );
}