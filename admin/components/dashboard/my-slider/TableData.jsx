"use client";
<<<<<<< HEAD
import { SafeImage } from "../../../utils/imageUtils";
=======
import Image from "next/image";
>>>>>>> 3c0733c34d124af768c936ac3903a1a50f4723cf
import { deleteSliderAPI } from "../../../api/slider";
import { useRouter } from "next/navigation";
import { toast } from "react-toastify";

const TableData = ({ sliders = [], loading = false, error = null, onRefresh }) => {
  const router = useRouter();

  const deleteSlider = async (id) => {
    const isConfirmed = window.confirm(
      "Are you sure you want to delete this Slider?"
    );
    if (!isConfirmed) return;

    try {
      const data = await deleteSliderAPI(id);
      toast.success(data.message);
      // Refresh the data after deletion
      if (onRefresh) {
        onRefresh();
      }
    } catch (error) {
      toast.error("Failed to delete Slider.");
    }
  };

  // Show loading state
  if (loading) {
    return (
      <div className="text-center py-5">
        <div className="spinner-border text-primary" role="status">
          <span className="visually-hidden">Loading...</span>
        </div>
        <p className="mt-2">Loading sliders...</p>
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
  if (!sliders || sliders.length === 0) {
    return (
      <div className="text-center py-5">
        <div className="alert alert-info" role="alert">
          <i className="fas fa-info-circle me-2"></i>
          No sliders found.
        </div>
      </div>
    );
  }

  let theadConent = [
    "Images",
    "Listing Title",
    "Date published",
    "Status",
    "Action",
  ];

  let tbodyContent = sliders.map((item) => (
    <tr key={item._id || Math.random()}>
      {/* Image */}
      <td className="align-middle text-center" style={{ width: 110 }}>
        <div
          className="thumb"
          style={{
            width: 90,
            height: 90,
            overflow: "hidden",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            margin: "0 auto",
          }}
        >
<<<<<<< HEAD
          <SafeImage
            width={90}
            height={90}
            className="img-whp cover"
            src={item?.images && item.images.length > 0 ? item.images[0] : null}
            alt={`${item?.title || 'Slider'}`}
=======
          <Image
            width={90}
            height={90}
            className="img-whp cover"
            src={
              item?.images && item.images.length > 0
                ? `${process.env.NEXT_PUBLIC_API_URL}${item.images[0]}`
                : `${process.env.NEXT_PUBLIC_API_URL}public/assets/images/thumbnail.webp`
            }
            alt={`${item?.title || 'Slider'}`}
            unoptimized
>>>>>>> 3c0733c34d124af768c936ac3903a1a50f4723cf
            style={{ width: "100%", height: "100%", objectFit: "contain" }}
          />
        </div>
      </td>

      {/* Listing Title */}
      <td className="align-middle text-start">
        <div
          style={{ display: "flex", alignItems: "center", height: "100%", minHeight: "90px", justifyContent: "center" }}
        >
          <h4 className="mb-0">{item?.title || 'N/A'}</h4>
        </div>
      </td>

      {/* Date Published */}
      <td className="align-middle text-center">
        <div
          style={{ display: "flex", alignItems: "center", height: "100%", justifyContent: "center" }}
        >
          {item?.createdAt ? new Date(item.createdAt).toLocaleDateString("en-US", {
            month: "short",
            day: "2-digit",
            year: "numeric",
          }) : 'N/A'}
        </div>
      </td>

      {/* Status */}
      <td className="align-middle text-center">
        <div
          style={{ display: "flex", alignItems: "center", height: "100%", justifyContent: "center" }}
        >
          <span
            className={`status_tag ${item?.status ? "badge2" : "badge"}`}
          >
            {item?.status ? "Active" : "Deactive"}
          </span>
        </div>
      </td>

      {/* Action */}
      <td className="align-middle text-center">
        <div
          style={{ display: "flex", alignItems: "center", height: "100%", justifyContent: "center" }}
        >
          <ul className="view_edit_delete_list mb0 d-flex justify-content-center">
            <li className="list-inline-item" title="Edit">
              <button onClick={() => router.push(`/cmsroboticlife/edit-slider/${item._id}`)}>
                <span className="flaticon-edit"></span>
              </button>
            </li>
            <li className="list-inline-item" title="Delete">
              <a href="#" onClick={() => deleteSlider(item._id)}>
                <span className="flaticon-garbage"></span>
              </a>
            </li>
          </ul>
        </div>
      </td>
    </tr>
  ));

  return (
    <>
      <table className="table">
        <thead className="thead-light">
          <tr>
            {theadConent.map((value, i) => (
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
