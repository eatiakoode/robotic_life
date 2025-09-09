"use client";

import { useEffect, useState } from "react";
import { useRouter, useParams } from "next/navigation";
import { getBlogById, updateBlogAPI } from "../../../api/blog";
import { getBlogcategoryTableData } from "../../../api/blogcategory";
import { toast } from "react-toastify";

const CreateList = () => {
  const params = useParams();
  const id = params?.id;
  const router = useRouter();

  const [title, setTitle] = useState("");
  const [slug, setSlug] = useState("");
  const [status, setStatus] = useState(false);
  const [loading, setLoading] = useState(true);
  const [source, setSource] = useState("");
  const [date, setDate] = useState("");
  const [description, setDescription] = useState("");
  const [error, setError] = useState("");
  const [logo, setLogo] = useState(null);
  const [logoimage, setLogoImage] = useState(null);
  const [metatitle, setMetatitle] = useState("");
  const [metadescription, setMetaDescription] = useState("");
  const [contentTitle, setContentTitle] = useState("");
  const [contentParagraphs, setContentParagraphs] = useState("");
  const [tags, setTags] = useState("");
  const [blogcategories, setBlogcategories] = useState([]);
  const [selectedBlogcategory, setSelectedBlogcategory] = useState("");

  // Image path normalization function
  const normalizeImagePath = (path) => {
    if (!path) return "";
    
    // If it's already a full URL, return as is
    if (path.startsWith("http")) {
      return path;
    }
    
    // Get the backend API URL and construct full image URL
    const apiUrl = process.env.NEXT_PUBLIC_ADMIN_API_URL || "http://localhost:5000/";
    const cleanPath = path.replace(/^public\//, "");
    const fullImageUrl = apiUrl + cleanPath;
    
    return fullImageUrl;
  };

  // Upload handler
  const uploadLogo = (e) => {
    setLogoImage("");
    setLogo(e.target.files[0]);
  };
  const generateSlug = (text) => {
    return text
      .toLowerCase()
      .trim()
      .replace(/[^a-z0-9\s-]/g, "") // remove special chars
      .replace(/\s+/g, "-") // spaces -> hyphens
      .replace(/-+/g, "-"); // collapse multiple hyphens
  };

  // Fetch blog + categories
  useEffect(() => {
    if (!id) return;

    const fetchBlog = async () => {
      try {
        const data = await getBlogById(id);

        if (!data || !data.data) {
          console.error("❌ No blog found for id:", id, "Response:", data);
          setError("Blog not found");
          return;
        }

        const blogData = data.data;

        setTitle(blogData.title || "");
        setSlug(blogData.slug || "");
        setStatus(blogData.status ?? false);
        setDescription(blogData.description || "");
        setSource(blogData.source || "");
        setDate(blogData.date || "");
        setMetatitle(blogData.metatitle || "");
        setMetaDescription(blogData.metadescription || "");
        setContentTitle(blogData.contentTitle || "");
        setContentParagraphs(blogData.contentParagraphs || "");
        setTags(Array.isArray(blogData.tags) ? blogData.tags.join(", ") : (blogData.tags || ""));
        setSelectedBlogcategory(blogData.blogcategory || "");

        if (blogData.logoimage) {
          const normalizedPath = normalizeImagePath(blogData.logoimage);
          setLogoImage(normalizedPath);
        }
      } catch (error) {
        console.error("Error fetching Blog:", error);
        setError("Failed to fetch blog details");
      } finally {
        setLoading(false);
      }
    };

    const fetchBlogcategories = async () => {
      try {
        const response = await getBlogcategoryTableData();
        setBlogcategories(response || []);
      } catch (err) {
        console.error("Error fetching Blogcategory:", err);
      }
    };

    fetchBlog();
    fetchBlogcategories();
  }, [id]);
  
  useEffect(() => {
    if (title) {
      setSlug(generateSlug(title));
    }
  }, [title]);

  const handleBlogcategoryChange = (e) => {
    setSelectedBlogcategory(e.target.value);
  };

  // Submit handler
  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const formData = new FormData();
      formData.append("title", title);
      formData.append("slug", slug);
      formData.append("description", description);
      formData.append("blogcategory", selectedBlogcategory);
      formData.append("source", source);
      formData.append("date", date);
      formData.append("status", status);
      formData.append("metatitle", metatitle);
      formData.append("metadescription", metadescription);
      formData.append("contentTitle", contentTitle);
      formData.append("contentParagraphs", contentParagraphs);
      formData.append("tags", tags);
      if (logo) {
        formData.append("logo", logo);
      }

      const res = await updateBlogAPI(id, formData);
      toast.success(res.message);

      if (res.status === "success") {
        setTimeout(() => {
          router.push("/cmsroboticlife/my-blog");
        }, 1500);
      }
    } catch (error) {
      alert("Failed to update Blog.");
      console.error(error);
    }
  };

  if (loading) return <p>Loading...</p>;

  return (
    <>
      <form onSubmit={handleSubmit} className="row">
        {/* Upload Logo */}
        <div className="col-lg-12">
          <div className="wrap-custom-file">
            <input
              type="file"
              id="image1"
              accept="image/png, image/gif, image/jpeg"
              onChange={uploadLogo}
            />
            <label
              htmlFor="image1"
              style={
                logoimage
                  ? { 
                      backgroundImage: `url(${logoimage})`,
                      backgroundSize: 'cover',
                      backgroundPosition: 'center',
                      backgroundRepeat: 'no-repeat'
                    }
                  : logo
                  ? { 
                      backgroundImage: `url(${URL.createObjectURL(logo)})`,
                      backgroundSize: 'cover',
                      backgroundPosition: 'center',
                      backgroundRepeat: 'no-repeat'
                    }
                  : undefined
              }
            >
              <span>
                <i className="flaticon-download"></i> Upload Photo{" "}
              </span>
            </label>
          </div>
          <p>*minimum 260px x 260px</p>
        </div>

        {/* Blog Category */}
        <div className="col-lg-6 col-xl-6">
          <div className="my_profile_setting_input ui_kit_select_search form-group">
            <label htmlFor="BlogcategorySelect">Select Blog category *</label>
            <select
              id="BlogcategorySelect"
              className="selectpicker form-select"
              value={selectedBlogcategory}
              onChange={handleBlogcategoryChange}
              data-live-search="true"
              data-width="100%"
            >
              <option value="">-- Select Blog category --</option>
              {blogcategories.map((blogcategory) => (
                <option key={blogcategory._id} value={blogcategory._id}>
                  {blogcategory.title}
                </option>
              ))}
            </select>
          </div>
        </div>

        {/* Blog Title */}
        <div className="col-lg-6 col-xl-6">
          <div className="my_profile_setting_input form-group">
            <label htmlFor="BlogTitle">Blog Title *</label>
            <input
              type="text"
              className="form-control"
              id="BlogTitle"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
            />
          </div>
        </div>

        {/* Blog Slug */}
        <div className="col-lg-6 col-xl-6">
          <div className="my_profile_setting_input form-group">
            <label htmlFor="BlogSlug">Blog Slug (SEO URL)</label>
            <input
              type="text"
              className="form-control"
              id="BlogSlug"
              value={slug}
              disabled // ✅ disable manual editing
            />
          </div>
        </div>

        {/* Source */}
        <div className="col-lg-6 col-xl-6">
          <div className="my_profile_setting_input form-group">
            <label htmlFor="blogSource">Blog Source</label>
            <input
              type="text"
              className="form-control"
              id="blogSource"
              value={source}
              onChange={(e) => setSource(e.target.value)}
            />
          </div>
        </div>

        {/* Date */}
        <div className="col-lg-6 col-xl-6">
          <div className="my_profile_setting_input form-group">
            <label htmlFor="blogDate">Blog Date</label>
            <input
              type="date"
              className="form-control"
              id="blogDate"
              value={date}
              onChange={(e) => setDate(e.target.value)}
            />
          </div>
        </div>

        {/* Description */}
        <div className="col-lg-12">
          <div className="my_profile_setting_textarea form-group">
            <label htmlFor="BlogDescription">Description *</label>
            <textarea
              id="BlogDescription"
              className="form-control"
              rows="7"
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              placeholder="Enter Blog description"
            ></textarea>
          </div>
        </div>

        {/* Content Title */}
        <div className="col-lg-12">
          <div className="my_profile_setting_input form-group">
            <label htmlFor="contentTitle">Content Title</label>
            <input
              type="text"
              className="form-control"
              id="contentTitle"
              value={contentTitle}
              onChange={(e) => setContentTitle(e.target.value)}
              placeholder="Enter content title"
            />
          </div>
        </div>

        {/* Content Paragraphs */}
        <div className="col-lg-12">
          <div className="my_profile_setting_textarea form-group">
            <label htmlFor="contentParagraphs">Content Paragraphs</label>
            <textarea
              id="contentParagraphs"
              className="form-control"
              rows="10"
              value={contentParagraphs}
              onChange={(e) => setContentParagraphs(e.target.value)}
              placeholder="Enter detailed content paragraphs"
            ></textarea>
          </div>
        </div>

        {/* Tags */}
        <div className="col-lg-12">
          <div className="my_profile_setting_input form-group">
            <label htmlFor="blogTags">Tags</label>
            <input
              type="text"
              className="form-control"
              id="blogTags"
              value={tags}
              onChange={(e) => setTags(e.target.value)}
              placeholder="Enter tags separated by commas (e.g., robotics, AI, technology)"
            />
            <small className="text-muted">Separate multiple tags with commas</small>
          </div>
        </div>

        {/* Status */}
        <div className="col-lg-6 col-xl-6">
          <div className="my_profile_setting_input ui_kit_select_search form-group">
            <label>Status</label>
            <select
              className="selectpicker form-select"
              data-live-search="true"
              data-width="100%"
              value={status ? "active" : "deactive"}
              onChange={(e) => setStatus(e.target.value === "active")}
            >
              <option value="active">Active</option>
              <option value="deactive">Deactive</option>
            </select>
          </div>
        </div>

        {/* Meta */}
        <div className="mt30">
          <div className="col-lg-12">
            <h3 className="mb30">Meta Information</h3>
          </div>
          <div className="row">
            <div className="col-lg-12">
              <div className="my_profile_setting_input form-group">
                <label htmlFor="blogMetatitle">Meta Title</label>
                <input
                  type="text"
                  className="form-control"
                  id="blogMetatitle"
                  value={metatitle}
                  onChange={(e) => setMetatitle(e.target.value)}
                />
              </div>
            </div>
            <div className="col-lg-12">
              <div className="my_profile_setting_textarea form-group">
                <label htmlFor="blogMetaDescription">Meta Description</label>
                <textarea
                  id="blogMetaDescription"
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
              onClick={() => router.push("/cmsroboticlife/my-blog")}
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
