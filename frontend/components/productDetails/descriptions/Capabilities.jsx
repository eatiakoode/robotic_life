import React from "react";
import "./spec-cards.css";

export default function Capabilities({ product }) {
  const capabilities = product?.capabilities || {};

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

  return (
    <>
      <div className="capabilities-grid">
        <div className="row">
          {/* Autonomy Level */}
          {capabilities.autonomyLevel && (
            <div className="col-lg-4 col-md-6 mb-4">
              <div className="spec-card">
                <h6 className="spec-title">Autonomy Level</h6>
                <p className="spec-content">
                  {typeof capabilities.autonomyLevel === 'object' 
                    ? capabilities.autonomyLevel.name || capabilities.autonomyLevel.title
                    : capabilities.autonomyLevel
                  }
                </p>
              </div>
            </div>
          )}

          {/* Navigation Types */}
          {capabilities.navigationTypes && capabilities.navigationTypes.length > 0 && (
            <div className="col-lg-4 col-md-6 mb-4">
              <div className="spec-card">
                <h6 className="spec-title">Navigation Types</h6>
                <p className="spec-content">
                  {capabilities.navigationTypes.map(nav => 
                    typeof nav === 'object' ? nav.name || nav.title : nav
                  ).join(', ')}
                </p>
              </div>
            </div>
          )}

          {/* Communication Methods */}
          {capabilities.communicationMethods && capabilities.communicationMethods.length > 0 && (
            <div className="col-lg-4 col-md-6 mb-4">
              <div className="spec-card">
                <h6 className="spec-title">Communication Methods</h6>
                <p className="spec-content">
                  {capabilities.communicationMethods.map(comm => 
                    typeof comm === 'object' ? comm.name || comm.title : comm
                  ).join(', ')}
                </p>
              </div>
            </div>
          )}

          {/* Features */}
          {capabilities.features && capabilities.features.length > 0 && capabilities.features.some(feature => feature && feature.trim() !== '') && (
            <div className="col-lg-4 col-md-6 mb-4">
              <div className="spec-card">
                <h6 className="spec-title">Features</h6>
                <p className="spec-content">
                  {capabilities.features.filter(feature => feature && feature.trim() !== '').join(', ')}
                </p>
              </div>
            </div>
          )}

          {/* Primary Function */}
          {capabilities.primaryFunction && (
            <div className="col-lg-4 col-md-6 mb-4">
              <div className="spec-card">
                <h6 className="spec-title">Primary Function</h6>
                <p className="spec-content">
                  {typeof capabilities.primaryFunction === 'object' 
                    ? capabilities.primaryFunction.name || capabilities.primaryFunction.title
                    : capabilities.primaryFunction
                  }
                </p>
              </div>
            </div>
          )}

          {/* Interoperability */}
          {capabilities.interoperability && capabilities.interoperability.length > 0 && capabilities.interoperability.some(item => item && item.trim() !== '') && (
            <div className="col-lg-4 col-md-6 mb-4">
              <div className="spec-card">
                <h6 className="spec-title">Interoperability</h6>
                <p className="spec-content">
                  {capabilities.interoperability.filter(item => item && item.trim() !== '').join(', ')}
                </p>
              </div>
            </div>
          )}

          {/* Load Handling */}
          {capabilities.loadHandling && capabilities.loadHandling.grippingStrength && (capabilities.loadHandling.grippingStrength.value || capabilities.loadHandling.grippingStrength.unit) && (
            <div className="col-lg-4 col-md-6 mb-4">
              <div className="spec-card">
                <h6 className="spec-title">Gripping Strength</h6>
                <p className="spec-content">
                  {capabilities.loadHandling.grippingStrength.value && capabilities.loadHandling.grippingStrength.unit 
                    ? `${capabilities.loadHandling.grippingStrength.value} ${capabilities.loadHandling.grippingStrength.unit}`
                    : capabilities.loadHandling.grippingStrength.value || capabilities.loadHandling.grippingStrength.unit || "N/A"
                  }
                </p>
              </div>
            </div>
          )}

          {capabilities.loadHandling && capabilities.loadHandling.articulationPrecision && (capabilities.loadHandling.articulationPrecision.value || capabilities.loadHandling.articulationPrecision.unit) && (
            <div className="col-lg-4 col-md-6 mb-4">
              <div className="spec-card">
                <h6 className="spec-title">Articulation Precision</h6>
                <p className="spec-content">
                  {capabilities.loadHandling.articulationPrecision.value && capabilities.loadHandling.articulationPrecision.unit 
                    ? `${capabilities.loadHandling.articulationPrecision.value} ${capabilities.loadHandling.articulationPrecision.unit}`
                    : capabilities.loadHandling.articulationPrecision.value || capabilities.loadHandling.articulationPrecision.unit || "N/A"
                  }
                </p>
              </div>
            </div>
          )}

          {/* Communication Range */}
          {capabilities.communicationRange && (capabilities.communicationRange.value || capabilities.communicationRange.unit) && (
            <div className="col-lg-4 col-md-6 mb-4">
              <div className="spec-card">
                <h6 className="spec-title">Communication Range</h6>
                <p className="spec-content">
                  {capabilities.communicationRange.value && capabilities.communicationRange.unit 
                    ? `${capabilities.communicationRange.value} ${capabilities.communicationRange.unit}`
                    : capabilities.communicationRange.value || capabilities.communicationRange.unit || "N/A"
                  }
                </p>
              </div>
            </div>
          )}
        </div>
      </div>
    </>
  );
}