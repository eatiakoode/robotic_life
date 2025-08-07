"use client";

import "photoswipe/dist/photoswipe.css";

import { useEffect, useState } from "react";
// import { useRouter, useParams } from "next/navigation";
import CopyrightFooter from "@/components/common/footer/CopyrightFooter";
import Footer from "@/components/common/footer/Footer";
import Header from "@/components/common/header/DefaultHeader";
import MobileMenu from "@/components/common/header/MobileMenu";
import PopupSignInUp from "@/components/common/PopupSignInUp";
// import properties from "@/data/properties";
import DetailsContent from "@/components/listing-details-v1/DetailsContent";
import Sidebar from "@/components/listing-details-v1/Sidebar";
import ListingOne from "@/components/listing-single/ListingOne";
// import { getFaqByPropertyIdData } from "@/api/frontend/faq";

import { getPropertyBySlug } from "@/api/frontend/property";

const ListingDynamicDetailsV12 = ({property,faqs}) => {
 
  // const id = params.id;
  // const property = properties?.find((item) => item.id == id) || properties[0]
  const [propertyimage, setPropertyImage] = useState([]);
  const [propertySelectedComp, setPropertySelectedComp] = useState([]);
 
  const [showBox, setShowBox] = useState(false);
  const [propertydetail, setPropertydetail] = useState([]);

  useEffect(() => {
     if (!property) return;      
          const fetchProperty = async () => {
            try {
              const data = await getPropertyBySlug(property.slug);
              setPropertyImage(data.data.images)
              setPropertydetail(data.data)            
              
            } catch (error) {
              console.error("Error fetching Builder:", error);
            } finally {
              // setLoading(false);
            }
          };
      
          fetchProperty();
          
       
  }, [property]);

  return (
    <>
    {/* <!-- Main Header Nav --> */}
      <Header />

      {/* <!--  Mobile Menu --> */}
      <MobileMenu />

      {/* <!-- Modal --> */}
      <PopupSignInUp />

      {/* <!-- Listing Single Property --> */}
      <ListingOne property={property}  setPropertySelectedComp={setPropertySelectedComp}
        setShowBox={setShowBox} propertyimage={propertyimage} />
    

      {/* <!-- Agent Single Grid View --> */}
      <section className="our-agent-single bgc-f7 pb30-991">
        <div className="container">
          <div className="row">
            <div className="col-md-12 col-lg-8">
              <DetailsContent property={property} faqs={faqs} propertydetail={propertydetail}/>
            </div>
            {/* End details content .col-lg-8 */}

            <div className="col-lg-4 col-xl-4">
              <Sidebar property={property}/>
            </div>
            {/* End sidebar content .col-lg-4 */}
          </div>
          {/* End .row */}
        </div>
      </section>

      {/* <!-- Our Footer --> */}
      <section className="footer_one">
        <div className="container">
          <div className="row">
          <Footer 
            // propertycompare={propertySelectedComp}
            // setPropertySelectedComp={setPropertySelectedComp} 
        showBox={showBox}
        setShowBox={setShowBox } />
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

export default ListingDynamicDetailsV12;
