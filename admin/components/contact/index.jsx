"use client";

import { useState, useEffect } from "react";
import Image from "next/image";
import CallToAction from "../common/CallToAction";
import CopyrightFooter from "../common/footer/CopyrightFooter";
import Footer from "../common/footer/Footer";
import Header from "../common/header/DefaultHeader";
import MobileMenu from "../common/header/MobileMenu";
import PopupSignInUp from "../common/PopupSignInUp";
import AddressSidebar from "./AddressSidebar";
import BreadCrumbBanner from "./BreadCrumbBanner";
import Form from "./Form";

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

      {/* <!-- Our Contact --> */}
      <section className="appointment-calendar our-contact pb0 bgc-f7">
        <div className="container">
          <div className="row">
            <div className="col-lg-7 col-xl-8">
              <div className="form_grid">
              <h4 className="mb5">Schedule a Meeting With Us</h4>
                <p>
                Looking to discuss a property or need expert guidance? Pick a date that works for you and book a one-on-one meeting with our real estate professionals.
                </p>
                <Form />
              </div>
            </div>
            {/* End .col */}

            <div className="col-lg-5 col-xl-4">
              <AddressSidebar />
            </div>
          </div>
          {/* End .row */}
        </div>
        {/* End .container */}

        <div className="container-fluid p0 mt50">
          <div className="row">
            <div className="col-lg-12">
              <div className="h600" id="map-canvas">
                <div className="gmap_canvas pe-none">
                  <iframe title="map"
                    className="gmap_iframe" src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3509.4245726061517!2d76.99511767528035!3d28.406443075788975!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x390d3d452f9ad691%3A0xb6d4520f6f2013e2!2sDLF%20CORPORATE%20GREENS%2C%20Southern%20Peripheral%20Rd%2C%20Sector%2074A%2C%20Gurugram%2C%20Haryana%20122004!5e0!3m2!1sen!2sin!4v1753263997313!5m2!1sen!2sin" allowfullscreen="" loading="lazy" referrerpolicy="no-referrer-when-downgrade"></iframe>
                  <iframe
                    
                    src="https://www.google.com/maps/embed?pb=!1m14!1m12!1m3!1d193309.02147838814!2d-74.53513266718751!3d40.79602810000002!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!5e0!3m2!1sen!2sbd!4v1663993365939!5m2!1sen!2sbd"
                  ></iframe>
                  {/* End iframe */}

                  <Image
                    width={32}
                    height={50}
                    className="location-finder"
                    src="/assets/images/location.png"
                    alt="location"
                  />
                </div>
              </div>
            </div>
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
      <section className="footer_middle_area pt15 pb15">
        <div className="container">
          <CopyrightFooter />
        </div>
      </section>
    </>
  );
};

export default index;
