import React from "react";
import "./spec-cards.css";

export default function Description({ product }) {
  const specs = product?.specifications || {};

  const renderUnitValue = (unitValue, title) => {
    if (!unitValue || (!unitValue.value && !unitValue.unit)) return null;
    return (
      <div className="col-lg-4 col-md-6 mb-4">
        <div className="spec-card">
          <h6 className="spec-title">{title}</h6>
          <p className="spec-content">
            {unitValue.value && unitValue.unit 
              ? `${unitValue.value} ${unitValue.unit}`
              : unitValue.value || unitValue.unit || "N/A"
            }
          </p>
        </div>
      </div>
    );
  };

  const renderRangeValue = (rangeValue, title) => {
    if (!rangeValue || (!rangeValue.min && !rangeValue.max)) return null;
    return (
      <div className="col-lg-4 col-md-6 mb-4">
        <div className="spec-card">
          <h6 className="spec-title">{title}</h6>
          <p className="spec-content">
            {rangeValue.min && rangeValue.max 
              ? `${rangeValue.min}${rangeValue.unit || '°C'} to ${rangeValue.max}${rangeValue.unit || '°C'}`
              : rangeValue.min || rangeValue.max || "N/A"
            }
          </p>
        </div>
      </div>
    );
  };

  return (
    <>
      <div className="specification-grid">
        <div className="row">
          {/* Dimensions */}
          {specs.dimensions && (
            <>
              {renderUnitValue(specs.dimensions.length, "Length")}
              {renderUnitValue(specs.dimensions.width, "Width")}
              {renderUnitValue(specs.dimensions.height, "Height")}
              {renderUnitValue(specs.dimensions.wingspan, "Wingspan")}
              {renderUnitValue(specs.dimensions.reach, "Reach")}
            </>
          )}

          {/* Basic Specs */}
          {renderUnitValue(specs.weight, "Weight")}
          {renderUnitValue(specs.speed, "Speed")}
          {renderUnitValue(specs.runtime, "Runtime")}
          {renderUnitValue(specs.range, "Range")}
          {renderUnitValue(specs.loadCapacity, "Load Capacity")}
          {renderUnitValue(specs.accuracy, "Accuracy")}

          {/* Power & Battery */}
          {specs.powerSource && (
            <div className="col-lg-4 col-md-6 mb-4">
              <div className="spec-card">
                <h6 className="spec-title">Power Source</h6>
                <p className="spec-content">
                  {typeof specs.powerSource === 'object' 
                    ? specs.powerSource.name || specs.powerSource.title
                    : specs.powerSource
                  }
                </p>
              </div>
            </div>
          )}
          {renderUnitValue(specs.batteryCapacity, "Battery Capacity")}
          {renderUnitValue(specs.batteryChargeTime, "Battery Charge Time")}

          {/* Operating Conditions */}
          {renderRangeValue(specs.operatingTemperature, "Operating Temperature")}
          {renderUnitValue(specs.noiseLevel, "Noise Level")}
          {renderUnitValue(specs.energyConsumption, "Energy Consumption")}

          {/* Materials */}
          {specs.materials && specs.materials.length > 0 && (
            <div className="col-lg-4 col-md-6 mb-4">
              <div className="spec-card">
                <h6 className="spec-title">Materials</h6>
                <p className="spec-content">
                  {specs.materials.map(mat => 
                    typeof mat === 'object' ? mat.name || mat.title : mat
                  ).join(', ')}
                </p>
              </div>
            </div>
          )}

          {/* Colors */}
          {specs.color && specs.color.length > 0 && (
            <div className="col-lg-4 col-md-6 mb-4">
              <div className="spec-card">
                <h6 className="spec-title">Available Colors</h6>
                <p className="spec-content">
                  {specs.color.map(c => 
                    typeof c === 'object' ? c.name || c.title : c
                  ).join(', ')}
                </p>
              </div>
            </div>
          )}

          {/* Durability */}
          {specs.durability && (
            <>
              {specs.durability.ipRating && (
                <div className="col-lg-4 col-md-6 mb-4">
                  <div className="spec-card">
                    <h6 className="spec-title">IP Rating</h6>
                    <p className="spec-content">{specs.durability.ipRating}</p>
                  </div>
                </div>
              )}
              {specs.durability.milStdCompliance && (
                <div className="col-lg-4 col-md-6 mb-4">
                  <div className="spec-card">
                    <h6 className="spec-title">MIL-STD Compliance</h6>
                    <p className="spec-content">{specs.durability.milStdCompliance}</p>
                  </div>
                </div>
              )}
              {specs.durability.radiationShielding && (
                <div className="col-lg-4 col-md-6 mb-4">
                  <div className="spec-card">
                    <h6 className="spec-title">Radiation Shielding</h6>
                    <p className="spec-content">{specs.durability.radiationShielding}</p>
                  </div>
                </div>
              )}
            </>
          )}

          {/* Maintenance */}
          {specs.maintenanceInfo && (
            <>
              {renderUnitValue(specs.maintenanceInfo.mtbf, "MTBF (Mean Time Between Failures)")}
              {renderUnitValue(specs.maintenanceInfo.maintenanceInterval, "Maintenance Interval")}
            </>
          )}

          {/* Version */}
          {product?.version && (
            <div className="col-lg-4 col-md-6 mb-4">
              <div className="spec-card">
                <h6 className="spec-title">Version</h6>
                <p className="spec-content">{product.version}</p>
              </div>
            </div>
          )}
        </div>
      </div>
    </>
  );
}