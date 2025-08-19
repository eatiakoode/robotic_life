import dynamic from "next/dynamic";
import EditManufacturer from "@/components/dashboard/edit-manufacturer";

export const metadata = {
  title: 'My Robots || RoboticLife',
  description: 'RoboticLife',
};

const index = () => {
  return (
    <>
      <EditManufacturer />
    </>
  );
};

export default dynamic(() => Promise.resolve(index), { ssr: false });
