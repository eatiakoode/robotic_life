"use client";
import React, { useEffect, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { useContextElement } from "@/context/Context";
import { getRobotById } from "@/api/robotCompare";
import { closeOffcanvasModal } from "@/utils/modalUtils";
export default function Compare() {
  const { 
    removeRobotFromCompare, 
    compareRobots, 
    clearAllCompareRobots,
    compareItem 
  } = useContextElement();
  const [items, setItems] = useState([]);
  const [loading, setLoading] = useState(false);
  const [forceUpdate, setForceUpdate] = useState(0);

  useEffect(() => {
    const fetchRobotData = async () => {
      if (compareRobots.length === 0) {
        setItems([]);
        return;
      }

      setLoading(true);
      try {
        // Use the robots already in context, or fetch if needed
        setItems(compareRobots);
      } catch (error) {
        console.error('Error fetching robot data for compare modal:', error);
        setItems([]);
      } finally {
        setLoading(false);
      }
    };

    fetchRobotData();
  }, [compareRobots, forceUpdate]);

  // Helper function to get valid image URL
  const getImageUrl = (images) => {
    if (!images || images.length === 0) {
      return "/images/logo/logo1.svg";
    }
    
    const imagePath = images[0];
    if (imagePath.startsWith('public/')) {
      return `${process.env.NEXT_PUBLIC_API_URL || 'https://thebotsworld.onrender.com'}/${imagePath.replace('public/', '')}`;
    }
    if (imagePath.startsWith('http')) {
      return imagePath;
    }
    return `${process.env.NEXT_PUBLIC_API_URL || 'https://thebotsworld.onrender.com'}/${imagePath}`;
  };

  return (
    <div className="offcanvas offcanvas-bottom offcanvas-compare" id="compare">
      <div className="offcanvas-content">
        <div className="header">
          <span
            className="icon-close icon-close-popup"
            onClick={(e) => {
              e.preventDefault();
              e.stopPropagation();
              // Force close the modal immediately
              const modalElement = document.getElementById('compare');
              if (modalElement) {
                modalElement.classList.remove('show');
                modalElement.style.display = 'none';
                modalElement.removeAttribute('aria-modal');
                modalElement.removeAttribute('role');
                document.body.classList.remove('offcanvas-open');
                // Remove backdrop
                const backdrop = document.getElementById('offcanvas-backdrop');
                if (backdrop) {
                  backdrop.remove();
                }
              }
              // Reset cursor to default
              document.body.style.cursor = 'default';
            }}
            aria-label="Close"
            style={{ cursor: 'pointer' }}
          />
        </div>
        <div className="wrap">
          <div className="container">
            <div className="row">
              <div className="col-12">
                <div className="tf-compare-list list-file-delete">
                  <div className="tf-compare-head">
                    <h5 className="title">
                      Compare <br />
                      Robots
                    </h5>
                    <p className="text-caption-1 text-muted">
                      {items.length}/3 robots selected
                    </p>
                  </div>
                  {loading ? (
                    <div className="text-center py-4">
                      <div className="spinner-border text-primary" role="status">
                        <span className="visually-hidden">Loading...</span>
                      </div>
                      <p className="text-muted mt-2">Loading robots...</p>
                    </div>
                  ) : items.length ? (
                    <div className="tf-compare-wrap">
                      {items.map((elm, i) => (
                        <div key={elm.id || i} className="tf-compare-item file-delete">
                          <span className="btns-repeat">
                            <svg
                              width={16}
                              height={17}
                              viewBox="0 0 16 17"
                              fill="none"
                              xmlns="http://www.w3.org/2000/svg"
                            >
                              <g clipPath="url(#clip0_5628_27)">
                                <path
                                  d="M11.334 1.33301L14.0007 3.99967L11.334 6.66634"
                                  stroke="#181818"
                                  strokeWidth="1.5"
                                  strokeLinecap="round"
                                  strokeLinejoin="round"
                                />
                                <path
                                  d="M2 7.99951V6.66618C2 5.95893 2.28095 5.28066 2.78105 4.78056C3.28115 4.28046 3.95942 3.99951 4.66667 3.99951H14"
                                  stroke="#181818"
                                  strokeWidth="1.5"
                                  strokeLinecap="round"
                                  strokeLinejoin="round"
                                />
                                <path
                                  d="M4.66667 15.9996L2 13.3329L4.66667 10.6663"
                                  stroke="#181818"
                                  strokeWidth="1.5"
                                  strokeLinecap="round"
                                  strokeLinejoin="round"
                                />
                                <path
                                  d="M14 9.33301V10.6663C14 11.3736 13.719 12.0519 13.219 12.552C12.7189 13.0521 12.0406 13.333 11.3333 13.333H2"
                                  stroke="#181818"
                                  strokeWidth="1.5"
                                  strokeLinecap="round"
                                  strokeLinejoin="round"
                                />
                              </g>
                              <defs>
                                <clipPath id="clip0_5628_27">
                                  <rect
                                    width={16}
                                    height={16}
                                    fill="white"
                                    transform="translate(0 0.66626)"
                                  />
                                </clipPath>
                              </defs>
                            </svg>
                          </span>
                          <span
                            className="icon-close remove"
                            style={{ cursor: "pointer" }}
                            onClick={(e) => {
                              e.preventDefault();
                              e.stopPropagation();
                              removeRobotFromCompare(elm.id);
                              setForceUpdate(prev => prev + 1);
                              // Reset cursor to default
                              document.body.style.cursor = 'default';
                              // If no robots left, close the modal
                              if (compareRobots.length <= 1) {
                                const modalElement = document.getElementById('compare');
                                if (modalElement) {
                                  modalElement.classList.remove('show');
                                  modalElement.style.display = 'none';
                                  modalElement.removeAttribute('aria-modal');
                                  modalElement.removeAttribute('role');
                                  document.body.classList.remove('offcanvas-open');
                                  const backdrop = document.getElementById('offcanvas-backdrop');
                                  if (backdrop) {
                                    backdrop.remove();
                                  }
                                }
                              }
                            }}
                            title="Remove from comparison"
                          />
                          <Link
                            href={`/product-detail/${elm.slug || elm.id}`}
                            className="image"
                          >
                            <Image
                              className="lazyload"
                              alt={elm.title || 'Robot'}
                              src={getImageUrl(elm.images)}
                              width={600}
                              height={800}
                            />
                          </Link>
                          <div className="content">
                            <div className="text-title">
                              <Link
                                className="link text-line-clamp-2"
                                href={`/product-detail/${elm.slug || elm.id}`}
                              >
                                {elm.title || 'Untitled Robot'}
                              </Link>
                            </div>
                            <div className="text-button">
                              {elm.price ? `$${elm.price.toLocaleString()}` : 'Price on Request'}
                            </div>
                            {elm.manufacturer && (
                              <div className="text-caption-1 text-muted">
                                {elm.manufacturer}
                              </div>
                            )}
                          </div>
                        </div>
                      ))}
                    </div>
                  ) : (
                    <div className="text-center py-3">
                      <i className="fas fa-robot fa-2x text-muted mb-2"></i>
                      <p className="text-muted">
                        No robots added to compare yet. Browse robots to find
                        items you'd like to compare.
                      </p>
                    </div>
                  )}
                  <div className="tf-compare-buttons">
                    <div className="tf-compare-buttons-wrap">
                      <Link
                        href={`/compare-products`}
                        className="tf-btn w-100 btn-fill radius-4"
                        onClick={() => closeOffcanvasModal('compare')}
                        style={{ 
                          pointerEvents: items.length === 0 ? 'none' : 'auto',
                          opacity: items.length === 0 ? 0.5 : 1 
                        }}
                      >
                        <span className="text text-btn-uppercase">
                          Compare Robots ({items.length})
                        </span>
                      </Link>
                      {items.length > 0 && (
                        <div
                          onClick={(e) => {
                            e.preventDefault();
                            e.stopPropagation();
                            clearAllCompareRobots();
                            // Reset cursor to default
                            document.body.style.cursor = 'default';
                            // Close the modal after clearing all
                            const modalElement = document.getElementById('compare');
                            if (modalElement) {
                              modalElement.classList.remove('show');
                              modalElement.style.display = 'none';
                              modalElement.removeAttribute('aria-modal');
                              modalElement.removeAttribute('role');
                              document.body.classList.remove('offcanvas-open');
                              const backdrop = document.getElementById('offcanvas-backdrop');
                              if (backdrop) {
                                backdrop.remove();
                              }
                            }
                          }}
                          className="tf-compapre-button-clear-all clear-file-delete tf-btn w-100 btn-white radius-4 has-border"
                          style={{ cursor: 'pointer' }}
                        >
                          <span className="text text-btn-uppercase">
                            Clear All Robots
                          </span>
                        </div>
                      )}
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
