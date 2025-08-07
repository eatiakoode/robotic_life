"use client"; // Add this at the top
import Image from "next/image";

import { getPropertytypeTableData,deletePropertytypeAPI } from "../../../api/propertytype";
import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { toast } from 'react-toastify';
// import moment from 'moment';

const TableData = ({propertytypeList,setPropertytypeList}) => {
    const router = useRouter();
  
    const deletePropertytype = async (id) => {
        const isConfirmed = window.confirm("Are you sure you want to delete this propertytype?");
        if (!isConfirmed) return;
    
        try {
          const data = await deletePropertytypeAPI(id); // 🔹 Call the API function
          
          // alert(data.message);
          toast.success(data.message);
          setPropertytypeList((prevPropertytypeList) => prevPropertytypeList.filter((propertytype) => propertytype._id !== id));
          //setTitle(""); // ✅ Reset input after success
        } catch (error) {
          alert("Failed to delete Property type.");
          //setError(error.message); // ❌ Show error if request fails
        }
      };
  let theadConent = [
    "Listing Title",
    "category",
    "Date published",
    "Status",
    "Action",
  ];
 

  let tbodyContent = propertytypeList?.map((item) => (
    <tr key={item._id}>
      <td scope="row">
        <div className="feat_property list favorite_page style2">
          <div className="details">
            <div className="tc_content">
              <h4>{item.title}</h4>
              
            </div>
          </div>
        </div>
      </td>
      {/* End td */}
      <td>{item.categoryid?.title}</td>
      <td>{new Date(item.createdAt).toLocaleDateString('en-US', {
    month: 'short',
    day: '2-digit',
    year: 'numeric',
  })}</td>
      {/* End td */}
      

      <td>
      
        <span className={`status_tag ${item.status ? 'badge2' : 'badge'}`}>{item.status ? "Active" : "Deactive"}</span>

      </td>
      {/* End td */}

     

      <td>
        <ul className="view_edit_delete_list mb0">
          <li
            className="list-inline-item"
            data-toggle="tooltip"
            data-placement="top"
            title="Edit"
          >
            <button  onClick={() => router.push(`/cmswegrow/edit-propertytype/${item._id}`)}>
              <span className="flaticon-edit"></span>
            </button>
          </li>
          {/* End li */}

          <li
            className="list-inline-item"
            data-toggle="tooltip"
            data-placement="top"
            title="Delete"
          >
            <a href="#"  onClick={() => deletePropertytype(item._id)}>
              <span className="flaticon-garbage"></span>
            </a>
          </li>
        </ul>
      </td>
      {/* End td */}
    </tr>
  ));
// useEffect(() => {
//     fetchPropertytypeData();
//   }, []); 
  
  return (
    <>
      <table className="table">
        <thead className="thead-light">
          <tr>
            {theadConent.map((value, i) => (
              <th scope="col" key={i}>
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
