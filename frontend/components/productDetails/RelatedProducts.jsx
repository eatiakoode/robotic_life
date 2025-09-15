"use client";
import React, { useState, useEffect, useCallback, useMemo } from "react";
import Link from "next/link";
import Image from "next/image";
import { Swiper, SwiperSlide } from "swiper/react";
import { Pagination } from "swiper/modules";
import { products } from "@/data/products";
import ProductCard1 from "../productCards/ProductCard1";
import { getRelatedProducts, getRecentlyViewed } from "@/api/product";
import { useAnimationClasses } from "@/hooks/useIsMounted";

export default function RelatedProducts({ productSlug, recentlyViewedIds = [] }) {
  const [relatedProducts, setRelatedProducts] = useState([]);
  const [recentlyViewedProducts, setRecentlyViewedProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [hasFetched, setHasFetched] = useState(false);

  // Memoize the recently viewed IDs to prevent unnecessary re-renders
  const memoizedRecentlyViewedIds = useMemo(() => {
    return Array.isArray(recentlyViewedIds) ? recentlyViewedIds : [];
  }, [recentlyViewedIds]);

  // Use animation classes hook to prevent hydration mismatch
  const tabClasses = useAnimationClasses('tab-product justify-content-sm-center');

  const fetchRelatedProducts = useCallback(async (slug) => {
    if (!slug) return [];
    
    try {
      const related = await getRelatedProducts(slug);
      return Array.isArray(related) ? related : [];
    } catch (err) {
      console.warn('Error fetching related products:', err);
      return [];
    }
  }, []);

  const fetchRecentlyViewedProducts = useCallback(async (ids) => {
    if (!ids || ids.length === 0) return [];
    
    try {
      const recentlyViewed = await getRecentlyViewed(ids);
      return Array.isArray(recentlyViewed) ? recentlyViewed : [];
    } catch (err) {
      console.warn('Error fetching recently viewed products:', err);
      return [];
    }
  }, []);

  useEffect(() => {
    const fetchData = async () => {
      // Prevent multiple simultaneous fetches
      if (hasFetched) return;
      
      try {
        setLoading(true);
        setError(null);

        const promises = [];

        // Fetch related products if slug is provided
        if (productSlug) {
          promises.push(fetchRelatedProducts(productSlug));
        } else {
          promises.push(Promise.resolve([]));
        }

        // Fetch recently viewed products if IDs are provided
        if (memoizedRecentlyViewedIds.length > 0) {
          promises.push(fetchRecentlyViewedProducts(memoizedRecentlyViewedIds));
        } else {
          promises.push(Promise.resolve([]));
        }

        const [related, recentlyViewed] = await Promise.all(promises);

        setRelatedProducts(related);
        setRecentlyViewedProducts(recentlyViewed);
        setHasFetched(true);

        // If no data from API, use fallback
        if (related.length === 0 && recentlyViewed.length === 0) {
          setRelatedProducts(products.slice(0, 4));
          setRecentlyViewedProducts(products.slice(4));
        }

      } catch (err) {
        // Silently handle errors and show fallback data
        setError('Unable to load products. Showing sample products instead.');
        
        // Fallback to static data
        setRelatedProducts(products.slice(0, 4));
        setRecentlyViewedProducts(products.slice(4));
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, [productSlug, memoizedRecentlyViewedIds, fetchRelatedProducts, fetchRecentlyViewedProducts, hasFetched]);

  // Show loading state
  if (loading) {
    return (
      <section className="flat-spacing">
        <div className="container flat-animate-tab">
          <ul
            className={tabClasses}
            data-wow-delay="0s"
            role="tablist"
          >
            <li className="nav-tab-item" role="presentation">
              <a href="#ralatedProducts" className="active" data-bs-toggle="tab">
                Related Products
              </a>
            </li>
            <li className="nav-tab-item" role="presentation">
              <a href="#recentlyViewed" data-bs-toggle="tab">
                Recently Viewed
              </a>
            </li>
          </ul>
          <div className="tab-content">
            <div className="tab-pane active show" id="ralatedProducts" role="tabpanel">
              <div className="text-center py-5">
                <div className="spinner-border" role="status">
                  <span className="visually-hidden">Loading...</span>
                </div>
                <p className="mt-3">Loading related products...</p>
              </div>
            </div>
            <div className="tab-pane" id="recentlyViewed" role="tabpanel">
              <div className="text-center py-5">
                <div className="spinner-border" role="status">
                  <span className="visually-hidden">Loading...</span>
                </div>
                <p className="mt-3">Loading recently viewed...</p>
              </div>
            </div>
          </div>
        </div>
      </section>
    );
  }
  return (
    <section className="flat-spacing">
      <div className="container flat-animate-tab">
        <ul
          className={tabClasses}
          data-wow-delay="0s"
          role="tablist"
        >
          <li className="nav-tab-item" role="presentation">
            <a href="#ralatedProducts" className="active" data-bs-toggle="tab">
              Related Products
            </a>
          </li>
          <li className="nav-tab-item" role="presentation">
            <a href="#recentlyViewed" data-bs-toggle="tab">
              Recently Viewed
            </a>
          </li>
        </ul>
        <div className="tab-content">
          <div
            className="tab-pane active show"
            id="ralatedProducts"
            role="tabpanel"
          >
            {error && (
              <div className="alert alert-info" role="alert">
                <i className="fas fa-info-circle me-2"></i>
                {error}
              </div>
            )}
            <Swiper
              className="swiper tf-sw-latest"
              dir="ltr"
              spaceBetween={15}
              breakpoints={{
                0: { slidesPerView: 2, spaceBetween: 15 },
                768: { slidesPerView: 3, spaceBetween: 30 },
                1200: { slidesPerView: 4, spaceBetween: 30 },
              }}
              modules={[Pagination]}
              pagination={{
                clickable: true,
                el: ".spd4",
              }}
            >
              {relatedProducts.length > 0 ? (
                relatedProducts.map((product, i) => (
                  <SwiperSlide key={product.id || i} className="swiper-slide">
                    <ProductCard1 product={product} />
                  </SwiperSlide>
                ))
              ) : (
                <div className="text-center py-5">
                  <div className="empty-state">
                    <i className="fas fa-robot fa-3x text-muted mb-3"></i>
                    <h5 className="text-muted">No Related Products Found</h5>
                    <p className="text-muted">
                      {productSlug 
                        ? "We couldn't find any related products for this robot. This might be the only robot in this category."
                        : "No related products available at the moment."
                      }
                    </p>
                  </div>
                </div>
              )}

              <div className="sw-pagination-latest spd4  sw-dots type-circle justify-content-center" />
            </Swiper>
          </div>
          <div className="tab-pane" id="recentlyViewed" role="tabpanel">
            {error && (
              <div className="alert alert-info" role="alert">
                <i className="fas fa-info-circle me-2"></i>
                {error}
              </div>
            )}
            <Swiper
              className="swiper tf-sw-latest"
              dir="ltr"
              spaceBetween={15}
              breakpoints={{
                0: { slidesPerView: 2, spaceBetween: 15 },
                768: { slidesPerView: 3, spaceBetween: 30 },
                1200: { slidesPerView: 4, spaceBetween: 30 },
              }}
              modules={[Pagination]}
              pagination={{
                clickable: true,
                el: ".spd5",
              }}
            >
              {recentlyViewedProducts.length > 0 ? (
                recentlyViewedProducts.map((product, i) => (
                  <SwiperSlide key={product.id || i} className="swiper-slide">
                    <ProductCard1 product={product} />
                  </SwiperSlide>
                ))
              ) : (
                <div className="text-center py-5">
                  <div className="empty-state">
                    <i className="fas fa-history fa-3x text-muted mb-3"></i>
                    <h5 className="text-muted">No Recently Viewed Products</h5>
                    <p className="text-muted">
                      {memoizedRecentlyViewedIds.length === 0
                        ? "Start browsing robots to see your recently viewed products here."
                        : "Unable to load your recently viewed products. Please try refreshing the page."
                      }
                    </p>
                  </div>
                </div>
              )}

              <div className="sw-pagination-latest spd5  sw-dots type-circle justify-content-center" />
            </Swiper>
          </div>
        </div>
      </div>
    </section>
  );
}
