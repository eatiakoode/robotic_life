"use client";
import dynamic from "next/dynamic";

const AddTerrainCapability = dynamic(() => import("@/components/dashboard/add-terraincapability"), {
  ssr: false,
});

export default function AddTerrainCapabilityWrapper() {
  return <AddTerrainCapability />;
}
