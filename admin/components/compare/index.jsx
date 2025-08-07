'use client'
import CallToAction from "../common/CallToAction";
import CopyrightFooter from "../common/footer/CopyrightFooter";
import Footer from "../common/footer/Footer";
import Header from "../common/header/DefaultHeader";
import MobileMenu from "../common/header/MobileMenu";
import PopupSignInUp from "../common/PopupSignInUp";
import BreadCrumbBanner from "./BreadCrumbBanner";
import ComparePricing from "./ComparePricing";
import { useState, useEffect } from "react";

const index = () => {
  const [propertySelectedComp, setPropertySelectedComp] = useState(() => {
      if (typeof window !== "undefined") {
  
        const stored = localStorage.getItem("propertycompare");
        
        if (stored !== "undefined") {
  
        return stored ? JSON.parse(stored) : [];
        }
      }
      return [];
    });
  
    // const [showBox, setShowBox] = useState(propertySelectedComp.length > 0);
    // const [showBox, setShowBox] = useState(false);
    const [showBox, setShowBox] = useState(false);
  
  
    // Sync localStorage
    useEffect(() => {
      localStorage.setItem("propertycompare", JSON.stringify(propertySelectedComp));
      // setShowBox(propertySelectedComp.length > 0);
    }, [propertySelectedComp]);
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

      {/* <!-- Our Pricing Table --> */}
      <section className="our-pricing bgc-fa">
        <div className="container">
          <div className="row">
            <div className="col-lg-6 offset-lg-3">
              <div className="main-title text-center">
                <h2>Compare Properties</h2>
                <p>Comprehensive support at every stage of your journey</p>
              </div>
            </div>
          </div>
          <div className="row">
            <div className="col-lg-12">
              <div className="compare_cities membership_container">
                <ul className="mc_parent_list">
                  <li className="list-inline-item">
                    <ul className="mc_child_list one">
                      <li>
                        <div className="membership_header dn"></div>
                      </li>                      
                      <li>City</li>
                      <li>Size</li>
                      <li>Beds</li>
                      <li>Parking</li>
                      <li>Year of build</li>
                      <li>Amenities</li>
                      {/* <li>Laundry Room</li> */}
                      <li>Status</li>
                    </ul>
                  </li>
                  <ComparePricing 
                // propertySelectedComp={propertySelectedComp}
                    setPropertySelectedComp={setPropertySelectedComp}
                    setShowBox={setShowBox}/>
                </ul>
                {/* End .mc_parent_list */}
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
          <Footer 
            // propertycompare={propertySelectedComp}
        showBox={showBox}
        setPropertycompare={setPropertySelectedComp} setShowBox={setShowBox} />
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
