import dynamic from "next/dynamic";
import MyLanding from "@/components/dashboard/my-landing";

export const metadata = {
  title: 'My landing page || WeGrow - Real Estate ',
  description:
    'WeGrow - Real Estate ',
}

const index = () => {
  return (
    <>
      <MyLanding />
    </>
  );
};

export default dynamic(() => Promise.resolve(index), { ssr: false });
