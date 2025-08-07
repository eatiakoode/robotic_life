'use client'

import Image from "next/image";
import Link from "next/link";
import { useEffect, useState } from 'react';
import CallToAction from "../common/CallToAction";
import CopyrightFooter from "../common/footerland/CopyrightFooter";
import Footer from "../common/footerland/Footer";
import Header from "../common/headerland/DefaultHeader";
import MobileMenu from "../common/headerland/MobileMenu";
// import LandFeaturedProperties from "./LandFeaturedProperties";
import FloorPlan from "./FloorPlan";
import PaymentPlanSection from "./PaymentPlanSection";
// import FloorPlanSection from "../components/landing-page/FloorPlanSection";
import Amenities from "./Amenities";
import Partners from "../common/Partners";
import PopupSignInUp from "../common/PopupSignInUp";
// import WhyChoose from "../common/WhyChoose";
import FaqContent from "./FaqContent";
import { getFaqTableData } from "@/api/frontend/faq";
import Testimonial from "./Testimonial";
import BannerSection from "./BannerSection";
import { getLandingpageBySlug } from "@/api/frontend/landingpage";

// import Team from "./Team";
// import OurMission from "./OurMission";

const index = ({params}) => {
  const id = params.id;
  const [faqs, setFaqs] = useState([]);
  const [showBox, setShowBox] = useState(false);
  const [landingpage, setLandingpage] = useState([]);
  useEffect(() => {
    const fetchFaqs = async () => {
      try {
        const filter ={
     
      "limit":1000,
      "page":1
    };
        const data = await getFaqTableData(filter);
        setFaqs(data?.data?.items);
      } catch (error) {
        console.error('Failed to fetch FAQs:', error);
      }
    };

    fetchFaqs();
  }, []);
  useEffect(() => {
        if (!id) return;  
      //   alert(id)    
        const fetchLandingpage = async () => {
          try {
            const data = await getLandingpageBySlug(id);
           
            setLandingpage(data.data)
           
          } catch (error) {
            console.error("Error fetching Blog:", error);
          } finally {
            // setLoading(false);
          }
        };
    
        fetchLandingpage();
      }, [id]);
  return (
    <>
      {/* <!-- Main Header Nav --> */}
      <Header />

      {/* <!--  Mobile Menu --> */}
      <MobileMenu />

      {/* <!-- Modal --> */}
      <PopupSignInUp />

      {/* <!-- Inner Page Breadcrumb --> */}
      <BannerSection landingpage={landingpage} />
      
      {/* <!-- About Text Content --> */}
      <section id="about" className="para-land aboutland about-section scroll-mt-80px border-btm">
        <div className="container">
          <div className="row">
            <div className="col-lg-5 col-xl-6">
              {/* <div className="main-title text-left">
               <Image
                    width={768}
                    height={512}
                    priority
                    className="w100 cover"
                    src="/assets/images/hotproperties/1.webp"
                    alt="image" className="img-fluid"
                  />
              </div> */}
              <div className="main-title text-left pb-0">
                <div
                  className="story-two_image wow fadeInLeft"
                  data-wow-delay="0ms"
                  data-wow-duration="1500ms">
                  <Image
                    // src="/assets/images/hotproperties/about.webp"
                    src={
                      landingpage?.aboutimage
                        ? `${process.env.NEXT_PUBLIC_API_URL}${landingpage?.aboutimage}`
                        : "/assets/images/hotproperties/about.webp"
                    }
                    alt= {`${landingpage?.abouttitle}`}
                    unoptimized
                    width={1200}
                    height={1000}
                    className="img-fluid w-full h-auto object-cover"
                  />
                </div>

                <div
                  className="story-two_image-two wow fadeInRight"
                  data-wow-delay="0ms"
                  data-wow-duration="1500ms">
                  <Image
                  src={
                    landingpage?.aboutimage
                      ? `${process.env.NEXT_PUBLIC_API_URL}${landingpage?.aboutimage}`
                      : "/assets/images/hotproperties/about-in.webp"
                  }
                  alt= {`${landingpage?.abouttitle}`}
                  unoptimized
                    width={800}
                    height={1000}
                    className="img-fluid w-full h-auto object-cover"
                  />
                </div>
              </div>
            </div>
            <div className="col-lg-7 col-xl-6">
              <div className="main-title text-left">
                {/* <h2 className="mt0 color-main">About Ankit Goyat</h2>
                <h2 className="mt0">Expertise : Commercial Projects | Residential Projects | Real Estate Investment | Client-Centric Solutions</h2> */}
                <h3 className="mt0">About Us</h3>
                <h2 className="mt0 color-main">{landingpage.abouttitle}</h2>
                {/* <h2 className="mt0">From the Founders' Desk</h2> */}
                
                <div dangerouslySetInnerHTML={{ __html: landingpage?.aboutdescription }} />
              </div>
              
            </div>
             
          </div>
        </div>
      </section>
          {/* End .row */}

        <PaymentPlanSection landingpage={landingpage}/>
          
         <section id="amenities" className="amenityland property-city scroll-mt-80px border-btm">
            <div className="container">
              <div className="row">
                <div className="col-lg-6 offset-lg-3">
                  <div className="main-title text-center">
                    <h2>Amenities</h2>
                    <p>Facilities You Don’t Want To Miss Out On</p>
                  </div>
                </div>
              </div>
              {/* End .row */}

              <div className="row">
                <Amenities landingpage={landingpage}/>
              </div>
              {/* End .row */}
            </div>
          </section>

          
          <FloorPlan landingpage={landingpage}/>
                 
          <section id="gallery" className="feature-property-home6 scroll-mt-80px border-btm">
              <div className="container">
                <div className="row">
                  <div className="col-lg-12">
                    <div className="main-title mb40">
                      <h2>Gallery</h2>
                      
                    </div>
                  </div>
                  {/* End .col */}
                </div>
                {/* End .row */}
              </div>
              {/* End .container */}

              <div className="feature_property_home6_slider ">
                <div className="container ml--xxl-0">
                  <div className="row gutter-x15">
                    {/* <LandFeaturedProperties />
                     */}
                     {landingpage?.galleryimages?.slice(0, 20).map((item, idx) => (
                     <div className="col-lg-4" key={idx}>
                          <div className="properti_city home6">
                            <div className="thumb">
                              <Image
                                width={768}
                                height={512}
                                className="img-fluid"
                                src={
                                  item.image
                                    ? `${process.env.NEXT_PUBLIC_API_URL}${item.image}`
                                    : "/assets/images/hotproperties/1.webp"
                                }
                                alt= {`${item.title}`}
                                unoptimized
                                
                              />
                            </div>
                          </div>
                      </div>
                      ))}
                      
                  </div>
                </div>
              </div>
          </section>

          {/* <!-- Our Testimonials --> */}
          <section className="our-testimonial home5">
            <div className="container">
              <div className="row">
                <div className="col-lg-6 offset-lg-3">
                  <div className="main-title text-center mb20">
                    <h2 className="color-white">Testimonials</h2>
                    <p className="color-white">Here could be a nice sub title</p>
                  </div>
                </div>
              </div>
              <div className="row">
                <div className="col-lg-8 offset-lg-2">
                  <div className="testimonial_grid_slider style2 gutter-x15">
                    <Testimonial/>
                  </div>
                </div>
              </div>
            </div>
          </section>
          
          <section className="our-faq scroll-mt-80px bgc-f7" id="faq">
            <div className="container">
              <div className="row">
                <div className="col-lg-6 offset-lg-3">
                  <div className="main-title text-center">
                    <h2 className="mt0">Frequently Asked Questions</h2>
                  </div>
                </div>
              </div>
              {/* End .row */}

              <div className="row">
                <div className="col-lg-10 offset-lg-1">
                  <div className="faq_content">
                    <div className="faq_according">
                      <FaqContent landingpage={landingpage}/>
                    </div>
                  </div>
                </div>
              </div>
              {/* End .row */}
            </div>
          </section>
       

      

      {/* <!-- Our Partners --> */}
      <section id="our-partners" className="spl_partners our-partners">
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
      </section>

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
      <section className="footer_middle_area pt20 pb20">
        <div className="container">
          <CopyrightFooter />
        </div>
      </section>
    </>
  );
};

export default index;
