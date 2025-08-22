import dynamic from "next/dynamic";
import MyPropertyEnquiry from "@/components/dashboard/my-propertyenquiry";

export const metadata = {
  title: 'My Review || WeGrow - Real Estate ',
  description:
    'WeGrow - Real Estate ',
}

const index = () => {
  return (
    <>
      <MyPropertyEnquiry/>
    </>
  );
};

export default dynamic(() => Promise.resolve(index), { ssr: false });
