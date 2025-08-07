import dynamic from "next/dynamic";
import EditBuilder from "@/components/dashboard/edit-builder";

export const metadata = {
  title: 'My Properties || WeGrow - Real Estate',
  description:
    'WeGrow - Real Estate',
}

const index = () => {
  return (
    <>
      <EditBuilder />
    </>
  );
};

export default dynamic(() => Promise.resolve(index), { ssr: false });
