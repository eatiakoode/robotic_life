"use client";

import dynamic from "next/dynamic";

// Load MyCities only on the client
const MyCities = dynamic(() => import("@/components/dashboard/my-cities"), {
  ssr: false,
});

export default function MyCitiesWrapper() {
  return <MyCities />;
}
