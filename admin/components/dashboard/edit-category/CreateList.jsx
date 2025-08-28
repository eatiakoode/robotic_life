"use client"; 

import { useEffect, useState } from "react";
import { useRouter, useParams } from "next/navigation";
import { getCategoryById, updateCategoryAPI, getParentCategoriesAPI } from "@/api/category";
import { toast } from 'react-toastify';

const CreateList = () => {
  const params = useParams();  
  const id = params?.id;  
  const router = useRouter();
  const [name, setName] = useState("");
  const [parentCategory, setParentCategory] = useState("");
  const [parentCategories, setParentCategories] = useState([]);
  const [slug, setSlug] = useState("");
  const [metatitle, setMetatitle] = useState("");
  const [metadescription, setMetaDescription] = useState("");
  const [status, setStatus] = useState(true);
  const [loading, setLoading] = useState(true);
  const [description, setDescription] = useState("");
  const [error, setError] = useState("");  
  const [logo, setLogo] = useState(null);
  const [logoimage, setLogoImage] = useState(null);
  const uploadLogo = (e) => {
    setLogo(e.target.files[0]);
    setLogoImage("");
  };
    useEffect(() => {
      if (!id) return;      
      const fetchCategory = async () => {
        try {
          const [cat, parents] = await Promise.all([
            getCategoryById(id),
            getParentCategoriesAPI(),
          ]);
          setName(cat.name || cat.title || "");
          setSlug(cat.slug || "");
          setStatus(Boolean(cat.status));
          setDescription(cat.description || "");
          setParentCategory((cat.parent && (cat.parent._id || cat.parent)) || "");
          setMetatitle(cat.metatitle || "");
          setMetaDescription(cat.metadescription || "");
          setParentCategories(Array.isArray(parents) ? parents : []);
          const imgPath = cat.logoImage || cat.logoimage;
          if (imgPath) {
            setLogoImage((process.env.NEXT_PUBLIC_API_URL || "") + imgPath);
          }
        } catch (error) {
          console.error("Error fetching Category:", error);
        } finally {
          setLoading(false);
        }
      };

      fetchCategory();
    }, [id]);
  
    const handleSubmit = async (e) => {
      e.preventDefault();
      try {
        const formData = new FormData();
        formData.append("name", name);
        formData.append("title", name);
        formData.append("slug", slug);
        formData.append("description", description);
        formData.append("parent", parentCategory || "");
        formData.append("metatitle", metatitle);
        formData.append("metadescription", metadescription);
        formData.append("status", status ? "true" : "false");
        if (logo) {
          formData.append("logo", logo);
        }
        const data = await updateCategoryAPI(id, formData);
        toast.success(data.message);
        if (data.status == "success") {
          setTimeout(() => {
            router.push("/cmsroboticlife/my-category");
          }, 1500);
        }
      } catch (error) {
        alert("Failed to update Category.");
        console.error(error);
      }
    };
  
    // const handleChange = (e) => {
    //   setCategory((prev) => ({ ...prev, [e.target.name]: e.target.value }));
    // };
  
    // const handleStatusChange = () => {
    //   setCategory((prev) => ({ ...prev, status: !prev.status }));
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
                        accept="image/png, image/gif, image/jpeg, image/svg+xml, image/svg, image/webp, image/avif"
                        onChange={uploadLogo}
                    />
                    <label
                        style={{
                          ...(logoimage
                            ? { backgroundImage: `url(${logoimage})` }
                            : logo
                            ? { backgroundImage: `url(${URL.createObjectURL(logo)})` }
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
          <label htmlFor="categoryTitle">Category Title</label>
          <input type="text" className="form-control" id="categoryTitle" value={name} onChange={(e) => setName(e.target.value)} />
          {error && <p className="text-red-500 text-sm mt-1">{error}</p>}
        </div>
      </div>
      <div className="col-lg-6 col-xl-6">
        <div className="my_profile_setting_input form-group">
          <label htmlFor="categorySlug">Category Slug (SEO URL)</label>
          <input type="text" className="form-control" id="categorySlug" value={slug} onChange={(e) => setSlug(e.target.value)}  />
          {error && <p className="text-red-500 text-sm mt-1">{error}</p>}
        </div>
      </div>
      {/* End .col */}
       <div className="col-lg-6 col-xl-6">
        <div className="my_profile_setting_input form-group">
          <label htmlFor="categoryParent">Parent Category</label>
          <select
            id="categoryParent"
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
      <div className="col-lg-12">
          <div className="my_profile_setting_textarea form-group">
            <label htmlFor="categoryDescription">Description</label>
            <textarea id="categoryDescription" className="form-control" rows="7"  value={description} onChange={(e) => setDescription(e.target.value)}  placeholder="Enter category description"></textarea>
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
            value={status ? "true" : "false"}
            onChange={(e) => setStatus(e.target.value === "true")}
          >
            <option value="true">Active</option>
            <option value="false">Deactive</option>
          </select>
        </div>
      </div>
      {/* End .col */}

     {/* End .col */}
      <div className=" mt30 ">
                    <div className="col-lg-12">
                      <h3 className="mb30">Meta Information</h3>
                    </div>
                    <div className="row">
                    <div className="col-lg-12">
        <div className="my_profile_setting_input form-group">
          <label htmlFor="propertyMetatitle">Meta Title</label>
         
          <input type="text"
              className="form-control"
              id="propertyMetatitle"
              value={metatitle}
              onChange={(e) => setMetatitle(e.target.value)} />
        </div>
      </div>
      <div className="col-lg-12">
          <div className="my_profile_setting_textarea form-group">
            <label htmlFor="propertyMetaDescription">Meta Description</label>
            <textarea id="propertyMetaDescription" className="form-control" rows="7"  value={metadescription} onChange={(e) => setMetaDescription(e.target.value)}  placeholder="Enter meta description"></textarea>
            {error.metadescription && <span className="text-danger">{error.metadescription}</span>}
          </div>
          
        </div>
        

      {/* End .col */}
      </div>
      </div>


      <div className="col-xl-12">
        <div className="my_profile_setting_input">
          <button className="btn btn1 float-start" type="button" onClick={() => window.location.href = '/cmsroboticlife/my-dashboard'}>Back</button>
          <button type="submit" className="btn btn2 float-end" >Submit</button>
        </div>
      </div>
      </form>
    </>
  );
};

export default CreateList;
