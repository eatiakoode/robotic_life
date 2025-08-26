"use client";

import dynamic from "next/dynamic";

const AddSlider = dynamic(() => import("@/components/dashboard/add-slider"), { ssr: false });

export default function AddSliderWrapper() {
  return <AddSlider />;
}
