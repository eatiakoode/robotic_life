import React from "react";
import "./spec-table.css";

export default function Description({ product }) {
  const specs = product?.specifications || {};

  const renderUnitValue = (unitValue, title) => {
    if (!unitValue || (!unitValue.value && !unitValue.unit)) return null;
    return {
      title,
      value: unitValue.value && unitValue.unit 
        ? `${unitValue.value} ${unitValue.unit}`
        : unitValue.value || unitValue.unit || "N/A"
    };
  };

  const renderRangeValue = (rangeValue, title) => {
    if (!rangeValue || (!rangeValue.min && !rangeValue.max)) return null;
    return {
      title,
      value: rangeValue.min && rangeValue.max 
        ? `${rangeValue.min}${rangeValue.unit || '°C'} to ${rangeValue.max}${rangeValue.unit || '°C'}`
        : rangeValue.min || rangeValue.max || "N/A"
    };
  };

  // Collect all specifications into an array
  const getSpecifications = () => {
    const specList = [];

    // Dimensions
    if (specs.dimensions) {
      if (specs.dimensions.length) specList.push(renderUnitValue(specs.dimensions.length, "Length"));
      if (specs.dimensions.width) specList.push(renderUnitValue(specs.dimensions.width, "Width"));
      if (specs.dimensions.height) specList.push(renderUnitValue(specs.dimensions.height, "Height"));
      if (specs.dimensions.wingspan) specList.push(renderUnitValue(specs.dimensions.wingspan, "Wingspan"));
      if (specs.dimensions.reach) specList.push(renderUnitValue(specs.dimensions.reach, "Reach"));
    }

    // Basic Specs
    if (specs.weight) specList.push(renderUnitValue(specs.weight, "Weight"));
    if (specs.speed) specList.push(renderUnitValue(specs.speed, "Speed"));
    if (specs.runtime) specList.push(renderUnitValue(specs.runtime, "Runtime"));
    if (specs.range) specList.push(renderUnitValue(specs.range, "Range"));
    if (specs.loadCapacity) specList.push(renderUnitValue(specs.loadCapacity, "Load Capacity"));
    if (specs.accuracy) specList.push(renderUnitValue(specs.accuracy, "Accuracy"));

    // Power Source
    if (specs.powerSource) {
      specList.push({
        title: "Power Source",
        value: typeof specs.powerSource === 'object' 
          ? specs.powerSource.name || specs.powerSource.title
          : specs.powerSource
      });
    }

    // Battery
    if (specs.batteryCapacity) specList.push(renderUnitValue(specs.batteryCapacity, "Battery Capacity"));
    if (specs.batteryChargeTime) specList.push(renderUnitValue(specs.batteryChargeTime, "Battery Charge Time"));

    // Operating Conditions
    if (specs.operatingTemperature) specList.push(renderRangeValue(specs.operatingTemperature, "Operating Temperature"));
    if (specs.noiseLevel) specList.push(renderUnitValue(specs.noiseLevel, "Noise Level"));
    if (specs.energyConsumption) specList.push(renderUnitValue(specs.energyConsumption, "Energy Consumption"));

    // Materials
    if (specs.materials && specs.materials.length > 0) {
      specList.push({
        title: "Materials",
        value: specs.materials.map(mat => 
          typeof mat === 'object' ? mat.name || mat.title : mat
        ).join(', ')
      });
    }

    // Colors
    if (specs.color && specs.color.length > 0) {
      specList.push({
        title: "Available Colors",
        value: specs.color.map(c => 
          typeof c === 'object' ? c.name || c.title : c
        ).join(', ')
      });
    }

    // Durability
    if (specs.durability) {
      if (specs.durability.ipRating) {
        specList.push({
          title: "IP Rating",
          value: specs.durability.ipRating
        });
      }
      if (specs.durability.milStdCompliance) {
        specList.push({
          title: "MIL-STD Compliance",
          value: specs.durability.milStdCompliance
        });
      }
      if (specs.durability.radiationShielding) {
        specList.push({
          title: "Radiation Shielding",
          value: specs.durability.radiationShielding
        });
      }
    }

    // Maintenance
    if (specs.maintenanceInfo) {
      if (specs.maintenanceInfo.mtbf) specList.push(renderUnitValue(specs.maintenanceInfo.mtbf, "MTBF (Mean Time Between Failures)"));
      if (specs.maintenanceInfo.maintenanceInterval) specList.push(renderUnitValue(specs.maintenanceInfo.maintenanceInterval, "Maintenance Interval"));
    }

    // Version
    if (product?.version) {
      specList.push({
        title: "Version",
        value: product.version
      });
    }

    return specList.filter(spec => spec !== null);
  };

  const specifications = getSpecifications();

  return (
    <div className="specification-table-container">
      <table className="specification-table">
        <tbody>
          {specifications.map((spec, index) => (
            <tr key={index} className="spec-row">
              <td className="spec-label">{spec.title}</td>
              <td className="spec-value">{spec.value}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}