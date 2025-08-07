'use client'

import Image from "next/image";
import Link from "next/link";
import { useEffect, useState } from "react";
import CallToAction from "../common/CallToAction";
import CopyrightFooter from "../common/footer/CopyrightFooter";
import Footer from "../common/footer/Footer";
import Header from "../common/header/DefaultHeader";
import MobileMenu from "../common/header/MobileMenu";
import TabDetailsContent from "@/components/market-trends/TabDetailsContent";
import PriceCards from "@/components/market-trends/PriceCards";
import PopupSignInUp from "../common/PopupSignInUp";
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

      {/* <!-- Agent Single Grid View --> */}
      <section className="market-trends our-agent-single bgc-f7 pb30-991 mt85 md-mt0">
        <div className="container">
          <div className="row">
            <div className="col-md-12 col-lg-12">
              <div className="row">
                <div className="col-lg-12">
                  <div className="details">
                      <div className="fp_footer text-center">
                        <h1>Insights into India’s Real Estate Market and Property Rates</h1>
                      </div>
                      {/* End .fp_footer */}
                  </div>
                  {/* End .feat_property */}
                  <PriceCards />
                  <div className="shop_single_tab_content style2 mt30">
                    <TabDetailsContent />
                  </div>
                </div>
                {/* End .col-12 */}
              </div>
            </div>
            {/* End .col-md-12 col-lg-8 content left side */}

            {/* <div className="col-lg-4 col-xl-4">
              <Sidebar/>
            </div> */}
            {/* End .col-lg-4 col-xl-4 content left side */}
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
