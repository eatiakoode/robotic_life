import dynamic from "next/dynamic";
import AddPropertypage from "@/components/dashboard/add-propertypage";

export const metadata = {
  title: 'Create Listing || RoboticLife',
  description:
    'RoboticLife',
}

const index = () => {
  return (
    <>
      <AddPropertypage />
    </>
  );
};

export default dynamic(() => Promise.resolve(index), { ssr: false });
