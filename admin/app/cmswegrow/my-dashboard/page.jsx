// "use client";
import dynamic from "next/dynamic";
import MyDashboard from "@/components/dashboard/my-dashboard";
import { getRobotTableData } from "@/api/robot";
// import { getPropertyEnquiryTableData } from "@/api/propertyenquiry";
// import { getLandingEnquiryTableData } from "@/api/landingenquiry";
import { getEnquiryTableData } from "@/api/enquiry";
export const metadata = {
  title: 'Dashboard || RoboticLife - Robot React Template',
  description:
    'RoboticLife - Robot React Template',
}
export default async function MyDashboardPage() {
  try {
    // Run requests in parallel to reduce wait time
     const filter = {
    limit: 1000,
    page:  1
  }
    const [robotRes, enqueryCountProperty, enqueryCountLanding, enqueryCount] = await Promise.all([
      getRobotTableData(filter),
      // getPropertyEnquiryTableData(),
      // getLandingEnquiryTableData(),
      // getEnquiryTableData(),
    ]);

    const robot = robotRes?.items || [];
    // const enqueryProperty = enqueryCountProperty || [];
    // const enqueryLanding = enqueryCountLanding || [];
    // const enquery = enqueryCount || [];

    return (
      <MyDashboard
        robot={robot}
        // enqueryProperty={enqueryProperty}
        // enqueryLanding={enqueryLanding}
        // enquery={enquery}
      />
    );
  } catch (error) {
    console.error("HomePage fetch error:", error);
    // Optionally: return an error fallback component here
    return <div className="text-center py-10">Failed to load homepage content.</div>;
  }
}

// const index = () => {
//   return (
//     <>
//       <MyDashboard />
//     </>
//   );
// };

// export default dynamic(() => Promise.resolve(index), { ssr: false });
