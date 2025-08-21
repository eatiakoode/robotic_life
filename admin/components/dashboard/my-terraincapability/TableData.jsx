"use client";
import Image from "next/image";
import { getTerrainCapabilityTableData, deleteTerrainCapabilityAPI } from "../../../api/terrain";
import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { toast } from 'react-toastify';

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
      const data = await deleteTerrainCapabilityAPI(id);
      toast.success(data.message);
      setTerrainCapabilityList((prevTerrainCapabilityList) => prevTerrainCapabilityList.filter((terrainCapability) => terrainCapability._id !== id));
    } catch (error) {
      alert("Failed to delete Terrain Capability.");
    }
  };

  let theadContent = ["Listing Title", "Date published", "Status", "Action"];

  let tbodyContent = terrainCapabilityList?.map((item) => (
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
            <button onClick={() => router.push(`/cmsroboticlife/edit-terraincapability/${item._id}`)}>
              <span className="flaticon-edit"></span>
            </button>
          </li>
          <li className="list-inline-item" title="Delete">
            <a href="#" onClick={() => deleteTerrainCapability(item._id)}>
              <span className="flaticon-garbage"></span>
            </a>
          </li>
        </ul>
      </td>
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
