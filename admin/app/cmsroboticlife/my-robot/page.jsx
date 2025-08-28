// app/cmsroboticlife/my-robot/page.jsx
import { cookies } from "next/headers";
import { getRobotTableData } from "@/api/robot";
import MyRobot from "@/components/dashboard/my-robot";

export const metadata = {
  title: "My Robots || Robotic Life",
  description: "Robotic Life - Manage your robots",
};

export default async function ListingPage({ searchParams }) {
  const filter = {
    limit: 10,
    page: parseInt(searchParams.page) || 1,
  };

  // ✅ Get token from cookies on the server
  const token = cookies().get("token")?.value;

  const data = await getRobotTableData(filter, token);

  const robots = data?.items || [];
  const totalCount = data?.totalCount || 0;

  return <MyRobot robots={robots} totalCount={totalCount} filter={filter} />;
}
