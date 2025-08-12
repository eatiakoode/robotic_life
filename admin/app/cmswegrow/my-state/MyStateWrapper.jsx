"use client";

import dynamic from "next/dynamic"

const MyState = dynamic(() => import("@/components/dashboard/my-state"), {
  ssr: false,
});

export default function MyStateWrapper() {
  return <MyState />;
}
