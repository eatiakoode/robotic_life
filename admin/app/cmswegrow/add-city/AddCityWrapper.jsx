"use client";

import dynamic from "next/dynamic"

const AddCity = dynamic(() => import("@/components/dashboard/add-city"), {
  ssr: false,
});

export default function AddCityWrapper() {
  return <AddCity />;
}