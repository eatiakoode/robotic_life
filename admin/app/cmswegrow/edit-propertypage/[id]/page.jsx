import dynamic from "next/dynamic";
import EditPropertypage from "@/components/dashboard/edit-propertypage";

export const metadata = {
  title: 'My Properties || WeGrow - Real Estate',
  description:
    'WeGrow - Real Estate',
}

const index = () => {
  return (
    <>
      <EditPropertypage />
    </>
  );
};

export default dynamic(() => Promise.resolve(index), { ssr: false });
