
import Features from "@/components/homes/home-gaming/Features";
import Footer1 from "@/components/footers/Footer1";
import Header1 from "@/components/headers/Header1";
import Link from "next/link";
import About from "@/components/otherPages/About";
import Info from "@/components/otherPages/Info";
import Testimonials from "@/components/homes/home-gaming/Testimonials";
import React from "react";

export const metadata = {
        title: 'About Us | TheBotsWorld - Learn, Explore & Innovate with Robots',
        description: 'Learn more about TheBotsWorld, our mission, and our commitment to advancing robotics education and innovation.',
};

export default function AboutUsPage() {
  return (
    <>
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
      <Features />
      <Info />
      <Testimonials />
      <Footer1 dark />
    </>
  );
}
