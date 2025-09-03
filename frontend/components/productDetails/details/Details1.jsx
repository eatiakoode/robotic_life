"use client";
import React, { useEffect, useState } from "react";
import Slider1 from "../sliders/Slider1";
import ColorSelect from "../ColorSelect";
import SizeSelect from "../SizeSelect";
import QuantitySelect from "../QuantitySelect";
import Image from "next/image";
import { useContextElement } from "@/context/Context";
import ProductStikyBottom from "../ProductStikyBottom";
export default function Details1({ product }) {
  const [activeColor, setActiveColor] = useState(
    product.colors && product.colors.length > 0 ? product.colors[0].color : "gray"
  );
  const [quantity, setQuantity] = useState(1);
  const {
    addProductToCart,
    isAddedToCartProducts,
    addToWishlist,
    isAddedtoWishlist,
    isAddedtoCompareItem,
    addToCompareItem,
    cartProducts,
    updateQuantity,
  } = useContextElement();

  return (
    <section className="flat-spacing">
      <div className="tf-main-product section-image-zoom">
        <div className="container">
          <div className="row">
            {/* Product default */}
            <div className="col-md-6">
              <div className="tf-product-media-wrap sticky-top">
                <Slider1
                  setActiveColor={setActiveColor}
                  activeColor={activeColor}
                  firstItem={product.imgSrc}
                  productImages={product.images || []}
                />
              </div>
            </div>
            {/* /Product default */}
            {/* tf-product-info-list */}
            <div className="col-md-6">
              <div className="tf-product-info-wrap position-relative mw-100p-hidden ">
                <div className="tf-zoom-main" />
                <div className="tf-product-info-list other-image-zoom">
                  <div className="tf-product-info-heading">
                    <div className="tf-product-info-name">
                      <div className="text text-btn-uppercase">
                        {product.category?.name || product.category?.title || (typeof product.category === 'string' ? product.category : 'Robot')}
                      </div>
                      <h3 className="name">{product.title}</h3>
                      <div className="sub">
                        <div className="tf-product-info-rate">
                          <div className="list-star">
                            <i className="icon icon-star" />
                            <i className="icon icon-star" />
                            <i className="icon icon-star" />
                            <i className="icon icon-star" />
                            <i className="icon icon-star" />
                          </div>
                          <div className="text text-caption-1">
                            (104 reviews)
                          </div>
                        </div>
                        <div className="tf-product-info-sold">
                          <i className="icon icon-lightning" />
                          <div className="text text-caption-1">
                            10&nbsp;sold in last&nbsp;22&nbsp;hours
                          </div>
                        </div>
                      </div>
                    </div>
                    <div className="tf-product-info-desc">
                      <div className="tf-product-info-price">
                        <h5 className="price-on-sale font-2">
                          ${product.price.toFixed(2)}
                        </h5>
                      </div>
                      <p>
                        {product.description || 'Advanced robotics solution with cutting-edge technology and innovative features.'}
                      </p>
                      <div className="tf-product-info-liveview">
                        <i className="icon icon-eye" />
                        <p className="text-caption-1">
                          <span className="liveview-count">20</span> people are
                          viewing this right now
                        </p>
                      </div>
                    </div>
                  </div>
                  <div className="tf-product-info-choose-option">
                    <ColorSelect
                      setActiveColor={setActiveColor}
                      activeColor={activeColor}
                      colorOptions={product.colors || []}
                    />
                    {/* Size selection and quantity selector removed as requested */}
                    {/* Buttons removed as requested */}
                    
                    {/* Basic Information Content (without heading) */}
                    <div className="tf-product-info-specifications mb_20">
                      <div className="specification-group mb_10">
                        <div className="row">
                          <div className="col-md-6">
                            <div className="spec-item mb_6">
                              <span className="text-caption-1 fw-bold">Manufacturer:</span>
                              <span className="text-caption-1 text-1 ms-2">
                                {product.manufacturer?.name || product.manufacturer?.title || (typeof product.manufacturer === 'string' ? product.manufacturer : 'N/A')}
                              </span>
                    </div>
                            <div className="spec-item mb_6">
                              <span className="text-caption-1 fw-bold">Launch Year:</span>
                              <span className="text-caption-1 text-1 ms-2">
                                {product.launchYear || 'N/A'}
                          </span>
                          </div>
                        </div>
                          <div className="col-md-6">
                            <div className="spec-item mb_6">
                              <span className="text-caption-1 fw-bold">Version:</span>
                              <span className="text-caption-1 text-1 ms-2">
                                {product.version || 'N/A'}
                              </span>
                            </div>
                            <div className="spec-item mb_6">
                              <span className="text-caption-1 fw-bold">Country of Origin:</span>
                              <span className="text-caption-1 text-1 ms-2">
                                {product.countryOfOrigin?.name || product.countryOfOrigin?.title || (typeof product.countryOfOrigin === 'string' ? product.countryOfOrigin : 'N/A')}
                              </span>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>

                    {/* Delivery, return, warranty, and store information removed as requested */}
                    <ul className="tf-product-info-sku">
                      <li>
                        <p className="text-caption-1">Robot ID:</p>
                        <p className="text-caption-1 text-1">{product.id || 'N/A'}</p>
                      </li>
                      <li>
                        <p className="text-caption-1">Manufacturer:</p>
                        <p className="text-caption-1 text-1">{product.manufacturer?.name || product.manufacturer?.title || (typeof product.manufacturer === 'string' ? product.manufacturer : 'N/A')}</p>
                      </li>
                      <li>
                        <p className="text-caption-1">Status:</p>
                        <p className="text-caption-1 text-1">Available</p>
                      </li>
                      <li>
                        <p className="text-caption-1">Category:</p>
                        <p className="text-caption-1">
                          <a href="#" className="text-1 link">
                            {product.category?.name || product.category?.title || (typeof product.category === 'string' ? product.category : 'Robot')}
                          </a>
                        </p>
                      </li>
                      <li>
                        <p className="text-caption-1">Launch Year:</p>
                        <p className="text-caption-1 text-1">{product.launchYear || 'N/A'}</p>
                      </li>
                      <li>
                        <p className="text-caption-1">Version:</p>
                        <p className="text-caption-1 text-1">{product.version || 'N/A'}</p>
                      </li>
                    </ul>
                    {/* Payment methods section removed as requested */}
                  </div>
                </div>
              </div>
            </div>
            {/* /tf-product-info-list */}
          </div>
        </div>
      </div>
      <ProductStikyBottom />
    </section>
  );
}
