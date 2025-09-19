"use client";
import React, { useState } from "react";
import Description from "./Description";
import Capabilities from "./Capabilities";
import Media from "./Media";
import FAQs from "./FAQs";
import PayloadsAndAttachments from "./PayloadsAndAttachments";
import SensorsAndSoftware from "./SensorsAndSoftware";
import OperationalEnvironment from "./OperationalEnvironment";

export default function Descriptions1({ product }) {
  const [activeTab, setActiveTab] = useState(1);
  return (
    <section className="">
      <div className="container">
        <div className="row">
          <div className="col-12">
            <div className="widget-tabs style-1">
              <ul className="widget-menu-tab">
                <li
                  className={`item-title ${activeTab == 1 ? "active" : ""} `}
                  onClick={() => setActiveTab(1)}
                >
                  <span className="inner">Core Framework</span>
                </li>
                <li
                  className={`item-title ${activeTab == 2 ? "active" : ""} `}
                  onClick={() => setActiveTab(2)}
                >
                  <span className="inner">Performance Spectrum</span>
                </li>
                <li
                  className={`item-title ${activeTab == 5 ? "active" : ""} `}
                  onClick={() => setActiveTab(5)}
                >
                  <span className="inner">Interfaces</span>
                </li>
                <li
                  className={`item-title ${activeTab == 6 ? "active" : ""} `}
                  onClick={() => setActiveTab(6)}
                >
                  <span className="inner">Perceptive Systems</span>
                </li>
                <li
                  className={`item-title ${activeTab == 7 ? "active" : ""} `}
                  onClick={() => setActiveTab(7)}
                >
                  <span className="inner">Active Domain</span>
                </li>
                <li
                  className={`item-title ${activeTab == 3 ? "active" : ""} `}
                  onClick={() => setActiveTab(3)}
                >
                  <span className="inner">Media</span>
                </li>
                <li
                  className={`item-title ${activeTab == 4 ? "active" : ""} `}
                  onClick={() => setActiveTab(4)}
                >
                  <span className="inner">Clarity Hub</span>
                </li>
              </ul>
              <div className="widget-content-tab">
                <div
                  className={`widget-content-inner ${
                    activeTab == 1 ? "active" : ""
                  } `}
                >
                  <div className="tab-description">
                    <Description product={product} />
                  </div>
                </div>
                <div
                  className={`widget-content-inner ${
                    activeTab == 2 ? "active" : ""
                  } `}
                >
                  <div className="tab-capabilities">
                    <Capabilities product={product} />
                  </div>
                </div>
                <div
                  className={`widget-content-inner ${
                    activeTab == 3 ? "active" : ""
                  } `}
                >
                  <div className="tab-media">
                    <Media product={product} />
                  </div>
                </div>
                <div
                  className={`widget-content-inner ${
                    activeTab == 4 ? "active" : ""
                  } `}
                >
                  <div className="tab-faqs">
                    <FAQs product={product} />
                  </div>
                </div>
                <div
                  className={`widget-content-inner ${
                    activeTab == 5 ? "active" : ""
                  } `}
                >
                  <div className="tab-payloads">
                    <PayloadsAndAttachments product={product} />
                  </div>
                </div>
                <div
                  className={`widget-content-inner ${
                    activeTab == 6 ? "active" : ""
                  } `}
                >
                  <div className="tab-sensors">
                    <SensorsAndSoftware product={product} />
                  </div>
                </div>
                <div
                  className={`widget-content-inner ${
                    activeTab == 7 ? "active" : ""
                  } `}
                >
                  <div className="tab-operational">
                    <OperationalEnvironment product={product} />
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
