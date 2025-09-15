"use client";
import React from "react";

export default function OperationalEnvironment({ product }) {
  const operationalData = product?.operationalEnvironmentAndApplications || {};

  const renderUnitValue = (unitValue, label) => {
    if (!unitValue || (!unitValue.value && !unitValue.unit)) return null;
    return (
      <div className="spec-item mb_6">
        <span className="fw-bold">{label}:</span>
        <span className="ms-2">
          {unitValue.value && unitValue.unit 
            ? `${unitValue.value} ${unitValue.unit}`
            : unitValue.value || unitValue.unit || "N/A"
          }
        </span>
      </div>
    );
  };

  return (
    <>
      <div className="capabilities-grid">
        <div className="row">
          {operationalData.operatingEnvironment && (
            <div className="col-lg-4 col-md-6 mb-4">
              <div className="spec-card">
                <h6 className="spec-title">Operating Environment</h6>
                <p className="spec-content">
                  {typeof operationalData.operatingEnvironment === 'object' 
                    ? operationalData.operatingEnvironment.name || operationalData.operatingEnvironment.title
                    : operationalData.operatingEnvironment
                  }
                </p>
              </div>
            </div>
          )}
          
          {operationalData.terrainCapabilities && operationalData.terrainCapabilities.length > 0 && (
            <div className="col-lg-4 col-md-6 mb-4">
              <div className="spec-card">
                <h6 className="spec-title">Terrain Capabilities</h6>
                <p className="spec-content">
                  {operationalData.terrainCapabilities.map((terrain, index) => 
                    typeof terrain === 'object' ? terrain.name || terrain.title : terrain
                  ).join(", ")}
                </p>
              </div>
            </div>
          )}
          
          {operationalData.applications && operationalData.applications.length > 0 && (
            <div className="col-lg-4 col-md-6 mb-4">
              <div className="spec-card">
                <h6 className="spec-title">Applications</h6>
                <p className="spec-content">
                  {operationalData.applications.join(", ")}
                </p>
              </div>
            </div>
          )}
          
          {operationalData.mobilityConstraints && operationalData.mobilityConstraints.maxSlope && (operationalData.mobilityConstraints.maxSlope.value || operationalData.mobilityConstraints.maxSlope.unit) && (
            <div className="col-lg-4 col-md-6 mb-4">
              <div className="spec-card">
                <h6 className="spec-title">Max Slope</h6>
                <p className="spec-content">
                  {operationalData.mobilityConstraints.maxSlope.value && operationalData.mobilityConstraints.maxSlope.unit 
                    ? `${operationalData.mobilityConstraints.maxSlope.value} ${operationalData.mobilityConstraints.maxSlope.unit}`
                    : operationalData.mobilityConstraints.maxSlope.value || operationalData.mobilityConstraints.maxSlope.unit || "N/A"
                  }
                </p>
              </div>
            </div>
          )}
          
          {operationalData.mobilityConstraints && operationalData.mobilityConstraints.maxStepHeight && (operationalData.mobilityConstraints.maxStepHeight.value || operationalData.mobilityConstraints.maxStepHeight.unit) && (
            <div className="col-lg-4 col-md-6 mb-4">
              <div className="spec-card">
                <h6 className="spec-title">Max Step Height</h6>
                <p className="spec-content">
                  {operationalData.mobilityConstraints.maxStepHeight.value && operationalData.mobilityConstraints.maxStepHeight.unit 
                    ? `${operationalData.mobilityConstraints.maxStepHeight.value} ${operationalData.mobilityConstraints.maxStepHeight.unit}`
                    : operationalData.mobilityConstraints.maxStepHeight.value || operationalData.mobilityConstraints.maxStepHeight.unit || "N/A"
                  }
                </p>
              </div>
            </div>
          )}
          
          {operationalData.mobilityConstraints && operationalData.mobilityConstraints.maxWaterDepth && (operationalData.mobilityConstraints.maxWaterDepth.value || operationalData.mobilityConstraints.maxWaterDepth.unit) && (
            <div className="col-lg-4 col-md-6 mb-4">
              <div className="spec-card">
                <h6 className="spec-title">Max Water Depth</h6>
                <p className="spec-content">
                  {operationalData.mobilityConstraints.maxWaterDepth.value && operationalData.mobilityConstraints.maxWaterDepth.unit 
                    ? `${operationalData.mobilityConstraints.maxWaterDepth.value} ${operationalData.mobilityConstraints.maxWaterDepth.unit}`
                    : operationalData.mobilityConstraints.maxWaterDepth.value || operationalData.mobilityConstraints.maxWaterDepth.unit || "N/A"
                  }
                </p>
              </div>
            </div>
          )}
          
          {operationalData.enduranceExtremeConditions && operationalData.enduranceExtremeConditions.length > 0 && (
            <div className="col-lg-4 col-md-6 mb-4">
              <div className="spec-card">
                <h6 className="spec-title">Endurance in Extreme Conditions</h6>
                <p className="spec-content">
                  {operationalData.enduranceExtremeConditions.join(", ")}
                </p>
              </div>
            </div>
          )}
          
          {operationalData.deploymentLogistics && operationalData.deploymentLogistics.length > 0 && (
            <div className="col-lg-4 col-md-6 mb-4">
              <div className="spec-card">
                <h6 className="spec-title">Deployment Logistics</h6>
                <p className="spec-content">
                  {operationalData.deploymentLogistics.join(", ")}
                </p>
              </div>
            </div>
          )}
          
          {!operationalData.operatingEnvironment &&
           (!operationalData.terrainCapabilities || operationalData.terrainCapabilities.length === 0) &&
           (!operationalData.applications || operationalData.applications.length === 0) && (
            <div className="col-12">
              <div className="spec-card">
                <h6 className="spec-title">No Information Available</h6>
                <p className="spec-content">
                  No operational environment information available for this robot.
                </p>
              </div>
            </div>
          )}
        </div>
      </div>
    </>
  );
}
