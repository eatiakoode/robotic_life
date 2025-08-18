"use client";
import dynamic from "next/dynamic";

const AddSensor = dynamic(() => import("@/components/dashboard/add-sensor"), {
  ssr: false,
});

export default function AddSensorWrapper() {
  return <AddSensor />;
}
