"use client";
import Image from "next/image";
import { getNavigationTypeTableData, deleteNavigationTypeAPI } from "../../../api/navigationtype";
import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { toast } from 'react-toastify';

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
      const data = await deleteNavigationTypeAPI(id);
      toast.success(data.message);
      setNavigationTypeList((prevNavigationTypeList) => prevNavigationTypeList.filter((navigationType) => navigationType._id !== id));
    } catch (error) {
      alert("Failed to delete Navigation Type.");
    }
  };

  let theadContent = ["Listing Title", "Date published", "Status", "Action"];

  let tbodyContent = navigationTypeList?.map((item) => (
    <tr key={item._id}>
      <td scope="row" className="align-middle text-center">
        <h4 className="mb-0">{item.name}</h4>
      </td>

      <td className="align-middle text-center">
        {new Date(item.createdAt).toLocaleDateString('en-US', {
          month: 'short',
          day: '2-digit',
          year: 'numeric',
        })}
      </td>

      <td className="align-middle text-center">
        <span className={`status_tag ${item.status ? 'badge2' : 'badge'}`}>
          {item.status ? "Active" : "Deactive"}
        </span>
      </td>

      <td className="align-middle text-center">
        <ul className="view_edit_delete_list mb0 d-flex justify-content-center">
          <li className="list-inline-item" title="Edit">
            <button onClick={() => router.push(`/cmswegrow/edit-navigationtype/${item._id}`)}>
              <span className="flaticon-edit"></span>
            </button>
          </li>
          <li className="list-inline-item" title="Delete">
            <a href="#" onClick={() => deleteNavigationType(item._id)}>
              <span className="flaticon-garbage"></span>
            </a>
          </li>
        </ul>
      </td>
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
            {theadContent.map((value, i) => (
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
