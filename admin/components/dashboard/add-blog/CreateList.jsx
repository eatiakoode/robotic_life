"use client";

import { useEffect, useState } from "react";
import { addBlogAPI } from "../../../api/blog";
import { useRouter, useParams } from "next/navigation";

import { getBlogcategoryTableData } from "../../../api/blogcategory";
import { toast } from 'react-toastify';
const CreateList = () => {
  const router = useRouter();
   const [title, setTitle] = useState("");
   const [slug, setSlug] = useState("");
   const [description, setDescription] = useState("");
   const [source, setSource] = useState("");
   const [date, setDate] = useState("");
    const [error, setError] = useState("");
    const [logo, setLogo] = useState(null);
    const [blogcategories, setBlogcategories] = useState([]);
  const [selectedBlogcategory, setSelectedBlogcategory] = useState("");
  const [metatitle, setMetatitle] = useState([]);
  const [metadescription, setMetaDescription] = useState([]);
   const [isSubmitting, setisSubmitting] = useState("");
useEffect(() => {
  const fetchBlogcategories = async () => {
    try {
      const response = await getBlogcategoryTableData();
     
      setBlogcategories(response || []);
    } catch (err) {
      console.error("Error fetching Blogcategory:", err);
    }
  };

  fetchBlogcategories();
}, []);
    // upload profile
    const uploadLogo = (e) => {
        setLogo(e.target.files[0]);
    };
  
    const handleTitleChange = (e) => {
      setTitle(e.target.value);
  
      // ✅ Clear the error when user starts typing
      if (e.target.value.trim() !== "") {
        setError("");
      }
    };
    const handleSlugChange = (e) => {
      setSlug(e.target.value);
  
      // ✅ Clear the error when user starts typing
      if (e.target.value.trim() !== "") {
        setError("");
      }
    };
    const handleBlogcategoryChange = (e) => {
      setSelectedBlogcategory(e.target.value);
    };
    const addBlog = async (e) => {
      e.preventDefault();
      setisSubmitting(true)
    
      if (!title.trim()) {
        setError("Title is required");
        return;
      }
      if (!slug.trim()) {
        setError("Slug is required");
        return;
      }
    
      setError("");
    
      try {
        const formData = new FormData();
        formData.append("title", title);
        formData.append("slug", slug);
        formData.append("description", description);
        formData.append("source", source);
        formData.append("date", date);
        formData.append("metatitle", metatitle);
        formData.append("metadescription", metadescription);
        formData.append("blogcategory", selectedBlogcategory);
        if (logo) {
          formData.append("logo", logo);
        }
        
    
        const data = await addBlogAPI(formData); // Use FormData here
        
         toast.success(data.message);
        
         if(data.status=="success"){
         setTimeout(() => {
          router.push("/cmswegrow/my-blog");
          }, 1500); 
        }
    
        setTitle("");
        setDescription("");
        setSlug("");
        setLogo(null);
      } catch (error) {
        setError(error.message);
      }
    };
    
    
  return (
    <>
    <form onSubmit={addBlog} className="row">
    <div className="col-lg-12">
                <div className="wrap-custom-file">
                    <input
                        type="file"
                        id="image1"
                        accept="image/png, image/gif, image/jpeg"
                        onChange={uploadLogo}
                    />
                    <label
                        style={
                            logo !== null
                                ? {
                                      backgroundImage: `url(${URL.createObjectURL(
                                          logo
                                      )})`,
                                  }
                                : undefined
                        }
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
          <div className="my_profile_setting_input ui_kit_select_search form-group">
            <label htmlFor="BlogcategorySelect">Select Blog category</label>
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
      <div className="col-lg-6 col-xl-6">
        <div className="my_profile_setting_input form-group">
          <label htmlFor="blogTitle">Blog Title</label>
          <input type="text" className="form-control" id="blogTitle" value={title} onChange={handleTitleChange} />
          {error && <p className="text-red-500 text-sm mt-1">{error}</p>}
        </div>
      </div>
      <div className="col-lg-6 col-xl-6">
        <div className="my_profile_setting_input form-group">
          <label htmlFor="blogSlug">Blog Slug (SEO URL)</label>
          <input type="text" className="form-control" id="blogSlug" value={slug} onChange={handleSlugChange} />
          {error && <p className="text-red-500 text-sm mt-1">{error}</p>}
        </div>
      </div>
      <div className="col-lg-6 col-xl-6">
        <div className="my_profile_setting_input form-group">
          <label htmlFor="blogSource">Blog Source</label>
          <input type="text" className="form-control" id="blogSource" value={source} onChange={(e) => setSource(e.target.value)} />
          {error && <p className="text-red-500 text-sm mt-1">{error}</p>}
        </div>
      </div>
      <div className="col-lg-6 col-xl-6">
        <div className="my_profile_setting_input form-group">
          <label htmlFor="blogDate">Blog Date</label>
          <input type="date" className="form-control" id="blogDate" value={date} onChange={(e) => setDate(e.target.value)} />
          {error && <p className="text-red-500 text-sm mt-1">{error}</p>}
        </div>
      </div>
      {/* End .col */}
      <div className="col-lg-12">
          <div className="my_profile_setting_textarea form-group">
            <label htmlFor="blogDescription">Description</label>
            <textarea id="blogDescription" className="form-control" rows="7"  value={description} onChange={(e) => setDescription(e.target.value)}  placeholder="Enter blog description"></textarea>
            {error.description && <span className="text-danger">{error.description}</span>}
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
          <label htmlFor="blogMetatitle">Meta Title</label>
         
          <input type="text"
              className="form-control"
              id="blogMetatitle"
              value={metatitle}
              onChange={(e) => setMetatitle(e.target.value)} />
        </div>
      </div>
      <div className="col-lg-12">
          <div className="my_profile_setting_textarea form-group">
            <label htmlFor="blogMetaDescription">Meta Description</label>
            <textarea id="blogMetaDescription" className="form-control" rows="7"  value={metadescription} onChange={(e) => setMetaDescription(e.target.value)}  placeholder="Enter meta description"></textarea>
            {error.metadescription && <span className="text-danger">{error.metadescription}</span>}
          </div>
          
        </div>
        

      {/* End .col */}
      </div>
      
                  </div>


      <div className="col-xl-12">
        <div className="my_profile_setting_input">
          <button className="btn btn1 float-start" type="button" onClick={() => window.location.href = '/cmswegrow/my-dashboard'}>Back</button>
          <button type="submit" className="btn btn2 float-end" disabled={isSubmitting} >{isSubmitting ? 'Sending...' : 'Submit'}</button>
        </div>
      </div>
      </form>
    </>
  );
};

export default CreateList;
