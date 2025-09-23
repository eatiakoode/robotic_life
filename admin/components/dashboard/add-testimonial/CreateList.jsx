"use client";

import { useState } from "react";
import { useRouter, useParams } from "next/navigation";
import { addTestimonialAPI } from "../../../api/testimonial";

import { toast } from "react-toastify";
const CreateList = () => {
  const router = useRouter();
  const [isSubmitting, setisSubmitting] = useState("");
  const [name, setName] = useState("");
  const [designation, setDesignation] = useState("");
  const [message, setMessage] = useState("");
  const [rating, setRating] = useState(5);
  const [status, setStatus] = useState(true);

  const [error, setError] = useState("");

  const addTestimonial = async (e) => {
    e.preventDefault();
    setisSubmitting(true);
    setError("");

    // Validate required fields
    if (!name.trim()) {
      setError("Name is required");
      setisSubmitting(false);
      return;
    }
    if (!designation.trim()) {
      setError("Designation is required");
      setisSubmitting(false);
      return;
    }
    if (!message.trim()) {
      setError("Message is required");
      setisSubmitting(false);
      return;
    }

    try {
      const formData = new FormData();
      formData.append("name", name.trim());
      formData.append("designation", designation.trim());
      formData.append("message", message.trim());
      formData.append("rating", rating);
      formData.append("status", status);

      const data = await addTestimonialAPI(formData);

      if (data.success === true) {
        toast.success(data.message || "Testimonial added successfully!");
        // Clear form
        setName("");
        setDesignation("");
        setMessage("");
        setRating(5);
        setStatus(true);
        // Redirect after a short delay
        setTimeout(() => {
          router.push("/cmsthebotsworld/my-testimonial");
        }, 1000);
      } else {
        toast.error(data.message || "Failed to add testimonial");
      }
    } catch (error) {
      setError(error.message);
      toast.error(error.message || "Failed to add testimonial");
    } finally {
      setisSubmitting(false);
    }
  };

  return (
    <>
      <form onSubmit={addTestimonial} className="row">
        <div className="col-lg-6 col-xl-6">
          <div className="my_profile_setting_input form-group">
            <label htmlFor="CustomerName">Customer Name *</label>
            <input
              type="text"
              className="form-control"
              id="CustomerName"
              value={name}
              onChange={(e) => setName(e.target.value)}
              placeholder="Enter customer name"
              required
            />
            {error && <p className="text-red-500 text-sm mt-1">{error}</p>}
          </div>
        </div>
        {/* End .col */}
        <div className="col-lg-6 col-xl-6">
          <div className="my_profile_setting_input form-group">
            <label htmlFor="CustomerDesignation">
              Customer Designation *
            </label>
            <input
              type="text"
              className="form-control"
              id="CustomerDesignation"
              value={designation}
              onChange={(e) => setDesignation(e.target.value)}
              placeholder="e.g., CEO, Manager, Designer"
              required
            />
            {error && <p className="text-red-500 text-sm mt-1">{error}</p>}
          </div>
        </div>
        {/* End .col */}
        <div className="col-lg-6 col-xl-6">
          <div className="my_profile_setting_input form-group">
            <label htmlFor="Rating">Rating *</label>
            <select
              className="form-control"
              id="Rating"
              value={rating}
              onChange={(e) => setRating(parseInt(e.target.value))}
              required
            >
              <option value={1}>1 Star</option>
              <option value={2}>2 Stars</option>
              <option value={3}>3 Stars</option>
              <option value={4}>4 Stars</option>
              <option value={5}>5 Stars</option>
            </select>
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
              value={status ? "active" : "inactive"}
              onChange={(e) => setStatus(e.target.value === "active")}
            >
              <option value="active">Active</option>
              <option value="inactive">Inactive</option>
            </select>
          </div>
        </div>
        {/* End .col */}
        <div className="col-lg-12">
          <div className="my_profile_setting_textarea form-group">
            <label htmlFor="TestimonialMessage">Testimonial Message *</label>
            <textarea
              id="TestimonialMessage"
              className="form-control"
              rows="7"
              value={message}
              onChange={(e) => setMessage(e.target.value)}
              placeholder="Enter the customer's testimonial message"
              required
            ></textarea>
            {error && (
              <span className="text-danger">{error}</span>
            )}
          </div>
        </div>


        <div className="col-xl-12">
          <div className="my_profile_setting_input">
            <button
              className="btn btn1 float-start"
              type="button"
              onClick={() =>
                (window.location.href = "/cmsthebotsworld/my-dashboard")
              }
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
