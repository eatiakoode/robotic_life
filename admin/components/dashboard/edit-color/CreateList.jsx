"use client";

import { useEffect, useState } from "react";
import { useRouter, useParams } from "next/navigation";
import { getColorById, updateColorAPI } from "@/api/color";
import { toast } from 'react-toastify';

const CreateList = () => {
  const params = useParams();

  const id = params?.id;

  const router = useRouter();
  const [color, setColor] = useState({ title: "", status: false });
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (!id) return;

    const fetchColor = async () => {
      try {
        const data = await getColorById(id);
        setColor({
          title: data.name,         
          status: data.status ?? false, 
        });
      } catch (error) {
        console.error("Error fetching Color:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchColor();
  }, [id]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const data = await updateColorAPI(id, color);
      toast.success(data.message);

      setTimeout(() => {
        router.push("/cmsthebotsworld/my-color");
      }, 1500);
    } catch (error) {
      toast.error("Failed to update Color.");
      console.error(error);
    }
  };


  const handleChange = (e) => {
    setColor((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const handleStatusChange = () => {
    setColor((prev) => ({ ...prev, status: !prev.status }));
  };

  if (loading) return <p>Loading...</p>;
  return (
    <>
      <form onSubmit={handleSubmit} className="row">
        <div className="col-lg-6 col-xl-6">
          <div className="my_profile_setting_input form-group">
            <label htmlFor="colorTitle">Color Title</label>
            <input
              type="text"
              className="form-control"
              id="colorTitle"
              name="title"
              value={color.title}
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
              value={color.status ? "active" : "deactive"}
              onChange={(e) =>
                setColor((prev) => ({
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
            <button className="btn btn1 float-start" type="button" onClick={() => window.location.href = '/cmsthebotsworld/my-color'}>Back</button>
            <button className="btn btn2 float-end">Submit</button>
          </div>
        </div>
      </form>
    </>
  );
};

export default CreateList;
