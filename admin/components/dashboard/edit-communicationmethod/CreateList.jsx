"use client";

import { useEffect, useState } from "react";
import { useRouter, useParams } from "next/navigation";
import { getCommunicationMethodById, updateCommunicationMethodAPI } from "@/api/communicationmethod";
import { toast } from 'react-toastify';

const CreateList = () => {
  const params = useParams();
  const id = params?.id;
  const router = useRouter();
  const [communicationMethod, setCommunicationMethod] = useState({ name: "", status: false, description: "" });
  const [title, setTitle] = useState("");
  const [status, setStatus] = useState("");
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  useEffect(() => {
    if (!id) return;
    const fetchCommunicationMethod = async () => {
      try {
        const data = await getCommunicationMethodById(id);
        setTitle(data.name);
        setStatus(Boolean(data.status));
      } catch (error) {
        console.error("Error fetching Communication Method:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchCommunicationMethod();
  }, [id]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const formData = new FormData();
      formData.append("name", title);
      formData.append("status", status);
      const data = await updateCommunicationMethodAPI(id, title);
      toast.success(data.message);
      if (data.status == "success") {
        setTimeout(() => {
          router.push("/cmswegrow/my-communicationmethod");
        },500);
      }
    } catch (error) {
      alert("Failed to update Communication Method.");
      console.error(error);
    }
  };

  if (loading) return <p>Loading...</p>;
  return (
    <>
      <form onSubmit={handleSubmit} className="row">
        <div className="col-lg-6 col-xl-6">
          <div className="my_profile_setting_input form-group">
            <label htmlFor="communicationMethodTitle">Communication Method Title</label>
            <input
              type="text"
              className="form-control"
              id="communicationMethodTitle"
              name="title"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
            />
          </div>
        </div>

        <div className="col-lg-6 col-xl-6">
          <div className="my_profile_setting_input ui_kit_select_search form-group">
            <label>Status</label>
            <select
              className="selectpicker form-select"
              data-live-search="true"
              data-width="100%"
              value={status ? "active" : "deactive"}
              onChange={(e) => setStatus(e.target.value === "active")}
            >
              <option value="active">Active</option>
              <option value="deactive">Deactive</option>
            </select>
          </div>
        </div>
        
        <div className="col-xl-12">
          <div className="my_profile_setting_input">
            <button className="btn btn1 float-start" type="button" onClick={() => window.location.href = '/cmswegrow/my-communicationmethod'}>Back</button>
            <button className="btn btn2 float-end">Submit</button>
          </div>
        </div>
      </form>
    </>
  );
};

export default CreateList;
