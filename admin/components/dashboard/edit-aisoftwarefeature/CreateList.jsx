"use client";

import { useEffect, useState } from "react";
import { useRouter, useParams } from "next/navigation";
import { getAISoftwareFeatureById, updateAISoftwareFeatureAPI } from "@/api/aisoftwarefeature";
import { toast } from 'react-toastify';

const CreateList = () => {
  const params = useParams();

  const id = params?.id;

  const router = useRouter();
  const [aiSoftwareFeature, setAISoftwareFeature] = useState({ title: "", status: false });
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (!id) return;

    const fetchAISoftwareFeature = async () => {
      try {
        const data = await getAISoftwareFeatureById(id);
        setAISoftwareFeature({
          title: data.name,
          status: data.status ?? false,
        });
      } catch (error) {
        console.error("Error fetching AI Software Feature:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchAISoftwareFeature();
  }, [id]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const data = await updateAISoftwareFeatureAPI(id, aiSoftwareFeature);
      toast.success(data.message);

      setTimeout(() => {
        router.push("/cmsthebotsworld/my-aisoftwarefeature");
      }, 1500);
    } catch (error) {
      toast.error("Failed to update AI Software Feature.");
      console.error(error);
    }
  };


  const handleChange = (e) => {
    setAISoftwareFeature((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const handleStatusChange = () => {
    setAISoftwareFeature((prev) => ({ ...prev, status: !prev.status }));
  };

  if (loading) return <p>Loading...</p>;
  return (
    <>
      <form onSubmit={handleSubmit} className="row">
        <div className="col-lg-6 col-xl-6">
          <div className="my_profile_setting_input form-group">
            <label htmlFor="aiSoftwareFeatureTitle">AI Software Feature Title</label>
            <input
              type="text"
              className="form-control"
              id="aiSoftwareFeatureTitle"
              name="title"
              value={aiSoftwareFeature.title}
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
              value={aiSoftwareFeature.status ? "active" : "deactive"}
              onChange={(e) =>
                setAISoftwareFeature((prev) => ({
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
            <button className="btn btn1 float-start" type="button" onClick={() => window.location.href = '/cmsthebotsworld/my-aisoftwarefeature'}>Back</button>
            <button className="btn btn2 float-end">Submit</button>
          </div>
        </div>
      </form>
    </>
  );
};

export default CreateList;
