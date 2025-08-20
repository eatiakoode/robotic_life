"use client";

import { useState } from "react";
import { addSensorAPI } from "@/api/sensor";
import { useRouter } from "next/navigation";
import { toast } from "react-toastify";

const CreateList = () => {
  const [title, setTitle] = useState("");
  const [error, setError] = useState("");
  const router = useRouter();
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleTitleChange = (e) => {
    setTitle(e.target.value);
    if (e.target.value.trim() !== "") {
      setError("");
    }
  };

  // 🔹 renamed handler to avoid conflict
  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);

    if (!title.trim()) {
      setError("Title is required");
      setIsSubmitting(false);
      return;
    }

    try {
      const data = await addSensorAPI(title); // ✅ now calls API correctly

      toast.success(data.message);
      if (data.status === "success") {
        setTimeout(() => {
          router.push("/cmswegrow/my-sensor");
        }, 1500);
      }

      setTitle("");
    } catch (error) {
      setError(error.message);
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <>
      <form onSubmit={handleSubmit} className="row">
        <div className="col-lg-6 col-xl-6">
          <div className="my_profile_setting_input form-group">
            <label htmlFor="SensorTitle">Sensor Title</label>
            <input
              type="text"
              className="form-control"
              id="SensorTitle"
              value={title}
              onChange={handleTitleChange}
            />
            {error && <p className="text-red-500 text-sm mt-1">{error}</p>}
          </div>
        </div>

        <div className="col-lg-6 col-xl-6 d-none">
          <div className="my_profile_setting_input ui_kit_select_search form-group">
            <label>Status</label>
            <select
              className="selectpicker form-select"
              data-live-search="true"
              data-width="100%"
            >
              <option data-tokens="1">Active</option>
              <option data-tokens="2">Deactive</option>
            </select>
          </div>
        </div>

        <div className="col-xl-12">
          <div className="my_profile_setting_input">
            <button
              className="btn btn1 float-start"
              type="button"
              onClick={() => (window.location.href = "/cmswegrow/my-dashboard")}
            >
              Back
            </button>
            <button
              type="submit"
              className="btn btn2 float-end"
              disabled={isSubmitting}
            >
              {isSubmitting ? "Sending..." : "Submit"}
            </button>
          </div>
        </div>
      </form>
    </>
  );
};

export default CreateList;
