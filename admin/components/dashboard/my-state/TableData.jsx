"use client"; // Add this at the top
import Image from "next/image";

import { getStateTableData,deleteStateAPI } from "../../../api/state";
import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { toast } from 'react-toastify';

// import moment from 'moment';

const TableData = () => {
   const [stateList, setStateList] = useState([]);
    const router = useRouter();
  
    const fetchStateData = async () => {
      const data = await getStateTableData();
      setStateList(data);
    };
    const deleteState = async (id) => {
        const isConfirmed = window.confirm("Are you sure you want to delete this State?");
        if (!isConfirmed) return;
    
        try {
          const data = await deleteStateAPI(id); // 🔹 Call the API function
          
          // alert(data.message);
          toast.success(data.message);
          setStateList((prevStateList) => prevStateList.filter((state) => state._id !== id));
          //setTitle(""); // ✅ Reset input after success
        } catch (error) {
          alert("Failed to delete State.");
          //setError(error.message); // ❌ Show error if request fails
        }
      };
  let theadConent = [
    "Listing Title",
    "Country",
    "Date published",
    "Status",
    "Action",
  ];

  let tbodyContent = stateList?.map((item) => (
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
      <td>{item.countryid?.title}</td>
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
            <button  onClick={() => router.push(`/cmswegrow/edit-state/${item._id}`)}>
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
            <a href="#"  onClick={() => deleteState(item._id)}>
              <span className="flaticon-garbage"></span>
            </a>
          </li>
        </ul>
      </td>
      {/* End td */}
    </tr>
  ));
useEffect(() => {
    fetchStateData();
  }, []); 
  
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
