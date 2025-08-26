"use client";

import { useState } from "react";
import { addSliderAPI } from "@/api/slider";
import { useRouter, useParams } from "next/navigation";
import { toast } from "react-toastify";
const CreateList = () => {
  const [title, setTitle] = useState("");
  // const [slug, setSlug] = useState("");
  const [description, setDescription] = useState("");
  const [error, setError] = useState("");
  const [images, setImages] = useState(null);
  const router = useRouter();
  const [isSubmitting, setisSubmitting] = useState("");
  const [metatitle, setMetatitle] = useState("");
  const [metadescription, setMetaDescription] = useState("");

  // upload profile
  const uploadImages = (e) => {
    setImages(e.target.files[0]);
  };

  const handleTitleChange = (e) => {
    const value = e.target.value;
    setTitle(value);

    // if (value.trim() !== "") {
    //   setError("");
    //   const generatedSlug = value
    //     .toLowerCase()
    //     .trim()
    //     .replace(/[^a-z0-9]+/g, "-")
    //     .replace(/^-+|-+$/g, "");
    //   setSlug(generatedSlug);
    // } else {
    //   setSlug("");
    // }
  };

  const addSlider = async (e) => {
    e.preventDefault();
    setisSubmitting(true);

    if (!title.trim()) {
      setError("Title is required");
      setisSubmitting(false);
      return;
    }

    setError("");

    try {
      const formData = new FormData();
      // Align keys with backend schema
      formData.append("title", title);
      formData.append("description", description);
      formData.append("metaTitle", metatitle);
      formData.append("metaDescription", metadescription);
      if (images) {
        formData.append("images", images);
        console.log("Adding image to formData:", images);
      }

      console.log("FormData contents:");
      for (let [key, value] of formData.entries()) {
        console.log(key, value);
      }

      const data = await addSliderAPI(formData); // Use FormData here
      console.log("API response:", data);
      toast.success(data.message);

      if (data.status === "success") {
        setTimeout(() => {
          router.push("/cmsroboticlife/my-slider");
        }, 1500);
      }

      setTitle("");
      setDescription("");
      setImages(null);
      setMetatitle("");
      setMetaDescription("");
    } catch (error) {
      console.error("Error adding slider:", error);
      setError(error.message);
    } finally {
      setisSubmitting(false);
    }
  };

  return (
    <>
      <form onSubmit={addSlider} className="row">
        <div className="col-lg-12">
          <div className="wrap-custom-file">
            <input
              type="file"
              id="image1"
              accept="image/png, image/gif, image/jpeg, image/svg+xml, image/svg, image/webp, image/avif"
              onChange={uploadImages}
            />
            <label
              style={{
                ...(images
                  ? { backgroundImage: `url(${URL.createObjectURL(images)})` }
                  : {}),
                backgroundSize: "contain",
                backgroundPosition: "center",
                backgroundRepeat: "no-repeat",
              }}
              htmlFor="image1"
            >
              <span>
                <i className="flaticon-download"></i> Upload Photo{" "}
              </span>
            </label>
          </div>
          <p>*minimum 260px x 260px</p>
        </div>
        {/* End .col */}
        <div className="col-lg-6 col-xl-6">
          <div className="my_profile_setting_input form-group">
            <label htmlFor="sliderTitle">Slider Title</label>
            <input
              type="text"
              className="form-control"
              id="sliderTitle"
              value={title}
              onChange={handleTitleChange}
            />
            {error && <p className="text-red-500 text-sm mt-1">{error}</p>}
          </div>
        </div>

        {/* End .col */}
        <div className="col-lg-12">
          <div className="my_profile_setting_textarea form-group">
            <label htmlFor="sliderDescription">Description</label>
            <textarea
              id="sliderDescription"
              className="form-control"
              rows="7"
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              placeholder="Enter slider description"
            ></textarea>
            {error.description && (
              <span className="text-danger">{error.description}</span>
            )}
          </div>
        </div>

        {/* End .col */}
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
        {/* End .col */}

        <div className=" mt30 ">
          <div className="col-lg-12">
            <h3 className="mb30">Meta Information</h3>
          </div>
          <div className="row">
            <div className="col-lg-12">
              <div className="my_profile_setting_input form-group">
                <label htmlFor="sliderMetatitle">Meta Title</label>

                <input
                  type="text"
                  className="form-control"
                  id="sliderMetatitle"
                  value={metatitle}
                  onChange={(e) => setMetatitle(e.target.value)}
                />
              </div>
            </div>
            <div className="col-lg-12">
              <div className="my_profile_setting_textarea form-group">
                <label htmlFor="sliderMetaDescription">Meta Description</label>
                <textarea
                  id="sliderMetaDescription"
                  className="form-control"
                  rows="7"
                  value={metadescription}
                  onChange={(e) => setMetaDescription(e.target.value)}
                  placeholder="Enter meta description"
                ></textarea>
                {error.metadescription && (
                  <span className="text-danger">{error.metadescription}</span>
                )}
              </div>
            </div>

            {/* End .col */}
          </div>
        </div>

        <div className="col-xl-12">
          <div className="my_profile_setting_input">
            <button
              className="btn btn1 float-start"
              type="button"
              onClick={() =>
                (window.location.href = "/cmsroboticlife/my-dashboard")
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
