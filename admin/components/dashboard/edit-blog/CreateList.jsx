"use client"; 

import { useEffect, useState } from "react";
import { useRouter, useParams } from "next/navigation";
import { getBlogById, updateBlogAPI } from "../../../api/blog";
import { getBlogcategoryTableData } from "../../../api/blogcategory";
import { toast } from 'react-toastify';


const CreateList = () => {
  
  const params = useParams();  
    const id = params?.id;  
    const router = useRouter();
    const [blog, setBlog] = useState({ title: "", status: false,description: "", });
    const [title, setTitle] = useState("");
    const [slug, setSlug] = useState("");
    const [status, setStatus] = useState("");
    const [loading, setLoading] = useState(true);
    const [source, setSource] = useState("");
   const [date, setDate] = useState("");
    const [description, setDescription] = useState("");
    const [error, setError] = useState("");  
    const [logo, setLogo] = useState(null);
    const [logoimage, setLogoImage] = useState(null);
    const [metatitle, setMetatitle] = useState([]);
  const [metadescription, setMetaDescription] = useState([]);
    const uploadLogo = (e) => {
      setLogoImage("")
      setLogo(e.target.files[0]);
  };
  const [blogcategories, setBlogcategories] = useState([]);
  const [selectedBlogcategory, setSelectedBlogcategory] = useState("");
    useEffect(() => {
      if (!id) return;      
      const fetchBlog = async () => {
        try {
          const data = await getBlogById(id);
          // setBlog({ title: data.data.title, status: data.data.status, description: data.data.description });
          setTitle(data.data.title)
          setSlug(data.data.slug)
          setStatus(data.data.status)
          setDescription(data.data.description)
          setSource(data.data.source)
          setDate(data.data.date)
          setMetatitle(data.data.metatitle)
          setMetaDescription(data.data.metadescription)
          
          setSelectedBlogcategory(data.data.blogcategory)
          if(data.data.logoimage) {
          setLogoImage(process.env.NEXT_PUBLIC_API_URL+data.data.logoimage)
          }
        } catch (error) {
          console.error("Error fetching Blog:", error);
        } finally {
          setLoading(false);
        }
      };
  
      fetchBlog();
      const fetchBlogcategories = async () => {
            try {
              const response = await getBlogcategoryTableData();
              
              setBlogcategories(response || []);
            } catch (err) {
              console.error("Error fetching Blogcategory:", err);
            }
          };
      
          fetchBlogcategories();
    }, [id]);
    const handleBlogcategoryChange = (e) => {
      setSelectedBlogcategory(e.target.value);
    };
  
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
        if (logo) {
          formData.append("logo", logo);
        }
       const res = await updateBlogAPI(id, formData);
        // alert("Blog updated successfully!");
        toast.success(res.message);
         
         if(res.status=="success"){
            setTimeout(() => {
              router.push("/cmsroboticlife/my-blog");
              }, 1500); 
          }
      } catch (error) {
        alert("Failed to update Blog.");
        console.error(error);
      }
    };
  
    // const handleChange = (e) => {
    //   setBlog((prev) => ({ ...prev, [e.target.name]: e.target.value }));
    // };
  
    // const handleStatusChange = () => {
    //   setBlog((prev) => ({ ...prev, status: !prev.status }));
    // };
  
    if (loading) return <p>Loading...</p>;
  return (
    <>
    <form onSubmit={handleSubmit} className="row">
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
                        ? { backgroundImage: `url(${logoimage})` }
                          : logo
                          ? { backgroundImage: `url(${URL.createObjectURL(logo)})` }
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
          <label htmlFor="BlogTitle">Blog Title</label>
          <input
        type="text"
        className="form-control"
        id="BlogTitle"
        name="title"
        value={title}
        onChange={(e) => setTitle(e.target.value)}
      />
        </div>
      </div>
      {/* End .col */}
      <div className="col-lg-6 col-xl-6">
        <div className="my_profile_setting_input form-group">
          <label htmlFor="BlogSlug">Blog Slug (SEO URL)</label>
          <input
        type="text"
        className="form-control"
        id="BlogSlug"
        name="slug"
        value={slug}
        onChange={(e) => setSlug(e.target.value)}
      />
        </div>
      </div>
      {/* End .col */}
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
      <div className="col-lg-12">
          <div className="my_profile_setting_textarea form-group">
            <label htmlFor="BlogDescription">Description</label>
            <textarea id="BlogDescription" className="form-control" name="description" rows="7"  value={description} onChange={(e) => setDescription(e.target.value)} placeholder="Enter Blog description"></textarea>
            {error.description && <span className="text-danger">{error.description}</span>}
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
  value={status ? "active" : "deactive"}
  onChange={(e) => setStatus(e.target.value === "active")}
>
        <option value="active">Active</option>
        <option value="deactive">Deactive</option>
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
          <button className="btn btn1 float-start" type="button" onClick={() => window.location.href = '/cmsroboticlife/my-blog'}>Back</button>
          <button className="btn btn2 float-end">Submit</button>
        </div>
      </div>
      </form>
    </>
  );
};

export default CreateList;
