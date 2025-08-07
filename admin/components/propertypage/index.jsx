'use client'

// import Image from "next/image";
import { useEffect, useState } from 'react';
import CallToAction from "../common/CallToAction";
import CopyrightFooter from "../common/footer/CopyrightFooter";
import Footer from "../common/footer/Footer";
import Header from "../common/header/DefaultHeader";
import MobileMenu from "../common/headerland/MobileMenu";
import PopupSignInUp from "../common/PopupSignInUp";
import BreadCrumbBanner from "./BreadCrumbBanner";
import FeaturedItem from "./FeaturedItem";

import { getPropertyPageBySlug } from "@/api/frontend/propertypage";

import { getPropertyListbyPropertypage } from "@/api/frontend/property";

import Image from "next/image";

const ListingDynamicDetailsproperty = ({params}) => {
  // alert("test")
  const [showBox, setShowBox] = useState(false);
  const [propertySelectedComp, setPropertySelectedComp] = useState(() => {
    if (typeof window !== "undefined") {

      const stored = localStorage.getItem("propertycompare");
      if (stored !== "undefined") {

      return stored ? JSON.parse(stored) : [];
      }
    }
    return [];
  });
  
    
    const id = params.id;
     const [propertypage, setPropertyPage] = useState("");
     const [properties, setProperties] = useState("");
    // const blog = blogs.find((item) => item.id == id) ||  blogs[0]
  
  useEffect(() => {
    // alert(id)   
        if (!id) return;  
         
        const fetchPropertyPage = async () => {
          try {
            const data = await getPropertyPageBySlug(id);
            setPropertyPage(data.data)
           
          } catch (error) {
            console.error("Error fetching PropertyPage:", error);
          } finally {
            // setLoading(false);
          }
        };
    
        fetchPropertyPage();
        const fetchData = async () => {
          try {
            const res = await getPropertyListbyPropertypage(id);
            setProperties(res || []);
          } catch (error) {
            console.error("Error fetching property types:", error);
          }
        };
    
        fetchData();
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
      <BreadCrumbBanner propertypage={propertypage} />

      {/* <!-- About Text Content --> */}
      <section id="about" className="commited-to-excellence para-land aboutland about-section scroll-mt-80px border-btm pb0 bgc-f7">
             <div className="container who-we-are">
               <div className="row">
                 <div className="col-lg-12 col-xl-12">
                   <div className="main-title text-left">
                     {/* <h2 className="mt0 color-main">About Ankit Goyat</h2>
                     <h2 className="mt0">Expertise : Commercial Projects | Residential Projects | Real Estate Investment | Client-Centric Solutions</h2> */}
                   <p> <div dangerouslySetInnerHTML={{ __html: propertypage?.description }} /></p>
                    
                    </div>
                 </div>
                  
               </div>
             </div>
           </section>
               {/* End .row */}
               <section id="feature-property" className="feature-property bgc-f7">
                    <div className="container">
                      <div className="row">
                        <div className="col-lg-6 offset-lg-3">
                          <div className="main-title text-center mb40">
                            <h2>Featured Properties</h2>
                            <p>Handpicked properties by our team.</p>
                          </div>
                        </div>
                        <FeaturedItem setPropertySelectedComp={setPropertySelectedComp}
                        setShowBox={setShowBox} properties={properties}/>
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

export default ListingDynamicDetailsproperty;
