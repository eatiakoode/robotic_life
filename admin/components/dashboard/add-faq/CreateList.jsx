"use client";

import { useState, useEffect } from "react";
import { useRouter, useParams } from "next/navigation";
import { addFaqAPI } from "@/api/faq";
import { getRobotTableData } from "@/api/robot";
import { toast } from 'react-toastify';
const CreateList = () => {
  const router = useRouter();
  const [isSubmitting, setisSubmitting] = useState("");
   const [title, setTitle] = useState("");
   const [description, setDescription] = useState("");
    const [error, setError] = useState("");
    const [properties, setProperties] = useState([]);
    const [selectedRobot, setSelectedRobot] = useState("");

    // upload profile
    
  useEffect(() => {
      const fetchProperties = async () => {
        try {
          const filter = {
    limit: 1000,
    page: 1
  }
          const response = await getRobotTableData(filter);
         
  
          setProperties(response?.items || []);
        } catch (err) {
          console.error("Error fetching robot:", err);
        }
      };
  
      fetchProperties();
    }, []);
    const handleTitleChange = (e) => {
      setTitle(e.target.value);
  
      // ✅ Clear the error when user starts typing
      if (e.target.value.trim() !== "") {
        setError("");
      }
    };
  
    const addFaq = async (e) => {
      e.preventDefault();
       setisSubmitting(true)
    
      if (!title.trim()) {
        setError("Title is required");
        return;
      }
    
      setError("");
    
      try {
        const formData = {
          "title": title,
          "description": description,
          "robotid":selectedRobot,};
        
        const data = await addFaqAPI(formData); // Use FormData here
       
        toast.success(data.message);
       
        if(data.status=="success"){
          setTimeout(() => {
          router.push("/cmswegrow/my-faq");
          }, 1500); 
        }
    
        setTitle("");
        setDescription("");
        setLogo(null);
      } catch (error) {
        setError(error.message);
      }
    };
    
    
  return (
    <>
    <form onSubmit={addFaq} className="row">
      
      <div className="col-lg-6 col-xl-6">
        <div className="my_profile_setting_input form-group">
          <label htmlFor="FaqTitle">Faq Title</label>
          <input type="text" className="form-control" id="FaqTitle" value={title} onChange={handleTitleChange} />
          {error && <p className="text-red-500 text-sm mt-1">{error}</p>}
        </div>
      </div>
      {/* End .col */}
      <div className="col-lg-6 col-xl-6">
          <div className="my_profile_setting_input ui_kit_select_search form-group">
            <label htmlFor="robotSelect">Select Robot</label>
            <select
              id="robotSelect"
              className="selectpicker form-select"
              value={selectedRobot}
              onChange={(e) => setSelectedRobot(e.target.value)} 
              data-live-search="true"
              data-width="100%"
            >
              <option value="">-- Select Robot --</option>
              {properties.map((robot) => (
                <option key={robot._id} value={robot._id}>
                  {robot.title}
                </option>
              ))}
            </select>
          </div>
        </div>
      <div className="col-lg-12">
          <div className="my_profile_setting_textarea form-group">
            <label htmlFor="FaqDescription">Description</label>
            <textarea id="FaqDescription" className="form-control" rows="7"  value={description} onChange={(e) => setDescription(e.target.value)}  placeholder="Enter Faq description"></textarea>
            {error.description && <span className="text-danger">{error.description}</span>}
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
