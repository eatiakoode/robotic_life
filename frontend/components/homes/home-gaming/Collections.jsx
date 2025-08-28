import React from "react";
import Link from "next/link";
import Image from "next/image";
export default function Collections() {
  return (
    <section className="flat-spacing">
      <div className="container">
<<<<<<< HEAD
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
=======
        <div className={`tf-grid-layout md-col-2 ${styles.tfGridLayout}`}>
          {/* First two cards - top row */}
          {displayCategories.slice(0, 2).map((category, index) => {
            const imageUrl = getImageUrl(category.logoimage);
            console.log(`🔍 Card ${index + 1} image URL:`, imageUrl);
            
            return (
              <div
                key={category._id || index}
                className={`collection-default abs-left-bottom type-xl radius-20 hover-img wow fadeInUp ${styles.collectionCard}`}
                data-wow-delay={`${index * 0.1}s`}
              >
                <a className={`img-style ${styles.imageContainer}`}>
                  <Image
                    className={`lazyload ${styles.imageStyle}`}
                    data-src={imageUrl}
                    alt={`banner-${category.name?.toLowerCase() || 'category'}`}
                    src={imageUrl}
                    width={630}
                    height={630}
                    style={{
                      objectFit: 'cover',
                      objectPosition: 'center center',
                      width: '100%',
                      height: '100%'
                    }}
                    onError={(e) => {
                      console.error('🔍 Image failed to load:', imageUrl);
                      e.target.src = '/images/collections/grid-cls/gaming-1.jpg';
                    }}
                  />
                </a>
                <div className="content text-start">
                  <div className="box-title">
                    <p className="tag text-btn-uppercase text-white">
                      {category.name || "ACCESSORIES"}
                    </p>
                    <h3 className="title">
                      <Link
                        href={`/shop-filter-canvas`}
                        className="link text-white fw-bold font-5"
                      >
                        {category.description?.split(' ').slice(0, 3).join(' ') || "Ultimate Audio"} <br />
                        {category.description?.split(' ').slice(3).join(' ') || "Experience"}
                      </Link>
                    </h3>
                    <p className="text-white body-text-1">
                      {category.description || "Clear sound, all-day comfort."}
                    </p>
                  </div>
                  <div className="box-btn">
                    <Link
                      href={`/shop-filter-canvas`}
                      className="btn-line style-white has-icon"
                    >
                      Shop Now
                      <i className="icon icon-arrowUpRight" />
                    </Link>
                  </div>
                </div>
              </div>
            );
          })}
          
          {/* Third card - bottom row (full width) */}
          {displayCategories.length >= 3 && (
            <div
              className={`collection-default abs-left-bottom type-xl radius-20 hover-img wow fadeInUp ${styles.collectionCardFullWidth}`}
              data-wow-delay="0.2s"
              style={{ gridColumn: '1 / -1' }}
            >
              <a className={`img-style ${styles.imageContainer}`}>
                <Image
                  className={`lazyload ${styles.imageStyle}`}
                  data-src={getImageUrl(displayCategories[2].logoimage)}
                  alt={`banner-${displayCategories[2].name?.toLowerCase() || 'category'}`}
                  src={getImageUrl(displayCategories[2].logoimage)}
                  width={1260}
                  height={630}
                  style={{
                    objectFit: 'cover',
                    objectPosition: 'center center',
                    width: '100%',
                    height: '100%'
                  }}
                  onError={(e) => {
                    console.error('🔍 Bottom card image failed to load');
                    e.target.src = '/images/collections/grid-cls/gaming-3.jpg';
                  }}
                />
              </a>
              <div className="content text-start">
                <div className="box-title">
                  <p className="tag text-btn-uppercase text-white">
                    {displayCategories[2].name || "ROG GAMING MOUSE"}
                  </p>
                  <h3 className="title">
                    <Link
                      href={`/shop-filter-canvas`}
                      className="link text-white fw-bold font-5"
                    >
                      {displayCategories[2].description?.split(' ').slice(0, 3).join(' ') || "Precision at Your"} <br />
                      {displayCategories[2].description?.split(' ').slice(3, 6).join(' ') || "Fingertips"}
                    </Link>
                  </h3>
                  <p className="text-white body-text-1">
                    {displayCategories[2].description || "Unleash Speed, Accuracy, and Control for the Ultimate Gaming Edge!"}
                  </p>
                </div>
                <div className="box-btn">
                  <Link
                    href={`/shop-filter-canvas`}
                    className="btn-line style-white has-icon"
>>>>>>> ea24ee4 (Home page & admin panel fixed)
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
