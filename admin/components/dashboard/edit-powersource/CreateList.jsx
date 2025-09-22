"use client";

import { useEffect, useState } from "react";
import { useRouter, useParams } from "next/navigation";
import { getPowerSourceById, updatePowerSourceAPI } from "@/api/powersource";
import { toast } from 'react-toastify';

const CreateList = () => {
  const params = useParams();

  const id = params?.id;

  const router = useRouter();
  const [powerSource, setPowerSource] = useState({ title: "", status: false });
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (!id) return;

    const fetchPowerSource = async () => {
      try {
        const data = await getPowerSourceById(id);
        setPowerSource({
          title: data.name,         
          status: data.status ?? false, 
        });
      } catch (error) {
        console.error("Error fetching Power Source:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchPowerSource();
  }, [id]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const data = await updatePowerSourceAPI(id, powerSource);
      toast.success(data.message);

      setTimeout(() => {
        router.push("/cmsthebotsworld/my-powersource");
      }, 1000);
    } catch (error) {
      toast.error("Failed to update Power Source.");
      console.error(error);
    }
  };


  const handleChange = (e) => {
    setPowerSource((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const handleStatusChange = () => {
    setPowerSource((prev) => ({ ...prev, status: !prev.status }));
  };

  if (loading) return <p>Loading...</p>;
  return (
    <>
      <form onSubmit={handleSubmit} className="row">
        <div className="col-lg-6 col-xl-6">
          <div className="my_profile_setting_input form-group">
            <label htmlFor="powerSourceTitle">Power Source Title</label>
            <input
              type="text"
              className="form-control"
              id="powerSourceTitle"
              name="title"
              value={powerSource.title}
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
              value={powerSource.status ? "active" : "deactive"}
              onChange={(e) =>
                setPowerSource((prev) => ({
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
            <button className="btn btn1 float-start" type="button" onClick={() => window.location.href = '/cmsthebotsworld/my-powersource'}>Back</button>
            <button className="btn btn2 float-end">Submit</button>
          </div>
        </div>
      </form>
    </>
  );
};

export default CreateList;
