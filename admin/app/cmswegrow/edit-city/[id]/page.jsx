import dynamic from "next/dynamic";
import EditCity from "@/components/dashboard/edit-city";

export const metadata = {
  title: 'My Properties || WeGrow - Real Estate',
  description:
    'WeGrow - Real Estate',
}

const index = () => {
  return (
    <>
      <EditCity />
    </>
  );
};

export default dynamic(() => Promise.resolve(index), { ssr: false });
