"use client";

import { useEffect, useState } from "react";
import { useRouter, useParams } from "next/navigation";
import { getOperatingEnvironmentById, updateOperatingEnvironmentAPI } from "@/api/operatingenvironment";
import { toast } from 'react-toastify';

const CreateList = () => {
  const params = useParams();

  const id = params?.id;

  const router = useRouter();
  const [operatingEnvironment, setOperatingEnvironment] = useState({ title: "", status: false });
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (!id) return;

    const fetchOperatingEnvironment = async () => {
      try {
        const data = await getOperatingEnvironmentById(id);
        setOperatingEnvironment({
          title: data.name,         
          status: data.status ?? false, 
        });
      } catch (error) {
        console.error("Error fetching Operating Environment:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchOperatingEnvironment();
  }, [id]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const data = await updateOperatingEnvironmentAPI(id, operatingEnvironment);
      toast.success(data.message);

      setTimeout(() => {
        router.push("/cmsthebotsworld/my-operatingenvironment");
      }, 1000);
    } catch (error) {
      toast.error("Failed to update Operating Environment.");
      console.error(error);
    }
  };


  const handleChange = (e) => {
    setOperatingEnvironment((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const handleStatusChange = () => {
    setOperatingEnvironment((prev) => ({ ...prev, status: !prev.status }));
  };

  if (loading) return <p>Loading...</p>;
  return (
    <>
      <form onSubmit={handleSubmit} className="row">
        <div className="col-lg-6 col-xl-6">
          <div className="my_profile_setting_input form-group">
            <label htmlFor="operatingEnvironmentTitle">Operating Environment Title</label>
            <input
              type="text"
              className="form-control"
              id="operatingEnvironmentTitle"
              name="title"
              value={operatingEnvironment.title}
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
              value={operatingEnvironment.status ? "active" : "deactive"}
              onChange={(e) =>
                setOperatingEnvironment((prev) => ({
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
            <button className="btn btn1 float-start" type="button" onClick={() => window.location.href = '/cmsthebotsworld/my-operatingenvironment'}>Back</button>
            <button className="btn btn2 float-end">Submit</button>
          </div>
        </div>
      </form>
    </>
  );
};

export default CreateList;
