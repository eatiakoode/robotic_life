import dynamic from "next/dynamic";
import MyFaq from "@/components/dashboard/my-faq";

export const metadata = {
  title: 'My Properties || WeGrow - Real Estate ',
  description:
    'WeGrow - Real Estate ',
}

const index = () => {
  return (
    <>
      <MyFaq />
    </>
  );
};

export default dynamic(() => Promise.resolve(index), { ssr: false });
