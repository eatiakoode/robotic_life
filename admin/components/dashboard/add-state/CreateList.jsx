"use client";

import { useState, useEffect } from "react";
import { addStateAPI } from "../../../api/state";
import { getCountryTableData } from "../../../api/country";

import { useRouter, useParams } from "next/navigation";

import { toast } from 'react-toastify';

const CreateList = () => {
  const [title, setTitle] = useState("");
  const [error, setError] = useState("");
  const [countries, setCountries] = useState([]);
  const [selectedCountry, setSelectedCountry] = useState("");
  const router = useRouter();
  const [isSubmitting, setisSubmitting] = useState("");

  useEffect(() => {
    const fetchCountries = async () => {
      try {
        const response = await getCountryTableData();
       

        setCountries(response || []);
      } catch (err) {
        console.error("Error fetching Country:", err);
      }
    };

    fetchCountries();
  }, []);

  const handleTitleChange = (e) => {
    setTitle(e.target.value);
    if (e.target.value.trim() !== "") setError("");
  };

  const handleCountryChange = (e) => {
    setSelectedCountry(e.target.value);
  };

  const addState = async (e) => {
    e.preventDefault();
    setisSubmitting(true)

    if (!title.trim()) {
      setError("Title is required");
      return;
    }

    setError("");

    try {
      const data = await addStateAPI(title, selectedCountry);
     
       toast.success(data.message);
        if(data.status=="success"){
          setTimeout(() => {
          router.push("/cmsroboticlife/my-state");
          }, 1500); 
        }
      setTitle("");
      setSelectedCountry("");
    } catch (error) {
      setError(error.message);
    }
  };
  
  return (
    <>
      <form onSubmit={addState} className="row">
      <div className="col-lg-6 col-xl-6">
          <div className="my_profile_setting_input ui_kit_select_search form-group">
            <label htmlFor="countrySelect">Select Country</label>
            <select
              id="countrySelect"
              className="selectpicker form-select"
              value={selectedCountry}
              onChange={handleCountryChange}
              data-live-search="true"
              data-width="100%"
            >
              <option value="">-- Select Country --</option>
              {countries.map((country) => (
                <option key={country._id} value={country._id}>
                  {country.title}
                </option>
              ))}
            </select>
          </div>
        </div>
        <div className="col-lg-6 col-xl-6">
          <div className="my_profile_setting_input form-group">
            <label htmlFor="stateTitle">State Title</label>
            <input
              type="text"
              className="form-control"
              id="stateTitle"
              value={title}
              onChange={handleTitleChange}
            />
            {error && <p className="text-red-500 text-sm mt-1">{error}</p>}
          </div>
        </div>

       

        <div className="col-xl-12">
          <div className="my_profile_setting_input">
            <button type="button" className="btn btn1 float-start"  onClick={() => window.location.href = '/cmsroboticlife/my-dashboard'}>Back</button>
            <button type="submit" className="btn btn2 float-end" disabled={isSubmitting} >{isSubmitting ? 'Sending...' : 'Submit'}</button>
          </div>
        </div>
      </form>
    </>
  );
};

export default CreateList;
