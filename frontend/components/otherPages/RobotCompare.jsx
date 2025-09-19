"use client";
import { useContextElement } from "@/context/Context";
import Image from "next/image";
import Link from "next/link";
import React, { useEffect, useState } from "react";
import "./robot-compare.css";

export default function RobotCompare() {
  const {
    compareRobots: contextCompareRobots,
    removeRobotFromCompare,
    clearAllCompareRobots,
    forceClearComparisonData,
  } = useContextElement();

  const [robots, setRobots] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const formatSpecification = (spec) => {
    if (!spec || spec === null || spec === undefined) return 'N/A';
    if (typeof spec === 'object') {
      // Check if it's an empty object
      if (Object.keys(spec).length === 0) return 'N/A';

      if (spec.value && spec.unit) {
        return `${spec.value} ${spec.unit}`;
      }
      if (spec.name) {
        return spec.name;
      }
      if (Array.isArray(spec) && spec.length > 0) {
        return spec.map(item => item.name || item).join(', ');
      }
      return 'N/A';
    }
    if (typeof spec === 'string' && spec.trim() === '') return 'N/A';
    return spec.toString();
  };

  // Transform robot data for comparison display
  const transformRobotForComparison = (robot) => {
    if (!robot) {
      return null;
    }

    // Helper function to safely extract values from objects or arrays
    const safeExtract = (value, fallback = 'N/A') => {
      if (!value) return fallback;
      if (typeof value === 'string') return value.trim() || fallback;
      if (typeof value === 'object') {
        if (Array.isArray(value)) {
          return value.length > 0 ? value.map(item => 
            typeof item === 'object' ? (item.name || item.title || item) : item
          ).join(', ') : fallback;
        }
        return value.name || value.title || value.value || fallback;
      }
      return value.toString();
    };

    // Helper function to safely extract array values
    const safeExtractArray = (value, fallback = []) => {
      if (!value) return fallback;
      if (Array.isArray(value)) {
        return value.map(item => 
          typeof item === 'object' ? (item.name || item.title || item) : item
        ).filter(Boolean);
      }
      return fallback;
    };

    const transformed = {
      id: robot._id || robot.id,
      title: robot.title || 'Untitled Robot',
      slug: robot.slug || '',
      description: robot.description || '',
      price: robot.totalPrice || robot.price || 0,
      launchYear: robot.launchYear || '',
      images: robot.images || (robot.imgSrc ? [robot.imgSrc] : []),

      // Basic info - handle both object and string formats
      category: safeExtract(robot.category),
      manufacturer: safeExtract(robot.manufacturer),

      // Specifications - handle both object and string formats
      powerSource: safeExtract(robot.specifications?.powerSource || robot.powerSource),
      weight: formatSpecification(robot.specifications?.weight || robot.weight),
      speed: formatSpecification(robot.specifications?.speed || robot.speed),
      range: formatSpecification(robot.specifications?.range || robot.range),
      loadCapacity: formatSpecification(robot.specifications?.loadCapacity || robot.loadCapacity || robot.LoadCapacity),
      batteryCapacity: formatSpecification(robot.specifications?.batteryCapacity || robot.batteryCapacity),
      runtime: formatSpecification(robot.specifications?.runtime || robot.runtime),
      dimensions: formatSpecification(robot.specifications?.dimensions || robot.dimensions),
      operatingTemperature: formatSpecification(robot.specifications?.operatingTemperature || robot.operatingTemperature),

      // Capabilities - handle both object and string formats
      primaryFunction: safeExtract(robot.capabilities?.primaryFunction || robot.primaryFunction),
      autonomyLevel: safeExtract(robot.capabilities?.autonomyLevel || robot.autonomyLevel),
      navigationTypes: safeExtractArray(robot.capabilities?.navigationTypes || robot.navigationType),
      communicationMethods: safeExtractArray(robot.capabilities?.communicationMethods || robot.communicationMethod),

      // Operational Environment - handle both object and string formats
      operatingEnvironment: safeExtract(robot.operationalEnvironmentAndApplications?.operatingEnvironment || robot.operatingEnvironment),
      terrainCapabilities: safeExtractArray(robot.operationalEnvironmentAndApplications?.terrainCapabilities || robot.terrainCapability),

      // Sensors & Software - try multiple possible paths
      sensors: safeExtractArray(robot.sensorsAndSoftware?.sensors || robot.sensors),
      aiSoftwareFeatures: safeExtractArray(robot.sensorsAndSoftware?.aiSoftwareFeatures || robot.aiSoftwareFeatures),

      // Payloads & Attachments - try multiple possible paths
      payloadTypes: safeExtractArray(robot.payloadsAndAttachments?.payloadTypes || robot.payloadTypesSupported),

      // Materials and Colors - try multiple possible paths
      materials: safeExtractArray(robot.specifications?.materials || robot.material),
      colors: safeExtractArray(robot.specifications?.color || robot.colors),
    };

    return transformed;
  };

  useEffect(() => {
    if (contextCompareRobots.length === 0) {
      setRobots([]);
      return;
    }

    // Transform the robots data for better display
    const transformedRobots = contextCompareRobots.map(transformRobotForComparison);

    // Debug logging to help identify missing data
    console.log('Original robots data:', contextCompareRobots);
    console.log('Transformed robots data:', transformedRobots);

    setRobots(transformedRobots);
    setLoading(false);
  }, [contextCompareRobots]);

  const getImageUrl = (images) => {
    if (!images || images.length === 0) {
      return "/images/product/placeholder.jpg";
    }

    const imagePath = images[0];
    if (!imagePath) {
      return "/images/product/placeholder.jpg";
    }
    
    if (imagePath.startsWith('public/')) {
      return `${process.env.NEXT_PUBLIC_API_URL || 'http://localhost:5000'}/${imagePath.replace('public/', '')}`;
    }
    if (imagePath.startsWith('http')) {
      return imagePath;
    }
    return `${process.env.NEXT_PUBLIC_API_URL || 'http://localhost:5000'}/${imagePath}`;
  };

  const formatArraySpec = (arr) => {
    if (!arr || !Array.isArray(arr) || arr.length === 0) return 'N/A';
    return arr.map(item => {
      if (typeof item === 'object' && (item.name || item.title)) {
        return item.name || item.title;
      }
      return item;
    }).filter(Boolean).join(', ');
  };

  if (loading) {
    return (
      <section className="flat-spacing">
        <div className="container">
          <div className="text-center py-5">
            <div className="spinner-border" role="status">
              <span className="visually-hidden">Loading comparison...</span>
            </div>
            <p className="mt-3">Loading robot comparison data...</p>
          </div>
        </div>
      </section>
    );
  }

  if (error) {
    return (
      <section className="flat-spacing">
        <div className="container">
          <div className="alert alert-danger text-center">
            <h5>Error Loading Comparison</h5>
            <p>{error}</p>
            <button
              className="btn btn-primary"
              onClick={() => window.location.reload()}
            >
              Try Again
            </button>
          </div>
        </div>
      </section>
    );
  }

  return (
    <section className="flat-spacing">
      <div className="container">
        {robots.length === 0 ? (
          <div className="text-center py-5">
            <div className="empty-state">
              <i className="fas fa-robot fa-3x text-muted mb-3"></i>
              <h4>No Robots to Compare</h4>
              <p className="text-muted mb-4">
                Add robots to your comparison list to make informed decisions!
              </p>
              <Link className="tf-btn btn-fill btn-white" href="/shop-default-grid">
                <span className="text">Explore Robots</span>
                <i className="icon icon-arrowUpRight" />
              </Link>
            </div>
          </div>
        ) : (
          <>
            <div className="d-flex justify-content-between align-items-center mb-4">
              <h3>Compare Robots ({robots.length}/3)</h3>
              <div className="d-flex gap-2">
                <button
                  className="btn btn-outline-warning btn-sm"
                  onClick={(e) => {
                    e.preventDefault();
                    e.stopPropagation();
                    clearAllCompareRobots();
                  }}
                >
                  Clear All
                </button>
                <button
                  className="btn btn-outline-danger btn-sm"
                  onClick={(e) => {
                    e.preventDefault();
                    e.stopPropagation();
                    clearAllCompareRobots();
                    // Reset cursor to default
                    document.body.style.cursor = 'default';
                  }}
                >
                  Clear All
                </button>
              </div>
            </div>

            <div className={`tf-compare-table ${robots.length === 1 ? 'one-product' : robots.length === 2 ? 'two-products' : 'three-products'}`}>
              {/* Header Row */}
              <div className="tf-compare-row">
                <div className="tf-compare-col">
                  <h6>Robot Details</h6>
                </div>
                {robots.map((robot, i) => (
                  <div key={i} className="tf-compare-col">
                    <div className="tf-compare-item">
                      <button
                        className="btn-close position-absolute top-0 end-0 m-2"
                        onClick={(e) => {
                          e.preventDefault();
                          e.stopPropagation();
                          removeRobotFromCompare(robot.id);
                          // Reset cursor to default
                          document.body.style.cursor = 'default';
                        }}
                        style={{ zIndex: 10 }}
                        title="Remove from comparison"
                      ></button>
                      <Link
                        className="tf-compare-image"
                        href={`/product-detail/${robot.slug || robot.id}`}
                      >
                        <Image
                          className="lazyload"
                          alt={robot.title}
                          src={getImageUrl(robot.images)}
                          width={250}
                          height={250}
                          style={{
                            width: '100%',
                            height: 'auto',
                            maxHeight: '260px',
                            minHeight: '200px',
                            objectFit: 'contain',
                            objectPosition: 'center'
                          }}
                          sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                        />
                      </Link>
                      <div className="tf-compare-content">
                        <Link
                          className="link text-title text-line-clamp-2"
                          href={`/product-detail/${robot.slug || robot.id}`}
                        >
                          {robot.title}
                        </Link>
                        <p className="desc text-caption-1">
                          {robot.category} • {robot.manufacturer}
                        </p>
                      </div>
                    </div>
                  </div>
                ))}
              </div>

              {/* Price Row */}
              <div className="tf-compare-row">
                <div className="tf-compare-col">
                  <h6>Price</h6>
                </div>
                {robots.map((robot, i) => (
                  <div key={i} className="tf-compare-col tf-compare-field">
                    <span className="price">
                      {robot.price ? `$${robot.price.toLocaleString()}` : 'Price on Request'}
                    </span>
                  </div>
                ))}
              </div>

              {/* Launch Year Row */}
              <div className="tf-compare-row">
                <div className="tf-compare-col">
                  <h6>Launch Year</h6>
                </div>
                {robots.map((robot, i) => (
                  <div key={i} className="tf-compare-col tf-compare-field">
                    <span>{robot.launchYear || 'N/A'}</span>
                  </div>
                ))}
              </div>

              {/* Category Row */}
              <div className="tf-compare-row">
                <div className="tf-compare-col">
                  <h6>Category</h6>
                </div>
                {robots.map((robot, i) => (
                  <div key={i} className="tf-compare-col tf-compare-field">
                    <span>{robot.category}</span>
                  </div>
                ))}
              </div>

              {/* Manufacturer Row */}
              <div className="tf-compare-row">
                <div className="tf-compare-col">
                  <h6>Manufacturer</h6>
                </div>
                {robots.map((robot, i) => (
                  <div key={i} className="tf-compare-col tf-compare-field">
                    <span>{robot.manufacturer}</span>
                  </div>
                ))}
              </div>

              {/* Power Source Row */}
              <div className="tf-compare-row">
                <div className="tf-compare-col">
                  <h6>Power Source</h6>
                </div>
                {robots.map((robot, i) => (
                  <div key={i} className="tf-compare-col tf-compare-field">
                    <span>{robot.powerSource || 'N/A'}</span>
                  </div>
                ))}
              </div>

              {/* Primary Function Row */}
              <div className="tf-compare-row">
                <div className="tf-compare-col">
                  <h6>Primary Function</h6>
                </div>
                {robots.map((robot, i) => (
                  <div key={i} className="tf-compare-col tf-compare-field">
                    <span>{robot.primaryFunction || 'N/A'}</span>
                  </div>
                ))}
              </div>

              {/* Operating Environment Row */}
              <div className="tf-compare-row">
                <div className="tf-compare-col">
                  <h6>Operating Environment</h6>
                </div>
                {robots.map((robot, i) => (
                  <div key={i} className="tf-compare-col tf-compare-field">
                    <span>{robot.operatingEnvironment || 'N/A'}</span>
                  </div>
                ))}
              </div>

              {/* Autonomy Level Row */}
              <div className="tf-compare-row">
                <div className="tf-compare-col">
                  <h6>Autonomy Level</h6>
                </div>
                {robots.map((robot, i) => (
                  <div key={i} className="tf-compare-col tf-compare-field">
                    <span>{robot.autonomyLevel || 'N/A'}</span>
                  </div>
                ))}
              </div>

              {/* Weight Row */}
              <div className="tf-compare-row">
                <div className="tf-compare-col">
                  <h6>Weight</h6>
                </div>
                {robots.map((robot, i) => (
                  <div key={i} className="tf-compare-col tf-compare-field">
                    <span>{formatSpecification(robot.weight)}</span>
                  </div>
                ))}
              </div>

              {/* Speed Row */}
              <div className="tf-compare-row">
                <div className="tf-compare-col">
                  <h6>Speed</h6>
                </div>
                {robots.map((robot, i) => (
                  <div key={i} className="tf-compare-col tf-compare-field">
                    <span>{formatSpecification(robot.speed)}</span>
                  </div>
                ))}
              </div>

              {/* Range Row */}
              <div className="tf-compare-row">
                <div className="tf-compare-col">
                  <h6>Range</h6>
                </div>
                {robots.map((robot, i) => (
                  <div key={i} className="tf-compare-col tf-compare-field">
                    <span>{formatSpecification(robot.range)}</span>
                  </div>
                ))}
              </div>

              {/* Load Capacity Row */}
              <div className="tf-compare-row">
                <div className="tf-compare-col">
                  <h6>Load Capacity</h6>
                </div>
                {robots.map((robot, i) => (
                  <div key={i} className="tf-compare-col tf-compare-field">
                    <span>{formatSpecification(robot.loadCapacity)}</span>
                  </div>
                ))}
              </div>

              {/* Battery Capacity Row */}
              <div className="tf-compare-row">
                <div className="tf-compare-col">
                  <h6>Battery Capacity</h6>
                </div>
                {robots.map((robot, i) => (
                  <div key={i} className="tf-compare-col tf-compare-field">
                    <span>{formatSpecification(robot.batteryCapacity)}</span>
                  </div>
                ))}
              </div>

              {/* Runtime Row */}
              <div className="tf-compare-row">
                <div className="tf-compare-col">
                  <h6>Runtime</h6>
                </div>
                {robots.map((robot, i) => (
                  <div key={i} className="tf-compare-col tf-compare-field">
                    <span>{formatSpecification(robot.runtime)}</span>
                  </div>
                ))}
              </div>

              {/* Colors Row */}
              <div className="tf-compare-row">
                <div className="tf-compare-col">
                  <h6>Colors</h6>
                </div>
                {robots.map((robot, i) => (
                  <div key={i} className="tf-compare-col tf-compare-field">
                    <span>{formatArraySpec(robot.colors)}</span>
                  </div>
                ))}
              </div>

              {/* Materials Row */}
              <div className="tf-compare-row">
                <div className="tf-compare-col">
                  <h6>Materials</h6>
                </div>
                {robots.map((robot, i) => (
                  <div key={i} className="tf-compare-col tf-compare-field">
                    <span>{formatArraySpec(robot.materials)}</span>
                  </div>
                ))}
              </div>

              {/* Sensors Row */}
              <div className="tf-compare-row">
                <div className="tf-compare-col">
                  <h6>Sensors</h6>
                </div>
                {robots.map((robot, i) => (
                  <div key={i} className="tf-compare-col tf-compare-field">
                    <span>{formatArraySpec(robot.sensors)}</span>
                  </div>
                ))}
              </div>

              {/* AI Software Features Row */}
              <div className="tf-compare-row">
                <div className="tf-compare-col">
                  <h6>AI Features</h6>
                </div>
                {robots.map((robot, i) => (
                  <div key={i} className="tf-compare-col tf-compare-field">
                    <span>{formatArraySpec(robot.aiSoftwareFeatures)}</span>
                  </div>
                ))}
              </div>

              {/* View Details Row */}
              <div className="tf-compare-row">
                <div className="tf-compare-col">
                  <h6>View Details</h6>
                </div>
                {robots.map((robot, i) => (
                  <div key={i} className="tf-compare-col tf-compare-field tf-compare-viewcart">
                    <Link
                      className="btn btn-primary btn-sm"
                      href={`/product-detail/${robot.slug || robot.id}`}
                    >
                      View Details
                    </Link>
                  </div>
                ))}
              </div>
            </div>
          </>
        )}
      </div>
    </section>
  );
}