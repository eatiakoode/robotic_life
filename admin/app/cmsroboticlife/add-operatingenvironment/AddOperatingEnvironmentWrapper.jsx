"use client";
import dynamic from "next/dynamic";

const AddOperatingEnvironment = dynamic(() => import("@/components/dashboard/add-operatingenvironment"), {
  ssr: false,
});

export default function AddOperatingEnvironmentWrapper() {
  return <AddOperatingEnvironment />;
}
