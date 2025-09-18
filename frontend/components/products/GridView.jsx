import React from "react";
import ProductCard1 from "../productCards/ProductCard1";
import Pagination from "../common/Pagination";

export default function GridView({ 
  products, 
  pagination = true, 
  currentPage = 1, 
  itemsPerPage = 12, 
  onPageChange 
}) {
  
  // Calculate pagination
  const totalPages = Math.ceil(products.length / itemsPerPage);
  const startIndex = (currentPage - 1) * itemsPerPage;
  const endIndex = startIndex + itemsPerPage;
  const paginatedProducts = products.slice(startIndex, endIndex);
  

  return (
    <>
      {paginatedProducts.map((product, index) => (
        <ProductCard1 key={product.id || index} product={product} isNotImageRatio />
      ))}
      
      {/* pagination */}
      {pagination && totalPages > 1 && (
        <Pagination 
          currentPage={currentPage}
          totalPages={totalPages}
          onPageChange={onPageChange}
          totalItems={products.length}
          itemsPerPage={itemsPerPage}
        />
      )}
    </>
  );
}
