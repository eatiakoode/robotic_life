"use client";
import React, { useEffect, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import CountdownTimer from "../common/Countdown";
// import { useContextElement } from "@/context/Context"; // Commented out e-commerce context

export default function ProductCard1({
  product,
  gridClass = "",
  parentClass = "card-product wow fadeInUp",
  isNotImageRatio = false,
  radiusClass = "",
}) {
  const [currentImage, setCurrentImage] = useState(product.imgSrc || '/images/placeholder-robot.svg');

  // Commented out e-commerce functionality but keeping the design structure

  useEffect(() => {
    setCurrentImage(product.imgSrc || '/images/placeholder-robot.svg');
  }, [product]);

  return (
    <div
      className={`${parentClass} ${gridClass} ${
        product.isOnSale ? "on-sale" : ""
      } ${product.sizes ? "card-product-size" : ""}`}
    >
      <div
        className={`card-product-wrapper ${
          isNotImageRatio ? "aspect-ratio-0" : ""
        } ${radiusClass} `}
      >
        <Link href={`/product-detail/${product.id}`} className="product-img" style={{ position: 'relative', display: 'block', width: '100%', height: '300px' }}>
          {currentImage && currentImage !== 'undefined' && currentImage !== 'null' && currentImage !== '' ? (
            <Image
              className="lazyload img-product"
              src={currentImage}
              alt={product.title || 'Product Image'}
              fill
              style={{
                objectFit: 'contain',
                objectPosition: 'center'
              }}
              onError={(e) => {
                // Fallback to placeholder if image fails to load
                e.target.src = '/images/placeholder-robot.svg';
              }}
            />
          ) : (
            <div className="placeholder-image" style={{
              width: '100%',
              height: '100%',
              backgroundColor: '#f8f9fa',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              color: '#6c757d'
            }}>
              <span>No Image</span>
            </div>
          )}

          {product.imgHover && product.imgHover.trim() !== '' && product.imgHover !== 'undefined' && product.imgHover !== 'null' && (
            <Image
              className="lazyload img-hover"
              src={product.imgHover}
              alt={product.title || 'Product Hover Image'}
              fill
              style={{
                objectFit: 'contain',
                objectPosition: 'center'
              }}
              onError={(e) => {
                // Fallback to placeholder if hover image fails to load
                e.target.src = '/images/placeholder-robot.svg';
              }}
            />
          )}
        </Link>

        {/* Commented out e-commerce hot sale marquee but keeping design structure */}
        {/* Commented out e-commerce sale percentage but keeping design structure */}
        {/* Commented out e-commerce sizes display but keeping design structure */}
        {/* Commented out e-commerce countdown timer but keeping design structure */}
        {/* Commented out e-commerce old price display but keeping design structure */}
        
        <div className="list-product-btn">
          {/* Removed the 3 interactive icons (wishlist, compare, quick view) */}
        </div>
        
        <div className="list-btn-main">
          <a
            className="btn-main-product"
            onClick={() => {
              // Commented out e-commerce functionality
              // addToCompareItem(product.id)
            }}
          >
            {/* Commented out e-commerce functionality */}
            ADD TO COMPARE
          </a>
        </div>
      </div>
      
      <div className="card-product-info">
        <Link href={`/product-detail/${product.id}`} className="title link">
          {product.title || 'Untitled Product'}
        </Link>
        
        <span className="price">
          ${(product.price || 0).toFixed(2)}
        </span>
        
        {product.colors && product.colors.length > 0 && (
          <ul className="list-color-product">
            {product.colors.map((color, index) => (
              <li
                key={index}
                className={`list-color-item color-swatch ${
                  currentImage == color.imgSrc ? "active" : ""
                } ${color.bgColor == "bg-white" ? "line" : ""}`}
                onMouseOver={() => setCurrentImage(color.imgSrc)}
              >
                <span 
                  className="swatch-value" 
                  style={{ 
                    backgroundColor: color.bgColor.startsWith('#') ? color.bgColor : undefined,
                    width: '20px',
                    height: '20px',
                    borderRadius: '50%',
                    display: 'inline-block'
                  }}
                />
                {color.imgSrc ? (
                  <Image
                    className="lazyload"
                    src={color.imgSrc}
                    alt="color variant"
                    width={600}
                    height={800}
                  />
                ) : (
                  <div className="color-placeholder" style={{
                    width: '20px',
                    height: '20px',
                    backgroundColor: color.bgColor.startsWith('#') ? color.bgColor : '#007bff',
                    borderRadius: '50%'
                  }} />
                )}
              </li>
            ))}
          </ul>
        )}
      </div>
    </div>
  );
}
