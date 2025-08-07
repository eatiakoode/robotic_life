import dynamic from "next/dynamic";
import EditLocation from "@/components/dashboard/edit-location";

export const metadata = {
  title: 'My Properties || WeGrow - Real Estate',
  description:
    'WeGrow - Real Estate',
}

const index = () => {
  return (
    <>
      <EditLocation />
    </>
  );
};

export default dynamic(() => Promise.resolve(index), { ssr: false });
