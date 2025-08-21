import dynamic from "next/dynamic";
import MyLocation from "@/components/dashboard/my-location";

export const metadata = {
  title: 'My Properties || WeGrow - Real Estate ',
  description:
    'WeGrow - Real Estate ',
}

const index = () => {
  return (
    <>
      <MyLocation />
    </>
  );
};

export default dynamic(() => Promise.resolve(index), { ssr: false });
