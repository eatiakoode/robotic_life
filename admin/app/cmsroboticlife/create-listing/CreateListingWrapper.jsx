"use client";

import dynamic from "next/dynamic"

const CreateListing = dynamic(() => import("@/components/dashboard/create-listing"), {
  ssr: false,
});

export default function CreateListingWrapper() {
  return <CreateListing />;
}