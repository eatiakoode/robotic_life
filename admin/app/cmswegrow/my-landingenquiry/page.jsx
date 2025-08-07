import dynamic from "next/dynamic";
import MyLandingEnquiry from "@/components/dashboard/my-landingenquiry";

export const metadata = {
  title: 'My Review || WeGrow - Real Estate ',
  description:
    'WeGrow - Real Estate ',
}

const index = () => {
  return (
    <>
      <MyLandingEnquiry/>
    </>
  );
};

export default dynamic(() => Promise.resolve(index), { ssr: false });
