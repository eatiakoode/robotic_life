"use client";

import { useEffect, useState } from "react";
import { useRouter, useParams } from "next/navigation";
import { getTerrainCapabilityById, updateTerrainCapabilityAPI } from "@/api/terrain";
import { toast } from 'react-toastify';

const CreateList = () => {
  const params = useParams();

  const id = params?.id;

  const router = useRouter();
  const [terrainCapability, setTerrainCapability] = useState({ title: "", status: false });
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (!id) return;

    const fetchTerrainCapability = async () => {
      try {
        const data = await getTerrainCapabilityById(id);
        setTerrainCapability({
          title: data.name,         
          status: data.status ?? false, 
        });
      } catch (error) {
        console.error("Error fetching Terrain Capability:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchTerrainCapability();
  }, [id]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const data = await updateTerrainCapabilityAPI(id, terrainCapability);
      toast.success(data.message);

      setTimeout(() => {
        router.push("/cmsthebotsworld/my-terraincapability");
      }, 1000);
    } catch (error) {
      toast.error("Failed to update Terrain Capability.");
      console.error(error);
    }
  };


  const handleChange = (e) => {
    setTerrainCapability((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const handleStatusChange = () => {
    setTerrainCapability((prev) => ({ ...prev, status: !prev.status }));
  };

  if (loading) return <p>Loading...</p>;
  return (
    <>
      <form onSubmit={handleSubmit} className="row">
        <div className="col-lg-6 col-xl-6">
          <div className="my_profile_setting_input form-group">
            <label htmlFor="terrainCapabilityTitle">Terrain Capability Title</label>
            <input
              type="text"
              className="form-control"
              id="terrainCapabilityTitle"
              name="title"
              value={terrainCapability.title}
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
              value={terrainCapability.status ? "active" : "deactive"}
              onChange={(e) =>
                setTerrainCapability((prev) => ({
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
            <button className="btn btn1 float-start" type="button" onClick={() => window.location.href = '/cmsthebotsworld/my-terraincapability'}>Back</button>
            <button className="btn btn2 float-end">Submit</button>
          </div>
        </div>
      </form>
    </>
  );
};

export default CreateList;
