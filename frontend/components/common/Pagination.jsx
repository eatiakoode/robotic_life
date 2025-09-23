"use client";
import React from "react";

export default function Pagination({ 
  totalPages = 1, 
  currentPage = 1, 
  onPageChange = () => {},
  totalItems = 0,
  itemsPerPage = 12 
}) {

  const handlePageClick = (page) => {
    if (page >= 1 && page <= totalPages) {
      onPageChange(page);
    }
  };

  const getPageNumbers = () => {
    const pages = [];
    const maxVisiblePages = 5;
    
    if (totalPages <= maxVisiblePages) {
      // Show all pages if total is less than max visible
      for (let i = 1; i <= totalPages; i++) {
        pages.push(i);
      }
    } else {
      // Show pages with ellipsis
      if (currentPage <= 3) {
        // Show first 3 pages, ellipsis, and last page
        for (let i = 1; i <= 3; i++) pages.push(i);
        pages.push('...');
        pages.push(totalPages);
      } else if (currentPage >= totalPages - 2) {
        // Show first page, ellipsis, and last 3 pages
        pages.push(1);
        pages.push('...');
        for (let i = totalPages - 2; i <= totalPages; i++) pages.push(i);
      } else {
        // Show first page, ellipsis, current-1, current, current+1, ellipsis, last page
        pages.push(1);
        pages.push('...');
        for (let i = currentPage - 1; i <= currentPage + 1; i++) pages.push(i);
        pages.push('...');
        pages.push(totalPages);
      }
    }
    
    return pages;
  };

  const renderPageNumbers = () => {
    const pages = getPageNumbers();
    
    return pages.map((page, index) => {
      if (page === '...') {
        return (
          <li key={`ellipsis-${index}`} className="pagination-ellipsis">
            <span>...</span>
          </li>
        );
      }
      
      return (
        <li
          key={page}
          className={`pagination-number ${page === currentPage ? "active" : ""}`}
          onClick={() => handlePageClick(page)}
        >
          <button className="pagination-btn">
            {page}
          </button>
        </li>
      );
    });
  };

  if (totalPages <= 1) return null;

  return (
    <div className="pagination-wrapper">
      {/* Pagination Info */}
      <div className="pagination-info">
        Showing {Math.min((currentPage - 1) * itemsPerPage + 1, totalItems)} to {Math.min(currentPage * itemsPerPage, totalItems)} of {totalItems} robots
      </div>
      
      {/* Pagination Controls */}
      <div className="pagination-controls">
        <button
          className={`pagination-nav prev ${currentPage === 1 ? "disabled" : ""}`}
          onClick={() => handlePageClick(currentPage - 1)}
          disabled={currentPage === 1}
        >
          <i className="icon-arrLeft" />
          <span>Previous</span>
        </button>
        
        <ul className="pagination-numbers">
          {renderPageNumbers()}
        </ul>
        
        <button
          className={`pagination-nav next ${currentPage === totalPages ? "disabled" : ""}`}
          onClick={() => handlePageClick(currentPage + 1)}
          disabled={currentPage === totalPages}
        >
          <span>Next</span>
          <i className="icon-arrRight" />
        </button>
      </div>
    </div>
  );
}
