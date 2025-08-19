"use client"; // Add this at the top
import Image from "next/image";
import { getTerrainCapabilityTableData,deleteTerrainCapabilityAPI } from "../../../api/terrain";
import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { toast } from 'react-toastify';
// import moment from 'moment';

const TableData = () => {
   const [terrainCapabilityList, setTerrainCapabilityList] = useState([]);
    const router = useRouter();
  
    const fetchTerrainCapabilityData = async () => {
      const data = await getTerrainCapabilityTableData();
      setTerrainCapabilityList(data);
    };
    const deleteTerrainCapability = async (id) => {
        const isConfirmed = window.confirm("Are you sure you want to delete this Terrain Capability?");
        if (!isConfirmed) return;
    
        try {
          const data = await deleteTerrainCapabilityAPI(id); // 🔹 Call the API function

          // alert(data.message);
          toast.success(data.message);
          setTerrainCapabilityList((prevTerrainCapabilityList) => prevTerrainCapabilityList.filter((terrainCapability) => terrainCapability._id !== id));
          //setTitle(""); // ✅ Reset input after success
        } catch (error) {
          alert("Failed to delete Terrain Capability.");
          //setError(error.message); // ❌ Show error if request fails
        }
      };
  let theadConent = [
    "Listing Title",
    "Date published",
    "Status",
    "Action",
  ];
  let tbodyContent = terrainCapabilityList?.map((item) => (
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
            <button  onClick={() => router.push(`/cmswegrow/edit-country/${item._id}`)}>
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
            <a href="#"  onClick={() => deleteTerrainCapability(item._id)}>
              <span className="flaticon-garbage"></span>
            </a>
          </li>
        </ul>
      </td>
      {/* End td */}
    </tr>
  ));
useEffect(() => {
    fetchTerrainCapabilityData();
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
