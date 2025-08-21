"use client";
import dynamic from "next/dynamic";

const AddMaterial = dynamic(() => import("@/components/dashboard/add-material"), {
  ssr: false,
});

export default function AddMaterialWrapper() {
  return <AddMaterial />;
}
