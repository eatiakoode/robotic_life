import dynamic from "next/dynamic";
import AddAgent from "@/components/dashboard/add-agent";

export const metadata = {
  title: 'My Properties || WeGrow',
  description:
    'WeGrow',
}

const index = () => {
  return (
    <>
      <AddAgent />
    </>
  );
};

export default dynamic(() => Promise.resolve(index), { ssr: false });
