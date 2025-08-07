import dynamic from "next/dynamic";
import AddPropertytype from "@/components/dashboard/add-propertytype";

export const metadata = {
  title: 'My Properties || WeGrow',
  description:
    'WeGrow',
}

const index = () => {
  return (
    <>
      <AddPropertytype />
    </>
  );
};

export default dynamic(() => Promise.resolve(index), { ssr: false });
