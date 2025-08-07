import dynamic from "next/dynamic";
import MyEnquiry from "@/components/dashboard/my-enquiry";

export const metadata = {
  title: 'My Review || WeGrow - Real Estate ',
  description:
    'WeGrow - Real Estate ',
}

const index = () => {
  return (
    <>
      <MyEnquiry />
    </>
  );
};

export default dynamic(() => Promise.resolve(index), { ssr: false });
