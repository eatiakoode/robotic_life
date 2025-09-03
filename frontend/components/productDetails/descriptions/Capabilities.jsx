import React from "react";
import "./spec-cards.css";

export default function Capabilities({ product }) {
  return (
    <>
      <div className="capabilities-grid">
        <div className="row">
          {/* Navigation Type */}
          {product?.navigationType && product.navigationType.length > 0 && (
            <div className="col-lg-4 col-md-6 mb-4">
              <div className="spec-card">
                <h6 className="spec-title">Navigation Type</h6>
                <p className="spec-content">
                  {product.navigationType.map(nav => nav?.name || nav?.title || 'Unknown').join(', ')}
                </p>
              </div>
            </div>
          )}

          {/* AI Software Features */}
          {product?.aiSoftwareFeatures && product.aiSoftwareFeatures.length > 0 && (
            <div className="col-lg-4 col-md-6 mb-4">
              <div className="spec-card">
                <h6 className="spec-title">AI Software Features</h6>
                <p className="spec-content">
                  {product.aiSoftwareFeatures.map(feature => feature?.name || feature?.title || 'Unknown').join(', ')}
                </p>
              </div>
            </div>
          )}

          {/* Operating Environment */}
          {product?.operatingEnvironment && (
            <div className="col-lg-4 col-md-6 mb-4">
              <div className="spec-card">
                <h6 className="spec-title">Operating Environment</h6>
                <p className="spec-content">
                  {product.operatingEnvironment?.name || product.operatingEnvironment?.title || 'Unknown'}
                </p>
              </div>
            </div>
          )}

          {/* Terrain Capability */}
          {product?.terrainCapability && product.terrainCapability.length > 0 && (
            <div className="col-lg-4 col-md-6 mb-4">
              <div className="spec-card">
                <h6 className="spec-title">Terrain Capability</h6>
                <p className="spec-content">
                  {product.terrainCapability.map(terrain => terrain?.name || terrain?.title || 'Unknown').join(', ')}
                </p>
              </div>
            </div>
          )}

          {/* Payload Type */}
          {product?.payloadTypesSupported && product.payloadTypesSupported.length > 0 && (
            <div className="col-lg-4 col-md-6 mb-4">
              <div className="spec-card">
                <h6 className="spec-title">Payload Type</h6>
                <p className="spec-content">
                  {product.payloadTypesSupported.map(payload => payload?.name || payload?.title || 'Unknown').join(', ')}
                </p>
              </div>
            </div>
          )}

          {/* Sensors */}
          {product?.sensors && product.sensors.length > 0 && (
            <div className="col-lg-4 col-md-6 mb-4">
              <div className="spec-card">
                <h6 className="spec-title">Sensors</h6>
                <p className="spec-content">
                  {product.sensors.map(sensor => sensor?.name || sensor?.title || 'Unknown').join(', ')}
                </p>
              </div>
            </div>
          )}

          {/* Primary Function */}
          {product?.primaryFunction && (
            <div className="col-lg-4 col-md-6 mb-4">
              <div className="spec-card">
                <h6 className="spec-title">Primary Function</h6>
                <p className="spec-content">
                  {product.primaryFunction?.name || product.primaryFunction?.title || 'Unknown'}
                </p>
              </div>
            </div>
          )}

          {/* Autonomy Level */}
          {product?.autonomyLevel && (
            <div className="col-lg-4 col-md-6 mb-4">
              <div className="spec-card">
                <h6 className="spec-title">Autonomy Level</h6>
                <p className="spec-content">
                  {product.autonomyLevel?.name || product.autonomyLevel?.title || 'Unknown'}
                </p>
              </div>
            </div>
          )}

          {/* Communication Method */}
          {product?.communicationMethod && product.communicationMethod.length > 0 && (
            <div className="col-lg-4 col-md-6 mb-4">
              <div className="spec-card">
                <h6 className="spec-title">Communication Method</h6>
                <p className="spec-content">
                  {product.communicationMethod.map(comm => comm?.name || comm?.title || 'Unknown').join(', ')}
                </p>
              </div>
            </div>
          )}
        </div>
      </div>
    </>
  );
}
