import React from "react";
import Nav from "./Nav";
import Image from "next/image";
import Link from "next/link";
import CartLength from "../common/CartLength";
export default function Header1({ fullWidth = false }) {
  return (
    <header
      id="header"
      className={`header-default ${fullWidth ? "header-fullwidth" : ""} `}
    >
      <div className={fullWidth ? "" : "container"}>
        <div className="row wrapper-header align-items-center">
          {/* Mobile Menu Button - Hidden on XL screens */}
          <div className="col-md-4 col-3 d-xl-none">
            <a
              href="#mobileMenu"
              className="mobile-menu"
              data-bs-toggle="offcanvas"
              aria-controls="mobileMenu"
              aria-label="Open mobile menu"
            >
              <i className="icon icon-categories" />
            </a>
          </div>
          
          {/* Logo - Responsive sizing */}
          <div className="col-xl-3 col-md-4 col-6">
            <Link href={`/`} className="logo-header logo-fix">
              <img
                alt="TheBotsWorld Logo"
                className="logo logo-image-fix"
                src="/images/logo/the-bots-world.svg"
                width="144"
                height="25"
              />
            </Link>
          </div>
          
          {/* Desktop Navigation - Hidden on mobile/tablet */}
          <div className="col-xl-6 d-none d-xl-block">
            <nav className="box-navigation text-center">
              <ul className="box-nav-ul d-flex align-items-center justify-content-center">
                <Nav />
              </ul>
            </nav>
          </div>
          
          {/* Social Icons and Search - Responsive layout */}
          <div className="col-xl-3 col-md-4 col-3">
            <ul className="nav-icon d-flex justify-content-end align-items-center">
              <li className="nav-search">
                <a
                  href="#search"
                  data-bs-toggle="modal"
                  className="nav-icon-item"
                  aria-label="Search"
                >
                  <svg
                    className="icon"
                    width={24}
                    height={24}
                    viewBox="0 0 24 24"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path
                      d="M11 19C15.4183 19 19 15.4183 19 11C19 6.58172 15.4183 3 11 3C6.58172 3 3 6.58172 3 11C3 15.4183 6.58172 19 11 19Z"
                      stroke="#181818"
                      strokeWidth={2}
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    />
                    <path
                      d="M21.35 21.0004L17 16.6504"
                      stroke="#181818"
                      strokeWidth={2}
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    />
                  </svg>
                </a>
              </li>
              
              {/* Social Icons - Hidden on small mobile screens */}
              <li className="d-none d-md-block">
                <a 
                  href="https://www.facebook.com" 
                  className="social-facebook"
                  aria-label="Facebook"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  <i className="icon icon-fb" />
                </a>
              </li>
              <li className="d-none d-md-block">
                <a 
                  href="https://twitter.com" 
                  className="social-twiter"
                  aria-label="Twitter"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  <i className="icon icon-x" />
                </a>
              </li>
              <li className="d-none d-md-block">
                <a 
                  href="https://www.instagram.com" 
                  className="social-instagram"
                  aria-label="Instagram"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  <i className="icon icon-instagram" />
                </a>
              </li>
            </ul>
          </div>
        </div>
      </div>
    </header>
  );
}
