"use client";

import Header from "../../common/header/dashboard/Header";
import SidebarMenu from "../../common/header/dashboard/SidebarMenu";
import MobileMenu from "../../common/header/MobileMenu";
import TableData from "./TableData";
import Filtering from "./Filtering";
import Pagination from "./Pagination";
import SearchBox from "../../common/SearchBox";
import CopyRight from "../../common/footer/CopyRight";
import { useSearchAndPagination } from "../../../hooks/useSearchAndPagination";
import { getBlogcategoryTableData } from "../../../api/blogcategory";

const index = () => {
  // Use the custom hook for search and pagination
  const {
    currentData: currentCategories,
    loading,
    error,
    searchQuery,
    handleSearch,
    currentPage,
    totalPages,
    handlePageChange,
    refreshData: handleRefresh,
    searchInfo
  } = useSearchAndPagination(getBlogcategoryTableData, 10, ['title', 'author', 'status']);

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
                    <h2 className="breadcrumb_title">Blog Category</h2>
                    <p>View, search, and manage blog categories.</p>
                    {searchInfo.hasSearchQuery && (
                      <small className="text-muted">
                        Showing {searchInfo.totalResults} of {searchInfo.totalItems} results
                        {searchQuery && ` for "${searchQuery}"`}
                      </small>
                    )}
                  </div>
                </div>
                {/* End .col */}

                <div className="col-lg-8 col-xl-8">
                  <div className="candidate_revew_select style2 text-end mb30-991">
                    <ul className="mb0">
                      <li className="list-inline-item">
                        <div className="candidate_revew_search_box course fn-520">
                          <SearchBox 
                            onSearch={handleSearch} 
                            placeholder="Search blog categories..." 
                          />
                        </div>
                      </li>
                      {/* End li */}

                      <li className="list-inline-item">
                        <Filtering />
                      </li>
                      {/* End li */}
                    </ul>
                  </div>
                </div>
                {/* End .col */}

                <div className="col-lg-12">
                  <div className="my_dashboard_review mb40">
                    <div className="property_table">
                      <div className="table-responsive mt0">
                        <TableData 
                          categories={currentCategories}
                          loading={loading}
                          error={error}
                          onRefresh={handleRefresh}
                        />
                      </div>
                      {/* End .table-responsive */}

                      {!loading && !error && searchInfo.totalResults > 0 && (
                        <div className="mbp_pagination">
                          <Pagination 
                            currentPage={currentPage}
                            totalPages={totalPages}
                            onPageChange={handlePageChange}
                            totalItems={searchInfo.totalResults}
                            itemsPerPage={searchInfo.itemsPerPage}
                          />
                        </div>
                      )}
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
