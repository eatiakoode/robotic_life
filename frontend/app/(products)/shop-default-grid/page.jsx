"use client";
import Footer1 from "@/components/footers/Footer1";
import Header1 from "@/components/headers/Header1";
import Products1 from "@/components/products/Products1";
import Link from "next/link";
import React, { useEffect, useState, Suspense } from "react";
import { useSearchParams } from "next/navigation";
import { getParentCategories } from "@/api/category";

// Metadata cannot be exported from client components
// Use dynamic title updates in useEffect instead

function ShopDefaultGridContent() {
  const searchParams = useSearchParams();
  const [categoryName, setCategoryName] = useState("All Robots");
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const categorySlug = searchParams.get('category');
    const categoryNameParam = searchParams.get('categoryName');
    const categoryType = searchParams.get('type');
    
    if (categoryNameParam) {
      setCategoryName(decodeURIComponent(categoryNameParam));
    } else if (categorySlug) {
      // If we have categorySlug but no name, fetch the category name
      const fetchCategoryName = async () => {
        try {
          setLoading(true);
          const categories = await getParentCategories();
          const category = categories.find(cat => cat.slug === categorySlug);
          if (category) {
            setCategoryName(category.name);
          } else {
            // If not found in parent categories, it might be a subcategory
            setCategoryName(categorySlug);
          }
        } catch (error) {
          console.error('Error fetching category name:', error);
          setCategoryName(categorySlug);
        } finally {
          setLoading(false);
        }
      };
      
      fetchCategoryName();
    } else {
      setCategoryName("All Robots");
    }
  }, [searchParams]);

  // Update document title dynamically
  useEffect(() => {
    const title = loading ? "Loading..." : `${categoryName} || TheBotsWorld - Advanced Robotics Solutions`;
    document.title = title;
  }, [categoryName, loading]);

  return (
    <>
      {/* <Topbar6 bgColor="bg-main" /> */}
      <Header1 />
      <div
        className="page-title"
        style={{ backgroundImage: "url(/images/section/detail-card.png)" }}
      >
        <div className="container-full">
          <div className="row">
            <div className="col-12">
              <h3 className="heading text-center text-white">
                {loading ? "Loading..." : categoryName}
              </h3>
              <ul className="breadcrumbs d-flex align-items-center justify-content-center">
                <li>
                  <Link className="text-white hover:text-gray-300 transition duration-300" href={`/`}>
                    Homepage
                  </Link>
                </li>
                <li>
                  <i className="icon-arrRight text-white" />
                </li>
                <li className="text-white">{loading ? "Loading..." : categoryName}</li>
              </ul>
            </div>
          </div>
        </div>
      </div>
      <Products1 />
      <Footer1 dark />
    </>
  );
}

export default function ShopDefaultGridPage() {
  return (
    <Suspense fallback={<div className="loading-spinner">Loading...</div>}>
      <ShopDefaultGridContent />
    </Suspense>
  );
}
