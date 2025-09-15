import React from "react";
import ProductCard1 from "../productCards/ProductCard1";
import Pagination from "../common/Pagination";
import { useAnimationClasses } from "@/hooks/useIsMounted";

export default function GridView({ 
  products, 
  pagination = true, 
  currentPage = 1, 
  itemsPerPage = 12, 
  onPageChange 
}) {
  // Use animation classes hook to prevent hydration mismatch
  const cardClasses = useAnimationClasses('card-product');
  
  // Calculate pagination
  const totalPages = Math.ceil(products.length / itemsPerPage);
  const startIndex = (currentPage - 1) * itemsPerPage;
  const endIndex = startIndex + itemsPerPage;
  const paginatedProducts = products.slice(startIndex, endIndex);
  
  console.log('🎯 GridView props:', { 
    productsLength: products.length, 
    itemsPerPage, 
    currentPage, 
    totalPages, 
    startIndex, 
    endIndex, 
    paginatedProductsLength: paginatedProducts.length 
  });

  return (
    <>
      {paginatedProducts.map((product, index) => (
        <ProductCard1 key={product.id || index} product={product} gridClass="grid" parentClass={cardClasses} />
      ))}
      
      {/* pagination */}
      {pagination && totalPages > 1 && (
        <div className="tf-pagination">
          <ul className="wg-pagination justify-content-center">
            <Pagination 
              currentPage={currentPage}
              totalPages={totalPages}
              onPageChange={onPageChange}
            />
          </ul>
        </div>
      )}
    </>
  );
}
