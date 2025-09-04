"use client";
import React, { useState, useEffect } from "react";
import Link from "next/link";
import Image from "next/image";
import useCategories from "@/hooks/useCategories";
import styles from "./Collections.module.css";

export default function Collections() {
  const { categories, loading, error } = useCategories();

  // Fallback data if API fails
  const fallbackCategories = [
    {
      _id: "fallback-1",
      name: "ACCESSORIES",
      description: "Clear sound, all-day comfort.",
      logoimage: "/images/collections/grid-cls/gaming-1.jpg",
    },
    {
      _id: "fallback-2",
      name: "ACCESSORIES",
      description: "Style meets functionality.",
      logoimage: "/images/collections/grid-cls/gaming-2.jpg",
    },
    {
      _id: "fallback-3",
      name: "ROG GAMING MOUSE",
      description: "Unleash Speed, Accuracy, and Control for the Ultimate Gaming Edge!",
      logoimage: "/images/collections/grid-cls/gaming-3.jpg",
    },
  ];

  const [displayCategories, setDisplayCategories] = useState(fallbackCategories);

  useEffect(() => {
    if (categories && categories.length > 0) {
      setDisplayCategories(categories);
    } else if (!loading) {
      setDisplayCategories(fallbackCategories);
    }
  }, [categories, loading]);

  // Function to get the correct image URL
  const getImageUrl = (imagePath) => {
    if (!imagePath) {
      return "/images/collections/grid-cls/gaming-1.jpg";
    }

    if (imagePath.startsWith("http://") || imagePath.startsWith("https://")) {
      return imagePath;
    }

    if (imagePath.startsWith("public/")) {
      return `http://localhost:5000/${imagePath}`;
    }

    if (!imagePath.includes("/")) {
      return `http://localhost:5000/public/images/category/${imagePath}`;
    }

    return `http://localhost:5000/${imagePath}`;
  };

  // Function to split the description for the title
  const getTitleLines = (description) => {
    if (!description) {
      return { line1: "", line2: "" };
    }
    const words = description.split(" ");
    const half = Math.ceil(words.length / 2);
    return {
      line1: words.slice(0, half).join(" "),
      line2: words.slice(half).join(" "),
    };
  };

  const finalCategories = displayCategories && displayCategories.length > 0 ? displayCategories : fallbackCategories;

  if (loading) {
    return (
      <section className="flat-spacing">
        <div className="container">
          <div className="tf-grid-layout md-col-2">
            <div className="text-center" style={{ gridColumn: '1 / -1', padding: '40px' }}>
              <p>Loading categories...</p>
            </div>
          </div>
        </div>
      </section>
    );
  }

  return (
    <section className="flat-spacing">
      <div className="container">
        <div className="tf-grid-layout md-col-2">
          {finalCategories.slice(0, 2).map((category, index) => {
            const imageUrl = getImageUrl(category.logoimage);
            const { line1, line2 } = getTitleLines(category.description);

            return (
              <div
                key={category._id || index}
                className="collection-default abs-left-bottom type-xl radius-20 hover-img wow fadeInUp"
                data-wow-delay={`${index * 0.1}s`}
              >
                <a className="img-style">
                  <Image
                    className="lazyload"
                    data-src={imageUrl}
                    alt={`banner-${category.name?.toLowerCase() || 'category'}`}
                    src={imageUrl}
                    width={630}
                    height={630}
                    onError={(e) => {
                      e.target.src = fallbackCategories[index]?.logoimage || "/images/collections/grid-cls/gaming-1.jpg";
                    }}
                  />
                </a>
                <div className="content text-start">
                  <div className="box-title">
                    <p className="tag text-btn-uppercase text-white">
                      {category.name || "ACCESSORIES"}
                    </p>
                    <h3 className="title">
                      <Link href="/shop-filter-canvas" className="link text-white fw-bold font-5">
                        {line1} <br />
                        {line2}
                      </Link>
                    </h3>
                    <p className="text-white body-text-1">
                      {category.description || "Clear sound, all-day comfort."}
                    </p>
                  </div>
                  <div className="box-btn">
                    <Link
                      href="/shop-filter-canvas"
                      className="btn-line style-white has-icon"
                    >
                      Explore Robots & Research
                      <i className="icon icon-arrowUpRight" />
                    </Link>
                  </div>
                </div>
              </div>
            );
          })}

          {finalCategories.length >= 3 && (
            <div
              className="wd-load collection-default abs-left-center type-xl radius-20 hover-img wow fadeInUp"
              data-wow-delay="0s"
              style={{ gridColumn: '1 / -1' }}
            >
              <a className="img-style">
                <Image
                  className="lazyload"
                  data-src={getImageUrl(finalCategories[2].logoimage)}
                  alt={`banner-${finalCategories[2].name?.toLowerCase() || 'category'}`}
                  src={getImageUrl(finalCategories[2].logoimage)}
                  width={1290}
                  height={500}
                  onError={(e) => {
                    e.target.src = fallbackCategories[2]?.logoimage || "/images/collections/grid-cls/gaming-3.jpg";
                  }}
                />
              </a>
              <div className="content text-start">
                <div className="box-title">
                  <p className="tag text-white body-text fw-semibold">
                    {finalCategories[2].name || "ROG GAMING MOUSE"}
                  </p>
                  <h1 className="title">
                    <Link href="/shop-filter-canvas" className="link text-white fw-bold font-5">
                      {finalCategories[2].description?.split(" ").slice(0, 3).join(" ") || "Precision at Your"} <br />
                      {finalCategories[2].description?.split(" ").slice(3, 6).join(" ") || "Fingertips"}
                    </Link>
                  </h1>
                  <p className="text-white body-text-1">
                    {finalCategories[2].description || "Unleash Speed, Accuracy, and Control for the Ultimate Gaming Edge!"}
                  </p>
                </div>
                <div className="box-btn">
                  <Link
                    href="/shop-filter-canvas"
                    className="tf-btn btn-fill btn-white btn-md"
                  >
                    <span className="text">Shop now</span>
                    <i className="icon icon-arrowUpRight" />
                  </Link>
                </div>
              </div>
            </div>
          )}
        </div>
      </div>
    </section>
  );
}