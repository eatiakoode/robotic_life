"use client";
import Image from "next/image";
import { getPayloadTypeTableData, deletePayloadTypeAPI } from "@/api/payloadtype";
import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { toast } from 'react-toastify';

const TableData = () => {
  const [payloadTypeList, setPayloadTypeList] = useState([]);
  const router = useRouter();


  const fetchPayloadTypeData = async () => {
    const data = await getPayloadTypeTableData();
    setPayloadTypeList(data);
  };

  const deletePayloadType = async (id) => {
    const isConfirmed = window.confirm("Are you sure you want to delete this Payload Type?");
    if (!isConfirmed) return;

    try {
      const data = await deletePayloadTypeAPI(id);
      toast.success(data.message);
      setPayloadTypeList((prevPayloadTypeList) => prevPayloadTypeList.filter((payloadType) => payloadType._id !== id));
    } catch (error) {
      alert("Failed to delete Payload Type.");
    }
  };

  let theadContent = ["Listing Title", "Date published", "Status", "Action"];

  let tbodyContent = payloadTypeList?.map((item) => (
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
            <button onClick={() => router.push(`/cmswegrow/edit-payloadtype/${item._id}`)}>
              <span className="flaticon-edit"></span>
            </button>
          </li>
          <li className="list-inline-item" title="Delete">
            <a href="#" onClick={() => deletePayloadType(item._id)}>
              <span className="flaticon-garbage"></span>
            </a>
          </li>
        </ul>
      </td>
    </tr>
  ));

  useEffect(() => {
    fetchPayloadTypeData();
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
