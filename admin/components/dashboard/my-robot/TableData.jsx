"use client";
import Image from "next/image";
import { deleteRobotAPI } from "@/api/robot";
import { useRouter } from "next/navigation";
import { toast } from 'react-toastify';
import { useState, useCallback } from "react";

const TableData = ({ robots = [], setRobots }) => {
  const router = useRouter();
  const [deletingId, setDeletingId] = useState(null);

  // Memoized delete function to prevent unnecessary re-renders
  const deleteRobot = useCallback(async (id) => {
    // Prevent multiple delete requests
    if (deletingId) {
      toast.warn("Please wait for the current operation to complete");
      return;
    }

    const isConfirmed = window.confirm("Are you sure you want to delete this robot?");
    if (!isConfirmed) return;

    setDeletingId(id);
    
    try {
      const data = await deleteRobotAPI(id);
      toast.success(data.message || 'Robot deleted successfully');
      
      // Remove the deleted robot from the list optimistically
      setRobots((prevRobots) => prevRobots.filter((robot) => robot._id !== id));
      
    } catch (error) {
      console.error('Delete error:', error);
      toast.error(error.message || "Failed to delete Robot.");
    } finally {
      setDeletingId(null);
    }
  }, [deletingId, setRobots]);

  // Memoized edit function
  const editRobot = useCallback((id) => {
    router.push(`/cmsroboticlife/edit-robot/${id}`);
  }, [router]);

  // Optimized image error handler
  const handleImageError = useCallback((e) => {
    e.target.src = `${process.env.NEXT_PUBLIC_API_URL}public/assets/images/thumbnail.webp`;
  }, []);

  // FIXED: Get image URL with proper field handling
  const getImageUrl = useCallback((item) => {
    const fallbackImage = `${process.env.NEXT_PUBLIC_API_URL}public/assets/images/thumbnail.webp`;
    
    // Try multiple possible image fields based on your schema
    let imageUrl = null;
    
    if (item.images && Array.isArray(item.images) && item.images.length > 0) {
      // Use the first image from the images array
      imageUrl = item.images[0];
    } else if (item.Image) {
      // Fallback to Image field (capital I) if it exists
      imageUrl = typeof item.Image === 'object' ? item.Image.url : item.Image;
    } else if (item.image) {
      // Fallback to image field (lowercase) if it exists  
      imageUrl = typeof item.image === 'object' ? item.image.url : item.image;
    }
    
    if (!imageUrl) {
      return fallbackImage;
    }
    
    // Handle relative paths - add base URL if needed
    if (imageUrl.startsWith('public/')) {
      return `${process.env.NEXT_PUBLIC_API_URL}${imageUrl}`;
    }
    
    // Handle absolute paths
    if (imageUrl.startsWith('http')) {
      return imageUrl;
    }
    
    // Default case - prepend base URL
    return `${process.env.NEXT_PUBLIC_API_URL}${imageUrl}`;
  }, []);

  // Format date helper
  const formatDate = useCallback((dateString) => {
    if (!dateString) return 'N/A';
    try {
      return new Date(dateString).toLocaleDateString('en-US', {
        month: 'short',
        day: '2-digit',
        year: 'numeric',
      });
    } catch {
      return 'Invalid Date';
    }
  }, []);

  // Get display name helper
  const getDisplayName = useCallback((item, field) => {
    return item[field]?.name || item[field]?.title || 'N/A';
  }, []);

  // Get price helper
  const getPrice = useCallback((item) => {
    return item.totalPrice || item.price || 0;
  }, []);

  const theadContent = [
    "Robot Details",
    "Date Published", 
    "Status",
    "Actions",
  ];

  // Handle empty robots array with loading state
  if (!robots || robots.length === 0) {
    return (
      <div className="table-responsive">
        <table className="table">
          <thead className="thead-light">
            <tr>
              {theadContent.map((value, i) => (
                <th scope="col" key={i}>
                  {value}
                </th>
              ))}
            </tr>
          </thead>
          <tbody>
            <tr>
              <td colSpan={theadContent.length} className="text-center p-4">
                <div className="no-data-message">
                  <i className="flaticon-robot mb-3" style={{fontSize: '48px', color: '#ccc'}}></i>
                  <p className="mb-0">No robots available</p>
                  <small className="text-muted">Add your first robot to get started</small>
                </div>
              </td>
            </tr>
          </tbody>
        </table>
      </div>
    );
  }

  return (
    <div className="table-responsive">
      <table className="table">
        <thead className="thead-light">
          <tr>
            {theadContent.map((value, i) => (
              <th scope="col" key={i}>
                {value}
              </th>
            ))}
          </tr>
        </thead>
        <tbody>
          {robots.map((item, index) => {
            // Debug logging - remove after fixing
            // console.log('Robot item data:', {
            //   id: item._id,
            //   title: item.title,
            //   images: item.images,
            //   Image: item.Image,
            //   imageUrl: getImageUrl(item)
            // });
            
            return (
              <tr key={item._id || index}>
                <td scope="row">
                  <div className="feat_robot list favorite_page style2">
                    <div className="thumb">
                      <Image
                        width={150}
                        height={220}
                        className="img-whp cover"
                        src={getImageUrl(item)}
                        alt={item.name || item.title || 'Robot Image'}
                        unoptimized
                        onError={handleImageError}
                        priority={index < 5} // Prioritize first 5 images
                      />
                      <div className="thmb_cntnt">
                        <ul className="tag mb0">
                          <li className="list-inline-item">
                            <a href="#" onClick={(e) => e.preventDefault()}>
                              {getDisplayName(item, 'category') || getDisplayName(item, 'categoryid') || 'Uncategorized'}
                            </a>
                          </li>
                        </ul>
                      </div>
                    </div>
                    <div className="details">
                      <div className="tc_content">
                        <h4 title={item.name || item.title}>
                          {item.name || item.title || 'Unnamed Robot'}
                        </h4>
                        {(getDisplayName(item, 'manufacturer') || getDisplayName(item, 'countryOfOrigin')) && (
                          <p>
                            <span className="flaticon-placeholder"></span>
                            {getDisplayName(item, 'manufacturer') || getDisplayName(item, 'countryOfOrigin')}
                          </p>
                        )}
                        <a className="fp_price text-thm" href="#" onClick={(e) => e.preventDefault()}>
                          ${getPrice(item)}
                        </a>
                      </div>
                    </div>
                  </div>
                </td>

                <td>
                  {formatDate(item.createdAt)}
                </td>

                <td>
                  <span className={`status_tag ${item.status ? 'badge2' : 'badge'}`}>
                    {item.status ? "Active" : "Inactive"}
                  </span>
                </td>

                <td>
                  <ul className="view_edit_delete_list mb0">
                    <li
                      className="list-inline-item"
                      data-toggle="tooltip"
                      data-placement="top"
                      title="Edit"
                    >
                      <button 
                        onClick={() => editRobot(item._id)}
                        className="btn btn-link p-0"
                        disabled={deletingId === item._id}
                        aria-label={`Edit ${item.name || 'robot'}`}
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
                        onClick={() => deleteRobot(item._id)}
                        className="btn btn-link p-0 text-danger"
                        disabled={deletingId === item._id}
                        aria-label={`Delete ${item.name || 'robot'}`}
                      >
                        {deletingId === item._id ? (
                          <span className="spinner-border spinner-border-sm" role="status" aria-hidden="true"></span>
                        ) : (
                          <span className="flaticon-garbage"></span>
                        )}
                      </button>
                    </li>
                  </ul>
                </td>
              </tr>
            );
          })}
        </tbody>
      </table>
    </div>
  );
};

export default TableData;