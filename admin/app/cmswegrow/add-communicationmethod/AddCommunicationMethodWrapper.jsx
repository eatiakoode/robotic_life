"use client";
import dynamic from "next/dynamic";

const AddCommunicationMethod = dynamic(() => import("@/components/dashboard/add-communicationmethod"), {
  ssr: false,
});

export default function AddCommunicationMethodWrapper() {
  return <AddCommunicationMethod />;
}
