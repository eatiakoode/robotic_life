"use client";
import Image from "next/image";
import { getCommunicationMethodTableData, deleteCommunicationMethodAPI } from "@/api/communicationmethod";
import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { toast } from 'react-toastify';

const TableData = () => {
  const [communicationMethodList, setCommunicationMethodList] = useState([]);
  const router = useRouter();


  const fetchCommunicationMethodData = async () => {
    const data = await getCommunicationMethodTableData();
    setCommunicationMethodList(data);
  };

  const deleteCommunicationMethod = async (id) => {
    const isConfirmed = window.confirm("Are you sure you want to delete this Communication Method?");
    if (!isConfirmed) return;

    try {
      const data = await deleteCommunicationMethodAPI(id);
      toast.success(data.message);
      setCommunicationMethodList((prevCommunicationMethodList) => prevCommunicationMethodList.filter((communicationMethod) => communicationMethod._id !== id));
    } catch (error) {
      alert("Failed to delete Communication Method.");
    }
  };

  let theadContent = ["Listing Title", "Date published", "Status", "Action"];

  let tbodyContent = communicationMethodList?.map((item) => (
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
            <button onClick={() => router.push(`/cmswegrow/edit-communicationmethod/${item._id}`)}>
              <span className="flaticon-edit"></span>
            </button>
          </li>
          <li className="list-inline-item" title="Delete">
            <a href="#" onClick={() => deleteCommunicationMethod(item._id)}>
              <span className="flaticon-garbage"></span>
            </a>
          </li>
        </ul>
      </td>
    </tr>
  ));

  useEffect(() => {
    fetchCommunicationMethodData();
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
