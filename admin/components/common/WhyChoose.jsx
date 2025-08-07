"use client";
import { useState } from "react";
import Image from "next/image";

const WhyChoose = ({ style = "" }) => {
  const [expanded, setExpanded] = useState({
    mission: false,
    vision: false,
    commitment: false,
  });

  const toggleExpand = (key) => {
    setExpanded((prev) => ({ ...prev, [key]: !prev[key] }));
  };

  return (
    <>
      {/* Mission */}
      <div className="col-md-6 col-lg-4 col-xl-4">
        <div className={`why_chose_us ${style}`}>
          <div className="icon">
            <Image
              width={60}
              height={60}
              className="img-fluid"
              src={`${process.env.NEXT_PUBLIC_API_URL}public/assets/images/mission.svg`}
              // src="/assets/images/mission.svg"
              alt="Mission"
            />
          </div>
          <div className="details">
            <h4>Our Mission</h4>
            <p className={`description ${expanded.mission ? "expanded" : "collapsed"}`}>
             To simplify property buying by delivering expert guidance, reliable options, and unmatched service—empowering every client to make confident, informed, and rewarding real estate decisions.
            </p>
            <button onClick={() => toggleExpand("mission")} className="btn-link">
              {expanded.mission ? "Read Less" : "Read More"}
            </button>
          </div>
        </div>
      </div>

      {/* Vision */}
      <div className="col-md-6 col-lg-4 col-xl-4">
        <div className={`why_chose_us ${style}`}>
          <div className="icon">
            <Image
              width={60}
              height={60}
              className="img-fluid"
              // src="/assets/images/vision.svg"
              src={`${process.env.NEXT_PUBLIC_API_URL}public/assets/images/vision.svg`}
              alt="Vision"
            />
          </div>
          <div className="details">
            <h4>Our Vision</h4>
            <p className={`description ${expanded.vision ? "expanded" : "collapsed"}`}>
              To be the most trusted and customer-focused real estate advisory in India, known for integrity, innovation, and long-term relationships that help individuals and investors secure their ideal property with confidence.
            </p>
            <button onClick={() => toggleExpand("vision")} className="btn-link">
              {expanded.vision ? "Read Less" : "Read More"}
            </button>
          </div>
        </div>
      </div>

      {/* Commitment */}
      <div className="col-md-6 col-lg-4 col-xl-4">
        <div className={`why_chose_us ${style}`}>
          <div className="icon">
            <Image
              width={60}
              height={60}
              className="img-fluid"
              // src="/assets/images/commit.svg"
              src={`${process.env.NEXT_PUBLIC_API_URL}public/assets/images/commit.svg`}
              alt="Commitment"
            />
          </div>
          <div className="details">
            <h4>Our Promise</h4>
            <p className={`description ${expanded.commitment ? "expanded" : "collapsed"}`}>
            We promise to be more than advisors—we’re your partners in growth. With honest guidance, reliable options, and end-to-end support, we make your property journey easy and rewarding.
            </p>
            <button onClick={() => toggleExpand("commitment")} className="btn-link">
              {expanded.commitment ? "Read Less" : "Read More"}
            </button>
          </div>
        </div>
      </div>
    </>
  );
};

export default WhyChoose;

