"use client"; // Add this at the top
import Image from "next/image";
import { getCountryTableData, deleteCountryAPI } from "../../../api/country";
import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { toast } from "react-toastify";

const TableData = () => {
  const [countryList, setCountryList] = useState([]);
  const router = useRouter();

  const fetchCountryData = async () => {
    const data = await getCountryTableData();
    setCountryList(data);
  };

  const deleteCountry = async (id) => {
    const isConfirmed = window.confirm("Are you sure you want to delete this Country?");
    if (!isConfirmed) return;

    try {
      const data = await deleteCountryAPI(id);
      toast.success(data.message);
      setCountryList((prevCountryList) => prevCountryList.filter((country) => country._id !== id));
    } catch (error) {
      alert("Failed to delete Country.");
    }
  };

  let theadConent = ["Listing Title", "Date published", "Status", "Action"];

  let tbodyContent = countryList?.map((item) => (
    <tr key={item._id}>
      <td scope="row" className="align-middle text-center">
        <h4 className="mb-0">{item.title}</h4>
      </td>

      <td className="align-middle text-center">
        {new Date(item.createdAt).toLocaleDateString("en-US", {
          month: "short",
          day: "2-digit",
          year: "numeric",
        })}
      </td>

      <td className="align-middle text-center">
        <span className={`status_tag ${item.status ? "badge2" : "badge"}`}>
          {item.status ? "Active" : "Deactive"}
        </span>
      </td>

      <td className="align-middle text-center">
        <ul className="view_edit_delete_list mb0 d-flex justify-content-center">
          <li className="list-inline-item" title="Edit">
            <button onClick={() => router.push(`/cmsroboticlife/edit-country/${item._id}`)}>
              <span className="flaticon-edit"></span>
            </button>
          </li>
          <li className="list-inline-item" title="Delete">
            <a href="#" onClick={() => deleteCountry(item._id)}>
              <span className="flaticon-garbage"></span>
            </a>
          </li>
        </ul>
      </td>
    </tr>
  ));

  useEffect(() => {
    fetchCountryData();
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
