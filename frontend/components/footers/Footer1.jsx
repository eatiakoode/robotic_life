"use client";
import React, { useEffect, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import CurrencySelect from "../common/CurrencySelect";
import LanguageSelect from "../common/LanguageSelect";
import ToolbarBottom from "../headers/ToolbarBottom";
import ScrollTop from "../common/ScrollTop";
import { quickLinks, socialLinks } from "@/data/footerLinks";
import axios from "axios";

export default function Footer1({
  border = true,
  dark = false,
  hasPaddingBottom = false,
}) {
  const [success, setSuccess] = useState(true);
  const [showMessage, setShowMessage] = useState(false);

  const handleShowMessage = () => {
    setShowMessage(true);
    setTimeout(() => setShowMessage(false), 2000);
  };

  const sendEmail = async (e) => {
    e.preventDefault();
    const email = e.target.email.value;
    try {
      const response = await axios.post(
        "https://express-brevomail.vercel.app/api/contacts",
        { email }
      );
      if ([200, 201].includes(response.status)) {
        e.target.reset();
        setSuccess(true);
        handleShowMessage();
      } else {
        setSuccess(false);
        handleShowMessage();
      }
    } catch (error) {
      console.error("Error:", error.response?.data || "An error occurred");
      setSuccess(false);
      handleShowMessage();
      e.target.reset();
    }
  };

  useEffect(() => {
    const headings = document.querySelectorAll(".footer-heading-mobile");
    const toggleOpen = (event) => {
      const parent = event.target.closest(".footer-col-block");
      const content = parent.querySelector(".tf-collapse-content");
      if (parent.classList.contains("open")) {
        parent.classList.remove("open");
        content.style.height = "0px";
      } else {
        parent.classList.add("open");
        content.style.height = content.scrollHeight + 10 + "px";
      }
    };
    headings.forEach((heading) =>
      heading.addEventListener("click", toggleOpen)
    );
    return () => {
      headings.forEach((heading) =>
        heading.removeEventListener("click", toggleOpen)
      );
    };
  }, []);

  return (
    <>
      <footer
        id="footer"
        className={`footer ${dark ? "bg-main" : ""} ${
          hasPaddingBottom ? "has-pb" : ""
        }`}
      >
        <div className={`footer-wrap ${!border ? "border-0" : ""}`}>
          <div className="footer-body">
            <div className="container">
              <div className="row">
                {/* -------- Logo + About -------- */}
                <div className="col-lg-4">
                  <div className="footer-infor">
                    <div className="footer-logo">
                      <Link href={`/`}>
                        <img
                          alt="logo"
                          src={"/images/logo/logo1.svg"}
                          width="170"
                          height="25"
                          className="footer-logo-img"
                        />
                      </Link>
                    </div>
                    <div className="footer-about">
                      <p
                        style={{
                          maxWidth: "320px",
                          lineHeight: "1.6",
                          marginTop: "14px",
                          fontSize: "14px",
                          color: "#ccc",
                        }}
                      >
                        Your destination for learning and exploring the
                        fascinating world of robotics. We provide detailed
                        insights, research, and resources that make robotics
                        education simple, engaging, and accessible for everyone
                        — from curious beginners to passionate learners.
                      </p>
                    </div>
                  </div>
                </div>

                {/* -------- Quick Links -------- */}
                <div className="col-lg-4">
                  <div className="footer-menu">
                    {quickLinks.map((section, sectionIndex) => (
                      <div
                        className="footer-col-block"
                        key={sectionIndex}
                        style={{ marginBottom: "18px" }}
                      >
                        <div
                          className="footer-heading text-button footer-heading-mobile"
                          style={{
                            fontWeight: 600,
                            fontSize: "16px",
                            marginBottom: "12px",
                            color: "#fff",
                          }}
                        >
                          {section.heading}
                        </div>
                        <div className="tf-collapse-content">
                          <ul
                            className="footer-menu-list"
                            style={{
                              listStyle: "none",
                              padding: 0,
                              margin: 0,
                            }}
                          >
                            {section.items.map((item, itemIndex) => (
                              <li
                                className="text-caption-1"
                                key={itemIndex}
                                style={{ marginBottom: "8px" }}
                              >
                                {item.isLink ? (
                                  <Link
                                    href={item.href}
                                    className="footer-menu_item"
                                    style={{
                                      fontSize: "14px",
                                      color: "#ccc",
                                      textDecoration: "none",
                                    }}
                                  >
                                    {item.label}
                                  </Link>
                                ) : (
                                  <a
                                    href={item.href}
                                    className="footer-menu_item"
                                    style={{
                                      fontSize: "14px",
                                      color: "#ccc",
                                      textDecoration: "none",
                                    }}
                                  >
                                    {item.label}
                                  </a>
                                )}
                              </li>
                            ))}
                          </ul>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>

                {/* -------- Stay Connected -------- */}
                <div className="col-lg-4">
                  <div
                    className="footer-col-block"
                    style={{ marginBottom: "8px" }}
                  >
                    <div
                      className="footer-heading text-button footer-heading-mobile"
                      style={{
                        fontWeight: 600,
                        fontSize: "16px",
                        marginBottom: "12px",
                        color: "#fff",
                      }}
                    >
                      Stay Connected
                    </div>

                    <div className="footer-address">
                      <p
                        style={{
                          marginBottom: "8px",
                          fontSize: "14px",
                          lineHeight: "1.6",
                          color: "#ccc",
                          maxWidth: "300px",
                        }}
                      >
                        Tower B4, SPAZE ITECH PARK, UN 616, Badshahpur Sohna Rd
                        Hwy, Sector 49, Gurugram, Haryana 122018
                      </p>
                      <Link
                        href={`/contact`}
                        className={`tf-btn-default fw-6 ${
                          dark ? "style-white" : ""
                        }`}
                        style={{
                          display: "inline-flex",
                          alignItems: "center",
                          fontSize: "13px",
                          marginTop: "4px",
                        }}
                      >
                        GET DIRECTION <i className="icon-arrowUpRight" />
                      </Link>
                    </div>

                    <ul
                      className="footer-info"
                      style={{
                        listStyle: "none",
                        padding: 0,
                        margin: "14px 0",
                      }}
                    >
                      <li
                        style={{
                          display: "flex",
                          alignItems: "center",
                          marginBottom: "6px",
                          fontSize: "14px",
                          color: "#ccc",
                        }}
                      >
                        <i
                          className="icon-mail"
                          style={{
                            marginRight: "10px",
                            fontSize: "16px",
                            color: "#aaa",
                          }}
                        />
                        <p style={{ margin: 0 }}>hello@thebotsworld.com</p>
                      </li>
                      <li
                        style={{
                          display: "flex",
                          alignItems: "center",
                          marginBottom: "8px",
                          fontSize: "14px",
                          color: "#ccc",
                        }}
                      >
                        <i
                          className="icon-phone"
                          style={{
                            marginRight: "10px",
                            fontSize: "16px",
                            color: "#aaa",
                          }}
                        />
                        <p style={{ margin: 0 }}>098993 00017</p>
                      </li>
                    </ul>

                    <ul
                      className={`tf-social-icon ${dark ? "style-white" : ""}`}
                      style={{
                        display: "flex",
                        gap: "12px",
                        marginTop: "12px",
                        padding: 0,
                        listStyle: "none",
                      }}
                    >
                      {socialLinks.map((link, index) => (
                        <li key={index}>
                          <a
                            href={link.href}
                            className={link.className}
                            style={{
                              display: "flex",
                              justifyContent: "center",
                              alignItems: "center",
                              width: "36px",
                              height: "36px",
                              borderRadius: "50%",
                              background: "#222",
                              color: "#fff",
                              transition: "all 0.3s ease",
                            }}
                            onMouseEnter={(e) =>
                              (e.currentTarget.style.background = "#007bff")
                            }
                            onMouseLeave={(e) =>
                              (e.currentTarget.style.background = "#222")
                            }
                          >
                            <i className={`icon ${link.iconClass}`} />
                          </a>
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* -------- Bottom -------- */}
          <div
            className="footer-bottom"
            style={{ borderTop: "1px solid #333" }}
          >
            <div className="container">
              <div className="row">
                <div className="col-12">
                  <div
                    className="footer-bottom-wrap"
                    style={{
                      display: "flex",
                      justifyContent: "space-between",
                      alignItems: "center",
                      flexWrap: "wrap",
                      padding: "16px 0",
                      color: "#aaa",
                      fontSize: "13px",
                    }}
                  >
                    <div className="col-12">
                      <div
                        className="copyright-widget"
                        style={{
                          textAlign: "center",
                          color: "#ccc",
                          fontSize: "14px",
                        }}
                      >
                        <span>
                          © 2025 RoboticLife. All rights reserved | Made With{" "}
                          <a
                            target="_blank"
                            href="https://www.akoode.com/"
                            style={{ color: "red", textDecoration: "none" }}
                          >
                            <i
                              className="fa fa-heart"
                              style={{ color: "red" }}
                            ></i>
                          </a>
                        </span>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </footer>
      <ScrollTop hasPaddingBottom={hasPaddingBottom} />
      {/* <ToolbarBottom /> */}
    </>
  );
}
