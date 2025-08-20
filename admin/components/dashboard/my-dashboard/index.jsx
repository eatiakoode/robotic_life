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

      {/* <!-- Enhanced Robotic Dashboard --> */}
      <section className="robotic-dashboard min-vh-100" style={{
        background: 'linear-gradient(135deg, #0a0e1a 0%, #1a1f2e 50%, #0f1419 100%)',
        position: 'relative',
        overflow: 'hidden'
      }}>
        {/* Animated Background Elements */}
        <div className="dashboard-bg-effects">
          <div className="circuit-pattern"></div>
          <div className="floating-particles"></div>
          <div className="grid-overlay"></div>
        </div>

        <div className="dashboard-content" style={{ 
          position: 'relative',
          zIndex: 2,
          padding: '20px',
          marginLeft: '280px', // Fixed margin for sidebar
          transition: 'margin-left 0.3s ease'
        }}>
          <div className="container-fluid" style={{ maxWidth: '100%', padding: '0' }}>
            <div className="row">
              <div className="col-lg-12">
                <div className="row">
                  {/* Enhanced Dashboard Navigation */}
                  <div className="col-lg-12 mb-4">
                    <div className="cyber-nav-container">
                      <div className="dashboard-nav-toggle d-lg-none">
                        <button
                          className="cyber-nav-btn"
                          data-bs-toggle="offcanvas"
                          data-bs-target="#DashboardOffcanvasMenu"
                          aria-controls="DashboardOffcanvasMenu"
                          style={{
                            background: 'linear-gradient(45deg, #00d4ff, #0099cc)',
                            border: 'none',
                            padding: '12px 24px',
                            borderRadius: '8px',
                            color: 'white',
                            fontWeight: '600',
                            boxShadow: '0 4px 15px rgba(0, 212, 255, 0.3)',
                            transition: 'all 0.3s ease',
                            position: 'relative',
                            overflow: 'hidden'
                          }}
                        >
                          <span style={{ position: 'relative', zIndex: 2 }}>
                            <i className="fa fa-bars me-2"></i> 
                            Dashboard Control
                          </span>
                          <div style={{
                            position: 'absolute',
                            top: 0,
                            left: '-100%',
                            width: '100%',
                            height: '100%',
                            background: 'linear-gradient(90deg, transparent, rgba(255,255,255,0.2), transparent)',
                            transition: 'left 0.6s ease'
                          }}></div>
                        </button>
                      </div>
                    </div>
                  </div>

                  {/* Futuristic Header Section */}
                  <div className="col-lg-12 mb-5">
                    <div className="cyber-header-container" style={{
                      background: 'linear-gradient(135deg, rgba(0, 212, 255, 0.1), rgba(0, 153, 204, 0.1))',
                      border: '1px solid rgba(0, 212, 255, 0.3)',
                      borderRadius: '16px',
                      padding: '32px',
                      backdropFilter: 'blur(10px)',
                      position: 'relative',
                      overflow: 'hidden'
                    }}>
                      {/* Animated border effect */}
                      <div style={{
                        position: 'absolute',
                        top: 0,
                        left: 0,
                        right: 0,
                        height: '2px',
                        background: 'linear-gradient(90deg, transparent, #00d4ff, transparent)',
                        animation: 'borderGlow 3s ease-in-out infinite'
                      }}></div>
                      
                      <div className="header-content">
                        <div className="d-flex align-items-center mb-3">
                          <div className="cyber-icon me-3" style={{
                            width: '48px',
                            height: '48px',
                            background: 'linear-gradient(45deg, #00d4ff, #0099cc)',
                            borderRadius: '12px',
                            display: 'flex',
                            alignItems: 'center',
                            justifyContent: 'center',
                            boxShadow: '0 8px 20px rgba(0, 212, 255, 0.4)'
                          }}>
                            <i className="fa fa-robot" style={{ color: 'white', fontSize: '20px' }}></i>
                          </div>
                          <div>
                            <h1 style={{
                              background: 'linear-gradient(135deg, #00d4ff, #ffffff)',
                              backgroundClip: 'text',
                              WebkitBackgroundClip: 'text',
                              color: 'transparent',
                              fontSize: '32px',
                              fontWeight: '700',
                              margin: 0,
                              textShadow: '0 0 20px rgba(0, 212, 255, 0.5)'
                            }}>
                              RoboLife Command Center
                            </h1>
                            <div className="status-indicator d-flex align-items-center mt-2">
                              <div style={{
                                width: '8px',
                                height: '8px',
                                background: '#00ff88',
                                borderRadius: '50%',
                                marginRight: '8px',
                                boxShadow: '0 0 10px #00ff88',
                                animation: 'pulse 2s ease-in-out infinite'
                              }}></div>
                              <span style={{ color: '#00ff88', fontSize: '14px', fontWeight: '500' }}>
                                System Online • All Networks Active
                              </span>
                            </div>
                          </div>
                        </div>
                        
                        <p style={{
                          color: 'rgba(255, 255, 255, 0.8)',
                          fontSize: '16px',
                          margin: 0,
                          lineHeight: '1.6'
                        }}>
                          Monitor robotic systems, track manufacturer data, analyze material usage, 
                          and manage client enquiries through your centralized control interface.
                        </p>
                      </div>
                    </div>
                  </div>
                </div>

                {/* Enhanced Statistics Section - FIXED HORIZONTAL LAYOUT */}
                <div className="row mb-5">
                  <div className="col-12">
                    <div className="stats-section-header mb-4">
                      <h3 style={{
                        color: 'transparent',
                        background: 'linear-gradient(135deg, #00d4ff, #ffffff, #00ff88)',
                        backgroundClip: 'text',
                        WebkitBackgroundClip: 'text',
                        fontSize: '24px',
                        fontWeight: '700',
                        marginBottom: '8px',
                        display: 'flex',
                        alignItems: 'center',
                        textShadow: '0 0 20px rgba(0, 212, 255, 0.5)'
                      }}>
                        <i className="fa fa-microchip me-3" style={{ 
                          color: '#00d4ff',
                          fontSize: '28px',
                          filter: 'drop-shadow(0 0 10px #00d4ff)'
                        }}></i>
                        System Core Metrics
                      </h3>
                      <div className="metrics-subtitle" style={{
                        color: 'rgba(255, 255, 255, 0.7)',
                        fontSize: '14px',
                        marginLeft: '40px'
                      }}>
                        Real-time monitoring of all robotic systems and components
                      </div>
                    </div>
                    
                    {/* FIXED Statistics Container - Force Horizontal Layout */}
                    <div className="cyber-stats-container" style={{
                      background: 'rgba(26, 31, 46, 0.4)',
                      border: '1px solid rgba(0, 212, 255, 0.2)',
                      borderRadius: '20px',
                      padding: '24px',
                      backdropFilter: 'blur(15px)',
                      boxShadow: '0 8px 32px rgba(0, 0, 0, 0.2)'
                    }}>
                      {/* Force horizontal display with flexbox */}
                      <div className="stats-flex-container" style={{
                        display: 'flex',
                        flexWrap: 'wrap',
                        gap: '20px',
                        justifyContent: 'space-between',
                        alignItems: 'stretch'
                      }}>
                        <AllStatistics
                          robot={robot}
                          manufacturer={manufacturer}
                          materials={materials}
                          enquery={enquery}
                        />
                      </div>
                    </div>
                  </div>
                </div>

                {/* Enhanced Charts and Activities Section */}
                <div className="row mb-5">
                  <div className="col-xl-7 mb-4 mb-xl-0">
                    <div className="chart-container" style={{
                      background: 'linear-gradient(135deg, rgba(26, 31, 46, 0.8), rgba(15, 20, 25, 0.9))',
                      border: '1px solid rgba(0, 212, 255, 0.3)',
                      borderRadius: '20px',
                      padding: '32px',
                      height: '100%',
                      backdropFilter: 'blur(15px)',
                      position: 'relative',
                      overflow: 'hidden',
                      boxShadow: '0 16px 40px rgba(0, 0, 0, 0.4)'
                    }}>
                      {/* Animated corner accents */}
                      <div style={{
                        position: 'absolute',
                        top: '0',
                        left: '0',
                        width: '60px',
                        height: '60px',
                        background: 'linear-gradient(135deg, rgba(0, 212, 255, 0.3), transparent)',
                        borderRadius: '0 0 20px 0'
                      }}></div>
                      <div style={{
                        position: 'absolute',
                        bottom: '0',
                        right: '0',
                        width: '60px',
                        height: '60px',
                        background: 'linear-gradient(315deg, rgba(0, 212, 255, 0.3), transparent)',
                        borderRadius: '20px 0 0 0'
                      }}></div>

                      {/* Chart header with enhanced styling */}
                      <div className="chart-header mb-4" style={{ position: 'relative', zIndex: 2 }}>
                        <div className="d-flex align-items-center justify-content-between mb-3">
                          <h4 style={{
                            color: 'transparent',
                            background: 'linear-gradient(135deg, #00d4ff, #ffffff)',
                            backgroundClip: 'text',
                            WebkitBackgroundClip: 'text',
                            fontSize: '22px',
                            fontWeight: '700',
                            display: 'flex',
                            alignItems: 'center',
                            margin: 0
                          }}>
                            <div style={{
                              width: '40px',
                              height: '40px',
                              background: 'linear-gradient(135deg, #00d4ff, #0099cc)',
                              borderRadius: '10px',
                              display: 'flex',
                              alignItems: 'center',
                              justifyContent: 'center',
                              marginRight: '12px',
                              boxShadow: '0 8px 20px rgba(0, 212, 255, 0.3)'
                            }}>
                              <i className="fa fa-chart-line" style={{ color: 'white', fontSize: '16px' }}></i>
                            </div>
                            Performance Analytics
                          </h4>
                          
                          <div className="status-badge" style={{
                            background: 'rgba(0, 255, 136, 0.2)',
                            border: '1px solid rgba(0, 255, 136, 0.4)',
                            borderRadius: '20px',
                            padding: '6px 12px',
                            display: 'flex',
                            alignItems: 'center',
                            fontSize: '12px',
                            color: '#00ff88',
                            fontWeight: '600'
                          }}>
                            <div style={{
                              width: '6px',
                              height: '6px',
                              background: '#00ff88',
                              borderRadius: '50%',
                              marginRight: '8px',
                              animation: 'pulse 2s ease-in-out infinite'
                            }}></div>
                            LIVE DATA
                          </div>
                        </div>
                        
                        <div style={{
                          height: '2px',
                          background: 'linear-gradient(90deg, #00d4ff, rgba(0, 212, 255, 0.3), transparent)',
                          borderRadius: '1px',
                          marginBottom: '8px'
                        }}></div>
                        
                        <p style={{
                          color: 'rgba(255, 255, 255, 0.7)',
                          fontSize: '14px',
                          margin: 0,
                          lineHeight: '1.5'
                        }}>
                          Real-time system performance metrics and trend analysis
                        </p>
                      </div>
                      
                      <div style={{ position: 'relative', zIndex: 2 }}>
                        <StatisticsChart />
                      </div>
                    </div>
                  </div>

                  <div className="col-xl-5">
                    <div className="activities-container" style={{
                      background: 'linear-gradient(135deg, rgba(26, 31, 46, 0.8), rgba(15, 20, 25, 0.9))',
                      border: '1px solid rgba(0, 212, 255, 0.3)',
                      borderRadius: '20px',
                      padding: '32px',
                      height: '100%',
                      backdropFilter: 'blur(15px)',
                      position: 'relative',
                      overflow: 'hidden',
                      boxShadow: '0 16px 40px rgba(0, 0, 0, 0.4)'
                    }}>
                      {/* Animated side accent */}
                      <div style={{
                        position: 'absolute',
                        left: '0',
                        top: '20%',
                        width: '4px',
                        height: '60%',
                        background: 'linear-gradient(180deg, transparent, #00d4ff, #00ff88, transparent)',
                        borderRadius: '0 2px 2px 0'
                      }}></div>

                      {/* Activities header with enhanced styling */}
                      <div className="activities-header mb-4" style={{ position: 'relative', zIndex: 2 }}>
                        <div className="d-flex align-items-center mb-3">
                          <div style={{
                            width: '40px',
                            height: '40px',
                            background: 'linear-gradient(135deg, #ff6b35, #f7931e)',
                            borderRadius: '10px',
                            display: 'flex',
                            alignItems: 'center',
                            justifyContent: 'center',
                            marginRight: '12px',
                            boxShadow: '0 8px 20px rgba(255, 107, 53, 0.3)'
                          }}>
                            <i className="fa fa-history" style={{ color: 'white', fontSize: '16px' }}></i>
                          </div>
                          
                          <h4 style={{
                            color: 'transparent',
                            background: 'linear-gradient(135deg, #ff6b35, #ffffff)',
                            backgroundClip: 'text',
                            WebkitBackgroundClip: 'text',
                            fontSize: '22px',
                            fontWeight: '700',
                            margin: 0
                          }}>
                            Activity Monitor
                          </h4>
                        </div>
                        
                        <div style={{
                          height: '2px',
                          background: 'linear-gradient(90deg, #ff6b35, rgba(255, 107, 53, 0.3), transparent)',
                          borderRadius: '1px',
                          marginBottom: '8px'
                        }}></div>
                        
                        <p style={{
                          color: 'rgba(255, 255, 255, 0.7)',
                          fontSize: '14px',
                          margin: 0,
                          lineHeight: '1.5'
                        }}>
                          Latest system events and operations log
                        </p>
                      </div>
                      
                      <div style={{ position: 'relative', zIndex: 2 }}>
                        <Activities />
                      </div>
                    </div>
                  </div>
                </div>

                {/* Enhanced Footer */}
                <div className="footer-container" style={{
                  background: 'rgba(10, 14, 26, 0.8)',
                  border: '1px solid rgba(0, 212, 255, 0.1)',
                  borderRadius: '16px',
                  padding: '20px',
                  backdropFilter: 'blur(10px)'
                }}>
                  <CopyRight />
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Enhanced CSS for animations and effects */}
        <style jsx>{`
          @keyframes borderGlow {
            0%, 100% { opacity: 0.5; transform: translateX(-100%); }
            50% { opacity: 1; transform: translateX(100%); }
          }

          @keyframes pulse {
            0%, 100% { opacity: 1; transform: scale(1); }
            50% { opacity: 0.7; transform: scale(1.1); }
          }

          @keyframes float {
            0%, 100% { transform: translateY(0px); }
            50% { transform: translateY(-10px); }
          }

          @keyframes slideInFromLeft {
            0% { opacity: 0; transform: translateX(-50px); }
            100% { opacity: 1; transform: translateX(0); }
          }

          @keyframes glowPulse {
            0%, 100% { box-shadow: 0 0 20px rgba(0, 212, 255, 0.3); }
            50% { box-shadow: 0 0 40px rgba(0, 212, 255, 0.6); }
          }

          /* FIXED - Statistics Cards Horizontal Layout */
          .cyber-stats-container .stats-flex-container {
            display: flex !important;
            flex-wrap: wrap !important;
            gap: 20px !important;
            justify-content: space-between !important;
          }

          /* Force AllStatistics component to display horizontally */
          .cyber-stats-container .stats-flex-container > * {
            display: flex !important;
            flex-wrap: wrap !important;
            width: 100% !important;
            gap: 20px !important;
          }

          .cyber-stats-container .row {
            margin: 0 !important;
            display: flex !important;
            flex-wrap: wrap !important;
            gap: 20px !important;
            width: 100% !important;
          }

          .cyber-stats-container .col-sm-6,
          .cyber-stats-container .col-md-3,
          .cyber-stats-container [class*="col-"] {
            flex: 1 1 220px !important;
            min-width: 220px !important;
            max-width: none !important;
            padding: 0 !important;
            margin: 0 !important;
          }

          .cyber-stats-container .funfact_one,
          .cyber-stats-container .ff_one {
            background: linear-gradient(135deg, rgba(0, 212, 255, 0.1), rgba(0, 153, 204, 0.05)) !important;
            border: 1px solid rgba(0, 212, 255, 0.3) !important;
            borderRadius: 16px !important;
            padding: 32px 24px !important;
            text-align: center !important;
            position: relative !important;
            overflow: hidden !important;
            backdrop-filter: blur(10px) !important;
            transition: all 0.4s ease !important;
            animation: slideInFromLeft 0.6s ease forwards;
            box-shadow: 0 8px 32px rgba(0, 0, 0, 0.3) !important;
            height: 100% !important;
            display: flex !important;
            flex-direction: column !important;
            justify-content: center !important;
            align-items: center !important;
          }

          .cyber-stats-container .funfact_one:nth-child(2) { animation-delay: 0.1s; }
          .cyber-stats-container .funfact_one:nth-child(3) { animation-delay: 0.2s; }
          .cyber-stats-container .funfact_one:nth-child(4) { animation-delay: 0.3s; }
          .cyber-stats-container .ff_one:nth-child(2) { animation-delay: 0.1s; }
          .cyber-stats-container .ff_one:nth-child(3) { animation-delay: 0.2s; }
          .cyber-stats-container .ff_one:nth-child(4) { animation-delay: 0.3s; }

          .cyber-stats-container .funfact_one:hover,
          .cyber-stats-container .ff_one:hover {
            transform: translateY(-8px) scale(1.02) !important;
            border-color: rgba(0, 212, 255, 0.6) !important;
            box-shadow: 0 16px 48px rgba(0, 212, 255, 0.2) !important;
            animation: glowPulse 2s ease-in-out infinite;
          }

          /* Animated background for cards */
          .cyber-stats-container .funfact_one::before,
          .cyber-stats-container .ff_one::before {
            content: '' !important;
            position: absolute !important;
            top: 0 !important;
            left: -100% !important;
            width: 100% !important;
            height: 100% !important;
            background: linear-gradient(90deg, transparent, rgba(0, 212, 255, 0.1), transparent) !important;
            transition: left 0.6s ease !important;
          }

          .cyber-stats-container .funfact_one:hover::before,
          .cyber-stats-container .ff_one:hover::before {
            left: 100% !important;
          }

          /* Icon styling */
          .cyber-stats-container .icon,
          .cyber-stats-container .funfact_one i,
          .cyber-stats-container .ff_one i {
            font-size: 48px !important;
            background: linear-gradient(135deg, #00d4ff, #00ff88) !important;
            background-clip: text !important;
            -webkit-background-clip: text !important;
            color: transparent !important;
            margin-bottom: 20px !important;
            display: block !important;
            filter: drop-shadow(0 0 10px rgba(0, 212, 255, 0.6)) !important;
            transition: all 0.3s ease !important;
          }

          .cyber-stats-container .funfact_one:hover .icon,
          .cyber-stats-container .funfact_one:hover i,
          .cyber-stats-container .ff_one:hover .icon,
          .cyber-stats-container .ff_one:hover i {
            transform: rotate(360deg) scale(1.1) !important;
            filter: drop-shadow(0 0 20px rgba(0, 212, 255, 0.8)) !important;
          }

          /* Number styling */
          .cyber-stats-container .timer,
          .cyber-stats-container h3 {
            font-size: 42px !important;
            font-weight: 700 !important;
            background: linear-gradient(135deg, #ffffff, #00d4ff) !important;
            background-clip: text !important;
            -webkit-background-clip: text !important;
            color: transparent !important;
            margin-bottom: 12px !important;
            text-shadow: 0 0 20px rgba(0, 212, 255, 0.5) !important;
            position: relative !important;
            z-index: 2 !important;
          }

          /* Label styling */
          .cyber-stats-container .funfact_one p,
          .cyber-stats-container .ff_one p,
          .cyber-stats-container span {
            color: rgba(255, 255, 255, 0.9) !important;
            font-size: 16px !important;
            font-weight: 600 !important;
            text-transform: uppercase !important;
            letter-spacing: 1px !important;
            margin: 0 !important;
            position: relative !important;
            z-index: 2 !important;
          }

          .circuit-pattern {
            position: absolute;
            top: 0;
            left: 0;
            right: 0;
            bottom: 0;
            background-image: 
              linear-gradient(90deg, rgba(0, 212, 255, 0.1) 1px, transparent 1px),
              linear-gradient(rgba(0, 212, 255, 0.1) 1px, transparent 1px);
            background-size: 50px 50px;
            opacity: 0.3;
            animation: float 6s ease-in-out infinite;
          }

          .floating-particles::before,
          .floating-particles::after {
            content: '';
            position: absolute;
            width: 4px;
            height: 4px;
            background: #00d4ff;
            border-radius: 50%;
            box-shadow: 0 0 10px #00d4ff;
            animation: float 4s ease-in-out infinite;
          }

          .floating-particles::before {
            top: 20%;
            left: 10%;
            animation-delay: -2s;
          }

          .floating-particles::after {
            top: 60%;
            right: 15%;
            animation-delay: -1s;
          }

          .grid-overlay {
            position: absolute;
            top: 0;
            left: 0;
            right: 0;
            bottom: 0;
            background-image: 
              radial-gradient(circle at 25% 25%, rgba(0, 212, 255, 0.1) 2px, transparent 2px),
              radial-gradient(circle at 75% 75%, rgba(0, 153, 204, 0.1) 2px, transparent 2px);
            background-size: 100px 100px;
            opacity: 0.4;
          }

          .cyber-nav-btn:hover {
            transform: translateY(-2px);
            box-shadow: 0 8px 25px rgba(0, 212, 255, 0.5) !important;
          }

          .cyber-nav-btn:hover div {
            left: 100% !important;
          }

          /* FIXED - Responsive adjustments for sidebar */
          @media (min-width: 1200px) {
            .dashboard-content {
              margin-left: 280px !important;
            }
          }

          @media (max-width: 1199px) {
            .dashboard-content {
              margin-left: 0 !important;
            }
          }

          @media (max-width: 768px) {
            .dashboard-content {
              margin-left: 0 !important;
              padding: 15px !important;
            }
            
            .cyber-header-container {
              padding: 20px !important;
            }
            
            .cyber-header-container h1 {
              font-size: 24px !important;
            }
            
            .chart-container,
            .activities-container,
            .cyber-stats-container {
              margin-bottom: 20px;
            }

            .cyber-stats-container .col-sm-6,
            .cyber-stats-container .col-md-3,
            .cyber-stats-container [class*="col-"] {
              flex: 1 1 100% !important;
              min-width: 100% !important;
              margin-bottom: 15px !important;
            }
          }

          /* Force proper positioning for sidebar compatibility */
          .dashboard_sidebar_menu {
            position: fixed !important;
            top: 0 !important;
            left: 0 !important;
            z-index: 1050 !important;
            width: 260px !important;
          }

          /* Scrollbar styling for webkit browsers */
          ::-webkit-scrollbar {
            width: 8px;
          }

          ::-webkit-scrollbar-track {
            background: rgba(26, 31, 46, 0.6);
            border-radius: 4px;
          }

          ::-webkit-scrollbar-thumb {
            background: linear-gradient(135deg, #00d4ff, #0099cc);
            border-radius: 4px;
          }

          ::-webkit-scrollbar-thumb:hover {
            background: linear-gradient(135deg, #0099cc, #00d4ff);
          }
        `}</style>
      </section>
    </>
  );
};

export default MyDashboard;