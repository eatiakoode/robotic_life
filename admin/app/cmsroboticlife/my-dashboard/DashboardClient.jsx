"use client";

import { useEffect, useState } from "react";
import MyDashboard from "@/components/dashboard/my-dashboard";
import { getRobotTableData } from "@/api/robot";
import { getManufacturerTableData } from "@/api/manufacturer";
import { getMaterialTableData } from "@/api/material";
// import { getEnquiryTableData } from "@/api/enquiry";

export default function DashboardClient() {
  const [data, setData] = useState({
    robot: [],
    manufacturer: [],
    materials: [],
    enquery: [],
  });

  useEffect(() => {
    const fetchData = async () => {
      try {
        const userData = JSON.parse(localStorage.getItem("user") || "{}");
        const token = userData?.token;

        if (!token) {
          console.warn("No token found. User not authenticated.");
          return;
        }

        const filter = { limit: 1000, page: 1 };

        // Run API calls in parallel (currently only robot)
        const [robotRes, manufacturerRes, materialRes/*, enquiryRes */] =
          await Promise.all([
            getRobotTableData(filter, token),
            getManufacturerTableData(filter, token),
            getMaterialTableData(filter, token),
            // getEnquiryTableData(filter, token),
          ]);
          console.log("API responses:", {manufacturerRes});
        setData({
          robot: robotRes?.items || [],
          manufacturer: manufacturerRes || [],
          materials: materialRes?.items || [],
           enquery: [], // enquiryRes?.items || [],
        });
      } catch (error) {
        console.error("Dashboard fetch error:", error);
      }
    };

    fetchData();
  }, []);

  return <MyDashboard {...data} />;
}
