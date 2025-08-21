"use client";
import dynamic from "next/dynamic";

const AddPayLoadType = dynamic(() => import("@/components/dashboard/add-payloadtype"), {
  ssr: false,
});

export default function AddPayLoadTypeWrapper() {
  return <AddPayLoadType />;
}
