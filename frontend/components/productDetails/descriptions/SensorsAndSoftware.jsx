"use client";
import React from "react";

export default function SensorsAndSoftware({ product }) {
  const sensorsData = product?.sensorsAndSoftware || {};

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
          {sensorsData.sensors && sensorsData.sensors.length > 0 && (
            <div className="col-lg-4 col-md-6 mb-4">
              <div className="spec-card">
                <h6 className="spec-title">Sensors</h6>
                <p className="spec-content">
                  {sensorsData.sensors.map((sensor, index) => 
                    typeof sensor === 'object' ? sensor.name || sensor.title : sensor
                  ).join(", ")}
                </p>
              </div>
            </div>
          )}
          
          {sensorsData.aiSoftwareFeatures && sensorsData.aiSoftwareFeatures.length > 0 && (
            <div className="col-lg-4 col-md-6 mb-4">
              <div className="spec-card">
                <h6 className="spec-title">AI Software Features</h6>
                <p className="spec-content">
                  {sensorsData.aiSoftwareFeatures.map((feature, index) => 
                    typeof feature === 'object' ? feature.name || feature.title : feature
                  ).join(", ")}
                </p>
              </div>
            </div>
          )}
          
          {sensorsData.operatingSystem && (
            <div className="col-lg-4 col-md-6 mb-4">
              <div className="spec-card">
                <h6 className="spec-title">Operating System</h6>
                <p className="spec-content">{sensorsData.operatingSystem}</p>
              </div>
            </div>
          )}
          
          {sensorsData.firmwareVersion && (
            <div className="col-lg-4 col-md-6 mb-4">
              <div className="spec-card">
                <h6 className="spec-title">Firmware Version</h6>
                <p className="spec-content">{sensorsData.firmwareVersion}</p>
              </div>
            </div>
          )}
          
          {sensorsData.securityFeatures && sensorsData.securityFeatures.length > 0 && (
            <div className="col-lg-4 col-md-6 mb-4">
              <div className="spec-card">
                <h6 className="spec-title">Security Features</h6>
                <p className="spec-content">
                  {sensorsData.securityFeatures.join(", ")}
                </p>
              </div>
            </div>
          )}
          
          {sensorsData.dataLogging && sensorsData.dataLogging.storageCapacity && (sensorsData.dataLogging.storageCapacity.value || sensorsData.dataLogging.storageCapacity.unit) && (
            <div className="col-lg-4 col-md-6 mb-4">
              <div className="spec-card">
                <h6 className="spec-title">Storage Capacity</h6>
                <p className="spec-content">
                  {sensorsData.dataLogging.storageCapacity.value && sensorsData.dataLogging.storageCapacity.unit 
                    ? `${sensorsData.dataLogging.storageCapacity.value} ${sensorsData.dataLogging.storageCapacity.unit}`
                    : sensorsData.dataLogging.storageCapacity.value || sensorsData.dataLogging.storageCapacity.unit || "N/A"
                  }
                </p>
              </div>
            </div>
          )}
          
          {sensorsData.dataLogging && sensorsData.dataLogging.loggingInterval && (sensorsData.dataLogging.loggingInterval.value || sensorsData.dataLogging.loggingInterval.unit) && (
            <div className="col-lg-4 col-md-6 mb-4">
              <div className="spec-card">
                <h6 className="spec-title">Logging Interval</h6>
                <p className="spec-content">
                  {sensorsData.dataLogging.loggingInterval.value && sensorsData.dataLogging.loggingInterval.unit 
                    ? `${sensorsData.dataLogging.loggingInterval.value} ${sensorsData.dataLogging.loggingInterval.unit}`
                    : sensorsData.dataLogging.loggingInterval.value || sensorsData.dataLogging.loggingInterval.unit || "N/A"
                  }
                </p>
              </div>
            </div>
          )}
          
          {(!sensorsData.sensors || sensorsData.sensors.length === 0) &&
           (!sensorsData.aiSoftwareFeatures || sensorsData.aiSoftwareFeatures.length === 0) &&
           !sensorsData.operatingSystem && !sensorsData.firmwareVersion && (
            <div className="col-12">
              <div className="spec-card">
                <h6 className="spec-title">No Information Available</h6>
                <p className="spec-content">
                  No sensor and software information available for this robot.
                </p>
              </div>
            </div>
          )}
        </div>
      </div>
    </>
  );
}
