import dynamic from "next/dynamic";
import EditSeller from "@/components/dashboard/edit-seller";

export const metadata = {
  title: 'My Properties || WeGrow - Real Estate',
  description:
    'WeGrow - Real Estate',
}

const index = () => {
  return (
    <>
      <EditSeller />
    </>
  );
};

export default dynamic(() => Promise.resolve(index), { ssr: false });
