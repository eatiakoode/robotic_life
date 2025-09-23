import Footer1 from "@/components/footers/Footer1";
import Header1 from "@/components/headers/Header1";
import Topbar6 from "@/components/headers/Topbar6";
import RobotCompare from "@/components/otherPages/RobotCompare";
import Link from "next/link";
import React from "react";

export const metadata = {
        title: 'Compare Robots | TheBotsWorld - Learn, Explore & Innovate with Robots',
        description: 'Compare the latest robots and automation solutions at TheBotsWorld. Find the perfect robot for your needs and stay ahead in the world of robotics.',
};

export default function CompareProductsPage() {
  return (
    <>
      {/* <Topbar6 bgColor="bg-main" /> */}
      <Header1 />
      <div
        className="page-title"
        style={{ backgroundImage: "url(/images/section/detail-card.png)" }}
      >
        <div className="container">
          <h3 className="heading text-center text-white">Compare Robots</h3>
          <ul className="breadcrumbs d-flex align-items-center justify-content-center">
            <li>
              <Link className="text-white hover:text-gray-300 transition duration-300" href={`/`}>
                Homepage
              </Link>
            </li>
            <li>
              <i className="icon-arrRight text-white" />
            </li>
            <li className="text-white">Compare</li>
          </ul>
        </div>
      </div>
      <RobotCompare />

      <Footer1 dark/>
    </>
  );
}
