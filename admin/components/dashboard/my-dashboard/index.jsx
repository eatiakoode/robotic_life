import Header from "../../common/header/dashboard/Header";
import SidebarMenu from "../../common/header/dashboard/SidebarMenu";
import MobileMenu from "../../common/header/MobileMenu";
import Activities from "./Activities"; 
import AllStatistics from "./AllStatistics";
import StatisticsChart from "./StatisticsChart";
import CopyRight from "../../common/footer/CopyRight";

const MyDashboard = ({ robot, manufacturer, materials, enquery }) => {
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

      {/* <!-- Our Dashboard --> */}
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
                    <h2 className="breadcrumb_title">Your Dashboard Overview</h2>
                    <p>Track robots, manufacturers, materials, and enquiries in one place.</p>
                  </div>
                </div>
              </div>
              {/* End .row */}

              {/* 🔹 Updated: pass new props to AllStatistics */}
              <div className="row">
                <AllStatistics
                  robot={robot}
                  manufacturer={manufacturer}
                  materials={materials}
                  enquery={enquery}
                />
              </div>
              {/* End .row Dashboard top statistics */}

              {/* Keep these commented until you need charts or activity */}
              <div className="row">
                <div className="col-xl-7">
                  <div className="application_statics">
                    <h4 className="mb-4">View Statistics</h4>
                    <StatisticsChart />
                  </div>
                </div>
                <div className="col-xl-5">
                  <div className="recent_job_activity">
                    <h4 className="title mb-4">Recent Activities</h4>
                    <Activities />
                  </div>
                </div>
              </div>

              <CopyRight />
            </div>
          </div>
        </div>
      </section>
    </>
  );
};

export default MyDashboard;
