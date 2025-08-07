import dynamic from "next/dynamic";
import MyBuilder from "@/components/dashboard/my-builder";

export const metadata = {
  title: 'My Properties || WeGrow - Real Estate',
  description:
    'WeGrow - Real Estate',
}

const index = () => {
  return (
    <>
      <MyBuilder />
    </>
  );
};

export default dynamic(() => Promise.resolve(index), { ssr: false });
