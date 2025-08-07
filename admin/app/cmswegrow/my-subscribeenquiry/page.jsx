import dynamic from "next/dynamic";
import MySubscribeEnquiry from "@/components/dashboard/my-subscribeenquiry";

export const metadata = {
  title: 'My Review || WeGrow - Real Estate ',
  description:
    'WeGrow - Real Estate ',
}

const index = () => {
  return (
    <>
      <MySubscribeEnquiry/>
    </>
  );
};

export default dynamic(() => Promise.resolve(index), { ssr: false });
