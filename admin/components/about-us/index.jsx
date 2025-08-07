"use client"; 
import { useEffect, useState } from "react";
import TalktoExpert from "../common/TalktoExpert";
import CopyrightFooter from "../common/footer/CopyrightFooter";
import Footer from "../common/footer/Footer";
import Header from "../common/header/DefaultHeader";
import MobileMenu from "../common/header/MobileMenu";
import Partners from "../common/Partners";
import PopupSignInUp from "../common/PopupSignInUp";
import WhyChoose from "../common/WhyChoose";
import Testimonial from "../common/Testimonial";
import BreadCrumbBanner from "@/components/about-us/BreadCrumbBanner";
import Link from "next/link";
import Image from "next/image";
import Team from "./Team";
import OurMission from "./OurMission";
import { getTestimonialTableData } from "@/api/frontend/testimonial";

const index = () => {
  const [showBox, setShowBox] = useState(false);
  const [showFullBio, setShowFullBio] = useState(false);
  const [showFullBioAmit, setShowFullBioAmit] = useState(false);
  const [showFullBioDeepain, setShowFullBioDeepain] = useState(false);
  const [testimonials, setFindTestimonial] = useState([]);
        
          const fetchFindTestimonial = async () => {
            const data = await getTestimonialTableData();
            
            setFindTestimonial(data);
          };
          useEffect(() => {
            fetchFindTestimonial();
          }, []); 
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
      <section className="commited-to-excellence mt-0 pb-0">
        <div className="container">
          <div className="row">
            <div className="col-lg-8 offset-lg-2">
              <div className="main-title text-center">
                <h2 className="mt0 color-main">Who We Are</h2>
                <h2 className="mt0 mb0">Committed to Excellence</h2>
              </div>
            </div>
          </div>
          <div className="row">
            <div className="col-lg-10 offset-lg-1">
              <div className="who-we-are flex-column">
                <div>
                  <p>Buying a property is more than a transaction—it’s a milestone filled with hope, ambition, and personal meaning. At <strong>WEGROW INFRAVENTURES PRIVATE LIMITED,</strong> we understand the emotional weight of this journey.  That’s why we don’t just offer guidance; we stand by you as trusted advisors. Whether you’re searching for your dream home or a secure investment, our focus is to make the process seamless, transparent, and empowering. We serve clients across Delhi, Gurgaon, and Noida—helping them make real estate decisions that are not just smart, but deeply meaningful.</p>
                  <p>For investors and business owners, real estate is a strategic move—one that requires market foresight, calculated risk, and long-term vision. At <strong>WEGROW INFRAVENTURES,</strong> we provide data-backed insights, commercial expertise, and access to high-yield properties across thriving urban corridors. Whether it’s retail spaces, SCO plots, or premium office locations, we help you build a strong, diversified portfolio. With a deep understanding of zoning regulations, leasing models, and asset performance, we don't just close deals—we craft investment journeys that deliver sustainable returns.</p>
                  <p>At <strong>WEGROW INFRAVENTURES,</strong> we’re not just helping you buy property we’re helping you grow your future.</p>

                  <div className="view-all">
                    <Link href="#team" className="btn btn-primary">
                      <span className="title">Meet Our Team</span>
                    </Link>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
      <section className="about-wegrow mtop-80">
        <div className="container">
          {/* <div className="row">
            <div className="col-lg-8 offset-lg-2">
              <div className="main-title text-center">
                <h2 className="mt0 color-main">Face of wegrow</h2>
                <h2 className="mt0">From the Founders' Desk</h2>
                
              </div>
            </div>
          </div> */}

          <div className="row">
            <OurMission />
          </div>
        </div>
      </section>
      <section className="about-section">
        <div className="container">      
          <div className="row mt0">
            <div className="col-lg-6 offset-lg-3">
              <div className="main-title text-center">
                <h2>Why Choose Us</h2>
                <p>Your Trusted Partner in Property Growth</p>
              </div>
            </div>
          </div>

          <div className="row">
            <WhyChoose />
          </div>
        </div>
      </section>
       {/* <!-- End Text Content --> */}

      {/* <!-- Our Team --> */}
      
      <section className="our-team bgc-f7 scroll-mt-80px" id="team">
        <div className="container">
          <div className="director-desk mt-0 pt-0">
                <div className="row align-items-center">
                  <div className="col-lg-5 col-md-12 order-1 order-lg-2">
                    <div className="image-wrapper">
                      <Image
                        src="/assets/images/about/ankit.JPG"
                        alt="Ankit Goyat"
                        layout="responsive"
                        width={700}
                        height={980}
                        className="about-image"
                      />
                    </div>
                  </div>
                  <div className="col-lg-7 col-md-12 order-2 order-lg-1">
                    <div className="who-we-are">
                      
                          <div className="main-title text-left mb-2">
                            <h2>Founder & Chairman</h2>
                            <p>Expertise : Commercial Projects | Residential Projects | Real Estate Investment | Client-Centric Solutions</p>
                          </div>
                          <p>Mr. Ankit Goyat, the Founder & Chairman of <strong>WEGROW INFRAVENTURES PVT. LTD.,</strong> is a dynamic leader, visionary entrepreneur, and seasoned real estate expert. With over 6 years of experience in the real estate domain, Mr. Goyat has carved a niche for himself, particularly in the evolving markets of SCO (Shop-Cum-Office) and industrial plots across Gurgaon and Delhi NCR.</p>
                          <p>His journey is rooted in a clear and compelling mission — to empower clients through deep market insights, transparent consultation, and unmatched service quality. Over the years, this commitment has helped hundreds of buyers and investors make profitable and informed property decisions, driving consistent growth for both clients and the company.</p>
                          <p><strong>Visionary Leadership</strong></p>
                              <p>Under Mr. Goyat’s forward-thinking leadership, <strong>WEGROW INFRAVENTURES PVT. LTD.</strong> has transformed into a client-centric, performance-driven real estate consultancy. His sharp market analysis, personalized approach, and strategic mindset have enabled the company to deliver tailored solutions that align with the financial goals and future aspirations of every client.
                              </p>

                          {showFullBio && (
                            <>
                            
                              <p><strong>Industry Expertise</strong></p>
                              <p>Specializing in SCO developments, industrial land, and high-return investment portfolios, Mr. Goyat brings hands-on expertise and a deep understanding of regional market trends. His ability to identify and capitalize on emerging opportunities while mitigating associated risks has established him as a trusted name in the real estate ecosystem.
                              </p>
                              <p><strong>Commitment to Relationships & Results</strong></p>
                              <p>Alongside his strategic insight, Mr. Ankit Goyat is widely recognized for his integrity, ethical practices, and client-first philosophy. He has built long-standing relationships across the industry with investors, end-users, and developers — driven by transparency, results, and trust.
                              </p>
                              <p><strong>Shaping the Future of Real Estate:</strong></p>
                              <p>Through <strong>WEGROW INFRAVENTURES PVT. LTD.,</strong> Mr. Goyat is not just facilitating property transactions — he’s creating value, building legacies, and reshaping how real estate is experienced and delivered. His journey continues to inspire a new generation of real estate professionals committed to growth, innovation, and excellence.
                              </p>
                              <p><strong>Message:</strong></p>
                              <p>The foundation of the future is built on today’s decisions
                              </p>
                            </>
                          )}
                          <div className="view-all" style={{position:'static',transform:'none'}}>
                              <button
                                className="btn btn-primary"
                                onClick={() => setShowFullBio(!showFullBio)}
                              >
                                {showFullBio ? "Read Less" : "Read More"}
                              </button>
                          </div>
                        </div> 
                  </div>
                </div>
            </div>
            <div className="director-desk mt-5 pt-5">
                <div className="row align-items-center">
                  <div className="col-lg-5 col-md-12">
                    <div className="image-wrapper">
                      <Image
                        src="/assets/images/about/amit.jpg"
                        alt="Amit Malik"
                        layout="responsive"
                        width={700}
                        height={980}
                        className="about-image"
                      />
                    </div>
                  </div>
                  <div className="col-lg-7 col-md-12">
                    <div className="who-we-are">
                      
                          <div className="main-title text-left mb-2">
                            <h2>Co-Founder & Chairman</h2>
                            {/* <p>Expertise : Commercial Projects | Residential Projects | Real Estate Investment | Client-Centric Solutions</p> */}
                          </div>
                          <p>Mr. Amit Malik, Co-Founder & Chairman of <strong>WEGROW INFRAVENTURES PVT. LTD.,</strong> brings over 7 years of focused expertise in the commercial real estate domain. With an unwavering commitment to precision, insight, and value-driven service, Mr. Amit Malik has played an instrumental role in helping clients capitalize on high-yield investments in retail, office spaces, and SCO (Shop-Cum-Office) projects across Gurgaon and Delhi NCR.</p>
                          <p>His professional journey is driven by a singular belief — that real estate success lies in knowledge, timing, and trust. This belief continues to guide his strategic decisions and client engagements, shaping <strong>WEGROW INFRAVENTURES PVT. LTD.</strong> reputation as a forward-thinking real estate consultancy.</p>
                          <p><strong>Focused Leadership:</strong></p>
                              <p>Under Mr. Amit Malik’s insightful leadership, <strong>WEGROW INFRAVENTURES PVT. LTD.</strong> has expanded its commercial footprint with purpose and precision. He brings clarity to complex market dynamics and offers tailored solutions that align with each client’s risk appetite and investment goals. His strategic mindset has made him a trusted advisor for investors looking to grow wealth in the commercial segment.
                              </p>

                          {showFullBioAmit && (
                            <>
                            
                              <p><strong>Domain Expertise:</strong></p>
                              <p>Mr. Amit Malik’s specialization in commercial real estate, especially in SCO and mixed-use developments, gives him a unique edge in a fast-evolving market. His hands-on experience and deep understanding of demand-supply trends help him evaluate opportunities with accuracy and foresight — ensuring clients invest in assets with long-term potential and secure returns.
                              </p>
                              <p><strong>Commitment to Relationships & Results</strong></p>
                              <p>With a reputation built on professionalism, market acumen, and ethical conduct, Mr. Amit Malik continues to guide clients with integrity and insight. His strong communication, result-oriented strategies, and commitment to service excellence make him a key pillar in <strong>WEGROW INFRAVENTURES PVT. LTD.</strong> continued growth.
                              </p>
                              <p><strong>Shaping the Future of Real Estate:</strong></p>
                              <p>Through his work at <strong>WEGROW INFRAVENTURES PVT. LTD.,</strong> Mr. Malik isn’t just facilitating commercial deals — he’s driving smart investments, fostering client trust, and helping shape sustainable prosperity in the real estate landscape.
                              </p>
                              <p><strong>Message:</strong></p>
                              <p>Those who engage rightly in property and wealth do not face decline. Prosperity gained through integrity endures.
                              </p>
                            </>
                          )}
                          <div className="view-all" style={{position:'static',transform:'none'}}>
                              <button
                                className="btn btn-primary"
                                onClick={() => setShowFullBioAmit(!showFullBioAmit)}
                              >
                                {showFullBioAmit ? "Read Less" : "Read More"}
                              </button>
                          </div>
                        </div> 
                  </div>
                  
                </div>
            </div>
            <div className="director-desk mt-5 pt-5">
                <div className="row align-items-center">
                  <div className="col-lg-5 col-md-12 order-1 order-lg-2">
                    <div className="image-wrapper">
                      <Image
                        src="/assets/images/about/deepain.jpg"
                        alt="Deepain Bansal"
                        layout="responsive"
                        width={700}
                        height={980}
                        className="about-image"
                      />
                    </div>
                  </div>
                  <div className="col-lg-7 col-md-12 order-2 order-lg-1">
                    <div className="who-we-are">
                      
                          <div className="main-title text-left mb-2">
                            <h2>Associate Director</h2>
                            {/* <p>Expertise : Commercial Projects | Residential Projects | Real Estate Investment | Client-Centric Solutions</p> */}
                          </div>
                          <p>Mr. Deepain Bansal, Associate Director at <strong>WEGROW INFRAVENTURES PVT. LTD.,</strong> is a well-established expert in the real estate sector with over 7 years of experience, specializing in residential properties and plotted developments across Delhi NCR. With a strong client-first approach and deep market understanding, Mr. Bansal has guided hundreds of homebuyers and investors in making smart, future-focused property decisions.</p>
                          <p><strong>Client-Centric Vision:</strong></p>
                              <p>Mr. Bansal believes that real estate isn’t just about property—it’s about people, trust, and long-term value. His mission is to simplify the buying journey with transparency, clarity, and personalized service. Whether it's helping families find their forever homes or investors secure land in high-growth zones, he ensures every transaction is smooth and meaningful.
                              </p>

                          {showFullBioDeepain && (
                            <>
                            
                              <p><strong>Residential & Plot Expertise:</strong></p>
                              <p>Specializing in plotted developments and residential assets, Mr. Bansal has an exceptional grasp of market trends, legal due diligence, and emerging micro-markets in Gurgaon, Delhi, and surrounding areas. His strategic insights and ability to identify high-ROI opportunities have consistently delivered strong returns for clients—both end-users and investors.
                              </p>
                              <p><strong>Leadership Built on Integrity:</strong></p>
                              <p>Known for his ethical practices, transparent communication, and dedication to results, Mr. Bansal has earned lasting relationships across the industry. His role as Associate Director reflects his leadership in delivering tailored solutions that align with clients' financial goals and lifestyle aspirations.
                              </p>
                              <p><strong>Turning Property Into Prosperity:</strong></p>
                              <p>At <strong>WEGROW INFRAVENTURES,</strong> Mr. Bansal is not just closing deals—he’s building futures, helping clients make decisions that stand the test of time. His journey continues to inspire a new era of property ownership rooted in growth, reliability, and impact.
                              </p>
                              <p><strong>Message:</strong></p>
                              <p>Finding the right home is not just a transaction—it’s a transformation.
                              </p>
                            </>
                          )}
                          <div className="view-all" style={{position:'static',transform:'none'}}>
                              <button
                                className="btn btn-primary"
                                onClick={() => setShowFullBioDeepain(!showFullBioDeepain)}
                              >
                                {showFullBioDeepain ? "Read Less" : "Read More"}
                              </button>
                          </div>
                        </div> 
                  </div>
                </div>
            </div>
          <div className="row mt-5">
            <div className="col-lg-6 offset-lg-3">
              <div className="main-title text-center">
                <h2>Our Team</h2>
                <p>Experience excellence with our expert team.</p>
              </div>
            </div>
          </div>
          <div className="row">
            <div className="col-lg-12">
              <div className="team_slider gutter-x15">
                <Team />
              </div>
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
            <div className="col-lg-6 offset-lg-3">
              <div className="testimonial_grid_slider style2 gutter-x15">
                <Testimonial testimonials={testimonials}/>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* <!-- Our Partners --> */}
      <section id="our-partners" className="our-partners">
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
          <TalktoExpert />
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
