"use client"; 
import { useEffect, useState } from "react";
// import dynamic from "next/dynamic";

import BreadCrumb2 from "@/components/blog-details/BreadCrumb2";
// import Comments from "@/components/blog-details/Comments";
// import Pagination from "@/components/blog-details/Pagination";
// import Ratings from "@/components/blog-details/Ratings";
// import RelatedPost from "@/components/blog-details/RelatedPost";
// import ReviewBox from "@/components/blog-details/ReviewBox";
import BlogSidebar from "@/components/common/blog/BlogSidebar";
import CopyrightFooter from "@/components/common/footer/CopyrightFooter";
import Footer from "@/components/common/footer/Footer";
// import Social from "@/components/common/footer/Social";
import Header from "@/components/common/header/DefaultHeader";
import MobileMenu from "@/components/common/header/MobileMenu";
import PopupSignInUp from "@/components/common/PopupSignInUp";
// import BreadCrumbBanner from "@/components/blog-list-2/BreadCrumbBanner";
// import blogs from "@/data/blogs";
import Image from "next/image";

// import { getBlogBySlug } from "@/api/frontend/blog";

// export const metadata = {
//   title: 'Blog Details || WeGrow - Real Estate ',
//   description:
//     'WeGrow - Real Estate ',
// }

const ListingDynamicDetailsV1 = ({blog}) => {
  const [showBox, setShowBox] = useState(false);
  const shareUrl = process.env.NEXT_PUBLIC_FRONTEND_API_URL+'blog-detail/'+blog.slug;
  const text = encodeURIComponent(blog.metatitle);
  const hashtags = blog.metatitle;
  
  return (
    <>

      {/* <!-- Main Header Nav --> */}
      <Header />

      {/* <!--  Mobile Menu --> */}
      <MobileMenu />

      {/* <!-- Modal --> */}
      <PopupSignInUp />

      {/* <!-- Main Blog Post Content --> */}
      <section className="blog_post_container bgc-f7">
        <div className="container">
          <div className="row">
            <div className="col-xl-6">
              <BreadCrumb2 />
            </div>
          </div>
          {/* End .row */}

          <div className="row">
            <div className="col-lg-8">
              <div className="main_blog_post_content">
                <div className="mbp_thumb_post">
                  <div className="blog_sp_tag">
                    <a href="#">{blog.blogcategory?.title}</a>
                  </div>
                  <h3 className="blog_sp_title">{blog?.title}</h3>
                  <ul className="blog_sp_post_meta">
                    
                    {/* <li className="list-inline-item">
                      <a href="#">
                        <Image
                          width={40}
                          height={40}
                          className="img-fluid"
                          src="/assets/images/property/man.png"
                          alt="pposter1.png"
                        />
                      </a>
                    </li> */}
                    <li className="list-inline-item">
                      <a href={`/blog-detail/${blog.slug}`}>{blog.source}</a>
                    </li>
                    <li className="list-inline-item">
                      <span className="flaticon-calendar"></span>
                    </li>
                    <li className="list-inline-item">
                      <a href="#">{new Date(blog.date).toLocaleDateString('en-US', {
    month: 'short',
    day: '2-digit',
    year: 'numeric',
  })}</a>
                    </li>
                    <li className="lsd_list list-inline-item ms-4">
                      <div className="share_btn h1ads_1st_list half_style dn-991 map-half-style position-relative">
                      <div className="row align-items-center">
                        <div className="col-md-12">
                          <div className="navbered w-100">
                            <div className="mega-dropdown home2">
                              <span
                                id="show_advbtn"
                                className="dropbtn"
                                data-bs-toggle="dropdown"
                                data-bs-auto-close="outside"
                                aria-expanded="false"
                              >
                                Share
                              </span>

                              <div className="dropdown-content dropdown-menu ">
                                <div className="row">
                                  <div className="col-lg-12">
                                    <ul className="sub-menu">
                                      <li>
                                        <a href={`https://www.facebook.com/sharer/sharer.php?u=${shareUrl}`} target="_blank"><i className="fa fa-facebook"></i> Facebook</a>
                                      </li>
                                      <li>
                                        <a href={`https://www.linkedin.com/sharing/share-offsite/?url=${shareUrl}`} target="_blank"><i className="fa fa-linkedin"></i> Linkedin</a>
                                      </li>
                                      <li>
                                        <a href={`https://twitter.com/intent/tweet?url=${shareUrl}&text=${text}&hashtags=${hashtags}`}  target="_blank"><i className="fa fa-x-twitter"></i> Twitter</a>
                                      </li>
                                       <li>
                                        <a href="https://www.instagram.com/" target="_blank"><i className="fa fa-instagram"></i> Instagram</a>
                                      </li>
                                    </ul>
                                  </div>
                                 
                                </div>
                                {/* End .row */}
                              </div>
                              {/* End .dropdown-menu */}
                            </div>
                          </div>
                          {/* End .advance filter button */}
                        </div>
                        {/* End .col */}
                        {/* End .col */}
                      </div>
                      {/* End .row */}
                    </div>
                    </li>
                    {/* <li className="list-inline-item">
                      <span className="flaticon-view"></span>
                    </li> */}
                    {/* <li className="list-inline-item">
                      <a href="#"> 341 views</a>
                    </li> */}
                    {/* <li className="list-inline-item">
                      <span className="flaticon-chat"></span>
                    </li>
                    <li className="list-inline-item">
                      <a href="#">15</a>
                    </li> */}
                  </ul>
                  
                  <div className="thumb">
                    <Image
                      width={692}
                      height={414}
                      className="w-100 h-100 cover"
                      src={
                        blog.logoimage
                          ? `${process.env.NEXT_PUBLIC_API_URL}${blog.logoimage}`
                          : `${process.env.NEXT_PUBLIC_API_URL}public/assets/images/thumbnail.webp`
                      }
                      alt= {`${blog.title}`}
                      unoptimized
                    />
                  </div>

                  <div className="details">
                  <div dangerouslySetInnerHTML={{ __html: blog?.description }} />

                  </div>
                 
                </div>
          
              </div>
              {/* End .main_blog_post_content */}

             
            </div>
            {/* End .col */}

            <div className="col-lg-4">
              <BlogSidebar />
            </div>
            {/* End Sidebar column */}
          </div>
          {/* End .row */}
        </div>
        {/* End .container */}
      </section>

      {/* <!-- Our Footer --> */}
      <section className="footer_one">
        <div className="container">
          <div className="row">
          <Footer showBox={showBox} setShowBox={setShowBox} />
          </div>
        </div>
      </section>

      {/* <!-- Our Footer Bottom Area --> */}
      <section className="footer_middle_area pt15 pb15">
        <div className="container">
          <CopyrightFooter />
        </div>
      </section>
    </>
  );
};

// export default BlogDetailsDynamic;

export default ListingDynamicDetailsV1;
