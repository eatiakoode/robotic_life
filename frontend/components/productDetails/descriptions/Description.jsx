import React from "react";
import "./spec-cards.css";

export default function Description({ product }) {
  return (
    <>
      <div className="specification-grid">
        <div className="row">
                    {/* Dimensions */}
          {product?.dimensions && (
            <div className="col-lg-4 col-md-6 mb-4">
              <div className="spec-card">
                <h6 className="spec-title">Dimensions</h6>
                <p className="spec-content">
                  {product.dimensions.length?.value && product.dimensions.width?.value && product.dimensions.height?.value 
                    ? `Height: ${product.dimensions.height.value} ${product.dimensions.height.unit || 'cm'}; Width: ${product.dimensions.width.value} ${product.dimensions.width.unit || 'cm'}; Length: ${product.dimensions.length.value} ${product.dimensions.length.unit || 'cm'}`
                    : 'N/A'
                  }
                </p>
              </div>
            </div>
          )}

          {/* Speed */}
          {product?.speed && (
            <div className="col-lg-4 col-md-6 mb-4">
              <div className="spec-card">
                <h6 className="spec-title">Speed</h6>
                <p className="spec-content">
                  {product.speed.value ? `${product.speed.value} ${product.speed.unit || 'km/h'}` : 'N/A'}
                </p>
              </div>
            </div>
          )}

          {/* Runtime */}
          {product?.runtime && (
            <div className="col-lg-4 col-md-6 mb-4">
              <div className="spec-card">
                <h6 className="spec-title">Runtime</h6>
                <p className="spec-content">
                  {product.runtime.value ? `${product.runtime.value} ${product.runtime.unit || 'h'}` : 'N/A'}
                </p>
              </div>
            </div>
          )}

          {/* Charging Time */}
          {product?.batteryChargeTime && (
            <div className="col-lg-4 col-md-6 mb-4">
              <div className="spec-card">
                <h6 className="spec-title">Charging Time</h6>
                <p className="spec-content">
                  {product.batteryChargeTime.value ? `${product.batteryChargeTime.value} ${product.batteryChargeTime.unit || 'hours'}` : 'N/A'}
                </p>
              </div>
            </div>
          )}



          {/* Available Colours */}
          {product?.color && product.color.length > 0 && (
            <div className="col-lg-4 col-md-6 mb-4">
              <div className="spec-card">
                <h6 className="spec-title">Available Colours</h6>
                <p className="spec-content">
                  {product.color.map(c => c?.name || c?.title || 'Unknown').join(', ')}
                </p>
              </div>
            </div>
          )}



          {/* Battery Capacity */}
          {product?.batteryCapacity && (
            <div className="col-lg-4 col-md-6 mb-4">
              <div className="spec-card">
                <h6 className="spec-title">Battery Capacity</h6>
                <p className="spec-content">
                  {product.batteryCapacity.value ? `${product.batteryCapacity.value} ${product.batteryCapacity.unit || 'mAh'}` : 'N/A'}
                </p>
              </div>
            </div>
          )}





          {/* Weight */}
          {product?.weight && (
            <div className="col-lg-4 col-md-6 mb-4">
              <div className="spec-card">
                <h6 className="spec-title">Weight</h6>
                <p className="spec-content">
                  {product.weight.value ? `${product.weight.value} ${product.weight.unit || 'g'}` : 'N/A'}
                </p>
              </div>
            </div>
          )}

          {/* Load Capacity */}
          {product?.loadCapacity && (
            <div className="col-lg-4 col-md-6 mb-4">
              <div className="spec-card">
                <h6 className="spec-title">Load Capacity</h6>
                <p className="spec-content">
                  {product.loadCapacity.value ? `${product.loadCapacity.value} ${product.loadCapacity.unit || 'kg'}` : 'N/A'}
                </p>
              </div>
            </div>
          )}

          {/* Range */}
          {product?.range && (
            <div className="col-lg-4 col-md-6 mb-4">
              <div className="spec-card">
                <h6 className="spec-title">Range</h6>
                <p className="spec-content">
                  {product.range.value ? `${product.range.value} ${product.range.unit || 'm'}` : 'N/A'}
                </p>
              </div>
        </div>
          )}

          {/* Accuracy */}
          {product?.accuracy && (
            <div className="col-lg-4 col-md-6 mb-4">
              <div className="spec-card">
                <h6 className="spec-title">Accuracy</h6>
                <p className="spec-content">
                  {product.accuracy.value ? `${product.accuracy.value} ${product.accuracy.unit || 'cm'}` : 'N/A'}
                </p>
              </div>
            </div>
          )}

          {/* Power Source */}
          {product?.powerSource && (
            <div className="col-lg-4 col-md-6 mb-4">
              <div className="spec-card">
                <h6 className="spec-title">Power Source</h6>
                <p className="spec-content">
                  {product.powerSource?.name || product.powerSource?.title || 'Unknown'}
        </p>
      </div>
        </div>
          )}

          {/* Operating Temperature */}
          {product?.operatingTemperature && (
            <div className="col-lg-4 col-md-6 mb-4">
              <div className="spec-card">
                <h6 className="spec-title">Operating Temperature</h6>
                <p className="spec-content">
                  {product.operatingTemperature.min && product.operatingTemperature.max 
                    ? `${product.operatingTemperature.min}°C to ${product.operatingTemperature.max}°C`
                    : 'N/A'
                  }
                </p>
          </div>
          </div>
          )}

          {/* Materials */}
          {product?.material && product.material.length > 0 && (
            <div className="col-lg-4 col-md-6 mb-4">
              <div className="spec-card">
                <h6 className="spec-title">Materials</h6>
                <p className="spec-content">
                  {product.material.map(mat => mat?.name || mat?.title || 'Unknown').join(', ')}
                </p>
          </div>
          </div>
          )}

          {/* Version */}
          {product?.version && (
            <div className="col-lg-4 col-md-6 mb-4">
              <div className="spec-card">
                <h6 className="spec-title">Version</h6>
                <p className="spec-content">
                  {product.version}
                </p>
          </div>
        </div>
          )}
        </div>
      </div>
    </>
  );
}
