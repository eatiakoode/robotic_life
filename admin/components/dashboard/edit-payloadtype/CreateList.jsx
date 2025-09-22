"use client";

import { useEffect, useState } from "react";
import { useRouter, useParams } from "next/navigation";
import { getPayloadTypeById, updatePayloadTypeAPI } from "@/api/payloadtype";
import { toast } from 'react-toastify';

const CreateList = () => {
  const params = useParams();

  const id = params?.id;

  const router = useRouter();
  const [payloadType, setPayloadType] = useState({ title: "", status: false });
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (!id) return;

    const fetchPayloadType = async () => {
      try {
        const data = await getPayloadTypeById(id);
        setPayloadType({
          title: data.name,         
          status: data.status ?? false, 
        });
      } catch (error) {
        console.error("Error fetching Payload Type:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchPayloadType();
  }, [id]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const data = await updatePayloadTypeAPI(id, payloadType);
      toast.success(data.message);

      setTimeout(() => {
        router.push("/cmsthebotsworld/my-payloadtype");
      }, 1000);
    } catch (error) {
      toast.error("Failed to update Payload Type.");
      console.error(error);
    }
  };


  const handleChange = (e) => {
    setPayloadType((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const handleStatusChange = () => {
    setPayloadType((prev) => ({ ...prev, status: !prev.status }));
  };

  if (loading) return <p>Loading...</p>;
  return (
    <>
      <form onSubmit={handleSubmit} className="row">
        <div className="col-lg-6 col-xl-6">
          <div className="my_profile_setting_input form-group">
            <label htmlFor="payloadTypeTitle">Payload Type Title</label>
            <input
              type="text"
              className="form-control"
              id="payloadTypeTitle"
              name="title"
              value={payloadType.title}
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
              value={payloadType.status ? "active" : "deactive"}
              onChange={(e) =>
                setPayloadType((prev) => ({
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
            <button className="btn btn1 float-start" type="button" onClick={() => window.location.href = '/cmsthebotsworld/my-payloadtype'}>Back</button>
            <button className="btn btn2 float-end">Submit</button>
          </div>
        </div>
      </form>
    </>
  );
};

export default CreateList;
