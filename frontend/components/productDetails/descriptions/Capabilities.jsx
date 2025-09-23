import React from "react";
import "./spec-table.css";

export default function Capabilities({ product }) {
  const capabilities = product?.capabilities || {};

  const renderUnitValue = (unitValue, title) => {
    if (!unitValue || (!unitValue.value && !unitValue.unit)) return null;
    return {
      title,
      value: unitValue.value && unitValue.unit 
              ? `${unitValue.value} ${unitValue.unit}`
              : unitValue.value || unitValue.unit || "N/A"
    };
  };

  // Collect all capabilities into an array
  const getCapabilities = () => {
    const capabilityList = [];

    // Autonomy Level
    if (capabilities.autonomyLevel) {
      capabilityList.push({
        title: "Autonomy Level",
        value: typeof capabilities.autonomyLevel === 'object' 
                    ? capabilities.autonomyLevel.name || capabilities.autonomyLevel.title
                    : capabilities.autonomyLevel
      });
    }

    // Navigation Types
    if (capabilities.navigationTypes && capabilities.navigationTypes.length > 0) {
      capabilityList.push({
        title: "Navigation Types",
        value: capabilities.navigationTypes.map(nav => 
                    typeof nav === 'object' ? nav.name || nav.title : nav
        ).join(', ')
      });
    }

    // Communication Methods
    if (capabilities.communicationMethods && capabilities.communicationMethods.length > 0) {
      capabilityList.push({
        title: "Communication Methods",
        value: capabilities.communicationMethods.map(comm => 
                    typeof comm === 'object' ? comm.name || comm.title : comm
        ).join(', ')
      });
    }

    // Features
    if (capabilities.features && capabilities.features.length > 0 && capabilities.features.some(feature => feature && feature.trim() !== '')) {
      capabilityList.push({
        title: "Features",
        value: capabilities.features.filter(feature => feature && feature.trim() !== '').join(', ')
      });
    }

    // Primary Function
    if (capabilities.primaryFunction) {
      capabilityList.push({
        title: "Primary Function",
        value: typeof capabilities.primaryFunction === 'object' 
                    ? capabilities.primaryFunction.name || capabilities.primaryFunction.title
                    : capabilities.primaryFunction
      });
    }

    // Interoperability
    if (capabilities.interoperability && capabilities.interoperability.length > 0 && capabilities.interoperability.some(item => item && item.trim() !== '')) {
      capabilityList.push({
        title: "Interoperability",
        value: capabilities.interoperability.filter(item => item && item.trim() !== '').join(', ')
      });
    }

    // Load Handling
    if (capabilities.loadHandling) {
      if (capabilities.loadHandling.grippingStrength && (capabilities.loadHandling.grippingStrength.value || capabilities.loadHandling.grippingStrength.unit)) {
        capabilityList.push(renderUnitValue(capabilities.loadHandling.grippingStrength, "Gripping Strength"));
      }
      if (capabilities.loadHandling.articulationPrecision && (capabilities.loadHandling.articulationPrecision.value || capabilities.loadHandling.articulationPrecision.unit)) {
        capabilityList.push(renderUnitValue(capabilities.loadHandling.articulationPrecision, "Articulation Precision"));
      }
    }

    // Communication Range
    if (capabilities.communicationRange && (capabilities.communicationRange.value || capabilities.communicationRange.unit)) {
      capabilityList.push(renderUnitValue(capabilities.communicationRange, "Communication Range"));
    }

    return capabilityList.filter(capability => capability !== null);
  };

  const capabilitiesList = getCapabilities();

  return (
    <div className="specification-table-container">
      <table className="specification-table">
        <tbody>
          {capabilitiesList.map((capability, index) => (
            <tr key={index} className="spec-row">
              <td className="spec-label">{capability.title}</td>
              <td className="spec-value">{capability.value}</td>
            </tr>
          ))}
        </tbody>
      </table>
      </div>
  );
}