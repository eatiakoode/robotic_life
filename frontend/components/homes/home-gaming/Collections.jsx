"use client";
import React, { useState, useEffect } from "react";
import Link from "next/link";
import Image from "next/image";
import useCategories from "@/hooks/useCategories";
import styles from "./Collections.module.css";

export default function Collections() {
  const { categories, loading, error } = useCategories();

  const [displayCategories, setDisplayCategories] = useState([]);

  useEffect(() => {
    if (categories && categories.length > 0) {
      setDisplayCategories(categories);
    } else {
      setDisplayCategories([]);
    }
  }, [categories]);

  // Function to get the correct image URL
  const getImageUrl = (imagePath) => {
    if (!imagePath) {
      return "/images/collections/grid-cls/gaming-1.jpg";
    }

    if (imagePath.startsWith("http://") || imagePath.startsWith("https://")) {
      return imagePath;
    }

    if (imagePath.startsWith("public/")) {
      return `${process.env.NEXT_PUBLIC_API_URL || 'https://thebotsworld.onrender.com'}/${imagePath}`;
    }

    if (!imagePath.includes("/")) {
      return `${process.env.NEXT_PUBLIC_API_URL || 'https://thebotsworld.onrender.com'}/public/images/category/${imagePath}`;
    }

    return `${process.env.NEXT_PUBLIC_API_URL || 'https://thebotsworld.onrender.com'}/${imagePath}`;
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

  // Function to generate slug from category name
  const generateSlug = (name) => {
    if (!name) return 'category';
    return name.toLowerCase()
      .replace(/[^a-z0-9\s-]/g, '') // Remove special characters
      .replace(/\s+/g, '-') // Replace spaces with hyphens
      .replace(/-+/g, '-') // Replace multiple hyphens with single hyphen
      .trim();
  };

  // Function to get the category filter URL
  const getCategoryFilterUrl = (category) => {
    try {
      if (category && category.slug) {
        // Check if this is a subcategory (has a parent) or parent category
        const isSubcategory = category.parent && category.parent !== null;
        const categoryType = isSubcategory ? 'subcategory' : 'parent';
        
        return `/shop-default-grid?category=${category.slug}&type=${categoryType}`;
      } else if (category && category.name) {
        // Generate slug from name if slug is missing
        const generatedSlug = generateSlug(category.name);
        return `/shop-default-grid?category=${generatedSlug}&type=parent`;
      } else {
        return '/shop-default-grid';
      }
    } catch (error) {
      return '/shop-default-grid';
    }
  };

  if (loading) {
    return (
      <section className="flat-spacing">
        <div className="container">
          <div className="tf-grid-layout md-col-2 collections-responsive">
            <div className="text-center" style={{ gridColumn: '1 / -1', padding: '40px' }}>
              <div className="spinner-border text-primary" role="status">
                <span className="visually-hidden">Loading categories...</span>
              </div>
              <p className="mt-3 text-muted">Loading categories...</p>
            </div>
          </div>
        </div>
      </section>
    );
  }

  if (error || !displayCategories || displayCategories.length === 0) {
    return (
      <section className="flat-spacing">
        <div className="container">
          <div className="tf-grid-layout md-col-2 collections-responsive">
            <div className="text-center" style={{ gridColumn: '1 / -1', padding: '40px' }}>
              <h4 className="text-muted">No categories available</h4>
              <p className="text-muted">Please check your category configuration in the admin panel.</p>
            </div>
          </div>
        </div>
      </section>
    );
  }

  return (
    <section className="flat-spacing">
      <div className="container">
        <div className="tf-grid-layout md-col-2 collections-responsive">
          {displayCategories.slice(0, 2).map((category, index) => {
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
                      e.target.src = "/images/collections/grid-cls/gaming-1.jpg";
                    }}
                  />
                </a>
                <div className="content text-start">
                  <div className="box-title">
                    <h3 className="title text-white">
                      {category.name || "Category"}
                    </h3>
                    <p className="text-white body-text-1">
                      {category.description || "No description available"}
                    </p>
                  </div>
                  <div className="box-btn">
                    <Link
                      href={getCategoryFilterUrl(category)}
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

          {displayCategories.length >= 3 && (
            <div
              className="wd-load collection-default abs-left-center type-xl radius-20 hover-img wow fadeInUp"
              data-wow-delay="0s"
              style={{ gridColumn: '1 / -1' }}
            >
              <a className="img-style">
                <Image
                  className="lazyload"
                  data-src={getImageUrl(displayCategories[2].logoimage)}
                  alt={`banner-${displayCategories[2].name?.toLowerCase() || 'category'}`}
                  src={getImageUrl(displayCategories[2].logoimage)}
                  width={1290}
                  height={500}
                  onError={(e) => {
                    e.target.src = "/images/collections/grid-cls/gaming-3.jpg";
                  }}
                />
              </a>
              <div className="content text-start">
                <div className="box-title">
                  <h3 className="title">
                    <Link href="/shop-default-grid" className="link text-white fw-bold font-5">
                      {displayCategories[2].name || "Category"}
                    </Link>
                  </h3>
                  <p className="text-white body-text-1">
                    {displayCategories[2].description || "No description available"}
                  </p>
                </div>
                <div className="box-btn">
                  <Link
                    href={getCategoryFilterUrl(displayCategories[2])}
                    className="tf-btn btn-fill btn-white btn-md"
                  >
                    <span className="text">Explore Robots</span>
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