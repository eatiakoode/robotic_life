"use client";
import Image from "next/image";
import { deleteCountryAPI } from "../../../api/country";
import { useState } from "react";
import { useRouter } from "next/navigation";
import { toast } from 'react-toastify';

const TableData = ({ countries = [], loading = false, error = null, onRefresh }) => {
  const router = useRouter();

  const deleteCountry = async (id) => {
    const isConfirmed = window.confirm("Are you sure you want to delete this Country?");
    if (!isConfirmed) return;

    try {
      const data = await deleteCountryAPI(id);
      toast.success(data.message);
      // Refresh the data after deletion
      if (onRefresh) {
        onRefresh();
      }
    } catch (error) {
      toast.error("Failed to delete Country.");
    }
  };

  // Show loading state
  if (loading) {
    return (
      <div className="text-center py-5">
        <div className="spinner-border text-primary" role="status">
          <span className="visually-hidden">Loading...</span>
        </div>
        <p className="mt-2">Loading countries...</p>
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
  if (!countries || countries.length === 0) {
    return (
      <div className="text-center py-5">
        <div className="alert alert-info" role="alert">
          <i className="fas fa-info-circle me-2"></i>
          No countries found.
        </div>
      </div>
    );
  }

  let theadContent = ["Listing Title", "Date published", "Status", "Action"];

  let tbodyContent = countries.map((item) => (
    <tr key={item._id || Math.random()}>
      <td scope="row" className="align-middle text-center">
        <h4 className="mb-0">{item?.title || 'N/A'}</h4>
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
            <button onClick={() => router.push(`/cmsthebotsworld/edit-country/${item._id}`)}>
              <span className="flaticon-edit"></span>
            </button>
          </li>
          <li className="list-inline-item" title="Delete">
            <a href="#" onClick={() => deleteCountry(item._id)}>
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
