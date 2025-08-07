'use client'

import Image from "next/image";
import Link from "next/link";
import { useEffect, useState } from "react";
import CallToAction from "../common/CallToAction";
import CopyrightFooter from "../common/footer/CopyrightFooter";
import Footer from "../common/footer/Footer";
import Header from "../common/header/DefaultHeader";
import MobileMenu from "../common/header/MobileMenu";
import Partners from "../common/Partners";
import PopupSignInUp from "../common/PopupSignInUp";
import WhyChoose from "../common/WhyChoose";
import BreadCrumbBanner from "./BreadCrumbBanner";


const index = () => {
  const [showBox, setShowBox] = useState(false);  
  return (
    <>
      {/* <!-- Main Header Nav --> */}
      <Header />

      {/* <!--  Mobile Menu --> */}
      <MobileMenu />

      {/* <!-- Modal --> */}
      <PopupSignInUp />

      {/* <!-- Inner Page Breadcrumb --> */}
      <BreadCrumbBanner />

      {/* <!-- About Text Content --> */}
      <section className="news-insights about-section border-btm">
        <div className="container">
          <div className="main-title text-center">
            <h2>Market Knowledge</h2>
            <p>Uncover key information to guide your property investments</p>
          </div>
          <div className="row">
                  <div className="col-lg-4">
                    <Link href="/news-and-insights/market-trends" className="property-block_one style-two">
                        <div className="property-block_one-inner">
                          <div className="thumb">
                            <Image
                              width={768}
                              height={512}
                              className="img-fluid"
                              // src="/assets/images/news-insights/price-trends.svg"
                              src={`${process.env.NEXT_PUBLIC_API_URL}public/assets/images/news-insights/price-trends.svg`}
                              alt="image"
                              />
                          </div>
                          <div className="property-block_one-content wow fadeInUp animated">
                            <div className="property-block_one-location">Market Trends</div>
                            <h4 className="property-block_one-heading">Stay updated with property rates and pricing trends in top locations
                              </h4>
                            {/* <ul className="property-block_one-info">
                              <li><span>₹ 3.65 Cr* Onwards</span></li>
                            </ul> */}
                          </div>
                        </div>
                      </Link>
                  </div>
                  <div className="col-lg-4">
                    <Link href="/news-and-insights/city-glimpse" className="property-block_one style-two">
                        <div className="property-block_one-inner">
                          <div className="thumb">
                            <Image
                              width={768}
                              height={512}
                              className="img-fluid"
                              // src="/assets/images/news-insights/city-insights.svg"
                              src={`${process.env.NEXT_PUBLIC_API_URL}public/assets/images/news-insights/city-insights.svg`}

                              alt="image"
                              />
                          </div>
                          <div className="property-block_one-content wow fadeInUp animated">
                            <div className="property-block_one-location">City Glimpse</div>
                            <h4 className="property-block_one-heading">Gain insights into leading cities before you invest
                              </h4>
                            {/* <ul className="property-block_one-info">
                              <li><span>₹ 3.65 Cr* Onwards</span></li>
                            </ul> */}
                          </div>
                        </div>
                      </Link>
                  </div>
                  <div className="col-lg-4">
                    <Link href="/blogs" className="property-block_one style-two">
                        <div className="property-block_one-inner">
                          <div className="thumb">
                            <Image
                              width={768}
                              height={512}
                              className="img-fluid"
                              // src="/assets/images/news-insights/housing-research.svg"
                              src={`${process.env.NEXT_PUBLIC_API_URL}public/assets/images/news-insights/housing-research.svg`}
                              
                              alt="image"
                              />
                          </div>
                          <div className="property-block_one-content wow fadeInUp animated">
                            <div className="property-block_one-location">Real Estate Reports</div>
                            <h4 className="property-block_one-heading">Explore detailed research on India’s residential property market
                              </h4>
                            {/* <ul className="property-block_one-info">
                              <li><span>₹ 3.65 Cr* Onwards</span></li>
                            </ul> */}
                          </div>
                        </div>
                      </Link>
                  </div>
          </div>
          {/* End .row */}

          

          {/* <div className="row mt80">
            <div className="col-lg-6 offset-lg-3">
              <div className="main-title text-center">
                <h2>Why Choose Us</h2>
                <p>Your Trusted Partner in Property Growth</p>
              </div>
            </div>
          </div> */}
          {/* End .row */}

          {/* <div className="row">
            <WhyChoose />
          </div> */}
          {/* End .row */}
        </div>
      </section>

      

      {/* <!-- Our Partners --> */}
      {/* <section id="our-partners" className="our-partners">
        <div className="container">
          <div className="row">
            <div className="col-lg-6 offset-lg-3">
              <div className="main-title text-center">
                <h2>Our Partners</h2>
                <p>We only work with the best companies around the globe</p>
              </div>
            </div>
          </div>
          <div className="row">
            <Partners />
          </div>
        </div>
      </section> */}

      {/* <!-- Start Call to Action --> */}
      <section className="start-partners bgc-thm pt50 pb50">
        <div className="container">
          <CallToAction />
        </div>
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
