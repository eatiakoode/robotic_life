"use client"; // Add this at the top
import Image from "next/image";
import { getFaqTableData,deleteFaqAPI } from "../../../api/faq";
import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";

// import moment from 'moment';
import { toast } from 'react-toastify';
const TableData = ({faqList,setFaqList}) => {
    const router = useRouter();
    
    // Debug: Log the FAQ data structure
    console.log('FAQ List Data:', faqList);
    const deleteFaq = async (id) => {
        const isConfirmed = window.confirm("Are you sure you want to delete this Faq?");
        if (!isConfirmed) return;
    
        try {
          const data = await deleteFaqAPI(id);
          
          // alert(data.message);
          toast.success(data.message);
          setFaqList((prevFaqList) => prevFaqList.filter((faq) => faq._id !== id));
          //setTitle(""); 
        } catch (error) {
          alert("Failed to delete Faq.");
          //setError(error.message); // 
        }
      };
  let theadConent = [
    "Listing Title",
    "Date published",
    "Status",
    "Action",
  ];
  let tbodyContent =faqList?.slice(0, 10)?.map((item) => (
    <tr key={item._id} style={{ height: '60px' }}>
      <td scope="row" style={{ verticalAlign: 'middle', padding: '12px 8px' }}>
        <div className="feat_robot list favorite_page style2">
          <div className="details">
            <div className="tc_content">
              <h4 style={{ fontSize: '14px', fontWeight: '600', color: '#333', margin: 0 }}>
                {item.title || 'No Title'}
              </h4>
            </div>
          </div>
        </div>
      </td>
      {/* End td */}

      <td style={{ verticalAlign: 'middle', textAlign: 'center', padding: '12px 8px' }}>
        <div style={{ fontSize: '12px', color: '#666' }}>
          {item.createdAt ? new Date(item.createdAt).toLocaleDateString('en-US', {
            month: 'short',
            day: '2-digit',
            year: 'numeric',
          }) : 'N/A'}
        </div>
      </td>
      {/* End td */}

      <td style={{ verticalAlign: 'middle', textAlign: 'center', padding: '12px 8px' }}>
        <span className={`status_tag ${item.status === true ? 'badge2' : 'badge'}`}>
          {item.status === true ? "Active" : "Deactive"}
        </span>
      </td>
      {/* End td */}

      <td style={{ verticalAlign: 'middle', textAlign: 'center', padding: '12px 8px' }}>
        <ul className="view_edit_delete_list mb0">
          <li
            className="list-inline-item"
            data-toggle="tooltip"
            data-placement="top"
            title="Edit"
          >
            <button 
              onClick={() => router.push(`/cmsthebotsworld/edit-faq/${item._id}`)}
              style={{
                background: 'none',
                border: 'none',
                cursor: 'pointer',
                padding: '4px',
                borderRadius: '4px',
                color: '#007bff'
              }}
            >
              <span className="flaticon-edit" style={{ fontSize: '16px' }}></span>
            </button>
          </li>
          {/* End li */}

          <li
            className="list-inline-item"
            data-toggle="tooltip"
            data-placement="top"
            title="Delete"
          >
            <button 
              onClick={() => deleteFaq(item._id)}
              style={{
                background: 'none',
                border: 'none',
                cursor: 'pointer',
                padding: '4px',
                borderRadius: '4px',
                color: '#dc3545'
              }}
            >
              <span className="flaticon-garbage" style={{ fontSize: '16px' }}></span>
            </button>
          </li>
        </ul>
      </td>
      {/* End td */}
    </tr>
  ));
// useEffect(() => {
//     fetchFaqData();
//   }, []); 
  return (
    <>
      <table className="table" style={{
        tableLayout: 'fixed',
        borderCollapse: 'collapse',
        width: '100%',
        backgroundColor: '#fff'
      }}>
        <thead className="thead-light">
          <tr>
            {theadConent.map((value, i) => (
              <th 
                scope="col" 
                key={i}
                style={{
                  verticalAlign: 'middle',
                  textAlign: i === 0 ? 'left' : 'center',
                  fontWeight: '600',
                  fontSize: '14px',
                  padding: '15px 12px',
                  borderBottom: '2px solid #e9ecef',
                  backgroundColor: '#f8f9fa',
                  color: '#495057'
                }}
              >
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
