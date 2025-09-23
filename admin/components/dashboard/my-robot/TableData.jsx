"use client";
import { SafeImage } from "../../../utils/imageUtils";
import { deleteRobotAPI } from "../../../api/robot";
import { useRouter } from "next/navigation";
import { toast } from 'react-toastify';
import { useState, useCallback } from "react";

const TableData = ({ robots = [], loading = false, error = null, onRefresh }) => {
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
      
      // Refresh the data after deletion
      if (onRefresh) {
        onRefresh();
      }
      
    } catch (error) {
      console.error('Delete error:', error);
      toast.error(error.message || "Failed to delete Robot.");
    } finally {
      setDeletingId(null);
    }
  }, [deletingId, onRefresh]);

  // Memoized edit function
  const editRobot = useCallback((id) => {
    router.push(`/cmsthebotsworld/edit-robot/${id}`);
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
    } else if (item.images) {
      // Fallback to images field (capital I) if it exists
      imageUrl = typeof item.images === 'object' ? item.images.url : item.images;
    } else if (item.images) {
      // Fallback to image field (lowercase) if it exists
      imageUrl = typeof item.images === 'object' ? item.images.url : item.images;
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



  // Get price helper
  const getPrice = useCallback((item) => {
    return item.totalPrice || item.price || 0;
  }, []);

  const theadContent = [
    "Image",
    "Listing Title",
    "Date Published", 
    "Status",
    "Actions",
  ];

  // Show loading state
  if (loading) {
    return (
      <div className="text-center py-5">
        <div className="spinner-border text-primary" role="status">
          <span className="visually-hidden">Loading...</span>
        </div>
        <p className="mt-2">Loading robots...</p>
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
  if (!robots || robots.length === 0) {
    return (
      <div className="text-center py-5">
        <div className="alert alert-info" role="alert">
          <i className="fas fa-info-circle me-2"></i>
          No robots found.
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
                                 {/* Image */}
                 <td className="align-middle text-start" style={{ width: 130 }}>
                   <div
                     className="thumb"
                     style={{
                       width: 100,
                       height: 100,
                       overflow: "hidden",
                       display: "flex",
                       alignItems: "center",
                       justifyContent: "center",
                       border: "1px solid #e5e5e5",
                       borderRadius: "4px"
                     }}
                   >
                     <SafeImage
                       width={100}
                       height={100}
                       className="img-whp"
                       src={item.images?.[0] || item.images?.url || item.images}
                       alt={item.name || item.title || 'Robot Image'}
                       style={{ 
                         width: "100%",
                         height: "100%",
                         objectFit: "contain",
                         objectPosition: "center"
                       }}
                     />
                   </div>
                 </td>

                                   {/* Listing Title */}
                  <td className="align-middle text-start">
                    <div
                      style={{ display: "flex", alignItems: "center", height: "100%", minHeight: "90px", justifyContent: "flex-start" }}
                    >
                      <h4 className="mb-0">{item.name || item.title || 'Unnamed Robot'}</h4>
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
                   </div>
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