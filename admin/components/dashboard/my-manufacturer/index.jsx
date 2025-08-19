"use client"; // Add this at the top
import Header from "../../common/header/dashboard/Header";
import SidebarMenu from "../../common/header/dashboard/SidebarMenu";
import MobileMenu from "../../common/header/MobileMenu";
import TableData from "./TableData";
import Filtering from "./Filtering";
import Pagination from "./Pagination";
import SearchBox from "./SearchBox";
import CopyRight from "../../common/footer/CopyRight";

import { useState, useEffect } from "react";
import { getManufacturerTableData } from "@/api/manufacturer";

const index = () => {
  const [currentPage, setCurrentPage] = useState(1);
    const [manufacturerList, setManufacturerList] = useState([]);
    const [totalCount, setTotalCount] = useState(0);
    const [pageSize] = useState(10);
  
    useEffect(() => {
      const fetchManufacturerData = async () => {
        const filter = {
          limit: pageSize,
          page: currentPage,
        };
        const data = await getManufacturerTableData(filter);
        // Backend currently returns an array (protected route). Fallback to array handling.
        const list = Array.isArray(data) ? data : (data?.items || []);
        const count = Array.isArray(data) ? data.length : (data?.totalCount || list.length);
        setManufacturerList(list);
        setTotalCount(count);
      };
      fetchManufacturerData();
    }, [currentPage, pageSize]);
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

                <div className="col-lg-4 col-xl-4 mb10">
                  <div className="breadcrumb_content style2 mb30-991">
                    <h2 className="breadcrumb_title">All Manufacturers</h2>
                    <p>View, search, and manage manufacturer profiles associated with the robot listings.</p>
                  </div>
                </div>
                {/* End .col */}

                <div className="col-lg-8 col-xl-8">
                  <div className="candidate_revew_select style2 text-end mb30-991">
                    <ul className="mb0">
                      <li className="list-inline-item">
                        <div className="candidate_revew_search_box course fn-520">
                          <SearchBox />
                        </div>
                      </li>
                      {/* End li */}

                      {/* <li className="list-inline-item">
                        <Filtering />
                      </li> */}
                      {/* End li */}
                    </ul>
                  </div>
                </div>
                {/* End .col */}

                <div className="col-lg-12">
                  <div className="my_dashboard_review mb40">
                    <div className="property_table">
                      <div className="table-responsive mt0">
                        <TableData manufacturerList={manufacturerList} setManufacturerList={setManufacturerList}/>
                      </div>
                      {/* End .table-responsive */}

                      <div className="mbp_pagination">
                         <Pagination totalCount={totalCount} pageSize={pageSize} currentPage={currentPage} onPageChange={(page) => setCurrentPage(page)} />
                      </div>
                      {/* End .mbp_pagination */}
                    </div>
                    {/* End .property_table */}
                  </div>
                </div>
                {/* End .col */}
              </div>
              {/* End .row */}
<CopyRight/>
              {/* <div className="row mt50">
                <div className="col-lg-12">
                  <div className="copyright-widget text-center">
                    <p>© 2020 Find House. Made with love.</p>
                  </div>
                </div>
              </div> */}
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
