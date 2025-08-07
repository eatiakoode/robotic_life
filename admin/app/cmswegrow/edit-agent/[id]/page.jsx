import dynamic from "next/dynamic";
import EditAgent from "@/components/dashboard/edit-agent";

export const metadata = {
  title: 'My Properties || WeGrow - Real Estate',
  description:
    'WeGrow - Real Estate',
}

const index = () => {
  return (
    <>
      <EditAgent />
    </>
  );
};

export default dynamic(() => Promise.resolve(index), { ssr: false });
