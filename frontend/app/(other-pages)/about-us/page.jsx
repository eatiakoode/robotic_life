import Brands from "@/components/common/Brands";
import Features2 from "@/components/common/Features2";
import Footer1 from "@/components/footers/Footer1";
import Header1 from "@/components/headers/Header1";
import Link from "next/link";
import Topbar6 from "@/components/headers/Topbar6";
import About from "@/components/otherPages/About";
import Info from "@/components/otherPages/Info";
// import Testimonials from "@/components/otherPages/Testimonials";
import Testimonials from "@/components/homes/home-gaming/Testimonials";
import React from "react";

export const metadata = {
  title: "About Us || TheBotsWorld ",
  description: "TheBotsWorld - Your Trusted Platform in Robotics Education",
};

export default function AboutUsPage() {
  return (
    <>
      {/* <Topbar6 bgColor="bg-main" /> */}
      <Header1 />
      <div
        className="page-title"
        style={{ backgroundImage: "url(/images/section/detail-card.png)" }}
      >
        <div className="container-full">
          <div className="row">
            <div className="col-12">
              <h3 className="heading text-center text-white">About Us</h3>
              <ul className="breadcrumbs d-flex align-items-center justify-content-center">
                <li>
                  <Link className="link text-white" href={`/`}>
                    Homepage
                  </Link>
                </li>
                <li>
                  <i className="icon-arrRight" />
                </li>
                <li>About Us</li>
              </ul>
            </div>
          </div>
        </div>
      </div>
      <About />
      <Features2 parentClass="flat-spacing line-bottom-container" />
      <Info />
      {/* <Brands parentClass="flat-spacing-5 bg-surface" /> */}
      <Testimonials />
      <Footer1 dark />
    </>
  );
}
