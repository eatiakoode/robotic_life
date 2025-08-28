'use client'

import Link from "next/link";
import { useEffect, useState } from "react";
import HeaderMenuContent from "./HeaderMenuContent";
import { SafeImage } from "../../../../utils/imageUtils";

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
      className={`header-nav menu_style_home_one style2 navbar-scrolltofixed stricky main-menu  ${
        navbar ? "stricky-fixed " : ""
      }`}
    >
      <div className="container-fluid p0">
        {/* <!-- Menu Toggle btn--> */}
<<<<<<< HEAD
<<<<<<< HEAD
        <Link href="/cmswegrow/my-dashboard" className="navbar_brand float-start dn-smd">
=======
        <Link href="/cmsroboticlife/my-dashboard" className="navbar_brand float-start dn-smd">
>>>>>>> 3c0733c34d124af768c936ac3903a1a50f4723cf
          <Image
            width={170}
            height={75}
            className="logo1 img-fluid"
<<<<<<< HEAD
            // src="/assets/images/logo.svg"
            src={`${process.env.NEXT_PUBLIC_API_URL}public/assets/images/logo.svg`}
            alt="header-logo2.png"
=======
        <Link href="/cmsroboticlife/my-dashboard" className="navbar_brand float-start dn-smd">
          <SafeImage
            width={170}
            height={75}
            className="logo1 img-fluid"
            src="/assets/images/logo.svg"
            alt="logo.svg"
>>>>>>> ea24ee4 (Home page & admin panel fixed)
=======
            src={`${process.env.NEXT_PUBLIC_BACKEND_API_URL}public/assets/images/logo.svg`}
            alt="logo.svg"
>>>>>>> 3c0733c34d124af768c936ac3903a1a50f4723cf
          />
          <SafeImage
            width={40}
            height={45}
            className="logo2 img-fluid"
            src={`${process.env.NEXT_PUBLIC_BACKEND_API_URL}public/assets/images/header-logo2.png`}
            alt="header-logo2.png"
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
