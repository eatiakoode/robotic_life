"use client"; 

import { useEffect, useState } from "react";
import { useRouter, useParams } from "next/navigation";
import { getTestimonialById, updateTestimonialAPI } from "@/api/testimonial";

import { toast } from 'react-toastify';
const CreateList = () => {
  const params = useParams();  
    const id = params?.id;  
    const router = useRouter();
    const [testimonial, setTestimonial] = useState({ name: "", status: false, message: "", });
    const [name, setName] = useState("");
    const [designation, setDesignation] = useState("");
    const [message, setMessage] = useState("");
    const [rating, setRating] = useState(5);
    const [status, setStatus] = useState(true);
    const [loading, setLoading] = useState(true);
    const [isSubmitting, setIsSubmitting] = useState(false);
    const [error, setError] = useState("");
    useEffect(() => {
      if (!id) {
        setLoading(false);
        return;
      }      
      const fetchTestimonial = async () => {
        try {
          setLoading(true);
          const response = await getTestimonialById(id);
          
          if (response.success && response.data) {
            setName(response.data.name || "");
            setDesignation(response.data.designation || "");
            setMessage(response.data.message || "");
            setRating(response.data.rating || 5);
            setStatus(response.data.status !== undefined ? response.data.status : true);
          } else {
            setError("Failed to load testimonial data");
            toast.error("Failed to load testimonial data");
          }
        } catch (error) {
          setError(error.message || "Failed to load testimonial");
          toast.error(error.message || "Failed to load testimonial");
        } finally {
          setLoading(false);
        }
      };
  
      fetchTestimonial();
    }, [id]);
  
    const handleSubmit = async (e) => {
      e.preventDefault();
      setIsSubmitting(true);
      setError("");
      
      try {
        const formData = new FormData();
        formData.append("name", name.trim());
        formData.append("designation", designation.trim());
        formData.append("message", message.trim());
        formData.append("rating", rating);
        formData.append("status", status);
        const data = await updateTestimonialAPI(id, formData);
        
        if (data.success === true) {
          toast.success(data.message || "Testimonial updated successfully!");
          setTimeout(() => {
            router.push("/cmsroboticlife/my-testimonial");
          }, 1000);
        } else {
          toast.error(data.message || "Failed to update testimonial");
        }
      } catch (error) {
        setError("Failed to update Testimonial.");
        toast.error(error.message || "Failed to update testimonial");
      } finally {
        setIsSubmitting(false);
      }
    };
  
    // const handleChange = (e) => {
    //   setTestimonial((prev) => ({ ...prev, [e.target.name]: e.target.value }));
    // };
  
    // const handleStatusChange = () => {
    //   setTestimonial((prev) => ({ ...prev, status: !prev.status }));
    // };
  
    if (loading) {
      return (
        <div className="col-lg-12">
          <div className="text-center py-5">
            <div className="spinner-border text-primary" role="status">
              <span className="visually-hidden">Loading...</span>
            </div>
            <p className="mt-3">Loading testimonial data...</p>
          </div>
        </div>
      );
    }
  return (
    <>
    {error && (
      <div className="col-lg-12 mb-3">
        <div className="alert alert-danger" role="alert">
          {error}
        </div>
      </div>
    )}
    <form onSubmit={handleSubmit} className="row">
      <div className="col-lg-6 col-xl-6">
        <div className="my_profile_setting_input form-group">
          <label htmlFor="CustomerName">Customer Name</label>
          <input
            type="text"
            className="form-control"
            id="CustomerName"
            name="name"
            value={name}
            onChange={(e) => setName(e.target.value)}
            placeholder="Enter customer name"
          />
        </div>
      </div>
      {/* End .col */}
      <div className="col-lg-6 col-xl-6">
        <div className="my_profile_setting_input form-group">
          <label htmlFor="CustomerDesignation">Customer Designation</label>
          <input
            type="text"
            className="form-control"
            id="CustomerDesignation"
            name="designation"
            value={designation}
            onChange={(e) => setDesignation(e.target.value)}
            placeholder="e.g., CEO, Manager, Designer"
          />
        </div>
      </div>
      {/* End .col */}
      <div className="col-lg-6 col-xl-6">
        <div className="my_profile_setting_input form-group">
          <label htmlFor="Rating">Rating</label>
          <select
            className="form-control"
            id="Rating"
            value={rating}
            onChange={(e) => setRating(parseInt(e.target.value))}
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
          <label htmlFor="TestimonialMessage">Testimonial Message</label>
          <textarea 
            id="TestimonialMessage" 
            className="form-control" 
            name="message" 
            rows="7"  
            value={message} 
            onChange={(e) => setMessage(e.target.value)} 
            placeholder="Enter the customer's testimonial message"
          ></textarea>
        </div>
      </div>
      {/* End .col */}

     


      <div className="col-xl-12">
        <div className="my_profile_setting_input">
          <button className="btn btn1 float-start" type="button" onClick={() => window.location.href = '/cmsroboticlife/my-testimonial'}>Back</button>
          <button 
            className="btn btn2 float-end" 
            type="submit"
            disabled={isSubmitting}
          >
            {isSubmitting ? "Updating..." : "Update"}
          </button>
        </div>
      </div>
      </form>
    </>
  );
};

export default CreateList;
