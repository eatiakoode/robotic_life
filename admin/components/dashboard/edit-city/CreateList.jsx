"use client"; 

import { useEffect, useState } from "react";
import { useRouter, useParams } from "next/navigation";
import { getCityById, updateCityAPI } from "../../../api/city";
import { getCountryTableData } from "../../../api/country";
import { getStateByCountryTableData } from "../../../api/state";
import { toast } from 'react-toastify';


const CreateList = () => {
  const params = useParams();  
    const id = params?.id;  
    const router = useRouter();
    const [title, setTitle] = useState("");
    const [status, setStatus] = useState("");
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState("");  
    const [citylogo, setCityLogo] = useState(null);
    const [citylogoimage, setCityLogoImage] = useState(null);

    const [countries, setCountries] = useState([]);
    const [selectedCountry, setSelectedCountry] = useState("");
    const [states, setStates] = useState([]);
    const [selectedState, setSelectedState] = useState("");
    const [city, setCity] = useState({ title: "", status: false });
    const uploadLogo = (e) => {
      setCityLogo(e.target.files[0]);
      setCityLogoImage("")
  };
    useEffect(() => {
      if (!id) return;      
      const fetchCity  = async () => {
        try {
          const data = await getCityById(id);
          // setBlog({ title: data.data.title, status: data.data.status, description: data.data.description });
          setTitle(data.data.title)
          setStatus(data.data.status)
          // setDescription(data.data.description)
          if(data.data.citylogoimage) {
          setCityLogoImage(process.env.NEXT_PUBLIC_API_URL+data.data.citylogoimage)
          }
        } catch (error) {
          console.error("Error fetching City:", error);
        } finally {
          setLoading(false);
        }
      };
  
      fetchCity();
    }, [id]);

     useEffect(() => {
          if (!id) return;
        
          const fetchCityAndCountryData = async () => {
            try {
              const [cityRes, countriesRes] = await Promise.all([
                getCityById(id),
                getCountryTableData()
              ]);
        
              const cityData = cityRes.data;
              setCity({
                title: cityData.title,
                status: cityData.status,
                countryid: cityData.countryid,
                stateid: cityData.stateid,
              });

              if(cityData.citylogoimage) {
                setCityLogoImage(process.env.NEXT_PUBLIC_API_URL+cityData.citylogoimage)
                }
        
              setSelectedCountry(cityData.countryid);
              setSelectedState(cityData.stateid);
              setCountries(countriesRes || []);
        
              // ✅ Fetch states AFTER setting selectedCountry
              const statesRes = await getStateByCountryTableData(cityData.countryid);
              setStates(statesRes.data || []);
            } catch (error) {
              console.error("Error fetching city/country/state data:", error);
            } finally {
              setLoading(false);
            }
          };
        
          fetchCityAndCountryData();
        }, [id]);
  
    const handleSubmit = async (e) => {
      e.preventDefault();
      try {
        const formData = new FormData();
        formData.append("title", title);
        formData.append("countryid", selectedCountry);
        formData.append("stateid", selectedState);

        formData.append("status", status);
        if (citylogo) {
          formData.append("citylogo", citylogo);
        }
        const data =await updateCityAPI(id, formData);
        // alert("City updated successfully!");
        // router.push("/cmswegrow/my-cities");
        toast.success(data.message);
        if(data.status=="success"){
          setTimeout(() => {
          router.push("/cmswegrow/my-cities");
          }, 1500); 
        }
      } catch (error) {
        alert("Failed to update city.");
        console.error(error);
      }
    };
  const handleCountryChange = (e) => {
            setSelectedCountry(e.target.value);
           
            const fetchState = async (countryid) => {
              try {
                const response = await getStateByCountryTableData(countryid);
                
        
                setStates(response.data || []);
              } catch (err) {
                console.error("Error fetching state:", err);
              }
            };
            fetchState(e.target.value)
          };
  
          const handleStateChange = (e) => {
            setSelectedState(e.target.value);
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
                        citylogoimage                          
                        ? { backgroundImage: `url(${citylogoimage})` }
                          : citylogo
                          ? { backgroundImage: `url(${URL.createObjectURL(citylogo)})` }
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
          <div className="my_profile_setting_input ui_kit_select_search form-group">
            <label htmlFor="stateSelect">Select State</label>
            <select
              id="stateSelect"
              className="selectpicker form-select"
              value={selectedState}
              onChange={handleStateChange}
              data-live-search="true"
              data-width="100%"
            >
              <option value="">-- Select State --</option>
               {states.map((state) => (
                <option key={state._id} value={state._id}>
                  {state.title}
                </option>
              ))}
            </select>
          </div>
        </div>
      <div className="col-lg-6 col-xl-6">
        <div className="my_profile_setting_input form-group">
          <label htmlFor="cityTitle">City Title</label>
          <input
        type="text"
        className="form-control"
        id="cityTitle"
        name="title"
        value={title}
        onChange={(e) => setTitle(e.target.value)}
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
  value={status ? "active" : "deactive"}
  onChange={(e) => setStatus(e.target.value === "active")}
>
        <option value="active">Active</option>
        <option value="deactive">Deactive</option>
      </select>
        </div>
      </div>
      {/* End .col */}

     


      <div className="col-xl-12">
        <div className="my_profile_setting_input">
          <button className="btn btn1 float-start" type="button"  onClick={() => window.location.href = '/cmswegrow/my-cities'}>Back</button>
          <button className="btn btn2 float-end">Submit</button>
        </div>
      </div>
      </form>
    </>
  );
};

export default CreateList;
