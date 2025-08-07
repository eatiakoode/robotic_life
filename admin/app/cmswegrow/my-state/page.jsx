import dynamic from "next/dynamic";
import MyState from "@/components/dashboard/my-state";

export const metadata = {
  title: 'My Properties || WeGrow - Real Estate ',
  description:
    'WeGrow - Real Estate ',
}

const index = () => {
  return (
    <>
      <MyState />
    </>
  );
};

export default dynamic(() => Promise.resolve(index), { ssr: false });
