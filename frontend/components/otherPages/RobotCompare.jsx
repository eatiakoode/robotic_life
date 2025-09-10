"use client";
import { useContextElement } from "@/context/Context";
import { compareRobots, transformRobotForComparison } from "@/api/robotCompare";
import Image from "next/image";
import Link from "next/link";
import React, { useEffect, useState } from "react";

export default function RobotCompare() {
  const {
    compareRobots: contextCompareRobots,
    removeRobotFromCompare,
    clearAllCompareRobots,
  } = useContextElement();
  
  const [robots, setRobots] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchCompareData = async () => {
      if (contextCompareRobots.length === 0) {
        setRobots([]);
        return;
      }

      setLoading(true);
      setError(null);

      try {
        const robotIds = contextCompareRobots.map(robot => robot.id);
        const response = await compareRobots(robotIds);
        
        if (response.success && response.data) {
          const transformedRobots = response.data.map(transformRobotForComparison);
          setRobots(transformedRobots);
        } else {
          setError('Failed to fetch robot comparison data');
        }
      } catch (err) {
        console.error('Error fetching compare data:', err);
        setError(err.message || 'Failed to load robot comparison data');
      } finally {
        setLoading(false);
      }
    };

    fetchCompareData();
  }, [contextCompareRobots]);

  const getImageUrl = (images) => {
    if (!images || images.length === 0) {
      return "/images/products/default.jpg";
    }
    
    const imagePath = images[0];
    if (imagePath.startsWith('public/')) {
      return `${process.env.NEXT_PUBLIC_API_URL || 'http://localhost:5000'}/${imagePath.replace('public/', '')}`;
    }
    if (imagePath.startsWith('http')) {
      return imagePath;
    }
    return `${process.env.NEXT_PUBLIC_API_URL || 'http://localhost:5000'}/${imagePath}`;
  };

  const formatSpecification = (spec) => {
    if (!spec) return 'N/A';
    if (typeof spec === 'object' && spec.value && spec.unit) {
      return `${spec.value} ${spec.unit}`;
    }
    return spec.toString();
  };

  const formatArraySpec = (arr) => {
    if (!arr || arr.length === 0) return 'N/A';
    return arr.join(', ');
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
              <Link className="btn btn-primary" href="/shop-filter-canvas">
                Explore Robots
              </Link>
            </div>
          </div>
        ) : (
          <>
            <div className="d-flex justify-content-between align-items-center mb-4">
              <h3>Compare Robots ({robots.length}/3)</h3>
              <button 
                className="btn btn-outline-danger btn-sm"
                onClick={clearAllCompareRobots}
              >
                Clear All
              </button>
            </div>

            <div className="tf-compare-table">
              {/* Header Row */}
              <div className="tf-compare-row tf-compare-grid">
                <div className="tf-compare-col d-md-block d-none">
                  <h6>Robot Details</h6>
                </div>
                {robots.map((robot, i) => (
                  <div key={i} className="tf-compare-col">
                    <div className="tf-compare-item">
                      <button
                        className="btn-close position-absolute top-0 end-0 m-2"
                        onClick={() => removeRobotFromCompare(robot.id)}
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
                <div className="tf-compare-col tf-compare-field d-md-block d-none">
                  <h6>Price</h6>
                </div>
                {robots.map((robot, i) => (
                  <div key={i} className="tf-compare-col tf-compare-field text-center">
                    <span className="price">
                      {robot.price ? `$${robot.price.toLocaleString()}` : 'Price on Request'}
                    </span>
                  </div>
                ))}
              </div>

              {/* Launch Year Row */}
              <div className="tf-compare-row">
                <div className="tf-compare-col tf-compare-field d-md-block d-none">
                  <h6>Launch Year</h6>
                </div>
                {robots.map((robot, i) => (
                  <div key={i} className="tf-compare-col tf-compare-field text-center">
                    <span>{robot.launchYear || 'N/A'}</span>
                  </div>
                ))}
              </div>

              {/* Category Row */}
              <div className="tf-compare-row">
                <div className="tf-compare-col tf-compare-field d-md-block d-none">
                  <h6>Category</h6>
                </div>
                {robots.map((robot, i) => (
                  <div key={i} className="tf-compare-col tf-compare-field text-center">
                    <span>{robot.category}</span>
                  </div>
                ))}
              </div>

              {/* Manufacturer Row */}
              <div className="tf-compare-row">
                <div className="tf-compare-col tf-compare-field d-md-block d-none">
                  <h6>Manufacturer</h6>
                </div>
                {robots.map((robot, i) => (
                  <div key={i} className="tf-compare-col tf-compare-field text-center">
                    <span>{robot.manufacturer}</span>
                  </div>
                ))}
              </div>

              {/* Power Source Row */}
              <div className="tf-compare-row">
                <div className="tf-compare-col tf-compare-field d-md-block d-none">
                  <h6>Power Source</h6>
                </div>
                {robots.map((robot, i) => (
                  <div key={i} className="tf-compare-col tf-compare-field text-center">
                    <span>{robot.powerSource}</span>
                  </div>
                ))}
              </div>

              {/* Primary Function Row */}
              <div className="tf-compare-row">
                <div className="tf-compare-col tf-compare-field d-md-block d-none">
                  <h6>Primary Function</h6>
                </div>
                {robots.map((robot, i) => (
                  <div key={i} className="tf-compare-col tf-compare-field text-center">
                    <span>{robot.primaryFunction}</span>
                  </div>
                ))}
              </div>

              {/* Operating Environment Row */}
              <div className="tf-compare-row">
                <div className="tf-compare-col tf-compare-field d-md-block d-none">
                  <h6>Operating Environment</h6>
                </div>
                {robots.map((robot, i) => (
                  <div key={i} className="tf-compare-col tf-compare-field text-center">
                    <span>{robot.operatingEnvironment}</span>
                  </div>
                ))}
              </div>

              {/* Autonomy Level Row */}
              <div className="tf-compare-row">
                <div className="tf-compare-col tf-compare-field d-md-block d-none">
                  <h6>Autonomy Level</h6>
                </div>
                {robots.map((robot, i) => (
                  <div key={i} className="tf-compare-col tf-compare-field text-center">
                    <span>{robot.autonomyLevel}</span>
                  </div>
                ))}
              </div>

              {/* Weight Row */}
              <div className="tf-compare-row">
                <div className="tf-compare-col tf-compare-field d-md-block d-none">
                  <h6>Weight</h6>
                </div>
                {robots.map((robot, i) => (
                  <div key={i} className="tf-compare-col tf-compare-field text-center">
                    <span>{formatSpecification(robot.weight)}</span>
                  </div>
                ))}
              </div>

              {/* Speed Row */}
              <div className="tf-compare-row">
                <div className="tf-compare-col tf-compare-field d-md-block d-none">
                  <h6>Speed</h6>
                </div>
                {robots.map((robot, i) => (
                  <div key={i} className="tf-compare-col tf-compare-field text-center">
                    <span>{formatSpecification(robot.speed)}</span>
                  </div>
                ))}
              </div>

              {/* Range Row */}
              <div className="tf-compare-row">
                <div className="tf-compare-col tf-compare-field d-md-block d-none">
                  <h6>Range</h6>
                </div>
                {robots.map((robot, i) => (
                  <div key={i} className="tf-compare-col tf-compare-field text-center">
                    <span>{formatSpecification(robot.range)}</span>
                  </div>
                ))}
              </div>

              {/* Load Capacity Row */}
              <div className="tf-compare-row">
                <div className="tf-compare-col tf-compare-field d-md-block d-none">
                  <h6>Load Capacity</h6>
                </div>
                {robots.map((robot, i) => (
                  <div key={i} className="tf-compare-col tf-compare-field text-center">
                    <span>{formatSpecification(robot.loadCapacity)}</span>
                  </div>
                ))}
              </div>

              {/* Battery Capacity Row */}
              <div className="tf-compare-row">
                <div className="tf-compare-col tf-compare-field d-md-block d-none">
                  <h6>Battery Capacity</h6>
                </div>
                {robots.map((robot, i) => (
                  <div key={i} className="tf-compare-col tf-compare-field text-center">
                    <span>{formatSpecification(robot.batteryCapacity)}</span>
                  </div>
                ))}
              </div>

              {/* Runtime Row */}
              <div className="tf-compare-row">
                <div className="tf-compare-col tf-compare-field d-md-block d-none">
                  <h6>Runtime</h6>
                </div>
                {robots.map((robot, i) => (
                  <div key={i} className="tf-compare-col tf-compare-field text-center">
                    <span>{formatSpecification(robot.runtime)}</span>
                  </div>
                ))}
              </div>

              {/* Colors Row */}
              <div className="tf-compare-row">
                <div className="tf-compare-col tf-compare-field d-md-block d-none">
                  <h6>Colors</h6>
                </div>
                {robots.map((robot, i) => (
                  <div key={i} className="tf-compare-col tf-compare-field text-center">
                    <span>{formatArraySpec(robot.colors)}</span>
                  </div>
                ))}
              </div>

              {/* Materials Row */}
              <div className="tf-compare-row">
                <div className="tf-compare-col tf-compare-field d-md-block d-none">
                  <h6>Materials</h6>
                </div>
                {robots.map((robot, i) => (
                  <div key={i} className="tf-compare-col tf-compare-field text-center">
                    <span>{formatArraySpec(robot.materials)}</span>
                  </div>
                ))}
              </div>

              {/* Sensors Row */}
              <div className="tf-compare-row">
                <div className="tf-compare-col tf-compare-field d-md-block d-none">
                  <h6>Sensors</h6>
                </div>
                {robots.map((robot, i) => (
                  <div key={i} className="tf-compare-col tf-compare-field text-center">
                    <span>{formatArraySpec(robot.sensors)}</span>
                  </div>
                ))}
              </div>

              {/* AI Software Features Row */}
              <div className="tf-compare-row">
                <div className="tf-compare-col tf-compare-field d-md-block d-none">
                  <h6>AI Features</h6>
                </div>
                {robots.map((robot, i) => (
                  <div key={i} className="tf-compare-col tf-compare-field text-center">
                    <span>{formatArraySpec(robot.aiSoftwareFeatures)}</span>
                  </div>
                ))}
              </div>

              {/* View Details Row */}
              <div className="tf-compare-row">
                <div className="tf-compare-col tf-compare-field d-md-block d-none">
                  <h6>View Details</h6>
                </div>
                {robots.map((robot, i) => (
                  <div key={i} className="tf-compare-col tf-compare-field tf-compare-viewcart text-center">
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