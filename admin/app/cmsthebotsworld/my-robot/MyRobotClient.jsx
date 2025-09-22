// app/cmsthebotsworld/my-robot/MyRobotClient.jsx
"use client";

import dynamic from "next/dynamic";

const MyRobot = dynamic(() => import("@/components/dashboard/my-robot"), {
  ssr: false,
  loading: () => <p className="p-4">Loading robots...</p>,
});

export default function MyRobotClient({ robots, totalCount, filter }) {
  return (
    <MyRobot
      robots={robots}
      totalCount={totalCount}
      filter={filter}
    />
  );
}
