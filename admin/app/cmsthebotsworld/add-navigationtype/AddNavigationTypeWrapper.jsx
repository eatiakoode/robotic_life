"use client";
import dynamic from "next/dynamic";

const AddNavigationType = dynamic(() => import("@/components/dashboard/add-navigationtype"), {
  ssr: false,
});

export default function AddNavigationTypeWrapper() {
  return <AddNavigationType />;
}
