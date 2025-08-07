


import dynamic from "next/dynamic";
import ThankYou from "@/components/thankyou-page";

export const metadata = {
  title: 'Thank You || WeGrow',
  description:
    'WeGrow',
}

const index = () => {
  return (
    <>
      <ThankYou />
    </>
  );
};

export default dynamic(() => Promise.resolve(index), { ssr: false });
