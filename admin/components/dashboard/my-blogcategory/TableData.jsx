"use client";
import Image from "next/image";
import { getBlogcategoryTableData, deleteBlogcategoryAPI } from "../../../api/blogcategory";
import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { toast } from 'react-toastify';

const TableData = () => {
  const [blogCategoryList, setBlogCategoryList] = useState([]);
  const router = useRouter();

  const fetchBlogcategoryData = async () => {
    const data = await getBlogcategoryTableData();
    setBlogCategoryList(data);
  };

  const deleteBlogcategory = async (id) => {
    const isConfirmed = window.confirm("Are you sure you want to delete this Blog category?");
    if (!isConfirmed) return;

    try {
      const data = await deleteBlogcategoryAPI(id);
      toast.success(data.message);
      setBlogCategoryList((prevBlogCategoryList) => prevBlogCategoryList.filter((blogCategory) => blogCategory._id !== id));
    } catch (error) {
      alert("Failed to delete Blog.");
    }
  };

  let theadConent = ["Listing Title", "Date published", "Status", "Action"];

  let tbodyContent = blogCategoryList?.map((item) => (
    <tr key={item._id}>
      <td scope="row" className="align-middle text-center">
        <h4 className="mb-0">{item.name || item.title}</h4>
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
            <button onClick={() => router.push(`/cmsroboticlife/edit-blogcategory/${item._id}`)}>
              <span className="flaticon-edit"></span>
            </button>
          </li>
          <li className="list-inline-item" title="Delete">
            <a href="#" onClick={() => deleteBlogcategory(item._id)}>
              <span className="flaticon-garbage"></span>
            </a>
          </li>
        </ul>
      </td>
    </tr>
  ));

  useEffect(() => {
    fetchBlogcategoryData();
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
