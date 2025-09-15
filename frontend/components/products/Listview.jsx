import React from "react";
import ProductsCards6 from "../productCards/ProductsCards6";
import Pagination from "../common/Pagination";

export default function Listview({ 
  products, 
  pagination = true, 
  currentPage = 1, 
  itemsPerPage = 12,
  onPageChange = () => {}
}) {
  // Calculate pagination
  const totalItems = products.length;
  const totalPages = Math.ceil(totalItems / itemsPerPage);
  const startIndex = (currentPage - 1) * itemsPerPage;
  const endIndex = startIndex + itemsPerPage;
  const currentPageProducts = products.slice(startIndex, endIndex);

  return (
    <>
      {/* card product list 1 */}
      {currentPageProducts.map((product, i) => (
        <ProductsCards6 product={product} key={product.id || i} />
      ))}
      
      {/* pagination */}
      {pagination && totalPages > 1 ? (
        <ul className="wg-pagination">
          <Pagination 
            totalPages={totalPages}
            currentPage={currentPage}
            onPageChange={onPageChange}
            totalItems={totalItems}
            itemsPerPage={itemsPerPage}
          />
        </ul>
      ) : null}
    </>
  );
}
