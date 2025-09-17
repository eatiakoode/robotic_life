"use client";
import { usePathname } from "next/navigation";
import "../public/scss/main.scss";
import "photoswipe/style.css";
import "react-range-slider-input/dist/style.css";
import "../public/css/image-compare-viewer.min.css";
import "@fortawesome/fontawesome-svg-core/styles.css";
import { useEffect, useState, useRef } from "react";
import { library } from '@fortawesome/fontawesome-svg-core';
import { faRobot, faBookOpen, faFlask, faUsers } from '@fortawesome/free-solid-svg-icons';

// Add icons to the library
library.add(faRobot, faBookOpen, faFlask, faUsers);
import Context from "@/context/Context";
import Compare from "@/components/modals/Compare";
import MobileMenu from "@/components/modals/MobileMenu";

import SearchModal from "@/components/modals/SearchModal";
import Categories from "@/components/modals/Categories";
import AccountSidebar from "@/components/modals/AccountSidebar";
import "font-awesome/css/font-awesome.min.css";


export default function RootLayout({ children }) {
  const pathname = usePathname();
  const [scrollDirection, setScrollDirection] = useState("down");
  const lastScrollY = useRef(0);
  
  useEffect(() => {
    if (typeof window !== "undefined") {
      // Import the script only on the client side
      import("bootstrap/dist/js/bootstrap.esm").then(() => {
        // Module is imported, you can access any exported functionality if
      });
    }
  }, []);
  useEffect(() => {
    const handleScroll = () => {
      const header = document.querySelector("header");
      if (window.scrollY > 100) {
        header.classList.add("header-bg");
      } else {
        header.classList.remove("header-bg");
      }
    };

    window.addEventListener("scroll", handleScroll);

    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, []); 

  useEffect(() => {
    setScrollDirection("up");
    const handleScroll = () => {
      const currentScrollY = window.scrollY;

      if (currentScrollY > 250) {
        if (currentScrollY > lastScrollY.current) {
          // Scrolling down
          setScrollDirection("down");
        } else {
          // Scrolling up
          setScrollDirection("up");
        }
      } else {
        // Below 250px
        setScrollDirection("down");
      }

      lastScrollY.current = currentScrollY;
    };

    const lastScrollY = { current: window.scrollY };


    window.addEventListener("scroll", handleScroll);

    
    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, [pathname]);
  useEffect(() => {
    // Close any open modal
    import("bootstrap").then((bootstrap) => {
      const modalElements = document.querySelectorAll(".modal.show");
      modalElements.forEach((modal) => {
        const modalInstance = bootstrap.Modal.getInstance(modal);
        if (modalInstance) {
          modalInstance.hide();
        }
      });

      // Close any open offcanvas
      const offcanvasElements = document.querySelectorAll(".offcanvas.show");
      offcanvasElements.forEach((offcanvas) => {
        const offcanvasInstance = bootstrap.Offcanvas.getInstance(offcanvas);
        if (offcanvasInstance) {
          offcanvasInstance.hide();
        }
      });
    }).catch((error) => {
      console.warn("Bootstrap not available:", error);
    });
  }, [pathname]);

  useEffect(() => {
    const header = document.querySelector("header");
    if (header) {
      if (scrollDirection == "up") {
        header.style.top = "0px";
      } else {
        header.style.top = "-185px";
      }
    }
  }, [scrollDirection]);
  useEffect(() => {
    const WOW = require("@/utlis/wow");
    const wow = new WOW.default({
      mobile: false,
      live: false,
    });
    wow.init();
  }, [pathname]);
  return (
    <html lang="en">
      <head>
        <meta name="viewport" content="width=device-width, initial-scale=1.0, maximum-scale=1.0, user-scalable=no" />
        <meta name="format-detection" content="telephone=no" />
        <script
          dangerouslySetInnerHTML={{
            __html: `
              // Suppress React DevTools message
              if (typeof window !== 'undefined') {
                const originalConsoleLog = console.log;
                console.log = function(...args) {
                  if (args[0] && typeof args[0] === 'string' && args[0].includes('Download the React DevTools')) {
                    return;
                  }
                  originalConsoleLog.apply(console, args);
                };
              }
            `,
          }}
        />
      </head>
      <body className="preload-wrapper popup-loader">
        <Context>
          <div id="wrapper">{children}</div>
          <Compare />
          <MobileMenu />
          <SearchModal />
          <Categories />
          <AccountSidebar />
        </Context>
      </body>
    </html>
  );
}
