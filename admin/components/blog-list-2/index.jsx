"use client"; 
import { useEffect, useState } from "react";
import BlogSidebar from "../common/blog/BlogSidebar";
// import Pagination from "../common/blog/Pagination";
import CopyrightFooter from "../common/footer/CopyrightFooter";
import Footer from "../common/footer/Footer";
import Header from "../common/header/DefaultHeader";
import MobileMenu from "../common/header/MobileMenu";
import PopupSignInUp from "../common/PopupSignInUp";
import BreadCrumbBlog from "./BreadCrumbBlog";
import BreadCrumbBanner from "@/components/blog-list-2/BreadCrumbBanner";
import Blog from "./Blog";

const index = ({blogs}) => {
  const [showBox, setShowBox] = useState(false);
  return (
    <>
      {/* <!-- Main Header Nav --> */}
      <Header />

      {/* <!--  Mobile Menu --> */}
      <MobileMenu />

      {/* <!-- Modal --> */}
      <PopupSignInUp />

      <BreadCrumbBanner />

      {/* <!-- Main Blog Post Content --> */}
      <section className="blog_post_container bgc-f7">
        <div className="container">
          <div className="row">
            <div className="col-xl-6">
              <BreadCrumbBlog />
            </div>
          </div>
          {/* End .row */}

          <div className="row">
            <div className="col-lg-8">
              <div className="row">
                <Blog blogs={blogs}/>
                {/* End blog item */}
              </div>
              {/* End .row */}

              <div className="row">
                <div className="col-lg-12">
                  {/* <div className="mbp_pagination mt20">
                    <Pagination />
                  </div> */}
                  {/* End .mbp_pagination */}
                </div>
              </div>
              {/* End .row */}
            </div>
            {/* End .col */}

            <div className="col-lg-4 col-xl-4">
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

export default index;
