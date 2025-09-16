import Footer1 from "@/components/footers/Footer1";
import Header1 from "@/components/headers/Header1";
import Descriptions1 from "@/components/productDetails/descriptions/Descriptions1";
import Details1 from "@/components/productDetails/details/Details1";
import ProductDetailWrapper from "./ProductDetailWrapper";
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
                <Link className="link text-white" href={`/`}>
                  Homepage
                </Link>
              </li>
              <li>
                <i className="icon-arrRight" />
              </li>
              <li>Robots</li>
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
                <Link className="link text-white" href={`/`}>
                  Homepage
                </Link>
              </li>
              <li>
                <i className="icon-arrRight" />
              </li>
              <li>Robots</li>
            </ul>
          </div>
        </div>
      </div>
    </div>

      {/* Suspense se smooth loading */}
      <Suspense fallback={<p className="text-center mt-5">Loading robot details...</p>}>
        <Details1 product={product} />
      </Suspense>

      <Suspense fallback={null}>
        <Descriptions1 product={product} />
      </Suspense>

      <Suspense fallback={null}>
        <ProductDetailWrapper product={product} slug={slug} />
      </Suspense>

      <Footer1 dark />
    </>
  );
}
