import dynamic from "next/dynamic";
import AddState from "@/components/dashboard/add-state";

export const metadata = {
  title: 'My Properties || WeGrow - Real Estate',
  description:
    'WeGrow - Real Estate',
}

const index = () => {
  return (
    <>
      <AddState />
    </>
  );
};

export default dynamic(() => Promise.resolve(index), { ssr: false });
