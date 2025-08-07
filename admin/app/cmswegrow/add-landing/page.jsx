import dynamic from "next/dynamic";
import AddLanding from "@/components/dashboard/add-landing";

export const metadata = {
  title: 'Create Listing || WeGrow - Real Estate',
  description:
    'WeGrow - Real Estate ',
}

const index = () => {
  return (
    <>
      <AddLanding />
    </>
  );
};

export default dynamic(() => Promise.resolve(index), { ssr: false });
