"use client";
import React from "react";

export default function PayloadsAndAttachments({ product }) {
  const payloadsData = product?.payloadsAndAttachments || {};

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
          {payloadsData.maxPayloadWeight && (payloadsData.maxPayloadWeight.value || payloadsData.maxPayloadWeight.unit) && (
            <div className="col-lg-4 col-md-6 mb-4">
              <div className="spec-card">
                <h6 className="spec-title">Max Payload Weight</h6>
                <p className="spec-content">
                  {payloadsData.maxPayloadWeight.value && payloadsData.maxPayloadWeight.unit 
                    ? `${payloadsData.maxPayloadWeight.value} ${payloadsData.maxPayloadWeight.unit}`
                    : payloadsData.maxPayloadWeight.value || payloadsData.maxPayloadWeight.unit || "N/A"
                  }
                </p>
              </div>
            </div>
          )}
          
          {payloadsData.payloadTypes && payloadsData.payloadTypes.length > 0 && (
            <div className="col-lg-4 col-md-6 mb-4">
              <div className="spec-card">
                <h6 className="spec-title">Payload Types</h6>
                <p className="spec-content">
                  {payloadsData.payloadTypes.map((type, index) => 
                    typeof type === 'object' ? type.name || type.title : type
                  ).join(", ")}
                </p>
              </div>
            </div>
          )}
          
          {payloadsData.attachments && payloadsData.attachments.length > 0 && payloadsData.attachments.some(attachment => attachment && attachment.trim() !== '') && (
            <div className="col-lg-4 col-md-6 mb-4">
              <div className="spec-card">
                <h6 className="spec-title">Attachments</h6>
                <p className="spec-content">
                  {payloadsData.attachments.filter(attachment => attachment && attachment.trim() !== '').join(", ")}
                </p>
              </div>
            </div>
          )}
          
          {payloadsData.hotSwappable !== undefined && payloadsData.hotSwappable !== null && (
            <div className="col-lg-4 col-md-6 mb-4">
              <div className="spec-card">
                <h6 className="spec-title">Hot Swappable</h6>
                <p className="spec-content">
                  {payloadsData.hotSwappable ? "Yes" : "No"}
                </p>
              </div>
            </div>
          )}
          
          {payloadsData.accessoryPorts && payloadsData.accessoryPorts.length > 0 && payloadsData.accessoryPorts.some(port => port && port.trim() !== '') && (
            <div className="col-lg-4 col-md-6 mb-4">
              <div className="spec-card">
                <h6 className="spec-title">Accessory Ports</h6>
                <p className="spec-content">
                  {payloadsData.accessoryPorts.filter(port => port && port.trim() !== '').join(", ")}
                </p>
              </div>
            </div>
          )}
          
          {(!payloadsData.maxPayloadWeight || (!payloadsData.maxPayloadWeight.value && !payloadsData.maxPayloadWeight.unit)) && 
            (!payloadsData.payloadTypes || payloadsData.payloadTypes.length === 0) &&
            (!payloadsData.attachments || payloadsData.attachments.length === 0 || !payloadsData.attachments.some(attachment => attachment && attachment.trim() !== '')) &&
            (payloadsData.hotSwappable === undefined || payloadsData.hotSwappable === null) &&
            (!payloadsData.accessoryPorts || payloadsData.accessoryPorts.length === 0 || !payloadsData.accessoryPorts.some(port => port && port.trim() !== '')) && (
            <div className="col-12">
              <div className="spec-card">
                <h6 className="spec-title">No Information Available</h6>
                <p className="spec-content">
                  No payload and attachment information available for this robot.
                </p>
              </div>
            </div>
          )}
        </div>
      </div>
    </>
  );
}
