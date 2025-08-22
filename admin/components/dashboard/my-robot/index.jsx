"use client";
import Header from "../../common/header/dashboard/Header";
import SidebarMenu from "../../common/header/dashboard/SidebarMenu";
import MobileMenu from "../../common/header/MobileMenu";
import TableData from "./TableData";
import Filtering from "./Filtering";
import Pagination from "./Pagination";
import SearchBox from "./SearchBox";
import CopyRight from "../../common/footer/CopyRight";
import { getRobotTableData } from "@/api/robot";
import { toast } from 'react-toastify';

import { useState, useEffect, useCallback, useMemo } from "react";
import { useRouter } from "next/navigation";

const RobotIndex = ({ 
  robots: initialRobots = [], 
  totalCount: initialCount = 0,
  filter: initialFilter = { limit: 10, page: 1 }
}) => {
  // State management
  const [currentPage, setCurrentPage] = useState(initialFilter.page || 1);
  const [robots, setRobots] = useState(initialRobots);
  const [totalCount, setTotalCount] = useState(initialCount);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [searchQuery, setSearchQuery] = useState("");
  
  const pageSize = initialFilter.limit || 10;
  const router = useRouter();

  // Memoized filter object to prevent unnecessary API calls
  const currentFilter = useMemo(() => ({
    limit: pageSize,
    page: currentPage,
    search: searchQuery
  }), [pageSize, currentPage, searchQuery]);

  // Optimized fetch function with error handling
  const fetchRobotData = useCallback(async () => {
    if (loading) return; // Prevent concurrent requests
    
    setLoading(true);
    setError(null);
    
    try {
      const data = await getRobotTableData(currentFilter);
      
      if (data.error) {
        throw new Error(data.error);
      }
      
      setRobots(data.items || []);
      setTotalCount(data.totalCount || 0);
      
      // Show success message only if we have data
      if (data.items && data.items.length > 0) {
        console.log(`Loaded ${data.items.length} robots`);
      }
      
    } catch (error) {
      console.error('Failed to fetch robots:', error);
      setError(error.message);
      
      // Show error toast only for authentication errors
      if (error.message.includes('Authentication') || error.message.includes('log in')) {
        toast.error(error.message);
        // Optionally redirect to login
        // router.push('/login');
      } else {
        toast.error('Failed to load robots. Please try again.');
      }
      
      // Reset to empty state on error
      setRobots([]);
      setTotalCount(0);
    } finally {
      setLoading(false);
    }
  }, [currentFilter, loading, router]);

  // Effect to fetch data when page changes
  useEffect(() => {
    fetchRobotData();
  }, [fetchRobotData]);

  // Optimized page change handler
  const handlePageChange = useCallback((page) => {
    if (page !== currentPage && page > 0) {
      setCurrentPage(page);
    }
  }, [currentPage]);

  // Search handler
  const handleSearch = useCallback((query) => {
    setSearchQuery(query);
    setCurrentPage(1); // Reset to first page when searching
  }, []);

  // Filter handler (for when you uncomment the Filtering component)
  const handleFilter = useCallback((filterOptions) => {
    // Implement filter logic here when ready
    console.log('Filter options:', filterOptions);
    setCurrentPage(1); // Reset to first page when filtering
  }, []);

  // Retry function for error states
  const handleRetry = useCallback(() => {
    fetchRobotData();
  }, [fetchRobotData]);

  // Loading component
  const LoadingComponent = () => (
    <div className="text-center p-4">
      <div className="spinner-border text-primary" role="status">
        <span className="visually-hidden">Loading...</span>
      </div>
      <p className="mt-2">Loading robots...</p>
    </div>
  );

  // Error component
  const ErrorComponent = () => (
    <div className="text-center p-4">
      <div className="alert alert-danger" role="alert">
        <i className="flaticon-warning mb-2" style={{fontSize: '24px'}}></i>
        <h5>Error Loading Robots</h5>
        <p>{error}</p>
        <button 
          className="btn btn-primary btn-sm" 
          onClick={handleRetry}
          disabled={loading}
        >
          {loading ? 'Retrying...' : 'Try Again'}
        </button>
      </div>
    </div>
  );

  return (
    <>
      {/* Main Header Nav */}
      <Header />

      {/* Mobile Menu */}
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

      {/* Main Dashboard Section */}
      <section className="our-dashbord dashbord bgc-f7 pb50">
        <div className="container-fluid ovh">
          <div className="row">
            <div className="col-lg-12 maxw100flex-992">
              <div className="row">
                {/* Dashboard Navigation */}
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

                {/* Header Section */}
                <div className="col-lg-4 col-xl-4 mb10">
                  <div className="breadcrumb_content style2 mb30-991">
                    <h2 className="breadcrumb_title">All Robots</h2>
                    <p>View, filter, and manage all robot listings available on your platform.</p>
                    {totalCount > 0 && (
                      <small className="text-muted">
                        Showing {robots.length} of {totalCount} robots
                      </small>
                    )}
                  </div>
                </div>

                {/* Search and Filter Section */}
                <div className="col-lg-8 col-xl-8">
                  <div className="candidate_revew_select style2 text-end mb30-991">
                    <ul className="mb0">
                      <li className="list-inline-item">
                        <div className="candidate_revew_search_box course fn-520">
                          <SearchBox onSearch={handleSearch} />
                        </div>
                      </li>
                     {/* <li className="list-inline-item">
                        <Filtering onFilter={handleFilter} />
                      </li> 
                      */}
                    </ul>
                  </div>
                </div>

                {/* Main Content Area */}
                <div className="col-lg-12">
                  <div className="my_dashboard_review mb40">
                    <div className="robot_table">
                      <div className="table-responsive mt0">
                        {error ? (
                          <ErrorComponent />
                        ) : loading && robots.length === 0 ? (
                          <LoadingComponent />
                        ) : (
                          <TableData robots={robots} setRobots={setRobots} />
                        )}
                      </div>

                      {/* Pagination - only show if we have data */}
                      {/* {!error && !loading && totalCount > 0 && (
                        <div className="mbp_pagination">
                          <Pagination
                            totalCount={totalCount}
                            pageSize={pageSize}
                            currentPage={currentPage}
                            onPageChange={handlePageChange}
                          />
                        </div>
                      )} */}
                    </div>
                  </div>
                </div>
              </div>

              {/* Footer */}
              <CopyRight />
            </div>
          </div>
        </div>
      </section>
    </>
  );
};

export default RobotIndex;