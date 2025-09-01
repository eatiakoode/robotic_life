"use client";
import Footer1 from "@/components/footers/Footer1";
import Header1 from "@/components/headers/Header1";
import Topbar6 from "@/components/headers/Topbar6";
import Products1 from "@/components/products/Products1";
import Link from "next/link";
import React, { useEffect, useState } from "react";
import { useSearchParams } from "next/navigation";
import { getParentCategories } from "@/api/category";

export default function ShopDefaultGridPage() {
  const searchParams = useSearchParams();
  const [categoryName, setCategoryName] = useState("All Robots");
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const categoryId = searchParams.get('category');
    const categoryNameParam = searchParams.get('categoryName');
    
    if (categoryNameParam) {
      setCategoryName(decodeURIComponent(categoryNameParam));
    } else if (categoryId) {
      // If we have categoryId but no name, fetch the category name
      const fetchCategoryName = async () => {
        try {
          setLoading(true);
          const categories = await getParentCategories();
          const category = categories.find(cat => cat._id === categoryId);
          if (category) {
            setCategoryName(category.name);
          }
        } catch (error) {
          console.error('Error fetching category name:', error);
        } finally {
          setLoading(false);
        }
      };
      
      fetchCategoryName();
    }
  }, [searchParams]);

  return (
    <>
      {/* <Topbar6 bgColor="bg-main" /> */}
      <Header1 />
      <div
        className="page-title"
        style={{ backgroundImage: "url(/images/section/page-title.jpg)" }}
      >
        <div className="container-full">
          <div className="row">
            <div className="col-12">
              <h3 className="heading text-center">
                {loading ? "Loading..." : categoryName}
              </h3>
              <ul className="breadcrumbs d-flex align-items-center justify-content-center">
                <li>
                  <Link className="link" href={`/`}>
                    Homepage
                  </Link>
                </li>
                <li>
                  <i className="icon-arrRight" />
                </li>
                <li>{loading ? "Loading..." : categoryName}</li>
              </ul>
            </div>
          </div>
        </div>
      </div>
      <Products1 />
      <Footer1 />
    </>
  );
}
