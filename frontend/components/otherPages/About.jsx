"use client";
import React, { useState } from "react";
import Image from "next/image";
export default function About() {
  const [activeTab, setActiveTab] = useState(1);
  return (
    <section className="flat-spacing about-us-main pb_0">
      <div className="container">
        <div className="row">
          <div className="col-md-6">
            <div className="about-us-features wow fadeInLeft">
              <Image
                className="lazyload"
                data-src="/images/banner/about-us.png"
                alt="image-team"
                src="/images/banner/about-us.png"
                width={930}
                height={618}
              />
            </div>
          </div>
          <div className="col-md-6">
            <div className="about-us-content">
              <h3 className="title wow fadeInUp">
                TheBotsWorld – Your Gateway to Robotics Knowledge
              </h3>
              <div className="widget-tabs style-3">
                <ul className="widget-menu-tab wow fadeInUp">
                  <li
                    className={`item-title ${activeTab == 1 ? "active" : ""} `}
                    onClick={() => setActiveTab(1)}
                  >
                    <span className="inner text-button">Introduction</span>
                  </li>
                  <li
                    className={`item-title ${activeTab == 2 ? "active" : ""} `}
                    onClick={() => setActiveTab(2)}
                  >
                    <span className="inner text-button">Our Vision</span>
                  </li>
                  <li
                    className={`item-title ${activeTab == 3 ? "active" : ""} `}
                    onClick={() => setActiveTab(3)}
                  >
                    <span className="inner text-button">
                      What Sets Us Apart
                    </span>
                  </li>
                  <li
                    className={`item-title ${activeTab == 4 ? "active" : ""} `}
                    onClick={() => setActiveTab(4)}
                  >
                    <span className="inner text-button">Our Commitment</span>
                  </li>
                </ul>
                <div className="widget-content-tab wow fadeInUp">
                  <div
                    className={`widget-content-inner ${
                      activeTab == 1 ? "active" : ""
                    } `}
                  >
                    <p>
                      Welcome to TheBotsWorld, a dedicated platform created to
                      provide comprehensive information about robots. From the
                      latest innovations and upcoming technologies to historical
                      breakthroughs and real-world applications, we aim to cover
                      every aspect of robotics in one place.
                    </p>
                    <p>
                      Whether you’re a student, researcher, hobbyist, or just
                      curious about the future of robots, TheBotsWorld is your
                      go-to destination for well-structured and reliable
                      knowledge.
                    </p>
                  </div>
                  <div
                    className={`widget-content-inner ${
                      activeTab == 2 ? "active" : ""
                    } `}
                  >
                    <p>
                      Our vision is to make robotics education accessible to
                      everyone. We believe that robots are not just machines,
                      but a major driving force shaping the future of
                      industries, healthcare, defense, and everyday life. By
                      sharing accurate and detailed insights, we want to inspire
                      the next generation of innovators.
                    </p>
                  </div>
                  <div
                    className={`widget-content-inner ${
                      activeTab == 3 ? "active" : ""
                    } `}
                  >
                    <ul>
                      <li>
                       <strong>Comprehensive Coverage</strong> – From
                        humanoid robots to industrial machines, AI-driven bots,
                        and upcoming concepts.
                      </li>
                      <li>
                       <strong>Educational Approach</strong> –
                        Easy-to-understand explanations designed for learners at
                        all levels.
                      </li>
                      <li>
                       <strong>Updated Content</strong> – Constantly adding
                        new information about the latest trends and technologies
                        in robotics.
                      </li>
                      <li>
                       <strong>One-Stop Resource</strong> – No distractions,
                        no e-commerce — just pure robotics knowledge.
                      </li>
                    </ul>
                  </div>
                  <div
                    className={`widget-content-inner ${
                      activeTab == 4 ? "active" : ""
                    } `}
                  >
                    <p>At TheBotsWorld, we are committed to:</p>
                    <ul className="list-disc list-inside ml-5 !list-disc">
                      <li>
                        Delivering{" "}
                        <strong>
                          authentic and research–backed information
                        </strong>
                        .
                      </li>
                      <li>
                        Keeping our content{" "}
                        <strong>free of commercial influence</strong>.
                      </li>
                      <li>
                        Encouraging{" "}
                        <strong>curiosity and exploration in robotics</strong>.
                      </li>
                      <li>
                        Supporting{" "}
                        <strong>students, educators, and enthusiasts</strong>{" "}
                        with reliable resources.
                      </li>
                    </ul>
                  </div>
                </div>
              </div>
              <a href="/" className="tf-btn btn-fill wow fadeInUp">
                <span className="text text-button">Explore Robots</span>
              </a>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
