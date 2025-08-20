"use client";

import { useEffect, useState } from "react";
import { useRouter, useParams } from "next/navigation";
import Header from "../../common/header/dashboard/Header";
import SidebarMenu from "../../common/header/dashboard/SidebarMenu";
import MobileMenu from "../../common/header/MobileMenu";
import CopyRight from "../../common/footer/CopyRight";
import CreateList from "./CreateList";
import DetailedInfo from "./DetailedInfo";
import FloorPlans from "./FloorPlans";
import LocationField from "./LocationField";
import PropertyMediaUploader from "./PropertyMediaUploader";
import { deleteRobotAPI, getRobotById, updateRobotAPI } from "../../../api/robot";

const index = () => {
  const params = useParams();  
      const id = params?.id; 
  const [inputs, setInputs] = useState([]);
  // const [getinputs, setGetInputs] = useState([]);
  const [property, setProperty] = useState([]);
  const [planimage, setPlanImage] = useState(null);
  
  const handleAddInput = () => {
    setInputs([
      ...inputs,
      {
        id: Date.now(),
        title: '',
        bedrooms: '',
        price: '',
        areasize: '',
        planimage: null,
        description: ''
      }
    ]);
  };
    
      // const handleInputChange = (index, event) => {
      //   const newInputs = [...inputs];
      //   newInputs[index].value = event.target.value;
      //   setInputs(newInputs);
      // };
      useEffect(() => {
        const fetchProperty = async () => {
          try {
            const data = await getRobotById(id);
            // alert("ttest")
            setProperty(data.data)
            console.log("data.data.floorplan")
            console.log(data.data.floorplan)
            // setGetInputs()

          } catch (error) {
            alert("Failed to update Blog.");
            console.error(error);
          }
        }
        fetchProperty();
      }, [id,setProperty]);
  return (
    <>
      {/* <!-- Main Header Nav --> */}
      <Header />

      {/* <!--  Mobile Menu --> */}
      <MobileMenu />

      <div className="dashboard_sidebar_menu">
        <div
          className="offcanvas offcanvas-dashboard offcanvas-start"
          tabIndex="-1"
          id="DashboardOffcanvasMenu"
          data-bs-scroll="true"
        >
          <SidebarMenu />
        </div>
      </div>
      {/* End sidebar_menu */}

      {/* <!-- Our Dashbord --> */}
      <section className="our-dashbord dashbord bgc-f7 pb50">
        <div className="container-fluid ovh">
          <div className="row">
            <div className="col-lg-12 maxw100flex-992">
              <div className="row">
                {/* Start Dashboard Navigation */}
                <div className="col-lg-12">
                  <div className="dashboard_navigationbar dn db-1024">
                    <div className="dropdown">
                      <button
                        className="dropbtn"
                        data-bs-toggle="offcanvas"
                        data-bs-target="#DashboardOffcanvasMenu"
                        aria-controls="DashboardOffcanvasMenu"
                      >
                        <i className="fa fa-bars pr10"></i> Dashboard Navigation
                      </button>
                    </div>
                  </div>
                </div>
                {/* End Dashboard Navigation */}

                <div className="col-lg-12 mb10">
                  <div className="breadcrumb_content style2">
                    <h2 className="breadcrumb_title">Update Robot Details</h2>
                    <p>Update robot information, images, pricing, or availability to keep your listing accurate and up-to-date.</p>
                  </div>
                </div>
                {/* End .col */}

                <div className="col-lg-12">
                  <div className="my_dashboard_review">
                    <div className="row">
                      <div className="col-lg-12">
                        <h3 className="mb30">Create Listing</h3>
                      </div>

                      <CreateList property={property}/>
                    </div>
                  </div>
                  {/* <div className="my_dashboard_review mt30">
                    <div className="row">
                      <div className="col-lg-12">
                        <h3 className="mb30">Location</h3>
                      </div>

                      <LocationField />
                    </div>
                  </div> */}
                  {/* <div className="my_dashboard_review mt30 ">
                    <div className="col-lg-12">
                      <h3 className="mb30">Detailed Information</h3>
                    </div>
                    <DetailedInfo />
                  </div> */}
                  {/* <div className="my_dashboard_review mt30">
                    <div className="col-lg-12">
                      <h3 className="mb30">Property media</h3>
                    </div>
                    <PropertyMediaUploader />
                  </div> */}
                  <div className="my_dashboard_review mt30">
                    <div className="col-lg-12">
                      <h3 className="mb30">Floor Plans</h3>
                      <button className="btn admore_btn mb30" onClick={handleAddInput} >Add More</button>
                    </div>
                    <FloorPlans property={property} inputs={inputs} setInputs={setInputs} setPlanImage={setPlanImage} planimage={planimage}/>
                  </div>
                </div>
                {/* End .col */}
              </div>
              {/* End .row */}

              {/* <div className="row mt50">
                <div className="col-lg-12">
                  <div className="copyright-widget text-center">
                    <p>© 2020 Find House. Made with love.</p>
                  </div>
                </div>
              </div> */}

              <CopyRight/>
              {/* End .row */}
            </div>
            {/* End .col */}
          </div>
        </div>
      </section>
    </>
  );
};

export default index;
