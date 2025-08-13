"use client";

import dynamic from "next/dynamic";

const AddBuilder = dynamic(() => import("@/components/dashboard/add-builder"), { ssr: false });

export default function AddBuilderWrapper() {
  return <AddBuilder />;
}
