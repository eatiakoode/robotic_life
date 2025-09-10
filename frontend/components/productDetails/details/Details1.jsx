"use client";

import React, { useState, Suspense } from "react";
import dynamic from "next/dynamic";

// ✅ Heavy components lazy load
const Slider1 = dynamic(() => import("../sliders/Slider1"), { ssr: false });
const ProductStikyBottom = dynamic(() => import("../ProductStikyBottom"), { ssr: false });
const ColorSelect = dynamic(() => import("../ColorSelect"), { ssr: false });

export default function Details1({ product }) {
  const [activeColor, setActiveColor] = useState(
    product.colors?.length > 0 ? product.colors[0].color : "gray"
  );

  return (
    <section className="flat-spacing">
      <div className="tf-main-product section-image-zoom">
        <div className="container">
          <div className="row">
            {/* 🔹 Product Images */}
            <div className="col-md-6">
              <div className="tf-product-media-wrap sticky-top">
                <Suspense fallback={<p>Loading images...</p>}>
                  <Slider1
                    setActiveColor={setActiveColor}
                    activeColor={activeColor}
                    firstItem={product.imgSrc}
                    productImages={product.images || []}
                  />
                </Suspense>
              </div>
            </div>

            {/* 🔹 Product Info */}
            <div className="col-md-6">
              <div className="tf-product-info-wrap position-relative mw-100p-hidden ">
                <div className="tf-product-info-list other-image-zoom">
                  <div className="tf-product-info-heading">
                    <div className="tf-product-info-name">
                      <div className="text text-btn-uppercase">
                        {product.category?.name ||
                          product.category?.title ||
                          (typeof product.category === "string"
                            ? product.category
                            : "Robot")}
                      </div>
                      <h3 className="name">{product.title}</h3>
                    </div>

                    {/* 🔹 Price + Description */}
                    <div className="tf-product-info-desc">
                      <div className="tf-product-info-price">
                        <h5 className="price-on-sale font-2">
                          ${product.price?.toFixed(2) || "N/A"}
                        </h5>
                      </div>
                      <p>
                        {product.description ||
                          "Advanced robotics solution with cutting-edge technology and innovative features."}
                      </p>
                    </div>
                  </div>

                  {/* 🔹 Color Selector */}
                  <Suspense fallback={<p>Loading color options...</p>}>
                    <ColorSelect
                      setActiveColor={setActiveColor}
                      activeColor={activeColor}
                      colorOptions={product.colors || []}
                    />
                  </Suspense>

                  {/* 🔹 Specifications */}
                  <div className="tf-product-info-specifications mb_20 mt-3">
                    <div className="spec-item mb_6">
                      <span className="fw-bold">Manufacturer:</span>
                      <span className="ms-2">
                        {product.manufacturer?.name ||
                          product.manufacturer?.title ||
                          (typeof product.manufacturer === "string"
                            ? product.manufacturer
                            : "N/A")}
                      </span>
                    </div>
                    <div className="spec-item mb_6">
                      <span className="fw-bold">Launch Year:</span>
                      <span className="ms-2">{product.launchYear || "N/A"}</span>
                    </div>
                    <div className="spec-item mb_6">
                      <span className="fw-bold">Version:</span>
                      <span className="ms-2">{product.version || "N/A"}</span>
                    </div>
                    <div className="spec-item mb_6">
                      <span className="fw-bold">Country of Origin:</span>
                      <span className="ms-2">
                        {(() => {
                          if (!product.countryOfOrigin) return "United States"; // default fallback
                          if (typeof product.countryOfOrigin === "string")
                            return product.countryOfOrigin;
                          if (product.countryOfOrigin.title)
                            return product.countryOfOrigin.title;
                          if (product.countryOfOrigin.name)
                            return product.countryOfOrigin.name;
                          return "United States";
                        })()}
                      </span>
                    </div>
                  </div>
                </div>
              </div>
            </div>
            {/* /Product Info */}
          </div>
        </div>
      </div>

      {/* 🔹 Sticky Bottom */}
      <Suspense fallback={null}>
        {/* <ProductStikyBottom /> */}
      </Suspense>
    </section>
  );
}
