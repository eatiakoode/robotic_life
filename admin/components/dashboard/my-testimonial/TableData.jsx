"use client";
import { deleteTestimonialAPI } from "../../../api/testimonial";
import { useRouter } from "next/navigation";
import { toast } from 'react-toastify';
import { useState, useCallback, useEffect } from "react";

const TableData = ({ testimonials = [], loading = false, error = null, onRefresh }) => {
  const router = useRouter();
  const [deletingId, setDeletingId] = useState(null);
  const [isClient, setIsClient] = useState(false);

  useEffect(() => {
    setIsClient(true);
  }, []);

  // Memoized delete function to prevent unnecessary re-renders
  const deleteTestimonial = useCallback(async (id) => {
    // Prevent multiple delete requests
    if (deletingId) {
      toast.warn("Please wait for the current operation to complete");
      return;
    }

    const isConfirmed = window.confirm("Are you sure you want to delete this testimonial?");
    if (!isConfirmed) return;

    setDeletingId(id);
    
    try {
      const data = await deleteTestimonialAPI(id);
      toast.success(data.message || 'Testimonial deleted successfully');
      
      // Refresh the data after deletion
      if (onRefresh) {
        onRefresh();
      }
      
    } catch (error) {
      toast.error(error.message || "Failed to delete testimonial.");
    } finally {
      setDeletingId(null);
    }
  }, [deletingId, onRefresh]);

  // Memoized edit function
  const editTestimonial = useCallback((id) => {
    router.push(`/cmsroboticlife/edit-testimonial/${id}`);
  }, [router]);
  // Format date helper
  const formatDate = useCallback((dateString) => {
    if (!dateString) return 'N/A';
    try {
      // Use a consistent date format to avoid hydration mismatches
      const date = new Date(dateString);
      const month = date.toLocaleDateString('en-US', { month: 'short' });
      const day = date.getDate().toString().padStart(2, '0');
      const year = date.getFullYear();
      return `${month} ${day}, ${year}`;
    } catch {
      return 'Invalid Date';
    }
  }, []);

  const theadContent = [
    "Customer Name",
    "Designation", 
    "Date Published",
    "Status",
    "Actions",
  ];

  // Show loading state
  if (loading || !isClient) {
    return (
      <div className="text-center py-5">
        <div className="spinner-border text-primary" role="status">
          <span className="visually-hidden">Loading...</span>
        </div>
        <p className="mt-2">Loading testimonials...</p>
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
  if (!testimonials || testimonials.length === 0) {
    return (
      <div className="text-center py-5">
        <div className="alert alert-info" role="alert">
          <i className="fas fa-info-circle me-2"></i>
          No testimonials found.
        </div>
      </div>
    );
  }

  return (
    <div className="table-responsive">
      <table className="table">
        <thead className="thead-light">
          <tr>
            {theadContent.map((value, i) => (
              <th scope="col" key={i} className="text-start">
                {value}
              </th>
            ))}
          </tr>
        </thead>
        <tbody>
          {testimonials.map((item, index) => (
            <tr key={item._id || index}>
              {/* Customer Name */}
              <td className="align-middle text-start">
                <div
                  style={{ display: "flex", alignItems: "center", height: "100%", minHeight: "60px", justifyContent: "flex-start" }}
                >
                  <h4 className="mb-0">{item.name || 'Unnamed Customer'}</h4>
                </div>
              </td>

              {/* Designation */}
              <td className="align-middle text-start">
                <div
                  style={{ display: "flex", alignItems: "center", height: "100%", justifyContent: "flex-start" }}
                >
                  <span className="text-muted">{item.designation || 'N/A'}</span>
                </div>
              </td>

              {/* Date Published */}
              <td className="align-middle text-start">
                <div
                  style={{ display: "flex", alignItems: "center", height: "100%", justifyContent: "flex-start" }}
                >
                  {formatDate(item.createdAt)}
                </div>
              </td>

              {/* Status */}
              <td className="align-middle text-start">
                <div
                  style={{ display: "flex", alignItems: "center", height: "100%", justifyContent: "flex-start" }}
                >
                  <span className={`status_tag ${item.status ? 'badge2' : 'badge'}`}>
                    {item.status ? "Active" : "Inactive"}
                  </span>
                </div>
              </td>

              {/* Actions */}
              <td className="align-middle text-start">
                <div
                  style={{ display: "flex", alignItems: "center", justifyContent: "flex-start", height: "100%" }}
                >
                  <ul className="view_edit_delete_list mb0 d-flex">
                    <li
                      className="list-inline-item"
                      data-toggle="tooltip"
                      data-placement="top"
                      title="Edit"
                    >
                      <button 
                        onClick={() => editTestimonial(item._id)}
                        className="btn btn-link p-0"
                        disabled={deletingId === item._id}
                        aria-label={`Edit ${item.name || 'testimonial'}`}
                      >
                        <span className="flaticon-edit"></span>
                      </button>
                    </li>

                    <li 
                      className="list-inline-item"
                      data-toggle="tooltip"
                      data-placement="top"
                      title="Delete"
                    >
                      <button 
                        onClick={() => deleteTestimonial(item._id)}
                        className="btn btn-link p-0 text-danger"
                        disabled={deletingId === item._id}
                        aria-label={`Delete ${item.name || 'testimonial'}`}
                      >
                        {deletingId === item._id ? (
                          <span className="spinner-border spinner-border-sm" role="status" aria-hidden="true"></span>
                        ) : (
                          <span className="flaticon-garbage"></span>
                        )}
                      </button>
                    </li>
                  </ul>
                </div>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default TableData;