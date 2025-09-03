"use client";
import React, { useEffect, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import CountdownTimer from "../common/Countdown";

import { useContextElement } from "@/context/Context";
export default function ProductsCards6({ product }) {
  // Helper function to get a valid image source
  const getValidImageSrc = (imgSrc) => {
    if (!imgSrc || imgSrc === '' || imgSrc === null || imgSrc === undefined) {
      return '/images/products/product-1.jpg'; // Default fallback image
    }
    return imgSrc;
  };

  const [currentImage, setCurrentImage] = useState(getValidImageSrc(product.imgSrc));
  


  const {
    setQuickAddItem,
    addToWishlist,
    isAddedtoWishlist,
    addToCompareItem,
    isAddedtoCompareItem,
    setQuickViewItem,
    addProductToCart,
    isAddedToCartProducts,
  } = useContextElement();

  useEffect(() => {
    setCurrentImage(getValidImageSrc(product.imgSrc));
  }, [product]);
  return (
    <div
      className="card-product style-list"
      data-availability="In stock"
      data-brand="gucci"
    >
      <div className="card-product-wrapper">
        <Link href={`/product-detail/${product.slug && product.slug.trim() ? product.slug : product.id}`} className="product-img">
          <Image
            className="lazyload img-product"
            src={getValidImageSrc(currentImage)}
            alt={product.title || 'Robot'}
            width={600}
            height={800}
            style={{ position: 'relative', zIndex: 0 }}
          />
          {/* Hover image - will be the same as main image if no second image exists */}
          <Image
            className="lazyload img-hover"
            src={getValidImageSrc(product.imgHover)}
            alt={product.title || 'Robot'}
            width={600}
            height={800}
            style={{ position: 'absolute', inset: 0, zIndex: 1 }}
          />
        </Link>
        {product.isOnSale && (
          <div className="on-sale-wrap">
            <span className="on-sale-item">-25%</span>
          </div>
        )}
      </div>
      <div className="card-product-info">
        <Link href={`/product-detail/${product.slug && product.slug.trim() ? product.slug : product.id}`} className="title link">
          {product.title}
        </Link>
        <span className="price current-price">
          {product.oldPrice && (
            <span className="old-price">${product.oldPrice.toFixed(2)}</span>
          )}{" "}
          ${product.price?.toFixed(2)}
        </span>
        <p className="description text-secondary text-line-clamp-2">
          {product.description || 'No description available'}
        </p>

        <div className="variant-wrap-list">
          {product.colors && (
            <ul className="list-color-product">
              {product.colors.map((color, index) => (
                <li
                  key={index}
                  className={`list-color-item color-swatch ${
                    currentImage == color.imgSrc ? "active" : ""
                  } `}
                  onMouseOver={() => setCurrentImage(getValidImageSrc(color.imgSrc))}
                >
                  <span className={`swatch-value ${color.bgColor}`} />
                  <Image
                    className="lazyload"
                    src={getValidImageSrc(color.imgSrc)}
                    alt="color variant"
                    width={600}
                    height={800}
                  />
                </li>
              ))}
            </ul>
          )}
          {product.sizes && (
            <div className="size-box list-product-btn">
              <span className="size-item box-icon">S</span>
              <span className="size-item box-icon">M</span>
              <span className="size-item box-icon">L</span>
              <span className="size-item box-icon">XL</span>
              <span className="size-item box-icon disable">XXL</span>
            </div>
          )}
          <div className="list-product-btn">
            <a
              onClick={() => addProductToCart(product.id)}
              className="btn-main-product"
            >
              {isAddedToCartProducts(product.id)
                ? "Already Added"
                : "Add To cart"}
            </a>
            <a
              onClick={() => addToWishlist(product.id)}
              className="box-icon wishlist btn-icon-action"
            >
              <span className="icon icon-heart" />
              <span className="tooltip">
                {isAddedtoWishlist(product.id)
                  ? "Already Wishlished"
                  : "Wishlist"}
              </span>
            </a>
            <a
              href="#compare"
              data-bs-toggle="offcanvas"
              aria-controls="compare"
              onClick={() => addToCompareItem(product.id)}
              className="box-icon compare btn-icon-action"
            >
              <span className="icon icon-gitDiff" />
              <span className="tooltip">
                {" "}
                {isAddedtoCompareItem(product.id)
                  ? "Already compared"
                  : "Compare"}
              </span>
            </a>
            <a
              href="#quickView"
              onClick={() => setQuickViewItem(product)}
              data-bs-toggle="modal"
              className="box-icon quickview tf-btn-loading"
            >
              <span className="icon icon-eye" />
              <span className="tooltip">Quick View</span>
            </a>
          </div>
        </div>
      </div>
    </div>
  );
}
