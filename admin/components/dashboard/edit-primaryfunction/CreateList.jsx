"use client";

import { useEffect, useState } from "react";
import { useRouter, useParams } from "next/navigation";
import { getPrimaryFunctionById, updatePrimaryFunctionAPI } from "@/api/primaryfunction";
import { toast } from 'react-toastify';

const CreateList = () => {
  const params = useParams();

  const id = params?.id;

  const router = useRouter();
  const [primaryFunction, setPrimaryFunction] = useState({ title: "", status: false });
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (!id) return;

    const fetchPrimaryFunction = async () => {
      try {
        const data = await getPrimaryFunctionById(id);
        setPrimaryFunction({
          title: data.name,         
          status: data.status ?? false, 
        });
      } catch (error) {
        console.error("Error fetching Primary Function:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchPrimaryFunction();
  }, [id]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const data = await updatePrimaryFunctionAPI(id, primaryFunction);
      toast.success(data.message);

      setTimeout(() => {
        router.push("/cmswegrow/my-primaryfunction");
      }, 1000);
    } catch (error) {
      toast.error("Failed to update Primary Function.");
      console.error(error);
    }
  };


  const handleChange = (e) => {
    setPrimaryFunction((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const handleStatusChange = () => {
    setPrimaryFunction((prev) => ({ ...prev, status: !prev.status }));
  };

  if (loading) return <p>Loading...</p>;
  return (
    <>
      <form onSubmit={handleSubmit} className="row">
        <div className="col-lg-6 col-xl-6">
          <div className="my_profile_setting_input form-group">
            <label htmlFor="primaryFunctionTitle">Primary Function Title</label>
            <input
              type="text"
              className="form-control"
              id="primaryFunctionTitle"
              name="title"
              value={primaryFunction.title}
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
              value={primaryFunction.status ? "active" : "deactive"}
              onChange={(e) =>
                setPrimaryFunction((prev) => ({
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
            <button className="btn btn1 float-start" type="button" onClick={() => window.location.href = '/cmswegrow/my-primaryfunction'}>Back</button>
            <button className="btn btn2 float-end">Submit</button>
          </div>
        </div>
      </form>
    </>
  );
};

export default CreateList;
