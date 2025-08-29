"use client";

import { useEffect, useState } from "react";
import { useRouter, useParams } from "next/navigation";
import { getSliderById, updateSliderAPI } from "@/api/slider";
import { toast } from 'react-toastify';
import { SafeImage } from "../../../utils/imageUtils";

const CreateList = () => {
  const params = useParams();
  const id = params?.id;
  const router = useRouter();
  const [slider, setSlider] = useState({ title: "", status: true, description: "" });
  const [title, setTitle] = useState("");
  const [status, setStatus] = useState(true);
  const [loading, setLoading] = useState(true);
  const [description, setDescription] = useState("");
  const [error, setError] = useState("");
  const [images, setImages] = useState(null);
  const [existingImages, setExistingImages] = useState([]);
  const [metatitle, setMetatitle] = useState("");
  const [metadescription, setMetaDescription] = useState("");
  const uploadImages = (e) => {
    setImages(e.target.files[0]);
  };
  useEffect(() => {
    if (!id) return;
    const fetchSlider = async () => {
      try {
        const data = await getSliderById(id);
        setTitle(data.data?.title || data.title || "")
        setStatus(Boolean(data.data?.status ?? data.status ?? true))
        setDescription(data.data?.description || data.description || "")
        setMetatitle(data.data?.metaTitle || data.metaTitle || "")
        setMetaDescription(data.data?.metaDescription || data.metaDescription || "")
        if (data.data?.images || data.images) {
          const imageArray = data.data?.images || data.images;
          setExistingImages(Array.isArray(imageArray) ? imageArray : []);
        }
      } catch (error) {
        console.error("Error fetching slider:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchSlider();
  }, [id]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const formData = new FormData();
      formData.append("title", title);
      formData.append("description", description);
      formData.append("status", status);
      formData.append("metaTitle", metatitle);
      formData.append("metaDescription", metadescription);
      if (images) {
        formData.append("images", images);
      }
      const data = await updateSliderAPI(id, formData);
      toast.success(data.message);
      if (data.status === "success" || data.message) {
        setTimeout(() => {
          router.push("/cmsroboticlife/my-slider");
        }, 1500);
      }
    } catch (error) {
      toast.error("Failed to update slider.");
      console.error(error);
    }
  };

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
              onChange={uploadImages}
            />
            <label
              htmlFor="image1"
              style={{
                ...(existingImages.length > 0
                  ? { backgroundImage: `url(${process.env.NEXT_PUBLIC_API_URL}${existingImages[0]})` }
                  : images
                  ? { backgroundImage: `url(${URL.createObjectURL(images)})` }
                  : {}),
                backgroundSize: "contain",
                backgroundPosition: "center",
                backgroundRepeat: "no-repeat",
              }}
            >
              <span>
                <i className="flaticon-download"></i> Upload Photo{" "}
              </span>
            </label>
          </div>
          <p>*minimum 260px x 260px</p>
          {existingImages.length > 0 && (
            <div className="mt-3">
              <p className="text-muted">Current images:</p>
              <div className="d-flex gap-2">
                {existingImages.map((img, index) => (
                  <SafeImage
                    key={index}
                    src={img}
                    alt={`Slider image ${index + 1}`}
                    width={60}
                    height={60}
                    style={{ objectFit: 'cover' }}
                  />
                ))}
              </div>
            </div>
          )}
        </div>
        {/* End .col */}
        <div className="col-lg-6 col-xl-6">
          <div className="my_profile_setting_input form-group">
            <label htmlFor="sliderTitle">Slider Title</label>
            <input
              type="text"
              className="form-control"
              id="sliderTitle"
              name="title"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
            />
          </div>
        </div>
        {/* End .col */}
        {/* <div className="col-lg-6 col-xl-6">
          <div className="my_profile_setting_input form-group">
            <label htmlFor="sliderSlug">Slider Slug</label>
            <input
              type="text"
              className="form-control"
              id="sliderSlug"
              name="slug"
              value={slug}
              onChange={(e) => setSlug(e.target.value)}
            />
          </div>
        </div> */}
        {/* End .col */}
        <div className="col-lg-12">
          <div className="my_profile_setting_textarea form-group">
            <label htmlFor="sliderDescription">Description</label>
            <textarea id="sliderDescription" className="form-control" name="description" rows="7" value={description} onChange={(e) => setDescription(e.target.value)} placeholder="Enter slider description"></textarea>
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
                <label htmlFor="sliderMetatitle">Meta Title</label>

                <input type="text"
                  className="form-control"
                  id="sliderMetatitle"
                  value={metatitle}
                  onChange={(e) => setMetatitle(e.target.value)} />
              </div>
            </div>
            <div className="col-lg-12">
              <div className="my_profile_setting_textarea form-group">
                <label htmlFor="sliderMetaDescription">Meta Description</label>
                <textarea id="sliderMetaDescription" className="form-control" rows="7" value={metadescription} onChange={(e) => setMetaDescription(e.target.value)} placeholder="Enter meta description"></textarea>
                {error.metadescription && <span className="text-danger">{error.metadescription}</span>}
              </div>

            </div>


            {/* End .col */}
          </div>

        </div>


        <div className="col-xl-12">
          <div className="my_profile_setting_input">
            <button className="btn btn1 float-start" type="button" onClick={() => window.location.href = '/cmsroboticlife/my-slider'}>Back</button>
            <button className="btn btn2 float-end">Submit</button>
          </div>
        </div>
      </form>
    </>
  );
};

export default CreateList;
