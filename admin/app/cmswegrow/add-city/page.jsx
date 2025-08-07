import dynamic from "next/dynamic";
import AddCity from "@/components/dashboard/add-city";

export const metadata = {
  title: 'My Properties || WeGrow',
  description:
    'WeGrow',
}

const index = () => {
  return (
    <>
      <AddCity />
    </>
  );
};

export default dynamic(() => Promise.resolve(index), { ssr: false });
