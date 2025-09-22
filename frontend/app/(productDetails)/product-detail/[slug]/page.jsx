import Footer1 from "@/components/footers/Footer1";
import Header1 from "@/components/headers/Header1";
import Descriptions1 from "@/components/productDetails/descriptions/Descriptions1";
import Details1 from "@/components/productDetails/details/Details1";
import ProductDetailWrapper from "./ProductDetailWrapper";
import ProductDetailSkeleton from "@/components/productDetails/ProductDetailSkeleton";
import { getRobotBySlug } from "@/api/product";
import React, { Suspense } from "react";
import Link from "next/link";

export const metadata = {
  title: "Robot Detail || TheBotsWorld - Advanced Robotics Solutions",
  description: "Explore detailed specifications and features of our advanced robotics solutions",
};

export default async function ProductDetailPage({ params }) {
  const { slug } = await params;

  // ✅ Fetch robot data
  const product = await getRobotBySlug(slug);

  if (!product) {
    return (
      <>
        <Header1 />

            <div
      className="page-title"
      style={{ backgroundImage: "url(/images/section/detail-card.png)" }}
    >
      <div className="container-full">
        <div className="row">
          <div className="col-12">
            <h3 className="heading text-center text-white">Robots</h3>
            <ul className="breadcrumbs d-flex align-items-center justify-content-center">
              <li>
                <Link className="text-white hover:text-gray-300 transition duration-300" href={`/`}>
                  Homepage
                </Link>
              </li>
              <li>
                <i className="icon-arrRight text-white" />
              </li>
              <li className="text-white">Robots</li>
            </ul>
          </div>
        </div>
      </div>
    </div>
        <div className="container mt-5">
          <div className="row">
            <div className="col-12">
              <h1>Robot not found</h1>
              <p>The robot you're looking for doesn't exist.</p>
            </div>
          </div>
        </div>
        <Footer1 hasPaddingBottom />
      </>
    );
  }

  return (
    <>
      <Header1 />

          <div
      className="page-title"
      style={{ backgroundImage: "url(/images/section/detail-card.png)" }}
    >
      <div className="container-full">
        <div className="row">
          <div className="col-12">
            <h3 className="heading text-center text-white">Robots</h3>
            <ul className="breadcrumbs d-flex align-items-center justify-content-center">
              <li>
                <Link className="text-white hover:text-gray-300 transition duration-300" href={`/`}>
                  Homepage
                </Link>
              </li>
              <li>
                <i className="icon-arrRight text-white" />
              </li>
              <li className="text-white">Robots</li>
            </ul>
          </div>
        </div>
      </div>
    </div>

      {/* Optimized loading with skeleton */}
      <Suspense fallback={<ProductDetailSkeleton />}>
        <Details1 product={product} />
      </Suspense>

      <Suspense fallback={<div className="skeleton-section" style={{ height: '200px', backgroundColor: '#f8f9fa', margin: '20px 0', borderRadius: '8px' }}></div>}>
        <Descriptions1 product={product} />
      </Suspense>

      <Suspense fallback={<div className="skeleton-section" style={{ height: '300px', backgroundColor: '#f8f9fa', margin: '20px 0', borderRadius: '8px' }}></div>}>
        <ProductDetailWrapper product={product} slug={slug} />
      </Suspense>

      <Footer1 dark />
    </>
  );
}
