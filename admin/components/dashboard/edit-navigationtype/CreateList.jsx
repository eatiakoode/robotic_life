"use client";

import { useEffect, useState } from "react";
import { useRouter, useParams } from "next/navigation";
import { getNavigationTypeById, updateNavigationTypeAPI } from "@/api/navigationtype";
import { toast } from 'react-toastify';

const CreateList = () => {
  const params = useParams();

  const id = params?.id;

  const router = useRouter();
  const [navigationType, setNavigationType] = useState({ title: "", status: false });
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (!id) return;

    const fetchNavigationType = async () => {
      try {
        const data = await getNavigationTypeById(id);
        setNavigationType({
          title: data.name,         
          status: data.status ?? false, 
        });
      } catch (error) {
        console.error("Error fetching Navigation Type:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchNavigationType();
  }, [id]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const data = await updateNavigationTypeAPI(id, navigationType);
      toast.success(data.message);

      setTimeout(() => {
        router.push("/cmsroboticlife/my-navigationtype");
      }, 1000);
    } catch (error) {
      toast.error("Failed to update Navigation Type.");
      console.error(error);
    }
  };


  const handleChange = (e) => {
    setNavigationType((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const handleStatusChange = () => {
    setNavigationType((prev) => ({ ...prev, status: !prev.status }));
  };

  if (loading) return <p>Loading...</p>;
  return (
    <>
      <form onSubmit={handleSubmit} className="row">
        <div className="col-lg-6 col-xl-6">
          <div className="my_profile_setting_input form-group">
            <label htmlFor="navigationTypeTitle">Navigation Type Title</label>
            <input
              type="text"
              className="form-control"
              id="navigationTypeTitle"
              name="title"
              value={navigationType.title}
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
              value={navigationType.status ? "active" : "deactive"}
              onChange={(e) =>
                setNavigationType((prev) => ({
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
            <button className="btn btn1 float-start" type="button" onClick={() => window.location.href = '/cmsroboticlife/my-navigationtype'}>Back</button>
            <button className="btn btn2 float-end">Submit</button>
          </div>
        </div>
      </form>
    </>
  );
};

export default CreateList;
