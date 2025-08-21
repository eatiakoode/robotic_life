"use client";
import dynamic from "next/dynamic";

const AddCountry = dynamic(() => import("@/components/dashboard/add-country"), {
  ssr: false,
});

export default function AddCountryWrapper() {
  return <AddCountry />;
}
