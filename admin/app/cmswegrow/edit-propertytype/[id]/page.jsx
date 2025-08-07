import dynamic from "next/dynamic";
import EditPropertytype from "@/components/dashboard/edit-propertytype";

export const metadata = {
  title: 'My Properties || WeGrow - Real Estate',
  description:
    'WeGrow - Real Estate',
}

const index = () => {
  return (
    <>
      <EditPropertytype />
    </>
  );
};

export default dynamic(() => Promise.resolve(index), { ssr: false });
