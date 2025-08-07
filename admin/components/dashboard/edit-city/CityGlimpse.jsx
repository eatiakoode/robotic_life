"use client";

import { useState, useEffect } from "react";
import { useRouter, useParams } from "next/navigation";
import Image from "next/image";
import { deleteCityGlimpseAPI, addCityGlimpseAPI } from "@/api/cityglimpse.ts";


const CityGlimpse = ({citydetail,inputs,setInputs,setCityGlimpse,cityglimpse}) => {
  const router = useRouter();
  const [CityGlimpseInputGet, setCityGlimpseInputGet] = useState([]);
  const [inputsget, setInputsget] = useState([]);
  const [description, setDescription] = useState("");
const [error, setError] = useState("");

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
            const data = await deleteCityGlimpseAPI(_id); // 🔹 Call the API function
            // alert("test")
            const deleted = CityGlimpseInputGet?.filter((file) => file._id !== _id);
            setCityGlimpseInputGet(deleted);
            //setTitle(""); // ✅ Reset input after success
          } catch (error) {
            alert("Failed to delete citydetail Image.");
            
          }
      };
  // const uploadPlanImage = (index, file) => {
  //   const updatedInputs = [...inputs];
  //   updatedInputs[index].planimage = file;
  //   setInputs(updatedInputs);
  // };
  // const uploadPlanImageGet = (index, file) => {
  //   // alert("yse")
  //   const updatedInputs = [...inputsget];
  //   updatedInputs[index].planimageget = file;
  //   updatedInputs[index].planimageurl = null;
    
  //   setInputsget(updatedInputs);
    
  // };

  const updateCityGlimpse = async (e) => {
    e.preventDefault();
    const formData = new FormData();
    formData.append('cityId', citydetail?._id);
    formData.append('description', description);
    
  
    // Append all other fields from inputs (assuming single input for now)
    inputs.forEach((input, index) => {
      formData.append(`CityGlimpse[${index}][title]`, input.title);
      
      formData.append(`CityGlimpse[${index}][description]`, input.description);
      
      // formData.append('planimage', input.planimage);

    });
    inputsget?.forEach((input, index) => {
      formData.append(`CityGlimpseget[${index}][title]`, input.title);
      
      formData.append(`CityGlimpseget[${index}][description]`, input.description);
      formData.append(`CityGlimpseget[${index}][glimpseid]`, input._id);

    });
    // Example: Send to API
    try {
      const res = await addCityGlimpseAPI(formData);
      if (citydetail?._id) {
        router.push(`/cmswegrow/edit-city/${citydetail._id}`);
        setInputs([])
      }
      
      
    } catch (err) {
      console.error('Error:', err);
    }
  };
  useEffect(() => {
    setCityGlimpseInputGet(citydetail.cityglimpse);
    setInputsget(citydetail.cityglimpse);
    setDescription(citydetail.description)
}, [citydetail]);
  return (
    <form onSubmit={updateCityGlimpse}>
    <div className="row">
      <div className="col-lg-12">
          <div className="my_profile_setting_textarea form-group">
            <label htmlFor="propertyDescription">Description</label>
            <textarea id="propertyDescription" className="form-control" rows="7"  value={description} onChange={(e) => setDescription(e.target.value)}  placeholder="Enter property description"></textarea>
            {error.description && <span className="text-danger">{error.description}</span>}
          </div>
          
        </div>
        

      {/* End .col */}
   
      {/* End .col */}
      {CityGlimpseInputGet?.map((input, index) => (
       <div className="row " key={index} >
        <div className="col-xl-12">
        <div className="my_profile_setting_input">
          <button onClick={() => handleRemoveInputGet(input._id)} className="btn btn2 float-end">Remove</button>
          </div>
          </div>
          <input type="hidden" name={`glimpseid-${index}`} value={input._id} />
       <div className="col-xl-4">
         <div className="my_profile_setting_input form-group">
           <label htmlFor={`glimpseTitle-${index}`}>Glimpse title {index + 1}</label>
           <input type="text" className="form-control" id={`glimpseTitle-${index}`} value={input.title}
           onChange={(e) =>
            handleInputChangeGet(index, 'title', e.target.value)
           }/>
         </div>
       </div>
      
       
     {/* End .col */}
     <div className="col-xl-8">
       <div className="my_profile_setting_textarea mt30-991">
         <label htmlFor={`glimpseDescription-${index}`}>Glimpse Description</label>
         <textarea
           className="form-control"
           id={`glimpseDescription-${index}`}
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
       <div className="row " key={index} >
        <div className="col-xl-12">
        <div className="my_profile_setting_input">
          <button onClick={() => handleRemoveInputGet(input._id)} className="btn btn2 float-end">Remove</button>
          </div>
          </div>
          <input type="hidden" name={`glimpseid-${index}`} value={input._id} />
       <div className="col-xl-4">
         <div className="my_profile_setting_input form-group">
           <label htmlFor={`glimpseTitle-${index}`}>Glimpse title {index + 1}</label>
           <input type="text" className="form-control" id={`glimpseTitle-${index}`} value={input.title}
           onChange={(e) =>
            handleInputChange(index, 'title', e.target.value)
           }/>
         </div>
       </div>
      
       
     {/* End .col */}
     <div className="col-xl-8">
       <div className="my_profile_setting_textarea mt30-991">
         <label htmlFor={`glimpseDescription-${index}`}>Glimpse Description</label>
         <textarea
           className="form-control"
           id={`glimpseDescription-${index}`}
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
          <button className="btn btn2 float-end" type="submit"  disabled={inputs?.length==0 && inputsget?.length==0}>Submit Glimpse</button>
        </div>
      </div>
      {/* End .col */}
    </div>
    </form>
  );
};

export default CityGlimpse;
