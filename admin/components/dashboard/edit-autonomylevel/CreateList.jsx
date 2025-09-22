"use client";

import { useEffect, useState } from "react";
import { useRouter, useParams } from "next/navigation";
import { getAutonomyLevelById, updateAutonomyLevelAPI } from "@/api/autonomylevel";
import { toast } from 'react-toastify';

const CreateList = () => {
  const params = useParams();

  const id = params?.id;

  const router = useRouter();
  const [autonomyLevel, setAutonomyLevel] = useState({ title: "", status: false });
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (!id) return;

    const fetchAutonomyLevel = async () => {
      try {
        const data = await getAutonomyLevelById(id);
        setAutonomyLevel({
          title: data.name,
          status: data.status ?? false,
        });
      } catch (error) {
        console.error("Error fetching Autonomy Level:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchAutonomyLevel();
  }, [id]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const data = await updateAutonomyLevelAPI(id, autonomyLevel);
      toast.success(data.message);

      setTimeout(() => {
        router.push("/cmsthebotsworld/my-autonomylevel");
      }, 1500);
    } catch (error) {
      toast.error("Failed to update Autonomy Level.");
      console.error(error);
    }
  };


  const handleChange = (e) => {
    setAutonomyLevel((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const handleStatusChange = () => {
    setAutonomyLevel((prev) => ({ ...prev, status: !prev.status }));
  };

  if (loading) return <p>Loading...</p>;
  return (
    <>
      <form onSubmit={handleSubmit} className="row">
        <div className="col-lg-6 col-xl-6">
          <div className="my_profile_setting_input form-group">
            <label htmlFor="autonomyLevelTitle">Autonomy Level Title</label>
            <input
              type="text"
              className="form-control"
              id="autonomyLevelTitle"
              name="title"
              value={autonomyLevel.title}
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
              value={autonomyLevel.status ? "active" : "deactive"}
              onChange={(e) =>
                setAutonomyLevel((prev) => ({
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
            <button className="btn btn1 float-start" type="button" onClick={() => window.location.href = '/cmsthebotsworld/my-autonomylevel'}>Back</button>
            <button className="btn btn2 float-end">Submit</button>
          </div>
        </div>
      </form>
    </>
  );
};

export default CreateList;
