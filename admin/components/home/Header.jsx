'use client'

import Link from "next/link";
import { useEffect, useState } from "react";
import HeaderMenuContent from "../common/header/HeaderMenuContent";
import Image from "next/image";

const Header = () => {
  const [navbar, setNavbar] = useState(false);

  const changeBackground = () => {
    if (window.scrollY >= 95) {
      setNavbar(true);
    } else {
      setNavbar(false);
    }
  };

  useEffect(() => {
    window.addEventListener("scroll", changeBackground);
  }, []);

  return (
    <header
      className={`header-nav menu_style_home_one navbar-scrolltofixed stricky main-menu  ${
        navbar ? "stricky-fixed " : ""
      }`}
    >
      <div className="container-fluid p0">
        {/* <!-- Ace Responsive Menu --> */}

        <Link href="/" className="navbar_brand float-start dn-smd">
        <Image
            width={170}
            height={65}
            className="logo1 contain"
            src={`${process.env.NEXT_PUBLIC_BACKEND_API_URL}public/assets/images/logo.svg`}
            alt="logo.svg"
          />

          <Image
            width={170}
            height={65}
            className="logo2 contain"
            src={`${process.env.NEXT_PUBLIC_BACKEND_API_URL}public/assets/images/logo2.png`}
            alt="logo2.png"
          />
          {/* <span>WeGrow</span> */}
        </Link>
        {/* site logo brand */}

        <nav>
          <HeaderMenuContent />
        </nav>
        {/* End .navbar */}
      </div>
    </header>
    // {/* <!-- /.theme-main-menu --> */}
  );
};

export default Header;
