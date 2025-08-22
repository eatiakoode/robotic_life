"use client";

import { useState, useEffect } from "react";
import { useRouter, useParams } from "next/navigation";
import Image from "next/image";
import { deletePropertyplanAPI, addPropertyPlanAPI,deletePropertySinlgeImagesAPI } from "@/api/propertyplan";
import { toast } from 'react-toastify';


const FloorPlans = ({inputs,setInputs,property,setPlanImage,planimage}) => {
  const router = useRouter();
  const [PropertyPlanInputGet, setPropertyPlanInputGet] = useState([]);
  const [inputsget, setInputsget] = useState([]);
  const handleInputChange = (index, field, value) => {
    const updated = [...inputs];
    updated[index][field] = value;
    setInputs(updated);
  };
  const handleInputChangeGet = (index, field, value) => {
    // alert("test")
    const updated = [...inputsget];
    updated[index][field] = value;
    setInputsget(updated);
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
            const deleted = PropertyPlanInputGet?.filter((file) => file._id !== _id);
            setPropertyPlanInputGet(deleted);
            //setTitle(""); // ✅ Reset input after success
          } catch (error) {
            alert("Failed to delete property Image.");
            
          }
      };
  const uploadPlanImage = (index, file) => {
    const updatedInputs = [...inputs];
    updatedInputs[index].planimage = file;
    setInputs(updatedInputs);
  };
  const uploadPlanImageGet = (index, file) => {
    // alert("yse")
    const updatedInputs = [...inputsget];
    updatedInputs[index].planimageget = file;
    updatedInputs[index].planimageurl = null;
    
    setInputsget(updatedInputs);
    
  };
const deleteImagePlanSingle = async (planid,getindex,imageurl) => {
  const isConfirmed = window.confirm("Are you sure you want to delete this image?");
      if (!isConfirmed) return;
      const updatedInputs = [...inputsget];
    updatedInputs[getindex].planimageget = null;
    updatedInputs[getindex].planimageurl = null;
    
    setInputsget(updatedInputs);
      try {
         const payload = {"planid":planid,"fieldname":"planimageurl","imageurl":imageurl}
        const data = await deletePropertySinlgeImagesAPI(payload); // 🔹 Call the API function
        
    
        toast.success(data.message);
        //setTitle(""); // ✅ Reset input after success
      } catch (error) {
        alert("Failed to delete property Image.");
        //setError(error.message); // ❌ Show error if request fails
      }
    };
  const updatePropertyFloorPlan = async (e) => {
    e.preventDefault();
   
    const formData = new FormData();
    formData.append('propertyId', property?.id);
    
  
    // Append all other fields from inputs (assuming single input for now)
    inputs.forEach((input, index) => {
      formData.append(`floorPlans[${index}][title]`, input.title);
      formData.append(`floorPlans[${index}][bedroom]`, input.bedroom);
      formData.append(`floorPlans[${index}][price]`, input.price);
      formData.append(`floorPlans[${index}][areasize]`, input.areasize);
      formData.append(`floorPlans[${index}][description]`, input.description);
      if (input.planimage) {
        formData.append(`floorPlans[${index}][planimage]`, input.planimage);
      }
      // formData.append('planimage', input.planimage);

    });
    inputsget.forEach((input, index) => {
      formData.append(`floorPlansget[${index}][title]`, input.title);
      formData.append(`floorPlansget[${index}][bedroom]`, input.bedroom);
      formData.append(`floorPlansget[${index}][price]`, input.price);
      formData.append(`floorPlansget[${index}][areasize]`, input.areasize);
      formData.append(`floorPlansget[${index}][description]`, input.description);
      formData.append(`floorPlansget[${index}][planid]`, input._id);

      if (input.planimageget) {
        formData.append(`floorPlansget[${index}][planimageget]`, input.planimageget);
      }

    });
    try {
      const res = await addPropertyPlanAPI(formData);
      toast.success(res.message);
      if (property?.id) {
        router.push(`/cmsroboticlife/edit-property/${property.id}`);
        setInputs([])
        // router.push(`/cmsroboticlife/edit-property/${property.id}`);
      }
    } catch (err) {
      console.error('Error:', err);
    }
  };
  useEffect(() => {
    setPropertyPlanInputGet(property?.floorplan);
    setInputsget(property?.floorplan);
}, [property]);
  return (
    <form onSubmit={updatePropertyFloorPlan}>
    <div className="row">
   
      {/* End .col */}
      {PropertyPlanInputGet?.map((input, index) => (
       <div className="row " key={input._id} >
        <div className="col-xl-12">
        <div className="my_profile_setting_input">
          <button onClick={() => handleRemoveInputGet(input._id)} className="btn btn2 float-end">Remove</button>
          </div>
          </div>
          <input type="hidden" name={`planid-${index}`} value={input._id} />
       <div className="col-xl-4">
         <div className="my_profile_setting_input form-group">
           <label htmlFor={`planTitle-${index}`}>Plan Description {index + 1}</label>
           <input type="text" className="form-control" id={`planTitle-${index}`} value={input.title}
           onChange={(e) =>
            handleInputChangeGet(index, 'title', e.target.value)
           }/>
         </div>
       </div>
       <div className="col-xl-4">
         <div className="my_profile_setting_input form-group">
           <label htmlFor={`planBedrooms-${index}`}>Plan Type {index + 1}</label>
           <input type="text" className="form-control" id={`planBedrooms-${index}`} value={input.bedroom}
           onChange={(e) =>
            handleInputChangeGet(index, 'bedroom', e.target.value)
           } />
         </div>
       </div>
       {/* End .col */}
       <div className="col-xl-4">
         <div className="my_profile_setting_input form-group">
           <label htmlFor={`planPrice-${index}`}>Plan Price {index + 1}</label>
           <input type="text" className="form-control" id={`planPrice-${index}`} value={input.price}
           onChange={(e) =>
            handleInputChangeGet(index, 'price', e.target.value)
           } />
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
           
                 {/* <input
                     type="file"
                     id={`planimageget-${index}`}
                     accept="image/png, image/gif, image/jpeg"
                     onChange={(e) => uploadPlanImageGet(index, e.target.files[0])}
                 /> */}
                 {/* <label
                 style={
                  input.planimageurl                          
                  ? { backgroundImage: `url(${process.env.NEXT_PUBLIC_API_URL}${input.planimageurl})` }
                    : inputsget[index]?.planimageget
                    ? { backgroundImage: `url(${URL.createObjectURL(inputsget[index]?.planimageget)})` }
                    : undefined
                }
                    //  style={
                    //    inputs[index]?.planimage
                    //      ? {
                    //          backgroundImage: `url(${URL.createObjectURL(inputs[index].planimage)})`,
                    //        }
                    //      : undefined
                    //  }
                    htmlFor={`planimage-${index}`}
                   >
                     <span>
                         <i className="flaticon-download"></i> Upload plan image{" "}
                     </span>
                 </label> */}
                 <input 
                      type="file"
                      id={`planimageget-${index}`}
                      // accept="image/png, image/gif, image/jpeg"
                       accept="image/png, image/gif, image/jpeg, image/svg+xml, image/svg, image/webp, image/avif"
                      onChange={(e) => uploadPlanImageGet(index, e.target.files[0])}
                      style={{ display: 'none' }} // Hide the actual file input
                    />
                    <label
                      htmlFor={`planimageget-${index}`} // This connects the label to the input
                      style={
                        input.planimageurl
                          ? { backgroundImage: `url(${process.env.NEXT_PUBLIC_API_URL}${input.planimageurl})` }
                          : inputsget[index]?.planimageget
                          ? { backgroundImage: `url(${URL.createObjectURL(inputsget[index]?.planimageget)})` }
                          : undefined
                      }
                    >
                      <span>
                        <i className="flaticon-download"></i> Upload plan image{" "}
                      </span>
                    </label>
                     {  input.planimageurl && ( 
                      <div
                      className="edu_stats_list singleimage"
                      data-bs-toggle="tooltip"
                      data-bs-placement="top"
                      title="Delete"
                      data-original-title="Delete"
                    >
                    <a onClick={() => deleteImagePlanSingle(input._id,index, input.planimageurl)}>
                      <span className="flaticon-garbage"></span>
                    </a>
                  </div>
                    )}

             </div>
             <p>*minimum 260px x 260px</p>
         </div>
     
   </div>
     {/* End .col */}
     <div className="col-xl-4">
       <div className="my_profile_setting_textarea mt30-991">
         <label htmlFor={`planDescription-${index}`}>Plan Description</label>
         <textarea
           className="form-control"
           id={`planDescription-${index}`}
           rows="4" value={input.description}
           onChange={(e) =>
            handleInputChangeGet(index, 'description', e.target.value)
           }
         ></textarea>
       </div>
     </div>
   
     </div>
      ))}
      {inputs.map((input, index) => (
        <div className="row" key={input.id} >
           <div className="col-xl-12">
           <div className="my_profile_setting_input">
          <button onClick={() => handleRemoveInput(input.id)} className="btn btn2 float-end">Remove</button>
          </div>
          </div>
          <div className="col-xl-4">
            <div className="my_profile_setting_input form-group">
              <label htmlFor={`planTitle-${index}`}>Plan title {index + 1}</label>
              <input type="text" className="form-control" id={`planTitle-${index}`} value={input.title}
              onChange={(e) =>
                handleInputChange(index, 'title', e.target.value)
              }/>
            </div>
          </div>
          <div className="col-xl-4">
            <div className="my_profile_setting_input form-group">
              <label htmlFor={`planBedrooms-${index}`}>Plan Type {index + 1}</label>
              <input type="text" className="form-control" id={`planBedrooms-${index}`} value={input.bedroom}
              onChange={(e) =>
                handleInputChange(index, 'bedroom', e.target.value)
              } />
            </div>
          </div>
          {/* End .col */}
          <div className="col-xl-4">
            <div className="my_profile_setting_input form-group">
              <label htmlFor={`planPrice-${index}`}>Plan Price {index + 1}</label>
              <input type="text" className="form-control" id={`planPrice-${index}`} value={input.price}
              onChange={(e) =>
                handleInputChange(index, 'price', e.target.value)
              } />
            </div>
          </div>
           {/* End .col */}

          <div className="col-xl-4">
            <div className="my_profile_setting_input form-group">
              <label htmlFor={`planSize-${index}`}>Plan Size {index + 1}</label>
              <input type="text" className="form-control" id={`planSize-${index}`} value={input.areasize}
              onChange={(e) =>
                handleInputChange(index, 'areasize', e.target.value)
              } />
            </div>
          </div>
          {/* End .col */}
          <div className="col-lg-4 col-xl-4">
        <div className="my_profile_setting_input form-group">
          
        <div htmlFor="planimage">Plan Image {index + 1}</div>
                <div className="wrap-custom-file height-150">
              
                    <input
                        type="file"
                        id={`planimage-${index}`}
                        // accept="image/png, image/gif, image/jpeg"
                         accept="image/png, image/gif, image/jpeg, image/svg+xml, image/svg, image/webp, image/avif"
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
        <div className="col-xl-4">
          <div className="my_profile_setting_textarea mt30-991">
            <label htmlFor={`planDescription-${index}`}>Plan Description {index + 1}</label>
            <textarea
              className="form-control"
              id={`planDescription-${index}`}
              rows="4" value={input.description}
              onChange={(e) =>
                handleInputChange(index, 'description', e.target.value)
              }
            ></textarea>
          </div>
        </div>
        
        </div>
        
      ))}

      <div className="col-xl-12">
        <div className="my_profile_setting_input">
          {/* <button className="btn btn1 float-start">Back</button> */}
          <button className="btn btn2 float-end" type="submit"  disabled={inputs?.length==0 && inputsget?.length==0}>Submit Plan</button>
        </div>
      </div>
      {/* End .col */}
    </div>
    </form>
  );
};

export default FloorPlans;
