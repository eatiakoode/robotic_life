"use client";

import { useEffect, useState } from "react";
import { useRouter, useParams } from "next/navigation";
import { getOperatingEnvironmentById, updateOperatingEnvironmentAPI } from "@/api/operatingenvironment";
import { toast } from 'react-toastify';

const CreateList = () => {
  const params = useParams();
  const id = params?.id;
  const router = useRouter();
  const [operatingEnvironment, setOperatingEnvironment] = useState({ name: "", status: false, description: "" });
  const [title, setTitle] = useState("");
  // const [slug, setSlug] = useState("");
  const [status, setStatus] = useState("");
  const [loading, setLoading] = useState(true);
  // const [description, setDescription] = useState("");
  const [error, setError] = useState("");
  // const [logo, setLogo] = useState(null);
  // const [logoimage, setLogoImage] = useState(null);
  // const [metatitle, setMetatitle] = useState("");
  // const [metadescription, setMetaDescription] = useState("");
  // const uploadLogo = (e) => {
  //   setLogo(e.target.files[0]);
  //   setLogoImage("")

  // };
  useEffect(() => {
    if (!id) return;
    const fetchOperatingEnvironment = async () => {
      try {
        const data = await getOperatingEnvironmentById(id);
        setTitle(data.name)
        // setSlug(data.slug)
        setStatus(Boolean(data.status))
        // setDescription(data.description || "")
        // setMetatitle(data.metaTitle || "")
        // setMetaDescription(data.metaDescription || "")
        if (data.logoImage) {
          setLogoImage(process.env.NEXT_PUBLIC_API_URL + data.logoImage)
        }
      } catch (error) {
        console.error("Error fetching Operating Environment:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchOperatingEnvironment();
  }, [id]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const formData = new FormData();
      formData.append("name", title);
      // formData.append("slug", slug);
      // formData.append("description", description);
      formData.append("status", status);
      // formData.append("metaTitle", metatitle);
      // formData.append("metaDescription", metadescription);
      // if (logo) {
      //   formData.append("logo", logo);
      // }
      const data = await updateOperatingEnvironmentAPI(id, title);
      // alert("Manufacturer updated successfully!");
      // router.push("/cmswegrow/my-manufacturer");
      toast.success(data.message);
      if (data.status == "success") {
        setTimeout(() => {
          router.push("/cmswegrow/my-operatingenvironment");
        }, 1500);
      }
    } catch (error) {
      alert("Failed to update Operating Environment.");
      console.error(error);
    }
  };

  // const handleChange = (e) => {
  //   setBuilder((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  // };

  // const handleStatusChange = () => {
  //   setBuilder((prev) => ({ ...prev, status: !prev.status }));
  // };

  if (loading) return <p>Loading...</p>;
  return (
    <>
      <form onSubmit={handleSubmit} className="row">
        {/* <div className="col-lg-12">
          <div className="wrap-custom-file">
            <input
              type="file"
              id="image1"
              accept="image/png, image/gif, image/jpeg, image/svg+xml, image/svg, image/webp, image/avif"
              onChange={uploadLogo}
            />
            <label
              htmlFor="image1"
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
            >
              <span>
                <i className="flaticon-download"></i> Upload Photo{" "}
              </span>
            </label>
          </div>
          <p>*minimum 260px x 260px</p>
        </div> */}
        {/* End .col */}
        <div className="col-lg-6 col-xl-6">
          <div className="my_profile_setting_input form-group">
            <label htmlFor="operatingEnvironmentTitle">Operating Environment Title</label>
            <input
              type="text"
              className="form-control"
              id="operatingEnvironmentTitle"
              name="title"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
            />
          </div>
        </div>
        {/* End .col */}
        {/* <div className="col-lg-6 col-xl-6">
          <div className="my_profile_setting_input form-group">
            <label htmlFor="powerSourceSlug">Power Source Slug</label>
            <input
              type="text"
              className="form-control"
              id="powerSourceSlug"
              name="slug"
              value={slug}
              onChange={(e) => setSlug(e.target.value)}
            />
          </div>
        </div> */}
        {/* End .col */}
        {/* <div className="col-lg-12">
          <div className="my_profile_setting_textarea form-group">
            <label htmlFor="powerSourceDescription">Description</label>
            <textarea id="powerSourceDescription" className="form-control" name="description" rows="7" value={description} onChange={(e) => setDescription(e.target.value)} placeholder="Enter Power Source description"></textarea>
            {error.description && <span className="text-danger">{error.description}</span>}
          </div>
        </div> */}
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

        {/* <div className=" mt30 ">
          <div className="col-lg-12">
            <h3 className="mb30">Meta Information</h3>
          </div>
          <div className="row">
            <div className="col-lg-12">
              <div className="my_profile_setting_input form-group">
                <label htmlFor="powerSourceMetatitle">Meta Title</label>

                <input type="text"
                  className="form-control"
                  id="powerSourceMetatitle"
                  value={metatitle}
                  onChange={(e) => setMetatitle(e.target.value)} />
              </div>
            </div>
            <div className="col-lg-12">
              <div className="my_profile_setting_textarea form-group">
                <label htmlFor="powerSourceMetaDescription">Meta Description</label>
                <textarea id="powerSourceMetaDescription" className="form-control" rows="7" value={metadescription} onChange={(e) => setMetaDescription(e.target.value)} placeholder="Enter meta description"></textarea>
                {error.metadescription && <span className="text-danger">{error.metadescription}</span>}
              </div>

            </div>
          </div>

        </div> */}


        <div className="col-xl-12">
          <div className="my_profile_setting_input">
            <button className="btn btn1 float-start" type="button" onClick={() => window.location.href = '/cmswegrow/my-operatingenvironment'}>Back</button>
            <button className="btn btn2 float-end">Submit</button>
          </div>
        </div>
      </form>
    </>
  );
};

export default CreateList;
