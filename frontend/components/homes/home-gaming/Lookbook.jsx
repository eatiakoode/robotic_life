"use client";

import Image from "next/image";

import LookbookProduct from "@/components/common/LookbookProduct";
import { lookbookProducts } from "@/data/products";
import { useEffect } from "react";
export default function LookBook() {
  return (
    <section className="banner-lookbook">
      <Image
        className="lazyload"
        data-src="/images/banner/static-banner.png"
        alt="banner"
        src="/images/banner/static-banner.png"
        width={1920}
        height={692}
      />
      {/* <div className="lookbook-item position5">
        <div className="dropdown dropup-center dropdown-custom">
          <div
            role="dialog"
            className="tf-pin-btn"
            data-bs-toggle="dropdown"
            aria-expanded="false"
          >
            <span />
          </div>
          <div className="dropdown-menu">
            <LookbookProduct product={lookbookProducts[10]} />
          </div>
        </div>
      </div> */}
    </section>
  );
}
