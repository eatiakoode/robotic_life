"use client";
import React, { useEffect, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import CountdownTimer from "../common/Countdown";
import { useContextElement } from "@/context/Context";
import { transformRobotForComparison } from "@/api/robotCompare";
import { openOffcanvasModal } from "@/utils/modalUtils";

export default function ProductCard1({
  product,
  gridClass = "",
  parentClass = "card-product",
  isNotImageRatio = false,
  radiusClass = "",
}) {
  // Helper function to get a valid image source
  const getValidImageSrc = (imgSrc) => {
    if (!imgSrc || imgSrc === '' || imgSrc === null || imgSrc === undefined) {
      return '/images/products/product-1.jpg'; // Default fallback image
    }
    return imgSrc;
  };

  const [currentImage, setCurrentImage] = useState(getValidImageSrc(product.imgSrc));

  const {
    addRobotToCompare,
    isAddedtoCompareItem,
  } = useContextElement();

  useEffect(() => {
    setCurrentImage(getValidImageSrc(product.imgSrc));
  }, [product]);

  return (
    <>
      <style jsx>{`
        .manufacturer-info {
          margin-top: 8px;
          padding: 4px 0;
        }
        .manufacturer-label {
          font-size: 12px;
          color: #666;
          font-weight: 500;
          margin-right: 4px;
        }
        .manufacturer-name {
          font-size: 13px;
          color: #333;
          font-weight: 600;
        }
      `}</style>
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
        <Link href={`/product-detail/${product.slug && product.slug.trim() ? product.slug : product.id}`} className="product-img">
          <Image
            className="lazyload img-product"
            src={getValidImageSrc(currentImage)}
            alt={product.title || 'Robot'}
            width={600}
            height={800}
          />
          <Image
            className="lazyload img-hover"
            src={getValidImageSrc(product.imgHover)}
            alt={product.title || 'Robot'}
            width={600}
            height={800}
          />
        </Link>
        {product.hotSale && (
          <div className="marquee-product bg-main">
            <div className="marquee-wrapper">
              <div className="initial-child-container">
                <div className="marquee-child-item">
                  <p className="font-2 text-btn-uppercase fw-6 text-white">
                    Hot Sale 25% OFF
                  </p>
                </div>
                <div className="marquee-child-item">
                  <span className="icon icon-lightning text-critical" />
                </div>
                <div className="marquee-child-item">
                  <p className="font-2 text-btn-uppercase fw-6 text-white">
                    Hot Sale 25% OFF
                  </p>
                </div>
                <div className="marquee-child-item">
                  <span className="icon icon-lightning text-critical" />
                </div>
                <div className="marquee-child-item">
                  <p className="font-2 text-btn-uppercase fw-6 text-white">
                    Hot Sale 25% OFF
                  </p>
                </div>
                <div className="marquee-child-item">
                  <span className="icon icon-lightning text-critical" />
                </div>
                <div className="marquee-child-item">
                  <p className="font-2 text-btn-uppercase fw-6 text-white">
                    Hot Sale 25% OFF
                  </p>
                </div>
                <div className="marquee-child-item">
                  <span className="icon icon-lightning text-critical" />
                </div>
                <div className="marquee-child-item">
                  <p className="font-2 text-btn-uppercase fw-6 text-white">
                    Hot Sale 25% OFF
                  </p>
                </div>
                <div className="marquee-child-item">
                  <span className="icon icon-lightning text-critical" />
                </div>
              </div>
            </div>
            <div className="marquee-wrapper">
              <div className="initial-child-container">
                <div className="marquee-child-item">
                  <p className="font-2 text-btn-uppercase fw-6 text-white">
                    Hot Sale 25% OFF
                  </p>
                </div>
                <div className="marquee-child-item">
                  <span className="icon icon-lightning text-critical" />
                </div>
                <div className="marquee-child-item">
                  <p className="font-2 text-btn-uppercase fw-6 text-white">
                    Hot Sale 25% OFF
                  </p>
                </div>
                <div className="marquee-child-item">
                  <span className="icon icon-lightning text-critical" />
                </div>
                <div className="marquee-child-item">
                  <p className="font-2 text-btn-uppercase fw-6 text-white">
                    Hot Sale 25% OFF
                  </p>
                </div>
                <div className="marquee-child-item">
                  <span className="icon icon-lightning text-critical" />
                </div>
                <div className="marquee-child-item">
                  <p className="font-2 text-btn-uppercase fw-6 text-white">
                    Hot Sale 25% OFF
                  </p>
                </div>
                <div className="marquee-child-item">
                  <span className="icon icon-lightning text-critical" />
                </div>
                <div className="marquee-child-item">
                  <p className="font-2 text-btn-uppercase fw-6 text-white">
                    Hot Sale 25% OFF
                  </p>
                </div>
                <div className="marquee-child-item">
                  <span className="icon icon-lightning text-critical" />
                </div>
              </div>
            </div>
          </div>
        )}
        {product.isOnSale && (
          <div className="on-sale-wrap">
            <span className="on-sale-item">-{product.salePercentage}</span>
          </div>
        )}
        {product.sizes && (
          <div className="variant-wrap size-list">
            <ul className="variant-box">
              {product.sizes.map((size) => (
                <li key={size} className="size-item">
                  {size}
                </li>
              ))}
            </ul>
          </div>
        )}
        {product.countdown && (
          <div className="variant-wrap countdown-wrap">
            <div className="variant-box">
              <div
                className="js-countdown"
                data-timer={product.countdown}
                data-labels="D :,H :,M :,S"
              >
                <CountdownTimer />
              </div>
            </div>
          </div>
        )}
        {product.oldPrice ? (
          <div className="on-sale-wrap">
            <span className="on-sale-item">-25%</span>
          </div>
        ) : (
          ""
        )}
        <div className="list-btn-main">
          <a
            className="btn-main-product"
            href="#compare"
            data-bs-toggle="offcanvas"
            aria-controls="compare"
            onClick={(e) => {
              e.preventDefault();
              const robotData = transformRobotForComparison(product);
              if (robotData && robotData.id) {
                if (isAddedtoCompareItem(robotData.id)) {
                  openOffcanvasModal('compare');
                  return;
                }
                addRobotToCompare(robotData);
                setTimeout(() => {
                  openOffcanvasModal('compare');
                }, 100);
              } else {
                const productId = product._id || product.id;
                if (isAddedtoCompareItem(productId)) {
                  openOffcanvasModal('compare');
                  return;
                }
                addToCompareItem(productId);
                setTimeout(() => {
                  openOffcanvasModal('compare');
                }, 100);
              }
            }}
          >
            {isAddedtoCompareItem(product._id || product.id)
              ? "Already Compared"
              : "Add to Compare"}
          </a>
        </div>
      </div>
      <div className="card-product-info">
        <Link href={`/product-detail/${product.slug && product.slug.trim() ? product.slug : product.id}`} className="title link">
          {product.title}
        </Link>
        <span className="manufacturer-name">
          {product.manufacturer && (
            <>
            <span className="manufacturer-label">Manufacturer:</span>
            <span className="manufacturer-name">{product.manufacturer.name || product.manufacturer}</span>
            </>
        )}
        </span>
        <span className="price">
          {product.oldPrice && (
            <span className="old-price">${product.oldPrice.toFixed(2)}</span>
          )}{" "}
          ${product.price?.toFixed(2)}
        </span>
      </div>
    </div>
    </>
  );
}