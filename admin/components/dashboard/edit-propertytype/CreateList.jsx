"use client"; 

import { useEffect, useState } from "react";
import { useRouter, useParams } from "next/navigation";
import { getPropertytypeById, updatePropertytypeAPI } from "../../../api/propertytype";

import { getCategoryTableData } from "../../../api/category";
import { toast } from 'react-toastify';

const CreateList = () => {
  const params = useParams();
  
    const id = params?.id;
  
    const router = useRouter();
    const [propertytype, setPropertytype] = useState({ title: "", status: false });
    const [loading, setLoading] = useState(true);
    const [categories, setCategories] = useState([]);
  const [selectedCategory, setSelectedCategory] = useState("");
  
    useEffect(() => {
      if (!id) return;
      
      const fetchPropertytype = async () => {
        try {
          const data = await getPropertytypeById(id);
          setPropertytype({ title: data.data.title, status: data.data.status });
          setSelectedCategory(data.data.categoryid);
        } catch (error) {
          console.error("Error fetching Property type:", error);
        } finally {
          setLoading(false);
        }
      };
  
      fetchPropertytype();
      const fetchCategories = async () => {
        try {
          const filter = {
            limit: 1000,
            page:  1
          }
          const response = await getCategoryTableData(filter);
  
          setCategories(response.items || []);
        } catch (err) {
          console.error("Error fetching Category:", err);
        }
      };
  
      fetchCategories();
    }, [id]);
  
    const handleSubmit = async (e) => {
      e.preventDefault();
      try {
        const updatedPropertytype = {
          ...propertytype,
          categoryid: selectedCategory,
        };
        const data =await updatePropertytypeAPI(id, updatedPropertytype);
        // alert("Propertytype updated successfully!");
        // router.push("/cmswegrow/my-propertytype");
        toast.success(data.message);
        if(data.status=="success"){
            setTimeout(() => {
            router.push("/cmswegrow/my-propertytype");
            }, 1500); 
          }
      } catch (error) {
        alert("Failed to update Propertytype.");
        console.error(error);
      }
    };
  
    const handleChange = (e) => {
      setPropertytype((prev) => ({ ...prev, [e.target.name]: e.target.value }));
    };
  
    const handleStatusChange = () => {
      setPropertytype((prev) => ({ ...prev, status: !prev.status }));
    };
    const handleCategoryChange = (e) => {
      setSelectedCategory(e.target.value);
    };
  
    if (loading) return <p>Loading...</p>;
  return (
    <>
    <form onSubmit={handleSubmit} className="row">
      <div className="col-lg-6 col-xl-6">
        <div className="my_profile_setting_input form-group">
          <label htmlFor="propertytypeTitle">Property type Title</label>
          <input
        type="text"
        className="form-control"
        id="propertytypeTitle"
        name="title"
        value={propertytype.title}
        onChange={handleChange}
      />
        </div>
      </div>
      {/* End .col */}
      <div className="col-lg-6 col-xl-6">
          <div className="my_profile_setting_input ui_kit_select_search form-group">
            <label htmlFor="categorySelect">Select Category</label>
            <select
              id="categorySelect"
              className="selectpicker form-select"
              value={selectedCategory}
              onChange={handleCategoryChange}
              data-live-search="true"
              data-width="100%"
            >
              <option value="">-- Select Category --</option>
              {categories.map((category) => (
                <option key={category._id} value={category._id}>
                  {category.title}
                </option>
              ))}
            </select>
          </div>
        </div>

      <div className="col-lg-6 col-xl-6">
        <div className="my_profile_setting_input ui_kit_select_search form-group">
          <label>Status</label>
          <select
        className="selectpicker form-select"
        data-live-search="true"
        data-width="100%"
        value={propertytype.status ? "active" : "deactive"}
        onChange={(e) =>
          setPropertytype((prev) => ({
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
          <button className="btn btn1 float-start" type="button"  onClick={() => window.location.href = '/cmswegrow/my-propertytype'}>Back</button>
          <button className="btn btn2 float-end">Submit</button>
        </div>
      </div>
      </form>
    </>
  );
};

export default CreateList;
