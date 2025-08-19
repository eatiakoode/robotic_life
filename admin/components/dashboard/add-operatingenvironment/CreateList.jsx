"use client";

import { useState } from "react";
<<<<<<<< HEAD:admin/components/dashboard/add-operatingenvironment/CreateList.jsx
import { addOperatingEnvironmentAPI } from "@/api/operatingenvironment";
========
import { addAISoftwareFeatureAPI } from "@/api/aisoftwarefeature";
>>>>>>>> 92333783ffb764a2e89a615bfb6fe29b6c3d661a:admin/components/dashboard/add-aisoftwarefeature/CreateList.jsx
import { useRouter, useParams } from "next/navigation";
import { toast } from 'react-toastify';
const CreateList = () => {
   const [title, setTitle] = useState("");
    const [error, setError] = useState("");
    const router = useRouter();
    const [isSubmitting, setisSubmitting] = useState("");
  
    const handleTitleChange = (e) => {
      setTitle(e.target.value);
  
      // ✅ Clear the error when user starts typing
      if (e.target.value.trim() !== "") {
        setError("");
      }
    };

<<<<<<<< HEAD:admin/components/dashboard/add-operatingenvironment/CreateList.jsx
    const addOperatingEnvironment = async (e) => {
========
    const addAISoftwareFeature = async (e) => {
>>>>>>>> 92333783ffb764a2e89a615bfb6fe29b6c3d661a:admin/components/dashboard/add-aisoftwarefeature/CreateList.jsx

      e.preventDefault();
      setisSubmitting(true)
  
      if (!title.trim()) {
        setError("Title is required");
        return;
      }
      // alert("testw")
      setError("");
      
      try {
<<<<<<<< HEAD:admin/components/dashboard/add-operatingenvironment/CreateList.jsx
        const data = await addOperatingEnvironmentAPI(title); // 🔹 Call the API function
========
        const data = await addAISoftwareFeatureAPI(title); 
>>>>>>>> 92333783ffb764a2e89a615bfb6fe29b6c3d661a:admin/components/dashboard/add-aisoftwarefeature/CreateList.jsx

        toast.success(data.message);
        if(data.status=="success"){
          setTimeout(() => {
<<<<<<<< HEAD:admin/components/dashboard/add-operatingenvironment/CreateList.jsx
          router.push("/cmswegrow/my-operatingenvironment");
========
          router.push("/cmswegrow/my-aisoftwarefeature");
>>>>>>>> 92333783ffb764a2e89a615bfb6fe29b6c3d661a:admin/components/dashboard/add-aisoftwarefeature/CreateList.jsx
          }, 1500); 
        }
  
        setTitle("");
      } catch (error) {
        setError(error.message);
      }
    };
  return (
    <>
<<<<<<<< HEAD:admin/components/dashboard/add-operatingenvironment/CreateList.jsx
    <form onSubmit={addOperatingEnvironment} className="row">
      <div className="col-lg-6 col-xl-6">
        <div className="my_profile_setting_input form-group">
          <label htmlFor="operatingEnvironmentTitle">Operating Environment Title</label>
          <input type="text" className="form-control" id="operatingEnvironmentTitle" value={title} onChange={handleTitleChange} />
========
    <form onSubmit={addAISoftwareFeature} className="row">
      <div className="col-lg-6 col-xl-6">
        <div className="my_profile_setting_input form-group">
          <label htmlFor="featureTitle">AI/Software Feature Title</label>
          <input type="text" className="form-control" id="featureTitle" value={title} onChange={handleTitleChange} />
>>>>>>>> 92333783ffb764a2e89a615bfb6fe29b6c3d661a:admin/components/dashboard/add-aisoftwarefeature/CreateList.jsx
          {error && <p className="text-red-500 text-sm mt-1">{error}</p>}
        </div>
      </div>
      {/* End .col */}

      <div className="col-lg-6 col-xl-6 d-none">
        <div className="my_profile_setting_input ui_kit_select_search form-group">
          <label>Status</label>
          <select
            className="selectpicker form-select"
            data-live-search="true"
            data-width="100%"
          >
            <option data-tokens="1">Active</option>
            <option data-tokens="2">Deactive</option>
          </select>
        </div>
      </div>
      {/* End .col */}

     


      <div className="col-xl-12">
        <div className="my_profile_setting_input">
          <button className="btn btn1 float-start" type="button" onClick={() => window.location.href = '/cmswegrow/my-dashboard'}>Back</button>
           <button type="submit" className="btn btn2 float-end" disabled={isSubmitting} >{isSubmitting ? 'Sending...' : 'Submit'}</button>
        </div>
      </div>
      </form>
    </>
  );
};

export default CreateList;
