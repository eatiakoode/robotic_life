"use client";

import { useState, useEffect } from "react";
import { addCategoryAPI, getParentCategoriesAPI } from "@/api/category";
import { useRouter } from "next/navigation";
import { toast } from "react-toastify";

const CreateList = () => {
  const [name, setName] = useState(""); // was title
  const [slug, setSlug] = useState("");
  const [description, setDescription] = useState("");
  const [metatitle, setMetatitle] = useState("");
  const [metadescription, setMetaDescription] = useState("");
  const [error, setError] = useState("");
  const [logo, setLogo] = useState(null);
  const [parentCategory, setParentCategory] = useState("");
  const [parentCategories, setParentCategories] = useState([]);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const router = useRouter();

  useEffect(() => {
    const fetchCategories = async () => {
      try {
        const data = await getParentCategoriesAPI();
        setParentCategories(Array.isArray(data) ? data : []);
      } catch (err) {
        console.error(err);
      }
    };
    fetchCategories();
  }, []);

  const uploadLogo = (e) => setLogo(e.target.files[0]);

  const handleNameChange = (e) => {
    const value = e.target.value;
    setName(value);
    if (value.trim() !== "") setError("");
    const autoSlug = value
      .toLowerCase()
      .trim()
      .replace(/[^a-z0-9]+/g, "-")
      .replace(/^-+|-+$/g, "");
    setSlug(autoSlug);
  };

  const addCategory = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);

    if (!name.trim()) {
      setError("Name is required");
      setIsSubmitting(false);
      return;
    }
    if (!slug.trim()) {
      setError("Slug is required");
      setIsSubmitting(false);
      return;
    }

    try {
      const formData = new FormData();
      // Send both keys to be compatible with backend variants
      formData.append("title", name);
      formData.append("name", name);
      formData.append("slug", slug);
      formData.append("description", description);
      formData.append("metatitle", metatitle);
      formData.append("metadescription", metadescription);

      // Always send parent; empty string will be coerced to null in backend/Mongoose
      formData.append("parent", parentCategory || "");

      if (logo) formData.append("logo", logo);

      const data = await addCategoryAPI(formData);
      toast.success(data.message);

      if (data.status === "success") {
        setTimeout(() => {
          router.push("/cmsroboticlife/my-category");
        }, 1500);
      }

      setName("");
      setSlug("");
      setDescription("");
      setMetatitle("");
      setMetaDescription("");
      setLogo(null);
      setParentCategory("");
    } catch (err) {
      setError(err.message || "Something went wrong");
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <form onSubmit={addCategory} className="row">
            {/* File Upload */}
      <div className="col-lg-12">
        <div className="wrap-custom-file">
          <input
            type="file"
            id="image1"
            accept="image/png, image/gif, image/jpeg, image/svg+xml, image/svg, image/webp, image/avif"
            onChange={uploadLogo}
          />
          <label
            style={
              logo
                ? { backgroundImage: `url(${URL.createObjectURL(logo)})` }
                : undefined
            }
            htmlFor="image1"
          >
            <span>
              <i className="flaticon-download"></i> Upload Photo
            </span>
          </label>
        </div>
        <p>*minimum 260px x 260px</p>
      </div>

      {/* Name */}
      <div className="col-lg-6 col-xl-6">
        <div className="my_profile_setting_input form-group">
          <label htmlFor="categoryName">Category Name</label>
          <input
            type="text"
            className="form-control"
            id="categoryName"
            value={name}
            onChange={handleNameChange}
          />
          {error && <p className="text-red-500 text-sm mt-1">{error}</p>}
        </div>
      </div>

      {/* Slug */}
      <div className="col-lg-6 col-xl-6">
        <div className="my_profile_setting_input form-group">
          <label htmlFor="categorySlug">Category Slug</label>
          <input
            type="text"
            className="form-control"
            id="categorySlug"
            value={slug}
            disabled
          />
        </div>
      </div>

      {/* Parent */}
      <div className="col-lg-6 col-xl-6">
        <div className="my_profile_setting_input form-group">
          <label htmlFor="parentCategory">Parent Category</label>
          <select
            id="parentCategory"
            className="form-control"
            value={parentCategory || ""}
            onChange={(e) => setParentCategory(e.target.value)}
          >
            <option value="">-- No Parent --</option>
            {parentCategories.map((cat) => (
              <option key={cat._id} value={cat._id}>
                {cat.name || cat.title}
              </option>
            ))}
          </select>
        </div>
      </div>

      {/* Description */}
      <div className="col-lg-12">
        <div className="my_profile_setting_textarea form-group">
          <label htmlFor="categoryDescription">Description</label>
          <textarea
            id="categoryDescription"
            className="form-control"
            rows="7"
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            placeholder="Enter category description"
          ></textarea>
        </div>
      </div>

      {/* Meta Info */}
      <div className="mt30">
        <div className="col-lg-12">
          <h3 className="mb30">Meta Information</h3>
        </div>
        <div className="row">
          <div className="col-lg-12">
            <div className="my_profile_setting_input form-group">
              <label htmlFor="propertyMetatitle">Meta Title</label>
              <input
                type="text"
                className="form-control"
                id="propertyMetatitle"
                value={metatitle}
                onChange={(e) => setMetatitle(e.target.value)}
              />
            </div>
          </div>
          <div className="col-lg-12">
            <div className="my_profile_setting_textarea form-group">
              <label htmlFor="propertyMetaDescription">
                Meta Description
              </label>
              <textarea
                id="propertyMetaDescription"
                className="form-control"
                rows="7"
                value={metadescription}
                onChange={(e) => setMetaDescription(e.target.value)}
                placeholder="Enter meta description"
              ></textarea>
            </div>
          </div>
        </div>
      </div>

      {/* Buttons */}
      <div className="col-xl-12">
        <div className="my_profile_setting_input">
          <button
            className="btn btn1 float-start"
            type="button"
            onClick={() => (window.location.href = "/cmsroboticlife/my-dashboard")}
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
  );
};

export default CreateList;
