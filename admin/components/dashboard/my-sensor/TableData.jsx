"use client";
import Image from "next/image";
import { getSensorTableData, deleteSensorAPI } from "../../../api/sensor";
import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { toast } from 'react-toastify';

const TableData = () => {
  const [sensorList, setSensorList] = useState([]);
  const router = useRouter();

  const fetchSensorData = async () => {
    const data = await getSensorTableData();
    setSensorList(data);
  };

  const deleteSensor = async (id) => {
    const isConfirmed = window.confirm("Are you sure you want to delete this Sensor?");
    if (!isConfirmed) return;

    try {
      const data = await deleteSensorAPI(id);
      toast.success(data.message);
      setSensorList((prevSensorList) => prevSensorList.filter((sensor) => sensor._id !== id));
    } catch (error) {
      alert("Failed to delete Sensor.");
    }
  };

  let theadContent = ["Listing Title", "Date published", "Status", "Action"];

  let tbodyContent = sensorList?.map((item) => (
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
            <button onClick={() => router.push(`/cmswegrow/edit-sensor/${item._id}`)}>
              <span className="flaticon-edit"></span>
            </button>
          </li>
          <li className="list-inline-item" title="Delete">
            <a href="#" onClick={() => deleteSensor(item._id)}>
              <span className="flaticon-garbage"></span>
            </a>
          </li>
        </ul>
      </td>
    </tr>
  ));

  useEffect(() => {
    fetchSensorData();
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
