

"use client"; // Add this at the top
import Image from "next/image";
import properties from "../../../data/properties";
import { getPropertypageTableData,deletePropertypageAPI } from "../../../api/propertypage";
import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { toast } from 'react-toastify';

const TableData = () => {
  const [propertypageList, setPropertypageList] = useState([]);
      const router = useRouter();
    
      const fetchPropertypageData = async () => {
        const data = await getPropertypageTableData();
        setPropertypageList(data);
      };
      const deletePropertypage = async (id) => {
          const isConfirmed = window.confirm("Are you sure you want to delete this property page?");
          if (!isConfirmed) return;
      
          try {
            const data = await deletePropertypageAPI(id); // 🔹 Call the API function
            
            toast.success(data.message);
            setPropertypageList((prevPropertypageList) => prevPropertypageList.filter((propertypage) => propertypage._id !== id));
            //setTitle(""); // ✅ Reset input after success
          } catch (error) {
            alert("Failed to delete Property page.");
            //setError(error.message); // ❌ Show error if request fails
          }
        };
  let theadConent = [
    "Listing Title",
    "Date published",
    "Status",
    // "View",
    "Action",
  ];
  let tbodyContent = propertypageList?.map((item, index) => (
    <tr key={item.id}>
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

      {/* <td>2,345</td> */}
      {/* End td */}

      <td>
        <ul className="view_edit_delete_list mb0">
        <li
            className="list-inline-item"
            data-toggle="tooltip"
            data-placement="top"
            title="Edit"
          >
            <button  onClick={() => router.push(`/cmswegrow/edit-propertypage/${item._id}`)}>
              <span className="flaticon-edit"></span>
            </button>
          </li>
          {/* End li */}

          <li className="list-inline-item"
            data-toggle="tooltip"
            data-placement="top"
            title="Delete"
          >
            <a href="#"  onClick={() => deletePropertypage(item._id)}>
              <span className="flaticon-garbage"></span>
            </a>
          </li>
        </ul>
      </td>
      {/* End td */}
    </tr>
  ));
  useEffect(() => {
    fetchPropertypageData();
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
