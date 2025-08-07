"use client"; 

import { useEffect, useState } from "react";
import { useRouter, useParams } from "next/navigation";
import { getSellerById, updateSellerAPI } from "@/api/seller";
import { toast } from 'react-toastify';


const CreateList = () => {
  const params = useParams();
  
    const id = params?.id;
  
    const router = useRouter();
    const [seller, setSeller] = useState({ title: "",email: "",phone: "", status: false });
    const [loading, setLoading] = useState(true);
  
    useEffect(() => {
      if (!id) return;
      
      const fetchSeller = async () => {
        try {
          const data = await getSellerById(id);
          setSeller({ title: data.data.title,email: data.data.email,phone: data.data.phone, status: data.data.status });
        } catch (error) {
          console.error("Error fetching Seller:", error);
        } finally {
          setLoading(false);
        }
      };
  
      fetchSeller();
    }, [id]);
  
    const handleSubmit = async (e) => {
      e.preventDefault();
      try {
        const data=await updateSellerAPI(id, seller);
        toast.success(data.message);
        // if(res.status=="success"){
        //   router.push("/cmswegrow/my-seller");
        // }
        
      if(data.status=="success"){
        setTimeout(() => {
          router.push("/cmswegrow/my-seller");
          }, 1500); 
      }
        // alert("Seller updated successfully!");
        // router.push("/cmswegrow/my-seller");
      } catch (error) {
        alert("Failed to update Seller.");
        console.error(error);
      }
    };
  
    const handleChange = (e) => {
      setSeller((prev) => ({ ...prev, [e.target.name]: e.target.value, [e.target.email]: e.target.value, [e.target.phone]: e.target.value }));
    };
  
    const handleStatusChange = () => {
      setSeller((prev) => ({ ...prev, status: !prev.status }));
    };
  
    if (loading) return <p>Loading...</p>;
  return (
    <>
    <form onSubmit={handleSubmit} className="row">
      <div className="col-lg-6 col-xl-6">
        <div className="my_profile_setting_input form-group">
          <label htmlFor="sellerTitle">Seller Name</label>
          <input
        type="text"
        className="form-control"
        id="sellerTitle"
        name="title"
        value={seller.title}
        onChange={handleChange}
      />
        </div>
      </div>
      {/* End .col */}
      <div className="col-lg-6 col-xl-6">
        <div className="my_profile_setting_input form-group">
          <label htmlFor="sellerEmail">Seller Email</label>
          <input type="text" className="form-control" id="sellerEmail" name="email"  value={seller.email} onChange={handleChange} />
         
        </div>
      </div>
      {/* End .col */}

      <div className="col-lg-6 col-xl-6">
        <div className="my_profile_setting_input form-group">
          <label htmlFor="sellerPhone">Seller Phone</label>
          <input type="text" className="form-control" id="sellerPhone" name="phone"  value={seller.phone} onChange={handleChange} />
          
        </div>
      </div>
      {/* End .col */}

      <div className="col-lg-6 col-xl-6">
        <div className="my_profile_setting_input ui_kit_select_search form-group">
          <label>Status</label>
          <select
        className="selectpicker form-select"
        data-live-search="true"
        data-width="100%"
        value={seller.status ? "active" : "deactive"}
        onChange={(e) =>
          setSeller((prev) => ({
            ...prev,
            status: e.target.value === "active",
          }))
        }
      >
        <option value="active">Active</option>
        <option value="deactive">Deactive</option>
      </select>
        </div>
      </div>
      {/* End .col */}

     


      <div className="col-xl-12">
        <div className="my_profile_setting_input">
          <button className="btn btn1 float-start" type="button" onClick={() => window.location.href = '/cmswegrow/my-seller'}>Back</button>
          <button className="btn btn2 float-end">Submit</button>
        </div>
      </div>
      </form>
    </>
  );
};

export default CreateList;
