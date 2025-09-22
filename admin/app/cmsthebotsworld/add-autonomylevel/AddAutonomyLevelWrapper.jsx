"use client";
import dynamic from "next/dynamic";

const AddAutonomyLevel = dynamic(() => import("@/components/dashboard/add-autonomylevel"), {
  ssr: false,
});

export default function AddAutonomyLevelWrapper() {
  return <AddAutonomyLevel />;
}
