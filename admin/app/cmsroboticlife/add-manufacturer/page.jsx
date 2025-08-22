// "use client"; // ✅ Marks this page as a Client Component

// import AddBuilder from "@/components/dashboard/add-builder";
import AddManufacturerWrapper from "./AddManufacturerWrapper";

export const metadata = {
  title: 'My Robots || RoboticLife',
  description: 'RoboticLife',
};
export default function Page() {
  return <AddManufacturerWrapper />;
}
