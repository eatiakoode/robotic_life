"use client";
import Image from "next/image";
import { deleteManufacturerAPI } from "@/api/manufacturer";
import { useRouter } from "next/navigation";
import { toast } from "react-toastify";

const TableData = ({ manufacturerList, setManufacturerList }) => {
  const router = useRouter();

  const deleteManufacturer = async (id) => {
    const isConfirmed = window.confirm(
      "Are you sure you want to delete this Manufacturer?"
    );
    if (!isConfirmed) return;

    try {
      const data = await deleteManufacturerAPI(id);
      toast.success(data.message);
      setManufacturerList((prevList) =>
        prevList.filter((manufacturer) => manufacturer._id !== id)
      );
    } catch (error) {
      alert("Failed to delete Manufacturer.");
    }
  };

  let theadConent = [
    "Image",
    "Listing Title",
    "Date published",
    "Status",
    "Action",
  ];

  let tbodyContent = manufacturerList?.map((item) => (
    <tr key={item._id}>
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
          <Image
            width={90}
            height={90}
            className="img-whp cover"
            src={
              item.logoImage
                ? `${process.env.NEXT_PUBLIC_API_URL}${item.logoImage}`
                : `${process.env.NEXT_PUBLIC_API_URL}public/assets/images/thumbnail.webp`
            }
            alt={`${item.name}`}
            unoptimized
            style={{ width: "100%", height: "100%", objectFit: "contain" }}
          />
        </div>
      </td>

      {/* Listing Title */}
      <td className="align-middle text-start">
        <div
          style={{ display: "flex", alignItems: "center", height: "100%", minHeight: "90px", justifyContent: "center" }}
        >
          <h4 className="mb-0">{item.name}</h4>
        </div>
      </td>

      {/* Date Published */}
      <td className="align-middle text-center">
        <div
          style={{ display: "flex", alignItems: "center", height: "100%", justifyContent: "center" }}
        >
          {new Date(item.createdAt).toLocaleDateString("en-US", {
            month: "short",
            day: "2-digit",
            year: "numeric",
          })}
        </div>
      </td>

      {/* Status */}
      <td className="align-middle text-center">
        <div
          style={{ display: "flex", alignItems: "center", height: "100%", justifyContent: "center" }}
        >
          <span
            className={`status_tag ${item.status ? "badge2" : "badge"}`}
          >
            {item.status ? "Active" : "Deactive"}
          </span>
        </div>
      </td>

      {/* Action */}
      <td className="align-middle text-center">
        <div
          style={{ display: "flex", alignItems: "center", justifyContent: "center", height: "100%" }}
        >
          <ul className="view_edit_delete_list mb0 d-flex">
            <li
              className="list-inline-item"
              data-toggle="tooltip"
              data-placement="top"
              title="Edit"
            >
              <button
                onClick={() =>
                  router.push(`/cmsroboticlife/edit-manufacturer/${item._id}`)
                }
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
              <a
                href="#"
                onClick={(e) => {
                  e.preventDefault();
                  deleteManufacturer(item._id);
                }}
              >
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
