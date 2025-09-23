"use client";
import React from "react";
import "./spec-table.css";

export default function OperationalEnvironment({ product }) {
  const operationalData = product?.operationalEnvironmentAndApplications || {};

  const renderUnitValue = (unitValue, label) => {
    if (!unitValue || (!unitValue.value && !unitValue.unit)) return null;
    return {
      title: label,
      value: unitValue.value && unitValue.unit 
            ? `${unitValue.value} ${unitValue.unit}`
            : unitValue.value || unitValue.unit || "N/A"
    };
  };

  // Collect all operational environment data into an array
  const getOperationalEnvironment = () => {
    const dataList = [];

    // Operating Environment
    if (operationalData.operatingEnvironment) {
      dataList.push({
        title: "Operating Environment",
        value: typeof operationalData.operatingEnvironment === 'object' 
                    ? operationalData.operatingEnvironment.name || operationalData.operatingEnvironment.title
                    : operationalData.operatingEnvironment
      });
    }

    // Terrain Capabilities
    if (operationalData.terrainCapabilities && operationalData.terrainCapabilities.length > 0) {
      dataList.push({
        title: "Terrain Capabilities",
        value: operationalData.terrainCapabilities.map((terrain, index) => 
                    typeof terrain === 'object' ? terrain.name || terrain.title : terrain
        ).join(", ")
      });
    }

    // Applications
    if (operationalData.applications && operationalData.applications.length > 0) {
      dataList.push({
        title: "Applications",
        value: operationalData.applications.join(", ")
      });
    }

    // Mobility Constraints
    if (operationalData.mobilityConstraints) {
      if (operationalData.mobilityConstraints.maxSlope && (operationalData.mobilityConstraints.maxSlope.value || operationalData.mobilityConstraints.maxSlope.unit)) {
        dataList.push(renderUnitValue(operationalData.mobilityConstraints.maxSlope, "Max Slope"));
      }
      if (operationalData.mobilityConstraints.maxStepHeight && (operationalData.mobilityConstraints.maxStepHeight.value || operationalData.mobilityConstraints.maxStepHeight.unit)) {
        dataList.push(renderUnitValue(operationalData.mobilityConstraints.maxStepHeight, "Max Step Height"));
      }
      if (operationalData.mobilityConstraints.maxWaterDepth && (operationalData.mobilityConstraints.maxWaterDepth.value || operationalData.mobilityConstraints.maxWaterDepth.unit)) {
        dataList.push(renderUnitValue(operationalData.mobilityConstraints.maxWaterDepth, "Max Water Depth"));
      }
    }

    // Endurance in Extreme Conditions
    if (operationalData.enduranceExtremeConditions && operationalData.enduranceExtremeConditions.length > 0 && operationalData.enduranceExtremeConditions.some(condition => condition && condition.trim() !== '')) {
      dataList.push({
        title: "Endurance in Extreme Conditions",
        value: operationalData.enduranceExtremeConditions.filter(condition => condition && condition.trim() !== '').join(", ")
      });
    }

    // Deployment Logistics
    if (operationalData.deploymentLogistics && operationalData.deploymentLogistics.length > 0 && operationalData.deploymentLogistics.some(logistic => logistic && logistic.trim() !== '')) {
      dataList.push({
        title: "Deployment Logistics",
        value: operationalData.deploymentLogistics.filter(logistic => logistic && logistic.trim() !== '').join(", ")
      });
    }

    // Check if no data available
    if (dataList.length === 0) {
      dataList.push({
        title: "No Information Available",
        value: "No operational environment information available for this robot."
      });
    }

    return dataList.filter(item => item !== null);
  };

  const operationalEnvironmentList = getOperationalEnvironment();

  return (
    <div className="specification-table-container">
      <table className="specification-table">
        <tbody>
          {operationalEnvironmentList.map((item, index) => (
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
