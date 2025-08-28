"use client";
import dynamic from "next/dynamic";

const AddPrimaryFunction = dynamic(() => import("@/components/dashboard/add-primaryfunction"), {
  ssr: false,
});

export default function AddPrimaryFunctionWrapper() {
  return <AddPrimaryFunction />;
}
