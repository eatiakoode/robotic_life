"use client"; // Add this at the top
import Image from "next/image";
import { getNavigationTypeTableData,deleteNavigationTypeAPI } from "../../../api/navigationtype";
import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { toast } from 'react-toastify';
// import moment from 'moment';

const TableData = () => {
   const [navigationTypeList, setNavigationTypeList] = useState([]);
    const router = useRouter();
  
    const fetchNavigationTypeData = async () => {
      const data = await getNavigationTypeTableData();
      setNavigationTypeList(data);
    };
    const deleteNavigationType = async (id) => {
        const isConfirmed = window.confirm("Are you sure you want to delete this Navigation Type?");
        if (!isConfirmed) return;
    
        try {
          const data = await deleteNavigationTypeAPI(id); // 🔹 Call the API function

          // alert(data.message);
          toast.success(data.message);
          setNavigationTypeList((prevNavigationTypeList) => prevNavigationTypeList.filter((navigationType) => navigationType._id !== id));
          //setTitle(""); // ✅ Reset input after success
        } catch (error) {
          alert("Failed to delete Navigation Type.");
          //setError(error.message); // ❌ Show error if request fails
        }
      };
  let theadConent = [
    "Listing Title",
    "Date published",
    "Status",
    "Action",
  ];
  let tbodyContent = navigationTypeList?.map((item) => (
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
            <button  onClick={() => router.push(`/cmswegrow/edit-navigationtype/${item._id}`)}>
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
            <a href="#"  onClick={() => deleteNavigationType(item._id)}>
              <span className="flaticon-garbage"></span>
            </a>
          </li>
        </ul>
      </td>
      {/* End td */}
    </tr>
  ));
useEffect(() => {
    fetchNavigationTypeData();
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
