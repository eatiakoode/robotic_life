"use client";

import { useEffect, useState } from "react";
import { useRouter, useParams } from "next/navigation";
import { getCommunicationMethodById, updateCommunicationMethodAPI } from "@/api/communicationmethod";
import { toast } from 'react-toastify';

const CreateList = () => {
  const params = useParams();

  const id = params?.id;

  const router = useRouter();
  const [communicationMethod, setCommunicationMethod] = useState({ title: "", status: false });
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (!id) return;

    const fetchCommunicationMethod = async () => {
      try {
        const data = await getCommunicationMethodById(id);
        setCommunicationMethod({
          title: data.name,         
          status: data.status ?? false, 
        });
      } catch (error) {
        console.error("Error fetching Communication Method:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchCommunicationMethod();
  }, [id]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const data = await updateCommunicationMethodAPI(id, communicationMethod);
      toast.success(data.message);

      setTimeout(() => {
        router.push("/cmswegrow/my-communicationmethod");
      }, 1000);
    } catch (error) {
      toast.error("Failed to update Communication Method.");
      console.error(error);
    }
  };


  const handleChange = (e) => {
    setCommunicationMethod((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const handleStatusChange = () => {
    setCommunicationMethod((prev) => ({ ...prev, status: !prev.status }));
  };

  if (loading) return <p>Loading...</p>;
  return (
    <>
      <form onSubmit={handleSubmit} className="row">
        <div className="col-lg-6 col-xl-6">
          <div className="my_profile_setting_input form-group">
            <label htmlFor="communicationMethodTitle">Communication Method Title</label>
            <input
              type="text"
              className="form-control"
              id="communicationMethodTitle"
              name="title"
              value={communicationMethod.title}
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
              value={communicationMethod.status ? "active" : "deactive"}
              onChange={(e) =>
                setCommunicationMethod((prev) => ({
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
            <button className="btn btn1 float-start" type="button" onClick={() => window.location.href = '/cmswegrow/my-communicationmethod'}>Back</button>
            <button className="btn btn2 float-end">Submit</button>
          </div>
        </div>
      </form>
    </>
  );
};

export default CreateList;
