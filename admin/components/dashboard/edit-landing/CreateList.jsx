"use client";

import { useState, useEffect } from "react";
import { useRouter, useParams } from "next/navigation";
import { getAmenityTableData } from "../../../api/amenity";
import { MultiSelectInput } from 'multi-select-input';
import { getFaqTableData } from "../../../api/faq";

import selectedFiles from "../../../utils/selectedFiles";
import Image from "next/image";
import {  getLandingpageById,updateLandingpageAPI } from "../../../api/landingpage";
import {  deleteLandingImagesAPI } from "../../../api/landingimage";
import {  deletePropertyplanAPI } from "../../../api/landingplan";
import {  deletePaymentplanAPI } from "../../../api/landingpayment";

import { toast } from 'react-toastify';



const CreateList = () => {
  const params = useParams();  
      const id = params?.id; 
      // const [landingpage, setLandingpage] = useState([]);
  const [inputs, setInputs] = useState([]);
  const [landingPlanInputGet, setLandingPlanInputGet] = useState([]);
  const [inputsget, setInputsget] = useState([]);
  const handleAddInput = () => {
    setInputs([
      ...inputs,
      {
        id: Date.now(),
        title: '',
        areasize: '',
        planimage: null
      }
    ]);
  };
  const handleInputChangeGet = (index, field, value) => {
    // alert("test")
    const updated = [...inputsget];
    updated[index][field] = value;
    setInputsget(updated);
  };
  const uploadPlanImageGet = (index, file) => {
    // alert("yse")
    const updatedInputs = [...inputsget];
    updatedInputs[index].planimageget = file;
    updatedInputs[index].planimageurl = null;
    
    setInputsget(updatedInputs);
    
  };
  const handleInputChange = (index, field, value) => {
    const updated = [...inputs];
    updated[index][field] = value;
    setInputs(updated);
  };
  const handleRemoveInput = (idToRemove) => {
    setInputs(inputs.filter((input) => input.id !== idToRemove));
  };
  const handleRemoveInputGet = async (_id) => {
    const isConfirmed = window.confirm("Are you sure you want to delete this plan?");
    if (!isConfirmed) return;
      try {
        // alert("test")
        const data = await deletePropertyplanAPI(_id); // 🔹 Call the API function
        // alert("test")
        const deleted = landingPlanInputGet?.filter((file) => file._id !== _id);
        setLandingPlanInputGet(deleted);
        //setTitle(""); // ✅ Reset input after success
      } catch (error) {
        alert("Failed to delete property Image.");
        
      }
  };
  const handleRemoveInputpaymentget = async (_id) => {
    const isConfirmed = window.confirm("Are you sure you want to delete this plan?");
    if (!isConfirmed) return;
      try {
        // alert("test")
        const data = await deletePaymentplanAPI(_id); // 🔹 Call the API function
        // alert("test")
        const deleted = landingPaymentInputGet?.filter((file) => file._id !== _id);
        setLandingPaymentInputGet(deleted);
        //setTitle(""); // ✅ Reset input after success
      } catch (error) {
        alert("Failed to delete property Image.");
        
      }
  };
  const deleteImageGet = async (_id) => {
        const isConfirmed = window.confirm("Are you sure you want to delete this image?");
        if (!isConfirmed) return;
        
        // const deletePropertyImages = async (id) => {
          // const isConfirmed = window.confirm("Are you sure you want to delete this Blog?");
          // if (!isConfirmed) return;
      
          try {
            // alert("test")
            const data = await deleteLandingImagesAPI(_id); // 🔹 Call the API function
            // alert("test")
            const deleted = gallerySelectedImgsget?.filter((file) => file._id !== _id);
            setGallerySelectedImgsGet(deleted);
            //setTitle(""); // ✅ Reset input after success
          } catch (error) {
            alert("Failed to delete property Image.");
            //setError(error.message); // ❌ Show error if request fails
          }
        // };
        // deletePropertyImages(id)
      };
  const uploadPlanImage = (index, file) => {
    const updatedInputs = [...inputs];
    updatedInputs[index].planimage = file;
    setInputs(updatedInputs);
  };

  const [inputspayment, setInputspayment] = useState([]);
  const [landingPaymentInputGet, setLandingPaymentInputGet] = useState([]);
  const [inputspaymentget, setPaymentInputsget] = useState([]);
  const handleAddInputpayment = () => {
    setInputspayment([
      ...inputspayment,
      {
        id: Date.now(),
        title: '',
        areasize: '',
        price: ''
      }
    ]);
  };
  const handleInputChangepayment = (index, field, value) => {
    const updated = [...inputspayment];
    updated[index][field] = value;
    setInputspayment(updated);
  };
  const handleInputChangepaymentget = (index, field, value) => {
    // alert("test")
    const updated = [...inputspaymentget];
    updated[index][field] = value;
    setPaymentInputsget(updated);
  };
  
  const handleRemoveInputpayment = (idToRemove) => {
    setInputspayment(inputspayment.filter((input) => input.id !== idToRemove));
  };
 
  const [value, setValue] = useState([]);
  const [valueget, setValueGet] = useState([]);
  const [options, setOptions] = useState([]);
  const [filteredOptions, setFilteredOptions] = useState([]);

  const router = useRouter();
  const [error, setError] = useState("");
  // --- State Hooks ---
const [title, setTitle] = useState("");
const [slug, setSlug] = useState("");
const [bannerimage, setBannerImage] = useState(null);

const [bannerimageget, setBannerImageGet] = useState(null);
  const [bannertitle , setBannerTitle] = useState([]);
  const [bannerdescription, setBannerDescription] = useState([]);
  const [bannerreview, setBannerReview] = useState([]);

  const [aboutimage, setAboutImage] = useState(null);
  const [aboutimageget, setAboutImageGet] = useState(null);
  const [abouttitle , setAboutTitle] = useState([]);
  const [aboutdescription, setAboutDescription] = useState([]);

  const [amenities, setAmenities] = useState([]);
const [selectedAmenity, setSelectedAmenity] = useState("");

 

  const [metatitle, setMetatitle] = useState([]);
  const [metadescription, setMetaDescription] = useState([]);
  const [status, setStatus] = useState("");

  // upload profile
  const uploadBannerImage = (e) => {
    setBannerImageGet("");
      setBannerImage(e.target.files[0]);
  };
  // upload profile
  const uploadAboutImage = (e) => {
    setAboutImageGet("");
    setAboutImage(e.target.files[0]);
};
  
    
    
  
    
// --- Fetch Initial Data ---
useEffect(() => {
  const fetchData = async () => {
    try {
      const filter = {
    limit: 1000,
    page:  1
  }
      const [ amenityRes] = await Promise.all([
        
        getAmenityTableData(filter),
      ]);

      
      setAmenities(amenityRes.items || []);
    } catch (err) {
      console.error("Error loading initial data:", err);
    }
  };
  fetchData();
}, []);
useEffect(() => {
  const selectedFaqs = valueget;
  if (options.length > 0) {
    const selectedFaqObjects = options.filter(opt =>
      selectedFaqs.includes(opt.value)
    );
    setValue(selectedFaqObjects);
  }
}, [options,valueget]);
useEffect(() => {
  // Fetch data and set options
  const fetchData = async () => {
    try {
      const filter ={
     
      "limit":1000,
      "page":1
    };
      const data = await getFaqTableData(filter); // Make sure this returns the expected format
      const mappedOptions = data?.items.map((item) => ({
        label: item.title,
        value: item._id,
      }));
      setOptions(mappedOptions);
      setFilteredOptions(mappedOptions); // Initialize filteredOptions
    } catch (error) {
      console.error("Failed to fetch FAQ data:", error);
    }
  };

  fetchData();
}, []);
// --- Handlers ---
// useEffect(() => {
//   if (data?.faqid && options.length > 0) {
//     const selectedFaqs = options.filter(opt => data.faqid.includes(opt.value));
//     setValue(selectedFaqs);
//   }
// }, [data.faqid, options]);
useEffect(() => {
        const fetchLandingpage = async () => {
          try {
            const data = await getLandingpageById(id);
            setTitle(data.data.title)
            setSlug(data.data.slug)
            setBannerTitle(data.data.bannertitle)
            setBannerDescription(data.data.bannerdescription)
            setBannerReview(data.data.bannerreview)
            setAboutTitle(data.data.abouttitle)
            setAboutDescription(data.data.aboutdescription)
            setSelectedAmenity(data.data.amenityid)
           const faqIds = data.data.faqid;
const selectedFaqObjects = options.filter(opt => faqIds.includes(opt.value));
          
            setValue(selectedFaqObjects);
            setValueGet(faqIds)     
            setMetatitle(data.data.metatitle)
            setMetaDescription(data.data.metadescription)
            setStatus(data.data.status)
            if(data.data.bannerimage) {
              setBannerImageGet(process.env.NEXT_PUBLIC_API_URL+data.data.bannerimage)
            }
            if(data.data.aboutimage) {
              setAboutImageGet(process.env.NEXT_PUBLIC_API_URL+data.data.aboutimage)
            }
            setGallerySelectedImgsGet(data.data.galleryimages)
            setLandingPlanInputGet(data.data.floorplan);
            setInputsget(data.data.floorplan);
            setLandingPaymentInputGet(data.data.paymentplan);
            setPaymentInputsget(data.data.paymentplan);
          } catch (error) {
            alert("Failed to update Blog.");
            console.error(error);
          }
        }
        fetchLandingpage();
      }, [id]);
const handleAmenityChange = (e) => {
  const { value, checked } = e.target;

  setSelectedAmenity((prev) => {
    if (checked) {
      return [...prev, value]; // add to selection
    } else {
      return prev.filter((id) => id !== value); // remove from selection
    }
  });
};

 const [gallerySelectedImgs, setGallerySelectedImgs] = useState([]);
 const [gallerySelectedImgsget, setGallerySelectedImgsGet] = useState([]);
 
  
    // multiple image select
    const multipleImage = (e) => {
      // checking is same file matched with old stored array
      const isExist = gallerySelectedImgs?.some((file1) =>
        selectedFiles(e)?.some((file2) => file1.name === file2.name)
      );
  
      if (!isExist) {
        // setGallerySelectedImgs((old) => [...old, ...selectedFiles(e)]);
        setGallerySelectedImgs((old) => [...(Array.isArray(old) ? old : []), ...selectedFiles(e)]);

      } else {
        alert("You have selected one image already!");
      }
    };
  
    // delete image
    const deleteImage = (name) => {
      const deleted = gallerySelectedImgs?.filter((file) => file.name !== name);
      setGallerySelectedImgs(deleted);
    };
// --- Submit ---
const updateLanding = async (e) => {
 
  e.preventDefault();
  const newErrors = {};
  
  const requiredFields = [
    { key: "title", value: title, name: "Title" },
    { key: "slug", value: slug, name: "Slug" },
    { key: "bannertitle", value: bannertitle, name: "Banner title" },
    { key: "bannerdescription", value: bannerdescription, name: "Banner Description" },
    { key: "bannerreview", value: bannerreview, name: "Banner Raview" },
    { key: "abouttitle", value: abouttitle, name: "About title" },
    { key: "aboutdescription", value: aboutdescription, name: "About Description" },
    { key: "metatitle", value: metatitle, name: "Meta Title" },
    { key: "metadescription", value: metadescription, name: "Meta Description" },
   
  ];

  requiredFields.forEach(field => {
    if (!field.value || (typeof field.value === "string" && !field.value.trim())) {
      newErrors[field.key] = `${field.name} is required`;
    }
  });

  if (Object.keys(newErrors).length > 0) {
    return setError(newErrors);
  }

  try {
    
    const payload = {
      title, slug, bannerimage,bannertitle, bannerdescription,bannerreview, aboutimage, abouttitle, aboutdescription,
      amenityid: selectedAmenity,
      faqs:JSON.stringify(value),
      metatitle, metadescription,
      // gallerySelectedImgs:JSON.stringify(gallerySelectedImgs),
    };
    
    
    const formData = new FormData();
    gallerySelectedImgs.forEach((file,index) => {
      formData.append(`gallerySelectedImgs[${index}]`, file); // Repeat key name for each file
    });
    // Loop over each key-value pair in the payload
    for (const key in payload) {
      if (payload[key] !== undefined && payload[key] !== null) {
        formData.append(key, payload[key]);
      }
    }
    inputs.forEach((input, index) => {
      formData.append(`floorPlans[${index}][title]`, input.title);
      formData.append(`floorPlans[${index}][areasize]`, input.areasize);
      if (input.planimage) {
        formData.append(`floorPlans[${index}][planimage]`, input.planimage);
      }

    });
    inputsget.forEach((input, index) => {
      formData.append(`floorPlansget[${index}][title]`, input.title);
      formData.append(`floorPlansget[${index}][areasize]`, input.areasize);
      formData.append(`floorPlansget[${index}][planid]`, input._id);
      if (input.planimageget) {
        formData.append(`floorPlansget[${index}][planimageget]`, input.planimageget);
      }

    });
    inputspayment.forEach((input, index) => {
      formData.append(`paymentPlans[${index}][title]`, input.title);
      formData.append(`paymentPlans[${index}][areasize]`, input.areasize);
      formData.append(`paymentPlans[${index}][price]`, input.price);
    });

    inputspaymentget.forEach((input, index) => {
      formData.append(`paymentPlansget[${index}][title]`, input.title);
      formData.append(`paymentPlansget[${index}][areasize]`, input.areasize);
      formData.append(`paymentPlansget[${index}][price]`, input.price);      
      formData.append(`paymentPlansget[${index}][paymentid]`, input._id);
    });

    


    const data = await updateLandingpageAPI(id,formData);
    // router.push("/cmswegrow/my-landing");
    // alert(res.message);
     toast.success(data.message);
    if(data.status=="success"){
      setTimeout(() => {
      router.push("/cmswegrow/my-landing");
      }, 1500); 
    }

    // Reset fields and errors
    setError({});
    // (Reset other fields here if needed)
  } catch (err) {
    setError({ general: err.message || "Something went wrong" });
  }
};



  return (
    <>
    <form onSubmit={updateLanding} className="row">
      <div className="col-lg-6">
        <div className="my_profile_setting_input form-group">
          <label htmlFor="propertyTitle">Property Title</label>
          <input type="text" className="form-control"  id="propertyTitle" value={title} onChange={(e) => setTitle(e.target.value)}  placeholder="Enter property Title"/>
          {error.title && <span className="text-danger">{error.title}</span>}

        </div>
      </div>
        <div className="col-lg-6">
          <div className="my_profile_setting_input form-group">
            <label htmlFor="propertySlug">Property Slug (SEO URL)</label>
            <input type="text" className="form-control"  id="propertySlug" value={slug} onChange={(e) => setSlug(e.target.value)}  placeholder="Enter property slug"/>
            {error.slug && <span className="text-danger">{error.slug}</span>}
          </div>
        </div>


        <div className="row">
          <div className="col-lg-12">
            <h3 className="mb30">Banner Section</h3>
          </div>
          <div className="col-lg-6">
                     <div htmlFor="bannerimage">Banner Image</div>
                          <div className="wrap-custom-file">
                        
                              <input
                                  type="file"
                                  id="bannerimage"
                                  accept="image/png, image/gif, image/jpeg, image/svg+xml, image/svg, image/webp"
                                  onChange={uploadBannerImage}
                              />
                                <label
                                  htmlFor="bannerimage"
                                  style={
                                    bannerimageget                          
                                    ? { backgroundImage: `url(${bannerimageget})` }
                                      : bannerimage
                                      ? { backgroundImage: `url(${URL.createObjectURL(bannerimage)})` }
                                      : undefined
                                  }
                                >
                                  <span>
                                      <i className="flaticon-download"></i> Upload banner image{" "}
                                  </span>
                              </label>
                          </div>
                          <p>*minimum 260px x 260px</p>
                      </div>
        
        <div className="col-lg-6">
          <div className="my_profile_setting_input form-group">
            <label htmlFor="bannerTitle">Banner Title</label>
            <input type="text" className="form-control"  id="bannerTitle" value={bannertitle} onChange={(e) => setBannerTitle(e.target.value)}  placeholder="Enter Banner Title"/>
            {error.bannertitle && <span className="text-danger">{error.bannertitle}</span>}

          </div>
          <div className="my_profile_setting_textarea form-group">
              <label htmlFor="bannerDescription">Banner Description</label>
              <textarea id="bannerDescription" className="form-control" rows="7"  value={bannerdescription} onChange={(e) => setBannerDescription(e.target.value)}  placeholder="Enter banner description"></textarea>
              {error.bannerdescription && <span className="text-danger">{error.bannerdescription}</span>}
            </div>
      </div>
      <div className="col-lg-12">
      <div className="my_profile_setting_textarea form-group">
              <label htmlFor="bannerReview">Banner Raview</label>
              <textarea id="bannerReview" className="form-control" rows="7"  value={bannerreview} onChange={(e) => setBannerReview(e.target.value)}  placeholder="Enter banner review"></textarea>
              {error.bannerreview && <span className="text-danger">{error.bannerreview}</span>}
            </div>
            </div>
      </div>
      <div className="row">
          <div className="col-lg-12">
            <h3 className="mb30">About Section</h3>
          </div>
          <div className="col-lg-6">
                     <div htmlFor="bannerimage">About Image</div>
                          <div className="wrap-custom-file">
                        
                              <input
                                  type="file"
                                  id="aboutimage"
                                  accept="image/png, image/gif, image/jpeg, image/svg+xml, image/svg, image/webp"
                                  onChange={uploadAboutImage}
                              />
                                <label
                                  htmlFor="aboutimage"
                                  style={
                                    aboutimageget                          
                                    ? { backgroundImage: `url(${aboutimageget})` }
                                      : aboutimage
                                      ? { backgroundImage: `url(${URL.createObjectURL(aboutimage)})` }
                                      : undefined
                                  }
                                >
                                  <span>
                                      <i className="flaticon-download"></i> Upload About image{" "}
                                  </span>
                              </label>
                          </div>
                          <p>*minimum 260px x 260px</p>
                      </div>
        
        <div className="col-lg-6">
          <div className="my_profile_setting_input form-group">
            <label htmlFor="aboutTitle">About Title</label>
            <input type="text" className="form-control"  id="aboutTitle" value={abouttitle} onChange={(e) => setAboutTitle(e.target.value)}  placeholder="Enter About Title"/>
            {error.abouttitle && <span className="text-danger">{error.abouttitle}</span>}

          </div>
          <div className="my_profile_setting_textarea form-group">
              <label htmlFor="aboutDescription">About Description</label>
              <textarea id="aboutDescription" className="form-control" rows="7"  value={aboutdescription} onChange={(e) => setAboutDescription(e.target.value)}  placeholder="Enter about description"></textarea>
              {error.aboutdescription && <span className="text-danger">{error.aboutdescription}</span>}
            </div>
      </div>
      </div>
        
        
        <div className="col-xl-12">
        <h4 className="mb10">Amenities</h4>
      
      <div className="col-xxs-12 col-sm col-lg col-xl">
        <ul className="ui_kit_checkbox selectable-list row">
        {amenities.map((amenity, index) => (
  <li key={amenity._id} className="col-xxs-6 col-sm col-lg col-xl">
    <div className="form-check custom-checkbox">
    <input
        type="checkbox"
        className="form-check-input"
        id={`customCheck_${amenity._id}`}
        value={amenity._id}
        checked={selectedAmenity.includes(amenity._id)}
        onChange={handleAmenityChange}
      />
      <label
        className="form-check-label"
        htmlFor={`customCheck_${amenity._id}`}
      >
        {amenity.title}
      </label>
    </div>
  </li>
))}

          {/* End li */}

          
          {/* End li */}
        </ul>
      </div>
      {/* End .col */}
      </div>
        <div className="col-lg-6 col-xl-6">
        <div className="my_profile_setting_input form-group">
          <label htmlFor="propertyPrice">FAQ</label>
          <MultiSelectInput
              value={value}
              setValue={setValue}
              options={filteredOptions}
              errorMessage=""
              loading={false}
              onChange={(e) => {
                const input = e.target?.title?.toLowerCase() || "";
                const filtered = options.filter((option) =>
                  option.label.toLowerCase().includes(input)
                );
                setFilteredOptions(filtered);
              }}
              className="w-1/2"
            />
        </div>
      </div>
      <div className="col-lg-12">
            <h3 className="mb30">Gallery</h3>
          </div>
 <div className="col-lg-12">
                    <ul className="mb-0">
                      {gallerySelectedImgsget?.length > 0
                      ? gallerySelectedImgsget?.map((item, index) => (
                          <li key={index} className="list-inline-item">
                            <div className="portfolio_item">
                              <Image
                                width={200}
                                height={200}
                                className="img-fluid cover"
                                src={
                                  item.image
                                    ? `${process.env.NEXT_PUBLIC_API_URL}${item.image}`
                                    : `${process.env.NEXT_PUBLIC_API_URL}public/assets/images/thumbnail.webp`
                                }
                                alt= {`${item.title}${item._id}`}
                                unoptimized
                              />
                              <div
                                className="edu_stats_list"
                                data-bs-toggle="tooltip"
                                data-bs-placement="top"
                                title="Delete"
                                data-original-title="Delete"
                              >
                                <a onClick={() => deleteImageGet(item._id)}>
                                  <span className="flaticon-garbage"></span>
                                </a>
                              </div>
                            </div>
                          </li>
                        ))
                      : undefined}
                      {gallerySelectedImgs?.length > 0
                        ? gallerySelectedImgs?.map((item, index) => (
                            <li key={index} className="list-inline-item">
                              <div className="portfolio_item">
                                <Image
                                  width={200}
                                  height={200}
                                  className="img-fluid cover"
                                  src={URL.createObjectURL(item)}
                                  alt="fp1.jpg"
                                />
                                <div
                                  className="edu_stats_list"
                                  data-bs-toggle="tooltip"
                                  data-bs-placement="top"
                                  title="Delete"
                                  data-original-title="Delete"
                                >
                                  <a onClick={() => deleteImage(item.name)}>
                                    <span className="flaticon-garbage"></span>
                                  </a>
                                </div>
                              </div>
                            </li>
                          ))
                        : undefined}
            
                      {/* End li */}
                    </ul>
                  </div>
                  <div className="col-lg-12">
        <div className="portfolio_upload">
          <input
            type="file"
            onChange={multipleImage}
            multiple
            accept="image/png, image/gif, image/jpeg"
          />
          <div className="icon">
            <span className="flaticon-download"></span>
          </div>
          <p>Drag and drop images here</p>
        </div>
      </div>
      {/* End .col */}
      <div className="my_dashboard_review mt30">
        <div className="col-lg-12">
          <h3 className="mb30">Floor Plans</h3>
          <button className="btn admore_btn mb30" type="button" onClick={handleAddInput} >Add More</button>
        </div>
        {landingPlanInputGet.map((input, index) => (
        <div className="row" key={input.id} >
           <div className="col-xl-12">
           <div className="my_profile_setting_input">
          <button onClick={() => handleRemoveInputGet(input._id)}  type="button" className="btn btn2 float-end">Remove</button>
          <input type="hidden" name={`planid-${index}`} value={input._id} /> </div>
          </div>
          <div className="col-xl-4">
            <div className="my_profile_setting_input form-group">
              <label htmlFor={`planTitle-${index}`}>Plan Title {index + 1}</label>
              <input type="text" className="form-control" id={`planTitle-${index}`} value={input.title}
              onChange={(e) =>
                handleInputChangeGet(index, 'title', e.target.value)
              }/>
            </div>
          </div>
         
           {/* End .col */}

          <div className="col-xl-4">
            <div className="my_profile_setting_input form-group">
              <label htmlFor={`planSize-${index}`}>Plan Size</label>
              <input type="text" className="form-control" id={`planSize-${index}`} value={input.areasize}
              onChange={(e) =>
                handleInputChangeGet(index, 'areasize', e.target.value)
              } />
            </div>
          </div>
          {/* End .col */}
          <div className="col-lg-4 col-xl-4">
        <div className="my_profile_setting_input form-group">
          
        <div htmlFor="planimageget">Plan Image</div>
                <div className="wrap-custom-file height-150">
              
                    <input
                        type="file"
                        id={`planimageget-${index}`}
                        accept="image/png, image/gif, image/jpeg"
                        onChange={(e) => uploadPlanImageGet(index, e.target.files[0])}
                    />
                    <label
                       
                        style={
                          input.planimageurl
                            ? { backgroundImage: `url(${process.env.NEXT_PUBLIC_API_URL}${input.planimageurl})` }
                            : inputsget[index]?.planimageget
                            ? { backgroundImage: `url(${URL.createObjectURL(inputsget[index]?.planimageget)})` }
                            : undefined
                        }
                        htmlFor={`planimageget-${index}`}
                      >
                        <span>
                            <i className="flaticon-download"></i> Upload plan image{" "}
                        </span>
                    </label>
                </div>
                <p>*minimum 260px x 260px</p>
            </div>
        
      </div>
        {/* End .col */}        
        </div>
        
      ))}
        {inputs.map((input, index) => (
        <div className="row" key={input.id} >
           <div className="col-xl-12">
           <div className="my_profile_setting_input">
          <button onClick={() => handleRemoveInput(input.id)} type="button"  className="btn btn2 float-end">Remove</button>
          </div>
          </div>
          <div className="col-xl-4">
            <div className="my_profile_setting_input form-group">
              <label htmlFor={`planTitle-${index}`}>Plan Title {index + 1}</label>
              <input type="text" className="form-control" id={`planTitle-${index}`} value={input.title}
              onChange={(e) =>
                handleInputChange(index, 'title', e.target.value)
              }/>
            </div>
          </div>
         
           {/* End .col */}

          <div className="col-xl-4">
            <div className="my_profile_setting_input form-group">
              <label htmlFor={`planSize-${index}`}>Plan Size</label>
              <input type="text" className="form-control" id={`planSize-${index}`} value={input.areasize}
              onChange={(e) =>
                handleInputChange(index, 'areasize', e.target.value)
              } />
            </div>
          </div>
          {/* End .col */}
          <div className="col-lg-4 col-xl-4">
        <div className="my_profile_setting_input form-group">
          
        <div htmlFor="planimage">Plan Image</div>
                <div className="wrap-custom-file height-150">
              
                    <input
                        type="file"
                        id={`planimage-${index}`}
                        accept="image/png, image/gif, image/jpeg"
                        onChange={(e) => uploadPlanImage(index, e.target.files[0])}
                    />
                    <label
                        style={
                          inputs[index]?.planimage
                            ? {
                                backgroundImage: `url(${URL.createObjectURL(inputs[index].planimage)})`,
                              }
                            : undefined
                        }
                        htmlFor={`planimage-${index}`}
                      >
                        <span>
                            <i className="flaticon-download"></i> Upload plan image{" "}
                        </span>
                    </label>
                </div>
                <p>*minimum 260px x 260px</p>
            </div>
        
      </div>
        {/* End .col */}        
        </div>
        
      ))}
      
       </div>
      {/* End .col */}
      <div className="my_dashboard_review mt30">
        <div className="col-lg-12">
          <h3 className="mb30">Payment Plans</h3>
          <button className="btn admore_btn mb30" type="button" onClick={handleAddInputpayment} >Add More</button>
        </div>
        
       {landingPaymentInputGet.map((input, index) => (
        <div className="row" key={input.id} >
           <div className="col-xl-12">
           <div className="my_profile_setting_input">
          <button onClick={() => handleRemoveInputpaymentget(input._id)} type="button" className="btn btn2 float-end">Remove</button>
          </div>
          </div>
          <div className="col-xl-4">
            <div className="my_profile_setting_input form-group">
              <label htmlFor={`paymentTitle-${index}`}>Payment Title {index + 1}</label>
              <input type="text" className="form-control" id={`paymentTitle-${index}`} value={input.title}
              onChange={(e) =>
                handleInputChangepaymentget(index, 'title', e.target.value)
              }/>
            </div>
          </div>
         
           {/* End .col */}

          <div className="col-xl-4">
            <div className="my_profile_setting_input form-group">
              <label htmlFor={`paymentSize-${index}`}>Payment Size</label>
              <input type="text" className="form-control" id={`paymentSize-${index}`} value={input.areasize}
              onChange={(e) =>
                handleInputChangepaymentget(index, 'areasize', e.target.value)
              } />
            </div>
          </div>
          {/* End .col */}
          <div className="col-xl-4">
         <div className="my_profile_setting_input form-group">
           <label htmlFor={`paymentPrice-${index}`}>Payment Price {index + 1}</label>
           <input type="text" className="form-control" id={`paymentPrice-${index}`} value={input.price}
           onChange={(e) =>
            handleInputChangepaymentget(index, 'price', e.target.value)
           } />
         </div>
       </div>
        {/* End .col */}      
        </div>
        
      ))}
      {inputspayment.map((input, index) => (
        <div className="row" key={input.id} >
           <div className="col-xl-12">
           <div className="my_profile_setting_input">
          <button onClick={() => handleRemoveInputpayment(input.id)} type="button" className="btn btn2 float-end">Remove</button>
          <input type="hidden" name={`paymentid-${index}`} value={input._id} />
          </div>
          </div>
          <div className="col-xl-4">
            <div className="my_profile_setting_input form-group">
              <label htmlFor={`paymentTitle-${index}`}>Plan Title {index + 1}</label>
              <input type="text" className="form-control" id={`paymentTitle-${index}`} value={input.title}
              onChange={(e) =>
                handleInputChangepayment(index, 'title', e.target.value)
              }/>
            </div>
          </div>
         
           {/* End .col */}

          <div className="col-xl-4">
            <div className="my_profile_setting_input form-group">
              <label htmlFor={`paymentSize-${index}`}>Plan Size</label>
              <input type="text" className="form-control" id={`paymentSize-${index}`} value={input.areasize}
              onChange={(e) =>
                handleInputChangepayment(index, 'areasize', e.target.value)
              } />
            </div>
          </div>
          {/* End .col */}
          <div className="col-xl-4">
         <div className="my_profile_setting_input form-group">
           <label htmlFor={`paymentPrice-${index}`}>Payment Price {index + 1}</label>
           <input type="text" className="form-control" id={`paymentPrice-${index}`} value={input.price}
           onChange={(e) =>
            handleInputChangepayment(index, 'price', e.target.value)
           } />
         </div>
       </div>
        {/* End .col */}      
        </div>
        
      ))}
       </div>
       
        

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
               {error.metatitle && <span className="text-danger">{error.metatitle}</span>}
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
      </div>
      </div>
     
                  
      <div className="col-xl-12">
        <div className="my_profile_setting_input">
          <button className="btn btn1 float-start" type="button" onClick={() => window.location.href = '/cmswegrow/my-landing'}>Back</button>
          <button className="btn btn2 float-end" type="submit" >Submit</button>
        </div>
      </div>
      </form>
    </>
  );
};

export default CreateList;
