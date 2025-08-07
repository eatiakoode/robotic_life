import dynamic from "next/dynamic";
import MyDashboard from "@/components/dashboard/my-dashboard";
import { getPropertyTableData } from "@/api/property";
import { getPropertyEnquiryTableData } from "@/api/propertyenquiry";
import { getLandingEnquiryTableData } from "@/api/landingenquiry";
import { getEnquiryTableData } from "@/api/enquiry";
export const metadata = {
  title: 'Dashboard || Wegrow - Real Estate React Template',
  description:
    'Wegrow - Real Estate React Template',
}
export default async function MyDashboardPage() {
  try {
    // Run requests in parallel to reduce wait time
     const filter = {
    limit: 1000,
    page:  1
  }
    const [propertyRes, enqueryCountProperty, enqueryCountLanding, enqueryCount] = await Promise.all([
      getPropertyTableData(filter),
      getPropertyEnquiryTableData(),
      getLandingEnquiryTableData(),
      getEnquiryTableData(),
    ]);

    const properties = propertyRes?.items || [];
    const enqueryProperty = enqueryCountProperty || [];
    const enqueryLanding = enqueryCountLanding || [];
    const enquery = enqueryCount || [];

    return (
      <MyDashboard
        properties={properties}
        enqueryProperty={enqueryProperty}
        enqueryLanding={enqueryLanding}
        enquery={enquery}
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
