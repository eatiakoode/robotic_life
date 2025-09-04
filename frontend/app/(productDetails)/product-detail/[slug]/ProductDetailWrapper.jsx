"use client";
import React, { useEffect } from "react";
import { useRecentlyViewed } from "@/hooks/useRecentlyViewed";
import RelatedProducts from "@/components/productDetails/RelatedProducts";

export default function ProductDetailWrapper({ product, slug }) {
  const { recentlyViewedIds, addToRecentlyViewed, isInitialized } = useRecentlyViewed();

  useEffect(() => {
    // Add current product to recently viewed when component mounts and hook is initialized
    if (product?.id && isInitialized) {
      addToRecentlyViewed(product.id);
    }
  }, [product?.id, addToRecentlyViewed, isInitialized]);

  return (
    <RelatedProducts 
      productSlug={slug} 
      recentlyViewedIds={isInitialized ? recentlyViewedIds : []}
    />
  );
}

