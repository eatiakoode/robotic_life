"use client";

import { useEffect, useState } from "react";
import MyDashboard from "@/components/dashboard/my-dashboard";
import { getRobotTableData } from "@/api/robot";
import { getManufacturerTableData } from "@/api/manufacturer";
import { getTestimonialTableData } from "@/api/testimonial";
import { getEnquiryTableData } from "@/api/enquiry";

export default function DashboardClient() {
  const [data, setData] = useState({
    robot: [],
    manufacturer: [],
    testimonials: [],
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

        // Run API calls in parallel with error handling
        const [robotRes, manufacturerRes, testimonialRes, enquiryRes] =
          await Promise.allSettled([
            getRobotTableData(filter, token),
            getManufacturerTableData(filter, token),
            getTestimonialTableData(),
            getEnquiryTableData(filter),
          ]);
          
          console.log("API responses:", {
            robot: robotRes.status,
            manufacturer: manufacturerRes.status,
            testimonial: testimonialRes.status,
            enquiry: enquiryRes.status
          });
          
        setData({
          robot: robotRes.status === 'fulfilled' ? (robotRes.value?.items || []) : [],
          manufacturer: manufacturerRes.status === 'fulfilled' ? (manufacturerRes.value || []) : [],
          testimonials: testimonialRes.status === 'fulfilled' ? (testimonialRes.value || []) : [],
          enquery: enquiryRes.status === 'fulfilled' ? (enquiryRes.value?.items || []) : [],
        });
      } catch (error) {
        console.error("Dashboard fetch error:", error);
      }
    };

    fetchData();
  }, []);

  return <MyDashboard {...data} />;
}
