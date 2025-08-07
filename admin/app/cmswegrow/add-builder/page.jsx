import dynamic from "next/dynamic";
import AddBuilder from "@/components/dashboard/add-builder";

export const metadata = {
  title: 'My Properties || WeGrow',
  description:
    'WeGrow',
}

const index = () => {
  return (
    <>
      <AddBuilder />
    </>
  );
};

export default dynamic(() => Promise.resolve(index), { ssr: false });
