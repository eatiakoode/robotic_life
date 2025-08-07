'use client'

import Image from "next/image";
import Link from "next/link";
import { useEffect, useState } from "react";
import CallToAction from "../common/CallToAction";
import CopyrightFooter from "../common/footer/CopyrightFooter";
import Footer from "../common/footer/Footer";
import Header from "../common/header/DefaultHeader";
import MobileMenu from "../common/header/MobileMenu";
import CityDetailsContent from "@/components/city-glimpse/CityDetailsContent";
import NeedHelp from "@/components/city-glimpse/NeedHelp";
import PopupSignInUp from "../common/PopupSignInUp";
import BreadCrumbBanner from "./BreadCrumbBanner";

import { getCityTableData,getCityTableglimpseData } from "@/api/frontend/city";
const index = () => {
  const [showBox, setShowBox] = useState(false);
  const [cities, setCities] = useState([]);
  
  const [citiedetail, setCitieDetail] = useState([]);
      const [selectedCity, setSelectedCity] = useState("");
     useEffect(() => {
  const fetchCities = async () => {
    try {
      const response = await getCityTableData();
      const citiesData = response.data || [];
      setCities(citiesData);
      if (citiesData.length > 0) {
        setSelectedCity(citiesData[0]._id); // Set selectedCity to first city _id
      }
    } catch (err) {
      console.error("Error fetching cities:", err);
    }
  };
  fetchCities();
}, []); // empty dependency array => runs once on mount

  useEffect(() => {
  const fetchCitiesDetail = async () => {
    if (!selectedCity) return;
    try {
      const response = await getCityTableglimpseData(selectedCity);
      setCitieDetail(response.data || []);
    } catch (err) {
      console.error("Error fetching city details:", err);
    }
  };
  fetchCitiesDetail();
}, [selectedCity]);

    const handleCityChange = (e) => {
      setSelectedCity(e.target.value);
      const fetchCitiesDetail = async () => {
        try {
          const response = await getCityTableglimpseData(e.target.value);
          setCitieDetail(response.data || []);
        } catch (err) {
          console.error("Error fetching Country:", err);
        }
      };
      fetchCitiesDetail();
    };
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
                  <div className="search_option_two">
                      <div className="candidate_revew_select">
                      <select
                        id="citySelect"
                        className="custom-narrow-select selectpicker w100 form-select show-tick"
                        value={selectedCity}
                        onChange={handleCityChange}
                        data-live-search="true"
                        data-width="100%"
                      >
                        {cities.map((city) => (
                          <option key={city._id} value={city._id}>
                            {city.title}
                          </option>
                        ))}
                      </select>
                      </div>
                    </div>
                  <div className="details">
                      <div className="fp_footer text-center">
                        <h1>City Glimpse: Key Insights into India’s Property Trends</h1>
                      </div>
                      {/* End .fp_footer */}
                  </div>
                  {/* End .feat_property */}
                  
                  <div className="shop_single_tab_content style2 mt30">
                    <div className="row">
                      <div className="col-lg-8">
                        <CityDetailsContent citiedetail={citiedetail} />
                      </div>
                      <div className="col-lg-4">
                          <NeedHelp />
                      </div>
                    </div>
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
