"use client";
import Image from "next/image";
import { getAutonomyLevelTableData, deleteAutonomyLevelAPI } from "../../../api/autonomylevel";
import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { toast } from 'react-toastify';

const TableData = () => {
  const [autonomyLevelList, setAutonomyLevelList] = useState([]);
  const router = useRouter();

  const fetchAutonomyLevelData = async () => {
    const data = await getAutonomyLevelTableData();
    setAutonomyLevelList(data);
  };

  const deleteAutonomyLevel = async (id) => {
    const isConfirmed = window.confirm("Are you sure you want to delete this Autonomy Level?");
    if (!isConfirmed) return;

    try {
      const data = await deleteAutonomyLevelAPI(id);
      toast.success(data.message);
    setAutonomyLevelList((prevAutonomyLevelList) => prevAutonomyLevelList.filter((autonomyLevel) => autonomyLevel._id !== id));
    } catch (error) {
      alert("Failed to delete Autonomy Level.");
    }
  };

  let theadContent = ["Listing Title", "Date published", "Status", "Action"];

  let tbodyContent = autonomyLevelList?.map((item) => (
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
            <button onClick={() => router.push(`/cmswegrow/edit-autonomylevel/${item._id}`)}>
              <span className="flaticon-edit"></span>
            </button>
          </li>
          <li className="list-inline-item" title="Delete">
            <a href="#" onClick={() => deleteAutonomyLevel(item._id)}>
              <span className="flaticon-garbage"></span>
            </a>
          </li>
        </ul>
      </td>
    </tr>
  ));

  useEffect(() => {
    fetchAutonomyLevelData();
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
