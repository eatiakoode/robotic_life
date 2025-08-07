import dynamic from "next/dynamic";
import EditAmenity from "@/components/dashboard/edit-amenities";

export const metadata = {
  title: 'My Properties || WeGrow - Real Estate',
  description:
    'WeGrow - Real Estate',
}

const index = () => {
  return (
    <>
      <EditAmenity />
    </>
  );
};

export default dynamic(() => Promise.resolve(index), { ssr: false });
