"use client"; 

import { useEffect, useState } from "react";
import { useRouter, useParams } from "next/navigation";
import { getSensorById, updateSensorAPI } from "@/api/sensor";
import { toast } from 'react-toastify';

const CreateList = () => {
  const params = useParams();
  
    const id = params?.id;
  
    const router = useRouter();
    const [sensor, setSensor] = useState({ title: "", status: false });
    const [loading, setLoading] = useState(true);
  
    useEffect(() => {
      if (!id) return;

      const fetchSensor = async () => {
        try {
          const data = await getSensorById(id);
          setSensor({ title: data.data.title, status: data.data.status });
        } catch (error) {
          console.error("Error fetching Sensor:", error);
        } finally {
          setLoading(false);
        }
      };

      fetchSensor();
    }, [id]);
  
    const handleSubmit = async (e) => {
      e.preventDefault();
      try {
        const data = await updateSensorAPI(id, sensor);
        // alert("Sensor updated successfully!");
        toast.success(data.message);
        if(data.status=="success"){
          setTimeout(() => {
          router.push("/cmswegrow/my-sensor");
          }, 1500); 
        }
      } catch (error) {
        alert("Failed to update Sensor.");
        console.error(error);
      }
    };
  
    const handleChange = (e) => {
      setSensor((prev) => ({ ...prev, [e.target.name]: e.target.value }));
    };
  
    const handleStatusChange = () => {
      setSensor((prev) => ({ ...prev, status: !prev.status }));
    };
  
    if (loading) return <p>Loading...</p>;
  return (
    <>
    <form onSubmit={handleSubmit} className="row">
      <div className="col-lg-6 col-xl-6">
        <div className="my_profile_setting_input form-group">
          <label htmlFor="sensorTitle">Sensor Title</label>
          <input
        type="text"
        className="form-control"
        id="sensorTitle"
        name="title"
        value={sensor.title}
        onChange={handleChange}
      />
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
        value={sensor.status ? "active" : "deactive"}
        onChange={(e) =>
          setSensor((prev) => ({
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
          <button className="btn btn1 float-start" type="button" onClick={() => window.location.href = '/cmswegrow/my-sensor'}>Back</button>
          <button className="btn btn2 float-end">Submit</button>
        </div>
      </div>
      </form>
    </>
  );
};

export default CreateList;
