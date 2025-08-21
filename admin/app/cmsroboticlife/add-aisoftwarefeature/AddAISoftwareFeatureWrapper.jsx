"use client";
import dynamic from "next/dynamic";

const AddAISoftwareFeature = dynamic(() => import("@/components/dashboard/add-aisoftwarefeature"), {
  ssr: false,
});

export default function AddAISoftwareFeatureWrapper() {
  return <AddAISoftwareFeature />;
}
