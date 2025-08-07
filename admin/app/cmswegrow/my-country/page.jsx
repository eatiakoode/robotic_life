import dynamic from "next/dynamic";
import MyCountry from "@/components/dashboard/my-country";

export const metadata = {
  title: 'My Properties || WeGrow - Real Estate ',
  description:
    'WeGrow - Real Estate ',
}

const index = () => {
  return (
    <>
      <MyCountry />
    </>
  );
};

export default dynamic(() => Promise.resolve(index), { ssr: false });
