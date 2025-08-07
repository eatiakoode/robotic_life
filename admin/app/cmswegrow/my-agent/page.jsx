import dynamic from "next/dynamic";
import MyAgent from "@/components/dashboard/my-agent";

export const metadata = {
  title: 'My Properties || WeGrow - Real Estate',
  description:
    'WeGrow - Real Estate',
}

const index = () => {
  return (
    <>
      <MyAgent />
    </>
  );
};

export default dynamic(() => Promise.resolve(index), { ssr: false });
