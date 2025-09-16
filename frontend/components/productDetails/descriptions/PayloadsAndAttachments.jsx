"use client";
import React from "react";
import "./spec-table.css";

export default function PayloadsAndAttachments({ product }) {
  const payloadsData = product?.payloadsAndAttachments || {};

  const renderUnitValue = (unitValue, label) => {
    if (!unitValue || (!unitValue.value && !unitValue.unit)) return null;
    return {
      title: label,
      value: unitValue.value && unitValue.unit 
        ? `${unitValue.value} ${unitValue.unit}`
        : unitValue.value || unitValue.unit || "N/A"
    };
  };

  // Collect all payloads and attachments data into an array
  const getPayloadsAndAttachments = () => {
    const dataList = [];

    // Max Payload Weight
    if (payloadsData.maxPayloadWeight && (payloadsData.maxPayloadWeight.value || payloadsData.maxPayloadWeight.unit)) {
      dataList.push(renderUnitValue(payloadsData.maxPayloadWeight, "Max Payload Weight"));
    }

    // Payload Types
    if (payloadsData.payloadTypes && payloadsData.payloadTypes.length > 0) {
      dataList.push({
        title: "Payload Types",
        value: payloadsData.payloadTypes.map((type, index) => 
          typeof type === 'object' ? type.name || type.title : type
        ).join(", ")
      });
    }

    // Attachments
    if (payloadsData.attachments && payloadsData.attachments.length > 0 && payloadsData.attachments.some(attachment => attachment && attachment.trim() !== '')) {
      dataList.push({
        title: "Attachments",
        value: payloadsData.attachments.filter(attachment => attachment && attachment.trim() !== '').join(", ")
      });
    }

    // Hot Swappable
    if (payloadsData.hotSwappable !== undefined && payloadsData.hotSwappable !== null) {
      dataList.push({
        title: "Hot Swappable",
        value: payloadsData.hotSwappable ? "Yes" : "No"
      });
    }

    // Accessory Ports
    if (payloadsData.accessoryPorts && payloadsData.accessoryPorts.length > 0 && payloadsData.accessoryPorts.some(port => port && port.trim() !== '')) {
      dataList.push({
        title: "Accessory Ports",
        value: payloadsData.accessoryPorts.filter(port => port && port.trim() !== '').join(", ")
      });
    }

    // Check if no data available
    if (dataList.length === 0) {
      dataList.push({
        title: "No Information Available",
        value: "No payload and attachment information available for this robot."
      });
    }

    return dataList.filter(item => item !== null);
  };

  const payloadsAndAttachmentsList = getPayloadsAndAttachments();

  return (
    <div className="specification-table-container">
      <table className="specification-table">
        <tbody>
          {payloadsAndAttachmentsList.map((item, index) => (
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
