"use client";
import dynamic from "next/dynamic";

const AddColor = dynamic(() => import("@/components/dashboard/add-color"), {
  ssr: false,
});

export default function AddColorWrapper() {
  return <AddColor />;
}
