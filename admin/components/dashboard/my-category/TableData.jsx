<<<<<<< HEAD
<<<<<<< HEAD
"use client"; // Add this at the top
import Image from "next/image";
import { getCategoryTableData,deleteCategoryAPI } from "@/api/category";
import { useState, useEffect } from "react";
=======
"use client";
import { SafeImage } from "../../../utils/imageUtils";
import { deleteCategoryAPI } from "@/api/category";
>>>>>>> ea24ee4 (Home page & admin panel fixed)
=======
"use client";
import Image from "next/image";
import { deleteCategoryAPI } from "@/api/category";
>>>>>>> 3c0733c34d124af768c936ac3903a1a50f4723cf
import { useRouter } from "next/navigation";
import { toast } from "react-toastify";

const TableData = ({ categoryList, setCategoryList }) => {
  const router = useRouter();

  const deleteCategory = async (id) => {
    const isConfirmed = window.confirm(
      "Are you sure you want to delete this Category?"
    );
    if (!isConfirmed) return;

    try {
      const data = await deleteCategoryAPI(id);
      toast.success(data.message);
      setCategoryList((prevList) =>
        prevList.filter((category) => category._id !== id)
      );
    } catch (error) {
      alert("Failed to delete Category.");
    }
  };

  let theadConent = [
    "Image",
    "Listing Title",
    "Date published",
    "Status",
    "Action",
  ];

  let tbodyContent = categoryList?.map((item) => (
    <tr key={item._id}>
<<<<<<< HEAD
<<<<<<< HEAD
      <td scope="row">
        <div className="feat_property list favorite_page style2">
          <div className="details">
            <div className="tc_content">
              <h4>{item.title}</h4>
              
            </div>
          </div>
=======
=======
>>>>>>> 3c0733c34d124af768c936ac3903a1a50f4723cf
      {/* Image */}
      <td className="align-middle text-center" style={{ width: 130 }}>
        <div
          className="thumb"
          style={{
            width: 100,
            height: 100,
            overflow: "hidden",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            margin: "0 auto",
            border: "1px solid #e5e5e5",
            borderRadius: "4px"
          }}
        >
<<<<<<< HEAD
          <SafeImage
            width={100}
            height={100}
            className="img-whp"
            src={item.logoImage}
            alt={`${item.name}`}
=======
          <Image
            width={100}
            height={100}
            className="img-whp"
            src={
              item.logoImage
                ? `${process.env.NEXT_PUBLIC_API_URL}${item.logoImage}`
                : `${process.env.NEXT_PUBLIC_API_URL}public/assets/images/thumbnail.webp`
            }
            alt={`${item.name}`}
            unoptimized
>>>>>>> 3c0733c34d124af768c936ac3903a1a50f4723cf
            style={{ 
              width: "100%",
              height: "100%",
              objectFit: "contain",
              objectPosition: "center"
            }}
          />
<<<<<<< HEAD
>>>>>>> ea24ee4 (Home page & admin panel fixed)
=======
>>>>>>> 3c0733c34d124af768c936ac3903a1a50f4723cf
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
                  router.push(`/cmsroboticlife/edit-category/${item._id}`)
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
                  deleteCategory(item._id);
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