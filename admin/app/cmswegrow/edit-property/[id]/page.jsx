import dynamic from "next/dynamic";
import EditProperty from "@/components/dashboard/edit-property";

export const metadata = {
  title: 'My Properties || WeGrow - Real Estate',
  description:
    'WeGrow - Real Estate',
}

const index = () => {
  return (
    <>
      <EditProperty />
    </>
  );
};

export default dynamic(() => Promise.resolve(index), { ssr: false });
