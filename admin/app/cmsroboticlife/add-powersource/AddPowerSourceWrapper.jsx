"use client";
import dynamic from "next/dynamic";

const AddPowerSource = dynamic(() => import("@/components/dashboard/add-powersource"), {
  ssr: false,
});

export default function AddPowerSourceWrapper() {
  return <AddPowerSource />;
}
