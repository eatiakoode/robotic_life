"use client";
import React from "react";
import "./spec-table.css";

export default function SensorsAndSoftware({ product }) {
  const sensorsData = product?.sensorsAndSoftware || {};

  const renderUnitValue = (unitValue, label) => {
    if (!unitValue || (!unitValue.value && !unitValue.unit)) return null;
    return {
      title: label,
      value: unitValue.value && unitValue.unit 
            ? `${unitValue.value} ${unitValue.unit}`
            : unitValue.value || unitValue.unit || "N/A"
    };
  };

  // Collect all sensors and software data into an array
  const getSensorsAndSoftware = () => {
    const dataList = [];

    // Sensors
    if (sensorsData.sensors && sensorsData.sensors.length > 0) {
      dataList.push({
        title: "Sensors",
        value: sensorsData.sensors.map((sensor, index) => 
                    typeof sensor === 'object' ? sensor.name || sensor.title : sensor
        ).join(", ")
      });
    }

    // AI Software Features
    if (sensorsData.aiSoftwareFeatures && sensorsData.aiSoftwareFeatures.length > 0) {
      dataList.push({
        title: "AI Software Features",
        value: sensorsData.aiSoftwareFeatures.map((feature, index) => 
                    typeof feature === 'object' ? feature.name || feature.title : feature
        ).join(", ")
      });
    }

    // Operating System
    if (sensorsData.operatingSystem) {
      dataList.push({
        title: "Operating System",
        value: sensorsData.operatingSystem
      });
    }

    // Firmware Version
    if (sensorsData.firmwareVersion) {
      dataList.push({
        title: "Firmware Version",
        value: sensorsData.firmwareVersion
      });
    }

    // Security Features
    if (sensorsData.securityFeatures && sensorsData.securityFeatures.length > 0) {
      dataList.push({
        title: "Security Features",
        value: sensorsData.securityFeatures.join(", ")
      });
    }

    // Data Logging
    if (sensorsData.dataLogging) {
      if (sensorsData.dataLogging.storageCapacity && (sensorsData.dataLogging.storageCapacity.value || sensorsData.dataLogging.storageCapacity.unit)) {
        dataList.push(renderUnitValue(sensorsData.dataLogging.storageCapacity, "Storage Capacity"));
      }
      if (sensorsData.dataLogging.loggingInterval && (sensorsData.dataLogging.loggingInterval.value || sensorsData.dataLogging.loggingInterval.unit)) {
        dataList.push(renderUnitValue(sensorsData.dataLogging.loggingInterval, "Logging Interval"));
      }
    }

    // Check if no data available
    if (dataList.length === 0) {
      dataList.push({
        title: "No Information Available",
        value: "No sensor and software information available for this robot."
      });
    }

    return dataList.filter(item => item !== null);
  };

  const sensorsAndSoftwareList = getSensorsAndSoftware();

  return (
    <div className="specification-table-container">
      <table className="specification-table">
        <tbody>
          {sensorsAndSoftwareList.map((item, index) => (
            <tr key={index} className="spec-row">
              <td className="spec-label">{item.title}</td>
              <td className="spec-value">{item.value}</td>
            </tr>
          ))}
        </tbody>
      </table>
      </div>
  );
}
