"use client";

import dynamic from "next/dynamic";

const AddManufacturer = dynamic(() => import("@/components/dashboard/add-manufacturer"), { ssr: false });

export default function AddManufacturerWrapper() {
  return <AddManufacturer />;
}
