"use client"; 

import { useEffect, useState } from "react";
import { useRouter, useParams } from "next/navigation";
import { getStateById, updateStateAPI } from "../../../api/state";

import { getCountryTableData } from "../../../api/country";
import { toast } from 'react-toastify';

const CreateList = () => {
  const params = useParams();  
    const id = params?.id;
  
    const router = useRouter();
    const [state, setState] = useState({ title: "", status: false });
    const [loading, setLoading] = useState(true);
    const [countries, setCountries] = useState([]);
  const [selectedCountry, setSelectedCountry] = useState("");
  
    useEffect(() => {
      if (!id) return;
      
      const fetchState = async () => {
        try {
          const data = await getStateById(id);
         
          setState({ title: data.data.title, status: data.data.status });
          setSelectedCountry(data.data.countryid);
        } catch (error) {
          console.error("Error fetching State:", error);
        } finally {
          setLoading(false);
        }
      };
  
      fetchState();
      const fetchCountries = async () => {
        try {
          const response = await getCountryTableData();
  
          setCountries(response || []);
        } catch (err) {
          console.error("Error fetching Country:", err);
        }
      };
  
      fetchCountries();
    }, [id]);
  
    const handleSubmit = async (e) => {
      e.preventDefault();
      try {
        const updatedState = {
          ...state,
          countryid: selectedCountry,
        };
        const data = await updateStateAPI(id, updatedState);
        // alert("State updated successfully!");
        // router.push("/cmswegrow/my-state");
        toast.success(data.message);
        if(data.status=="success"){
          setTimeout(() => {
          router.push("/cmswegrow/my-state");
          }, 1500); 
        }
      } catch (error) {
        alert("Failed to update State.");
        console.error(error);
      }
    };
  
    const handleChange = (e) => {
      setState((prev) => ({ ...prev, [e.target.name]: e.target.value }));
    };
  
    const handleStatusChange = () => {
      setState((prev) => ({ ...prev, status: !prev.status }));
    };
    const handleCountryChange = (e) => {
      setSelectedCountry(e.target.value);
    };
  
    if (loading) return <p>Loading...</p>;
  return (
    <>
    <form onSubmit={handleSubmit} className="row">
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
        name="title"
        value={state.title}
        onChange={handleChange}
      />
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
        value={state.status ? "active" : "deactive"}
        onChange={(e) =>
          setState((prev) => ({
            ...prev,
            status: e.target.value === "active",
          }))
        }
      >
        <option value="active">Active</option>
        <option value="deactive">Deactive</option>
      </select>
        </div>
      </div>
      {/* End .col */}

     


      <div className="col-xl-12">
        <div className="my_profile_setting_input">
          <button className="btn btn1 float-start" type="button"  onClick={() => window.location.href = '/cmswegrow/my-state'}>Back</button>
          <button className="btn btn2 float-end">Submit</button>
        </div>
      </div>
      </form>
    </>
  );
};

export default CreateList;
