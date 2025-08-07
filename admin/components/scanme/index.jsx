"use client"; 
import { useEffect, useState } from "react";
import TalktoExpert from "../common/TalktoExpert";
import CopyrightFooter from "../common/footer/CopyrightFooter";
import Footer from "../common/footer/Footer";
import Header from "../common/header/DefaultHeader";
import MobileMenu from "../common/header/MobileMenu";
import PopupSignInUp from "../common/PopupSignInUp";




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
      {/* <BreadCrumbBanner /> */}

      {/* <!-- About Text Content --> */}
      <section className="social-icons mt-5 pb-0">
            <div className="container">
            <div className="row">
              <div className="col-lg-8 offset-lg-2">
                <div className="main-title text-center">
                  <h2 className="mt0 color-main">Let’s Get Social</h2>
                  <h2 className="mt0 mb0">Follow WEGROW INFRAVENTURES Online</h2>
                </div>
              </div>
            </div>

            <div className="row align-items-stretch mt-0 mb-80">
              <div className="col-lg-6 col-12 d-flex">
                  <div className="social-icon-inner">
                      <ul className="list-unstyled d-flex flex-column justify-content-center gap-3 h-100">
                        <li>
                        <a
                          href="https://wegrowinfraventures.com/"
                          className="social-icon website"
                          target="_blank"
                          rel="noopener noreferrer"
                        >
                          <span><i className="fa fa-globe" aria-hidden="true"></i></span>
                          <span>Website</span>
                        </a>
                      </li>
                      <li>
                        <a
                          href="https://www.facebook.com/WeGrowInfraventurespvtltd/"
                          className="social-icon facebook"
                          target="_blank"
                          rel="noopener noreferrer"
                        >
                          <span><i className="fa fa-facebook" aria-hidden="true"></i></span>
                          <span>Facebook</span>
                        </a>
                      </li>
                      <li>
                        <a
                          href="https://x.com/wegrowinfra/"
                          className="social-icon twitter"
                          target="_blank"
                          rel="noopener noreferrer"
                        >
                          <span><i className="fa fa-x-twitter" aria-hidden="true"></i></span>
                          <span>Twitter</span>
                        </a>
                      </li>
                      <li>
                        <a
                          href="https://www.linkedin.com/company/wegrow-infraventures-pvt-ltd/"
                          className="social-icon linkedin"
                          target="_blank"
                          rel="noopener noreferrer"
                        >
                          <span><i className="fa fa-linkedin" aria-hidden="true"></i></span>
                          <span>LinkedIn</span>
                        </a>
                      </li>
                      <li>
                        <a
                          href="https://youtube.com/yourchannel"
                          className="social-icon youtube"
                          target="_blank"
                          rel="noopener noreferrer"
                        >
                          <span><i className="fa fa-youtube" aria-hidden="true"></i></span>
                          <span>YouTube</span>
                        </a>
                      </li>
                      <li>
                        <a
                          href="https://www.instagram.com/wegrowinfraventures/"
                          className="social-icon instagram"
                          target="_blank"
                          rel="noopener noreferrer"
                        >
                          <span><i className="fa fa-instagram" aria-hidden="true"></i></span>
                          <span>Instagram</span>
                        </a>
                      </li>
                      
                    </ul>
                  </div>
              </div>
             
              <div className="col-lg-6 col-12">
                 <div className="map-responsive w-100">
                    <iframe
                      src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d112301.12049947218!2d76.84535169726564!3d28.40688249999999!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x390d3de859be2c61%3A0x69df6543869bfd1f!2sWEGROW%20INFRAVENTURES%20PRIVATE%20LIMITED!5e0!3m2!1sen!2sin!4v1748611964804!5m2!1sen!2sin"
                      width="100%"
                      height="100%"
                      style={{ border: 0 }}
                      allowFullScreen=""
                      loading="lazy"
                      referrerPolicy="no-referrer-when-downgrade"
                    ></iframe>
                  </div>
              </div>
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
