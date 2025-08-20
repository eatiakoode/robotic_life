"use client";

import { useState } from "react";
import { addPayloadTypeAPI } from "@/api/payloadtype";
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

const addPayloadType = async (e) => {
  e.preventDefault();
  setisSubmitting(true);

  if (!title.trim()) {
    setError("Title is required");
    setisSubmitting(false);
    return;
  }

  setError("");

  try {
  const data = await addPayloadTypeAPI(title);

  // ✅ show toast always when API succeeds
  toast.success(data.message || "Payload Type created successfully");

  // ✅ redirect after delay
  setTimeout(() => {
    router.push("/cmswegrow/my-payloadtype");
  }, 1200);

  setTitle("");
} catch (error) {
  toast.error("Failed to create Payload Type.");
  setError(error.message);
}
};

  return (
    <>
    <form onSubmit={addPayloadType} className="row">
      <div className="col-lg-6 col-xl-6">
        <div className="my_profile_setting_input form-group">
          <label htmlFor="payloadTitle">PayLoad Type Title</label>
          <input type="text" className="form-control" id="payloadTitle" value={title} onChange={handleTitleChange} />
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
