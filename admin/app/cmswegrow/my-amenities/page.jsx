import dynamic from "next/dynamic";
import MyAmenity from "@/components/dashboard/my-amenities";

export const metadata = {
  title: 'My Properties || WeGrow - Real Estate',
  description:
    'WeGrow - Real Estate',
}

const index = () => {
  return (
    <>
      <MyAmenity />
    </>
  );
};

export default dynamic(() => Promise.resolve(index), { ssr: false });
