"use client";
import React, { useState, useEffect } from "react";
import Link from "next/link";
import {
  blogLinks,
  demoItems,
  otherPageLinks,
} from "@/data/menu";
import { getParentCategories, getSubCategories } from "@/api/category";
import { usePathname } from "next/navigation";
export default function MobileMenu() {
  const pathname = usePathname();
  const [categories, setCategories] = useState([]);
  const [subcategories, setSubcategories] = useState({});
  const [loading, setLoading] = useState(false);

  // Fetch parent categories and their subcategories on component mount
  useEffect(() => {
    const fetchData = async () => {
      try {
        setLoading(true);

        // Fetch parent categories
        const parentCategories = await getParentCategories();
        setCategories(parentCategories);

        // Fetch subcategories for all parent categories
        const subcategoryPromises = parentCategories.map(async (category) => {
          try {
            const subs = await getSubCategories(category._id);
            return { categoryId: category._id, subcategories: subs };
          } catch (error) {
            console.error(
              `Error fetching subcategories for ${category.name}:`,
              error
            );
            return { categoryId: category._id, subcategories: [] };
          }
        });

        const subcategoryResults = await Promise.all(subcategoryPromises);
        const subcategoryMap = {};
        subcategoryResults.forEach((result) => {
          subcategoryMap[result.categoryId] = result.subcategories;
        });

        setSubcategories(subcategoryMap);
      } catch (error) {
        console.error("Error fetching data:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, []);
  return (
    <div className="offcanvas offcanvas-start canvas-mb" id="mobileMenu">
      <span
        className="icon-close icon-close-popup"
        data-bs-dismiss="offcanvas"
        aria-label="Close"
      />
      <div className="mb-canvas-content">
        <div className="mb-body">
          <div className="mb-content-top">
            <form className="form-search" onSubmit={(e) => e.preventDefault()}>
              <fieldset className="text">
                <input
                  type="text"
                  placeholder="What are you looking for?"
                  className=""
                  name="text"
                  tabIndex={0}
                  defaultValue=""
                  aria-required="true"
                  required
                />
              </fieldset>
              <button className="" type="submit">
                <svg
                  width={24}
                  height={24}
                  viewBox="0 0 24 24"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    d="M11 19C15.4183 19 19 15.4183 19 11C19 6.58172 15.4183 3 11 3C6.58172 3 3 6.58172 3 11C3 15.4183 6.58172 19 11 19Z"
                    stroke="#181818"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />
                  <path
                    d="M20.9984 20.9999L16.6484 16.6499"
                    stroke="#181818"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />
                </svg>
              </button>
            </form>
            <ul className="nav-ul-mb" id="wrapper-menu-navigation">
              <li className="nav-mb-item active">
                <a
                  href="#dropdown-menu-one"
                  className={`collapsed mb-menu-link ${
                    [...demoItems].some(
                      (elm) => elm.href.split("/")[1] == pathname.split("/")[1]
                    )
                      ? "active"
                      : ""
                  } `}
                  data-bs-toggle="collapse"
                  aria-expanded="true"
                  aria-controls="dropdown-menu-one"
                >
                  <span>Home</span>
                  <span className="btn-open-sub" />
                </a>
                <div id="dropdown-menu-one" className="collapse">
                  <ul className="sub-nav-menu">
                    {demoItems.map((link, i) => (
                      <li key={i}>
                        <Link
                          href={link.href}
                          className={`sub-nav-link ${
                            pathname.split("/")[1] == link.href.split("/")[1]
                              ? "active"
                              : ""
                          } `}
                        >
                          {link.name}
                        </Link>
                      </li>
                    ))}
                  </ul>
                </div>
              </li>
              <li className="nav-mb-item">
                <a
                  href="#dropdown-menu-two"
                  className={`collapsed mb-menu-link ${
                    pathname.includes("shop-default-grid") ||
                    pathname.includes("filter-canvas") ||
                    pathname.includes("product-detail")
                      ? "active"
                      : ""
                  } `}
                  data-bs-toggle="collapse"
                  aria-expanded="true"
                  aria-controls="dropdown-menu-two"
                >
                  <span>Robot</span>
                  <span className="btn-open-sub" />
                </a>
                <div id="dropdown-menu-two" className="collapse">
                  <ul className="sub-nav-menu">
                    {loading ? (
                      <li>
                        <div className="text-center py-3">
                          <div className="spinner-border spinner-border-sm" role="status">
                            <span className="visually-hidden">Loading categories...</span>
                          </div>
                          <p className="mt-2 text-muted">Loading robot categories...</p>
                        </div>
                      </li>
                    ) : (
                      categories.map((category, index) => {
                        const categorySubcategories = subcategories[category._id] || [];
                        return (
                          <li key={category._id || index}>
                            <a
                              href={`#sub-robot-${index}`}
                              className={`sub-nav-link collapsed ${
                                pathname.includes("shop-default-grid") ||
                                pathname.includes("filter-canvas") ||
                                pathname.includes("product-detail")
                                  ? "active"
                                  : ""
                              } `}
                              data-bs-toggle="collapse"
                              aria-expanded="true"
                              aria-controls={`sub-robot-${index}`}
                            >
                              <span>{category.name || category.title}</span>
                              <span className="btn-open-sub" />
                            </a>
                            <div id={`sub-robot-${index}`} className="collapse">
                              <ul className="sub-nav-menu sub-menu-level-2">
                                {categorySubcategories.length > 0 ? (
                                  categorySubcategories.map((subcategory, subIndex) => (
                                    <li key={subcategory._id || subIndex}>
                                      <Link
                                        href={`/shop-filter-canvas?category=${category._id}&subcategory=${subcategory._id}`}
                                        className={`sub-nav-link ${
                                          pathname.includes("shop-default-grid") ||
                                          pathname.includes("filter-canvas") ||
                                          pathname.includes("product-detail")
                                            ? "active"
                                            : ""
                                        } `}
                                      >
                                        {subcategory.name || subcategory.title}
                                      </Link>
                                    </li>
                                  ))
                                ) : (
                                  <li>
                                    <Link
                                      href={`/shop-filter-canvas?category=${category._id}`}
                                      className={`sub-nav-link ${
                                        pathname.includes("shop-default-grid") ||
                                        pathname.includes("filter-canvas") ||
                                        pathname.includes("product-detail")
                                          ? "active"
                                          : ""
                                      } `}
                                    >
                                      All {category.name || category.title}
                                    </Link>
                                  </li>
                                )}
                              </ul>
                            </div>
                          </li>
                        );
                      })
                    )}
                  </ul>
                </div>
              </li>
              <li className="nav-mb-item">
                <a
                  href="/blog-list"
                  className={`mb-menu-link ${
                    pathname.split("/")[1] === "blog-list" ? "active" : ""
                  }`}
                >
                  <span>Blog</span>
                </a>
              </li>
              <li className="nav-mb-item">
                <a
                  href="/about-us"
                  className={`mb-menu-link ${
                    pathname.split("/")[1] === "about-us" ? "active" : ""
                  }`}
                >
                  <span>About Us</span>
                </a>
              </li>
               <li className="nav-mb-item">
                <a
                  href="/contact-us"
                  className={`mb-menu-link ${
                    pathname.split("/")[1] === "contact-us" ? "active" : ""
                  }`}
                >
                  <span>Contact Us</span>
                </a>
              </li>
              <li className="nav-mb-item"></li>
            </ul>
          </div>
          <div className="mb-other-content">
            <div className="mb-contact">
              <p className="text-caption-1">
                549 Oak St.Crystal Lake, IL 60014
              </p>
              <Link
                href={`/contact`}
                className="tf-btn-default text-btn-uppercase"
              >
                GET DIRECTION
                <i className="icon-arrowUpRight" />
              </Link>
            </div>
            <ul className="mb-info">
              <li>
                <i className="icon icon-mail" />
                <p>themesflat@gmail.com</p>
              </li>
              <li>
                <i className="icon icon-phone" />
                <p>315-666-6688</p>
              </li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
}
