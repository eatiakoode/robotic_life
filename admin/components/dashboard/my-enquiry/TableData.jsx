"use client"; // Add this at the top

import { getEnquiryTableData, deleteEnquiryAPI, updateEnquiryAPI } from "@/api/enquiry";
import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { toast } from "react-toastify";

const TableData = ({ enquiryList, setEnquiryList }) => {
  const router = useRouter();

  const deleteEnquiry = async (id) => {
    const isConfirmed = window.confirm(
      "Are you sure you want to delete this enquiry?"
    );
    if (!isConfirmed) return;

    try {
      const data = await deleteEnquiryAPI(id); // 🔹 Call the API function

      toast.success(data.message || "Enquiry deleted successfully");
      setEnquiryList((prevEnquiryList) =>
        prevEnquiryList.filter((enquiry) => enquiry._id !== id)
      );
    } catch (error) {
      console.error("Delete error:", error);
      toast.error(error.message || "Failed to delete enquiry");
    }
  };

  const updateEnquiryStatus = async (id, newStatus) => {
    try {
      const enquiry = enquiryList.find(e => e._id === id);
      if (!enquiry) return;

      const updatedEnquiry = { ...enquiry, status: newStatus };
      const data = await updateEnquiryAPI(id, updatedEnquiry);

      toast.success(data.message || "Enquiry status updated successfully");
      setEnquiryList((prevEnquiryList) =>
        prevEnquiryList.map((enquiry) =>
          enquiry._id === id ? { ...enquiry, status: newStatus } : enquiry
        )
      );
    } catch (error) {
      console.error("Update error:", error);
      toast.error(error.message || "Failed to update enquiry status");
    }
  };
  let theadConent = ["Name", "Email", "Message", "Status", "Date", "Action"];
  let tbodyContent = enquiryList?.map((item) => (
    <tr key={item._id} style={{ height: '60px' }}>
      <td scope="row" style={{ verticalAlign: 'middle', padding: '12px 8px' }}>
        <div style={{ fontSize: '14px', fontWeight: '600', color: '#333' }}>{item.name}</div>
      </td>
      <td style={{ verticalAlign: 'middle', padding: '12px 8px' }}>
        <div style={{ fontSize: '13px', color: '#666' }}>{item.email}</div>
      </td>
      <td style={{ verticalAlign: 'middle', padding: '12px 8px', maxWidth: '200px' }}>
        <div style={{ 
          fontSize: '13px', 
          color: '#333',
          overflow: 'hidden',
          textOverflow: 'ellipsis',
          whiteSpace: 'nowrap',
          maxWidth: '180px'
        }}>
          {item.message}
        </div>
      </td>
      <td style={{ verticalAlign: 'middle', textAlign: 'center', padding: '12px 8px' }}>
        <select 
          value={item.status || 'new'}
          onChange={(e) => updateEnquiryStatus(item._id, e.target.value)}
          style={{ 
            border: '1px solid #ddd',
            borderRadius: '4px',
            padding: '4px 8px',
            fontSize: '12px',
            fontWeight: '500',
            cursor: 'pointer',
            minWidth: '90px',
            backgroundColor: '#fff',
            color: '#333'
          }}
        >
          <option value="new">New</option>
          <option value="in-progress">In Progress</option>
          <option value="resolved">Resolved</option>
        </select>
      </td>
      <td style={{ verticalAlign: 'middle', padding: '12px 8px' }}>
        <div style={{ fontSize: '12px', color: '#666' }}>
          {new Date(item.createdAt).toLocaleString("en-US", {
            month: "short",
            day: "2-digit",
            year: "numeric",
            hour: "2-digit",
            minute: "2-digit",
            hour12: true,
          })}
        </div>
      </td>
      <td style={{ verticalAlign: 'middle', textAlign: 'center', padding: '12px 8px' }}>
        <button
          onClick={() => deleteEnquiry(item._id)}
          style={{
            background: 'none',
            border: 'none',
            cursor: 'pointer',
            padding: '4px',
            borderRadius: '4px',
            color: '#dc3545'
          }}
          title="Delete"
        >
          <span className="flaticon-garbage" style={{ fontSize: '16px' }}></span>
        </button>
      </td>
    </tr>
  ));
  // useEffect(() => {
  //     fetchEnquiryData();
  //   }, []);
  return (
    <>
      <table className="table" style={{ 
        tableLayout: 'fixed',
        borderCollapse: 'collapse',
        width: '100%',
        backgroundColor: '#fff'
      }}>
        <thead className="thead-light">
          <tr style={{ height: '50px' }}>
            {theadConent.map((value, i) => (
              <th 
                scope="col" 
                key={i}
                style={{ 
                  verticalAlign: 'middle',
                  textAlign: value === 'Status' || value === 'Action' ? 'center' : 'left',
                  fontWeight: '600',
                  fontSize: '14px',
                  padding: '12px 8px',
                  borderBottom: '2px solid #dee2e6',
                  backgroundColor: '#f8f9fa',
                  color: '#495057'
                }}
              >
                {value}
              </th>
            ))}
          </tr>
        </thead>
        {/* End theaad */}

        <tbody>{tbodyContent}</tbody>
      </table>
    </>
  );
};

export default TableData;
