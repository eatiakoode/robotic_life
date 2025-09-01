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
          
          {blog.contentParagraphs && blog.contentParagraphs.length > 0 ? (
            blog.contentParagraphs.map((paragraph, index) => (
              <p key={index} className="body-text-1 mb_16">
                {paragraph}
              </p>
            ))
          ) : (
            // Fallback content if no dynamic paragraphs
            <>
              <p className="body-text-1 mb_16">
                Donec eu dui condimentum, laoreet nulla vitae, venenatis ipsum.
                Donec luctus sem sit amet varius laoreet. Aliquam fermentum sit amet
                urna fringilla tincidunt. Vestibulum ullamcorper nec lacus ac
                molestie. Curabitur congue neque sed nisi auctor consequat.
                Pellentesque rhoncus tortor vitae ipsum sagittis tempor.
              </p>
              <p className="body-text-1 mb_16">
                Vestibulum et pharetra arcu. In porta lobortis turpis. Ut faucibus
                fermentum posuere. Suspendisse potenti. Mauris a metus sed est
                semper vestibulum. Mauris tortor sem, consectetur vehicula vulputate
                id, suscipit vel leo.
              </p>
            </>
          )}
          
          {blog.contentList && blog.contentList.length > 0 ? (
            <ul className="list-text type-disc mb_16">
              {blog.contentList.map((item, index) => (
                <li key={index} className="body-text-1">
                  {item}
                </li>
              ))}
            </ul>
          ) : (
            // Fallback list if no dynamic list items
            <ul className="list-text type-disc mb_16">
              <li className="body-text-1">
                15+ years of industry experience designing, building, and
                supporting large-scale distributed systems in production, with
                recent experience in building large scale cloud services.
              </li>
              <li className="body-text-1">
                Deep knowledge and experience with different security areas like
                identity and access management, cryptography, network security,
                etc.
              </li>
              <li className="body-text-1">
                Experience with database systems and database internals, such as
                query engines and optimizers are a big plus.
              </li>
              <li className="body-text-1">
                Strong fundamentals in computer science skills.
              </li>
              <li className="body-text-1">
                Expert-level development skills in Java or C++.
              </li>
              <li className="body-text-1">
                Knowledge of industry standard security concepts and protocols
                like SAML, SCIM, OAuth, RBAC, cryptography is a plus.
              </li>
              <li className="body-text-1">
                Advanced degree in Computer Science or related degree.
              </li>
              <li className="body-text-1">
                Ph.D. in the related field is a plus
              </li>
            </ul>
          )}
          
          <p className="body-text-1 mb_16">
            Curabitur aliquam ac arcu in mattis. Phasellus pulvinar erat at
            aliquam hendrerit. Nam ut velit dolor. Sed fermentum tempus odio, ac
            faucibus elit scelerisque consequat. Fusce ac malesuada elit. Nam at
            aliquam libero, quis lacinia erat. In hac habitasse platea dictumst.
            Suspendisse id dolor orci. Vivamus at aliquam tellus. Vestibulum a
            augue ac purus suscipit varius non eget lectus. Nam lobortis mauris
            luctus tristique feugiat. Nulla eleifend risus sit amet nisi
            feugiat, id eleifend sapien malesuada. Phasellus venenatis convallis
            mattis. Duis vel tempor eros. Mauris semper sollicitudin neque,
            imperdiet ultrices urna maximus id.
          </p>
        </div>
        <div className="bot d-flex justify-content-between gap-10 flex-wrap">
          <ul className="list-tags has-bg">
            <li>Tag:</li>
            {blog.tags && blog.tags.length > 0 ? (
              blog.tags.map((tag, index) => (
                <li key={index}>
                  <a href="#" className="link">
                    {tag}
                  </a>
                </li>
              ))
            ) : (
              <>
                <li>
                  <a href="#" className="link">
                    {blog.blogcategory?.title || "Blog"}
                  </a>
                </li>
                <li>
                  <a href="#" className="link">
                    Trending
                  </a>
                </li>
              </>
            )}
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
