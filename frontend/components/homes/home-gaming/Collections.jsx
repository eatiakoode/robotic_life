"use client";
import React from "react";
import Link from "next/link";
import Image from "next/image";
import useCategories from "@/hooks/useCategories";

export default function Collections() {
  const { categories, loading, error } = useCategories();

  // Show loading state while fetching categories
  if (loading) {
    return (
      <section className="flat-spacing">
        <div className="container">
          <div className="tf-grid-layout md-col-2">
            <div
              className="collection-default abs-left-bottom type-xl radius-20 hover-img wow fadeInUp"
              data-wow-delay="0s"
            >
              <a className="img-style">
                <Image
                  className="lazyload"
                  data-src="/images/collections/grid-cls/gaming-1.jpg"
                  alt="banner-cls"
                  src="/images/collections/grid-cls/gaming-1.jpg"
                  width={630}
                  height={630}
                />
              </a>
              <div className="content text-start">
                <div className="box-title">
                  <p className="tag text-btn-uppercase text-white">Loading...</p>
                  <h3 className="title">
                    <span className="link text-white fw-bold font-5">
                      Loading Categories...
                    </span>
                  </h3>
                  <p className="text-white body-text-1">
                    Please wait while we fetch the latest categories.
                  </p>
                </div>
              </div>
            </div>
            <div
              className="collection-default abs-left-bottom type-xl radius-20 hover-img wow fadeInUp"
              data-wow-delay="0s"
            >
              <a className="img-style">
                <Image
                  className="lazyload"
                  data-src="/images/collections/grid-cls/gaming-2.jpg"
                  alt="banner-cls"
                  src="/images/collections/grid-cls/gaming-2.jpg"
                  width={630}
                  height={630}
                />
              </a>
              <div className="content text-start">
                <div className="box-title">
                  <p className="tag text-btn-uppercase text-white">Loading...</p>
                  <h3 className="title">
                    <span className="link text-white fw-bold font-5">
                      Loading Categories...
                    </span>
                  </h3>
                  <p className="text-white body-text-1">
                    Please wait while we fetch the latest categories.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    );
  }

  // If no categories available or there's an error, show fallback (original content)
  if (!categories || categories.length === 0 || error) {
    return (
      <section className="flat-spacing">
        <div className="container">
          <div className="tf-grid-layout md-col-2">
            <div
              className="collection-default abs-left-bottom type-xl radius-20 hover-img wow fadeInUp"
              data-wow-delay="0s"
            >
              <a className="img-style">
                <Image
                  className="lazyload"
                  data-src="/images/collections/grid-cls/gaming-1.jpg"
                  alt="banner-cls"
                  src="/images/collections/grid-cls/gaming-1.jpg"
                  width={630}
                  height={630}
                />
              </a>
              <div className="content text-start">
                <div className="box-title">
                  <p className="tag text-btn-uppercase text-white">Accessories</p>
                  <h3 className="title">
                    <Link
                      href={`/shop-default-grid`}
                      className="link text-white fw-bold font-5"
                    >
                      Ultimate Audio <br />
                      Experience
                    </Link>
                  </h3>
                  <p className="text-white body-text-1">
                    Clear sound, all-day comfort.
                  </p>
                </div>
                <div className="box-btn">
                  <Link
                    href={`/shop-default-grid`}
                    className="btn-line style-white has-icon"
                  >
                    Shop Now
                    <i className="icon icon-arrowUpRight" />
                  </Link>
                </div>
              </div>
            </div>
            <div
              className="collection-default abs-left-bottom type-xl radius-20 hover-img wow fadeInUp"
              data-wow-delay="0s"
            >
              <a className="img-style">
                <Image
                  className="lazyload"
                  data-src="/images/collections/grid-cls/gaming-2.jpg"
                  alt="banner-cls"
                  src="/images/collections/grid-cls/gaming-2.jpg"
                  width={630}
                  height={630}
                />
              </a>
              <div className="content text-start">
                <div className="box-title">
                  <p className="tag text-btn-uppercase text-white">Accessories</p>
                  <h3 className="title">
                    <Link
                      href={`/shop-default-grid`}
                      className="link text-white fw-bold font-5"
                    >
                      Essential Style <br />
                      Accessories
                    </Link>
                  </h3>
                  <p className="text-white body-text-1">
                    Style meets functionality.
                  </p>
                </div>
                <div className="box-btn">
                  <Link
                    href={`/shop-default-grid`}
                    className="btn-line style-white has-icon"
                  >
                    Shop Now
                    <i className="icon icon-arrowUpRight" />
                  </Link>
                </div>
              </div>
            </div>
            <div
              className="wd-load collection-default abs-left-center type-xl radius-20 hover-img wow fadeInUp"
              data-wow-delay="0s"
            >
              <a className="img-style">
                <Image
                  className="lazyload"
                  data-src="/images/collections/grid-cls/gaming-3.jpg"
                  alt="banner-cls"
                  src="/images/collections/grid-cls/gaming-3.jpg"
                  width={1290}
                  height={500}
                />
              </a>
              <div className="content text-start">
                <div className="box-title">
                  <p className="tag text-white body-text fw-semibold">
                    ROG GAMING MOUSE
                  </p>
                  <h1 className="title">
                    <Link
                      href={`/shop-default-grid`}
                      className="link text-white fw-bold font-5"
                    >
                      Precision at Your <br />
                      Fingertips
                    </Link>
                  </h1>
                  <p className="text-white body-text-1">
                    Unleash Speed, Accuracy, and Control for the <br />
                    Ultimate Gaming Edge!
                  </p>
                </div>
                <div className="box-btn">
                  <Link
                    href={`/shop-default-grid`}
                    className="tf-btn btn-fill btn-white btn-md"
                  >
                    <span className="text">Shop now</span>
                    <i className="icon icon-arrowUpRight" />
                  </Link>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    );
  }

  // Display dynamic categories (first 3 categories)
  const displayCategories = categories.slice(0, 3);

  return (
    <section className="flat-spacing">
      <div className="container">
        <div className="tf-grid-layout md-col-2">
          {displayCategories.slice(0, 2).map((category, index) => (
            <div
              key={category.id}
              className="collection-default abs-left-bottom type-xl radius-20 hover-img wow fadeInUp"
              data-wow-delay={`${index * 0.1}s`}
            >
              <a className="img-style">
                <Image
                  className="lazyload"
                  data-src={category.imageSrc}
                  alt={category.title}
                  src={category.imageSrc}
                  width={630}
                  height={630}
                  onError={(e) => {
                    e.target.src = '/images/collections/grid-cls/gaming-1.jpg';
                  }}
                />
              </a>
              <div className="content text-start">
                <div className="box-title">
                  <h3 className="title">
                    <Link
                      href={`/shop-default-grid`}
                      className="link text-white fw-bold font-5"
                    >
                      {category.title}
                    </Link>
                  </h3>
                  <p className="text-white body-text-1">
                    {category.description}
                  </p>
                </div>
                <div className="box-btn">
                  <Link
                    href={`/shop-default-grid`}
                    className="btn-line style-white has-icon"
                  >
                    Shop Now
                    <i className="icon icon-arrowUpRight" />
                  </Link>
                </div>
              </div>
            </div>
          ))}
          {displayCategories[2] ? (
            <div
              key={displayCategories[2].id}
              className="wd-load collection-default abs-left-center type-xl radius-20 hover-img wow fadeInUp"
              data-wow-delay="0s"
            >
              <a className="img-style">
                <Image
                  className="lazyload"
                  data-src={displayCategories[2].imageSrc}
                  alt={displayCategories[2].title}
                  src={displayCategories[2].imageSrc}
                  width={1290}
                  height={500}
                  onError={(e) => {
                    e.target.src = '/images/collections/grid-cls/gaming-3.jpg';
                  }}
                />
              </a>
              <div className="content text-start">
                <div className="box-title">
                  <p className="tag text-white body-text fw-semibold">
                    {displayCategories[2].title}
                  </p>
                  <h1 className="title">
                    <Link
                      href={`/shop-default-grid`}
                      className="link text-white fw-bold font-5"
                    >
                      {displayCategories[2].title}
                    </Link>
                  </h1>
                  <p className="text-white body-text-1">
                    {displayCategories[2].description}
                  </p>
                </div>
                <div className="box-btn">
                  <Link
                    href={`/shop-default-grid`}
                    className="tf-btn btn-fill btn-white btn-md"
                  >
                    <span className="text">Shop now</span>
                    <i className="icon icon-arrowUpRight" />
                  </Link>
                </div>
              </div>
            </div>
          ) : (
            <div
              className="wd-load collection-default abs-left-center type-xl radius-20 hover-img wow fadeInUp"
              data-wow-delay="0s"
            >
              <a className="img-style">
                <Image
                  className="lazyload"
                  data-src="/images/collections/grid-cls/gaming-3.jpg"
                  alt="banner-cls"
                  src="/images/collections/grid-cls/gaming-3.jpg"
                  width={1290}
                  height={500}
                />
              </a>
              <div className="content text-start">
                <div className="box-title">
                  <p className="tag text-white body-text fw-semibold">
                    ROG GAMING MOUSE
                  </p>
                  <h1 className="title">
                    <Link
                      href={`/shop-default-grid`}
                      className="link text-white fw-bold font-5"
                    >
                      Precision at Your <br />
                      Fingertips
                    </Link>
                  </h1>
                  <p className="text-white body-text-1">
                    Unleash Speed, Accuracy, and Control for the <br />
                    Ultimate Gaming Edge!
                  </p>
                </div>
                <div className="box-btn">
                  <Link
                    href={`/shop-default-grid`}
                    className="tf-btn btn-fill btn-white btn-md"
                  >
                    <span className="text">Shop now</span>
                    <i className="icon icon-arrowUpRight" />
                  </Link>
                </div>
              </div>
            </div>
          )}
        </div>
      </div>
    </section>
  );
}
