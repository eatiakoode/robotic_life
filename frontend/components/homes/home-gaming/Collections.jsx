"use client";
import React from "react";
import Link from "next/link";
import Image from "next/image";
import useCategories from "@/hooks/useCategories";
import styles from "./Collections.module.css";

export default function Collections() {
  const { categories, loading, error } = useCategories();

  // Debug logging


  // Function to get the correct image URL
  const getImageUrl = (imagePath) => {
    if (!imagePath) {

      return "/images/collections/grid-cls/gaming-1.jpg";
    }
    

    
    // If the image path is already a full URL, return it as is
    if (imagePath.startsWith('http://') || imagePath.startsWith('https://')) {

      return imagePath;
    }
    
    // If it's a relative path starting with 'public/', construct the backend URL
    if (imagePath.startsWith('public/')) {
      const url = `http://localhost:5000/${imagePath}`;

      return url;
    }
    
    // If it's just a filename, construct the backend URL
    if (!imagePath.includes('/')) {
      const url = `http://localhost:5000/public/images/category/${imagePath}`;

      return url;
    }
    
    // For other cases, try to construct the backend URL
    const url = `http://localhost:5000/${imagePath}`;

    return url;
  };

  // Fallback data if API fails
  const fallbackCategories = [
    {
      _id: "fallback-1",
      name: "ACCESSORIES",
      description: "Clear sound, all-day comfort.",
      logoimage: "/images/collections/grid-cls/gaming-1.jpg"
    },
    {
      _id: "fallback-2",
      name: "ACCESSORIES", 
      description: "Style meets functionality.",
      logoimage: "/images/collections/grid-cls/gaming-2.jpg"
    },
    {
      _id: "fallback-3",
      name: "ROG GAMING MOUSE",
      description: "Unleash Speed, Accuracy, and Control for the Ultimate Gaming Edge!",
      logoimage: "/images/collections/grid-cls/gaming-3.jpg"
    }
  ];

  // Use API data if available, otherwise fallback
  const displayCategories = categories && categories.length > 0 ? categories : fallbackCategories;
  


  // Show loading state
  if (loading) {
    return (
      <section className="flat-spacing">
        <div className="container">
          <div className={`tf-grid-layout md-col-2 ${styles.tfGridLayout}`}>
            <div className="text-center" style={{ gridColumn: '1 / -1', padding: '40px' }}>
              <p>Loading categories...</p>
            </div>
          </div>
        </div>
      </section>
    );
  }

  // Show error state
  if (error) {
    console.error('🔍 Error in Collections component:', error);
    return (
      <section className="flat-spacing">
        <div className="container">
          <div className={`tf-grid-layout md-col-2 ${styles.tfGridLayout}`}>
            <div className="text-center" style={{ gridColumn: '1 / -1', padding: '40px' }}>
              <p>Error loading categories: {error}</p>
              <p>Using fallback images...</p>
            </div>
          </div>
        </div>
      </section>
    );
  }

  return (
    <section className="flat-spacing">
      <div className="container">
        <div className={`tf-grid-layout md-col-2 ${styles.tfGridLayout}`}>
          {/* First two cards - top row */}
          {displayCategories.slice(0, 2).map((category, index) => {
            const imageUrl = getImageUrl(category.logoimage);

            
            return (
              <div
                key={category._id || index}
                className={`collection-default abs-left-bottom type-xl radius-20 hover-img wow fadeInUp ${styles.collectionCard}`}
                data-wow-delay={`${index * 0.1}s`}
              >
                <a className={`img-style ${styles.imageContainer}`}>
                  <Image
                    className={`lazyload ${styles.imageStyle}`}
                    data-src={imageUrl}
                    alt={`banner-${category.name?.toLowerCase() || 'category'}`}
                    src={imageUrl}
                    width={630}
                    height={630}
                    style={{
                      objectFit: 'cover',
                      objectPosition: 'center center',
                      width: '100%',
                      height: '100%'
                    }}
                    onError={(e) => {
                      console.error('🔍 Image failed to load:', imageUrl);
                      e.target.src = '/images/collections/grid-cls/gaming-1.jpg';
                    }}
                  />
                </a>
                <div className="content text-start">
                  <div className="box-title">
                    <p className="tag text-btn-uppercase text-white">
                      {category.name || "ACCESSORIES"}
                    </p>
                    <h3 className="title">
                      <Link
                        href={`/shop-filter-canvas`}
                        className="link text-white fw-bold font-5"
                      >
                        {category.description?.split(' ').slice(0, 3).join(' ') || "Ultimate Audio"} <br />
                        {category.description?.split(' ').slice(3).join(' ') || "Experience"}
                      </Link>
                    </h3>
                    <p className="text-white body-text-1">
                      {category.description || "Clear sound, all-day comfort."}
                    </p>
                  </div>
                  <div className="box-btn">
                    <Link
                      href={`/shop-filter-canvas`}
                      className="btn-line style-white has-icon"
                    >
                      View More
                      <i className="icon icon-arrowUpRight" />
                    </Link>
                  </div>
                </div>
              </div>
            );
          })}
          
          {/* Third card - bottom row (full width) */}
          {displayCategories.length >= 3 && (
            <div
              className={`collection-default abs-left-bottom type-xl radius-20 hover-img wow fadeInUp ${styles.collectionCardFullWidth}`}
              data-wow-delay="0.2s"
              style={{ gridColumn: '1 / -1' }}
            >
              <a className={`img-style ${styles.imageContainer}`}>
                <Image
                  className={`lazyload ${styles.imageStyle}`}
                  data-src={getImageUrl(displayCategories[2].logoimage)}
                  alt={`banner-${displayCategories[2].name?.toLowerCase() || 'category'}`}
                  src={getImageUrl(displayCategories[2].logoimage)}
                  width={1260}
                  height={630}
                  style={{
                    objectFit: 'cover',
                    objectPosition: 'center center',
                    width: '100%',
                    height: '100%'
                  }}
                  onError={(e) => {
                    console.error('🔍 Bottom card image failed to load');
                    e.target.src = '/images/collections/grid-cls/gaming-3.jpg';
                  }}
                />
              </a>
              <div className="content text-start">
                <div className="box-title">
                  <p className="tag text-btn-uppercase text-white">
                    {displayCategories[2].name || "ROG GAMING MOUSE"}
                  </p>
                  <h3 className="title">
                    <Link
                      href={`/shop-filter-canvas`}
                      className="link text-white fw-bold font-5"
                    >
                      {displayCategories[2].description?.split(' ').slice(0, 3).join(' ') || "Precision at Your"} <br />
                      {displayCategories[2].description?.split(' ').slice(3, 6).join(' ') || "Fingertips"}
                    </Link>
                  </h3>
                  <p className="text-white body-text-1">
                    {displayCategories[2].description || "Unleash Speed, Accuracy, and Control for the Ultimate Gaming Edge!"}
                  </p>
                </div>
                <div className="box-btn">
                  <Link
                    href={`/shop-filter-canvas`}
                    className="btn-line style-white has-icon"
                  >
                    View More
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
