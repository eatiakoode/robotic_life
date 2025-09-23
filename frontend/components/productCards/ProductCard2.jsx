"use client";
import { products3 } from "@/data/products";
import React, { useEffect, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { useContextElement } from "@/context/Context";
export default function ProductCard2({
  product = products3[0],
  addedClass = "",
}) {
  const [currentImage, setCurrentImage] = useState(product.imgSrc);

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
    setCurrentImage(product.imgSrc);
  }, [product]);

  return (
    <div
      className={`card-product bundle-hover-item  ${addedClass} wow fadeInUp`}
      data-wow-delay={product.wowDelay}
    >
      <div className="card-product-wrapper">
        <Link href={`/product-detail/${product.slug && product.slug.trim() ? product.slug : product.id}`} className="product-img">
          <Image
            className="lazyload img-product"
            data-src={product.imgSrc}
            src={currentImage}
            alt="image-product"
            width={351}
            height={468}
          />
          <Image
            className="lazyload img-hover"
            data-src={product.imgHover}
            src={product.imgHover}
            alt="image-product"
            width={600}
            height={800}
          />
        </Link>
        <div className="on-sale-wrap">
          <span className="on-sale-item">{product.saleText}</span>
        </div>
        <div className="list-btn-main">
          <a
            href="#quickView"
            onClick={() => setQuickViewItem(product)}
            data-bs-toggle="modal"
            className="btn-main-product"
          >
            Quick View
          </a>
        </div>
      </div>
      <div className="card-product-info">
        <Link href={`/product-detail/${product.slug && product.slug.trim() ? product.slug : product.id}`} className="title link">
          {product.title}
        </Link>
        <span className="price">
          <span className="old-price">${product.price.toFixed(2)}</span>$
          {product.oldPrice.toFixed(2)}
        </span>
        {product.manufacturer && (
          <div className="manufacturer-info">
            <span className="manufacturer-label">Manufacturer:</span>
            <span className="manufacturer-name">{product.manufacturer.name || product.manufacturer}</span>
          </div>
        )}
      </div>
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
    </div>
  );
}
