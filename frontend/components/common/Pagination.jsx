"use client";
import React, { useState } from "react";

export default function Pagination({ 
  totalPages = 1, 
  currentPage = 1, 
  onPageChange = () => {},
  totalItems = 0,
  itemsPerPage = 10 
}) {

  const handlePageClick = (page) => {
    if (page >= 1 && page <= totalPages) {
      onPageChange(page);
    }
  };

  const renderPageNumbers = () => {
    return Array.from({ length: totalPages }, (_, index) => {
      const page = index + 1;
      return (
        <li
          key={page}
          className={page === currentPage ? "active" : ""}
          onClick={() => handlePageClick(page)}
        >
          <div className="pagination-item text-button">{page}</div>
        </li>
      );
    });
  };

  return (
    <>
      {/* Pagination Info */}
      <div className="pagination-info" style={{ 
        textAlign: 'center', 
        marginBottom: '20px', 
        color: '#6c757d',
        fontSize: '14px'
      }}>
        Showing {Math.min((currentPage - 1) * itemsPerPage + 1, totalItems)} to {Math.min(currentPage * itemsPerPage, totalItems)} of {totalItems} robots
      </div>
      
      {/* Pagination Controls */}
      <li onClick={() => handlePageClick(currentPage - 1)}>
        <a
          className={`pagination-item text-button ${
            currentPage === 1 ? "disabled" : ""
          }`}
        >
          <i className="icon-arrLeft" />
        </a>
      </li>
      {renderPageNumbers()}
      <li onClick={() => handlePageClick(currentPage + 1)}>
        <a
          className={`pagination-item text-button ${
            currentPage === totalPages ? "disabled" : ""
          }`}
        >
          <i className="icon-arrRight" />
        </a>
      </li>
    </>
  );
}
