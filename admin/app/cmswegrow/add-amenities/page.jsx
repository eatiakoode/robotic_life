import dynamic from "next/dynamic";
import AddAmenities from "@/components/dashboard/add-amenities";

export const metadata = {
  title: 'My Properties || WeGrow',
  description:
    'WeGrow',
}

const index = () => {
  return (
    <>
      <AddAmenities />
    </>
  );
};

export default dynamic(() => Promise.resolve(index), { ssr: false });
