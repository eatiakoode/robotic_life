import Footer1 from "@/components/footers/Footer1";
import Header1 from "@/components/headers/Header1";
import Topbar6 from "@/components/headers/Topbar6";
import Breadcumb from "@/components/productDetails/Breadcumb";
import Descriptions1 from "@/components/productDetails/descriptions/Descriptions1";
import Details1 from "@/components/productDetails/details/Details1";
import RelatedProducts from "@/components/productDetails/RelatedProducts";
import { getRobotBySlug } from "@/api/product";
import React from "react";

export const metadata = {
  title: "Robot Detail || THEBOTSWORLD - Advanced Robotics Solutions",
  description: "Explore detailed specifications and features of our advanced robotics solutions",
};

export default async function ProductDetailPage({ params }) {
  const { slug } = await params;

  // Fetch robot data from backend using slug
  const product = await getRobotBySlug(slug);
  
  // Fallback to default product if not found
  if (!product) {
    return (
      <>
        {/* <Topbar6 bgColor="bg-main" /> */}
        <Header1 />
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
      {/* <Topbar6 bgColor="bg-main" /> */}
      <Header1 />
      <Breadcumb product={product} />
      <Details1 product={product} />
      <Descriptions1 product={product} />
      <RelatedProducts />
      <Footer1 hasPaddingBottom />
    </>
  );
}
