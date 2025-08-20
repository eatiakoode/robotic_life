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

        // Handle both API shapes safely
        const colorData = data?.data || data;

        if (colorData) {
          setColor({
            title: colorData.title || "",
            status: colorData.status ?? false,
          });
        }
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
     if (!color.title.trim()) {
    toast.error("Color name is required");
    return;
  }
    try {
      const data = await updateColorAPI(id, { name: color.title.trim(), status: color.status });
      toast.success(data.message);
      if (data.status === "success") {
        console.log("Redirecting...");
        setTimeout(() => {
            console.log("Redirecting...");
          router.push("/cmswegrow/my-color");
          router.refresh();
        }, 500);
      }
    } catch (error) {
      alert("Failed to update Color.");
      console.error(error);
    }
  };

  const handleChange = (e) => {
    setColor((prev) => ({ ...prev, [e.target.name]: e.target.value }));
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
            <button
              className="btn btn1 float-start"
              type="button"
              onClick={() => window.location.href = '/cmswegrow/my-color'}
            >
              Back
            </button>
            <button className="btn btn2 float-end">Submit</button>
          </div>
        </div>
      </form>
    </>
  );
};

export default CreateList;
