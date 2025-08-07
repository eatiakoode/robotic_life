"use client";

import { useState } from "react";
import { addAmenityAPI } from "@/api/amenity";
import { useRouter, useParams } from "next/navigation";
import { toast } from 'react-toastify';
const CreateList = () => {
   const [title, setTitle] = useState("");
    const [error, setError] = useState("");
     const [isSubmitting, setisSubmitting] = useState("");
    const [logo, setLogo] = useState(null);
  const router = useRouter();
    const handleTitleChange = (e) => {
      setTitle(e.target.value);
  
      // ✅ Clear the error when user starts typing
      if (e.target.value.trim() !== "") {
        setError("");
      }
    };

    const uploadLogo = (e) => {
      setLogo(e.target.files[0]);
  };
  
    const addAmenity = async (e) => {
      
      e.preventDefault();
      setisSubmitting(true)
  
      const formData = new FormData();
      formData.append("title", title);
      if (logo) {
        formData.append("logo", logo);
      }
      
      try {
        const data = await addAmenityAPI(formData); // 🔹 Call the API function
        
        toast.success(data.message);
      
        if(data.status=="success"){
         setTimeout(() => {
          router.push("/cmswegrow/my-amenities");
          }, 1500); 
        }

  
        setTitle(""); // ✅ Reset input after success
      } catch (error) {
        setError(error.message); // ❌ Show error if request fails
      }
    };
  return (
    <>
    <form onSubmit={addAmenity} className="row">
    <div className="col-lg-12">
                <div className="wrap-custom-file">
                    <input
                        type="file"
                        id="image1"
                        accept="image/png, image/gif, image/jpeg, image/svg+xml"
                        onChange={uploadLogo}
                    />
                    <label
                        style={
                            logo !== null
                                ? {
                                      backgroundImage: `url(${URL.createObjectURL(
                                          logo
                                      )})`,
                                  }
                                : undefined
                        }
                        htmlFor="image1"
                    >
                        <span>
                            <i className="flaticon-download"></i> Upload Photo{" "}
                        </span>
                    </label>
                </div>
                <p>*minimum 260px x 260px</p>
            </div>
      <div className="col-lg-6 col-xl-6">
        <div className="my_profile_setting_input form-group">
          <label htmlFor="amenityTitle">Amenity Title</label>
          <input type="text" className="form-control" id="amenityTitle" value={title} onChange={handleTitleChange} />
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
