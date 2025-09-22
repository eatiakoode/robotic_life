"use client";

import { deleteOperatingEnvironmentAPI } from "../../../api/operatingenvironment";
import { useState } from "react";
import { useRouter } from "next/navigation";
import { toast } from 'react-toastify';

const TableData = ({ operatingEnvironments = [], loading = false, error = null, onRefresh }) => {
  const router = useRouter();

  const deleteOperatingEnvironment = async (id) => {
    const isConfirmed = window.confirm("Are you sure you want to delete this Operating Environment?");
    if (!isConfirmed) return;

    try {
      const data = await deleteOperatingEnvironmentAPI(id);
      toast.success(data.message);
      // Refresh the data after deletion
      if (onRefresh) {
        onRefresh();
      }
    } catch (error) {
      toast.error("Failed to delete Operating Environment.");
    }
  };

  // Show loading state
  if (loading) {
    return (
      <div className="text-center py-5">
        <div className="spinner-border text-primary" role="status">
          <span className="visually-hidden">Loading...</span>
        </div>
        <p className="mt-2">Loading Operating Environments...</p>
      </div>
    );
  }

  // Show error state
  if (error) {
    return (
      <div className="text-center py-5">
        <div className="alert alert-danger" role="alert">
          <i className="fas fa-exclamation-triangle me-2"></i>
          {error}
        </div>
        <button 
          className="btn btn-primary mt-3" 
          onClick={onRefresh}
        >
          <i className="fas fa-redo me-2"></i>
          Try Again
        </button>
      </div>
    );
  }

  // Show empty state
  if (!operatingEnvironments || operatingEnvironments.length === 0) {
    return (
      <div className="text-center py-5">
        <div className="alert alert-info" role="alert">
          <i className="fas fa-info-circle me-2"></i>
          No Operating Environments found.
        </div>
      </div>
    );
  }

  let theadContent = ["Listing Title", "Date published", "Status", "Action"];

  let tbodyContent = operatingEnvironments.map((item) => (
    <tr key={item._id || Math.random()}>
      <td scope="row" className="align-middle text-center">
        <h4 className="mb-0">{item?.name || 'N/A'}</h4>
      </td>

      <td className="align-middle text-center">
        {item?.createdAt ? new Date(item.createdAt).toLocaleDateString('en-US', {
          month: 'short',
          day: '2-digit',
          year: 'numeric',
        }) : 'N/A'}
      </td>

      <td className="align-middle text-center">
        <span className={`status_tag ${item?.status ? 'badge2' : 'badge'}`}>
          {item?.status ? "Active" : "Deactive"}
        </span>
      </td>

      <td className="align-middle text-center">
        <ul className="view_edit_delete_list mb0 d-flex justify-content-center">
          <li className="list-inline-item" title="Edit">
            <button onClick={() => router.push(`/cmsthebotsworld/edit-operatingenvironment/${item._id}`)}>
              <span className="flaticon-edit"></span>
            </button>
          </li>
          <li className="list-inline-item" title="Delete">
            <a href="#" onClick={() => deleteOperatingEnvironment(item._id)}>
              <span className="flaticon-garbage"></span>
            </a>
          </li>
        </ul>
      </td>
    </tr>
  ));

  return (
    <>
      <table className="table">
        <thead className="thead-light">
          <tr>
            {theadContent.map((value, i) => (
              <th scope="col" key={i} className="text-center">
                {value}
              </th>
            ))}
          </tr>
        </thead>
        <tbody>{tbodyContent}</tbody>
      </table>
    </>
  );
};

export default TableData;
