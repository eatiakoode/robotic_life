"use client";
import Image from "next/image";
import { getColorTableData, deleteColorAPI } from "../../../api/color";
import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { toast } from 'react-toastify';

const TableData = () => {
  const [colorList, setColorList] = useState([]);
  const router = useRouter();

  const fetchColorData = async () => {
    const data = await getColorTableData();
    setColorList(data);
  };

  const deleteColor = async (id) => {
    const isConfirmed = window.confirm("Are you sure you want to delete this Color?");
    if (!isConfirmed) return;

    try {
      const data = await deleteColorAPI(id);
      toast.success(data.message);
      setColorList((prevColorList) => prevColorList.filter((color) => color._id !== id));
    } catch (error) {
      alert("Failed to delete Color.");
    }
  };

  let theadConent = ["Listing Title", "Date published", "Status", "Action"];

  let tbodyContent = colorList?.map((item) => (
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
            <button onClick={() => router.push(`/cmsroboticlife/edit-color/${item._id}`)}>
              <span className="flaticon-edit"></span>
            </button>
          </li>
          <li className="list-inline-item" title="Delete">
            <a href="#" onClick={() => deleteColor(item._id)}>
              <span className="flaticon-garbage"></span>
            </a>
          </li>
        </ul>
      </td>
    </tr>
  ));

  useEffect(() => {
    fetchColorData();
  }, []);

  return (
    <>
      <table className="table">
        <thead className="thead-light">
          <tr>
            {theadConent.map((value, i) => (
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
