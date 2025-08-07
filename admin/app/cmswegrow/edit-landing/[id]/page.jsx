import dynamic from "next/dynamic";
import EditLanding from "@/components/dashboard/edit-landing";

export const metadata = {
  title: 'Create Listing || WeGrow - Real Estate',
  description:
    'WeGrow - Real Estate',
}

const index = () => {
  return (
    <>
      <EditLanding />
    </>
  );
};

export default dynamic(() => Promise.resolve(index), { ssr: false });
