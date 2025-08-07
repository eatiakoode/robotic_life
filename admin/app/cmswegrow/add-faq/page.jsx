import dynamic from "next/dynamic";
import AddFaq from "@/components/dashboard/add-faq";

export const metadata = {
  title: 'My Properties || WeGrow',
  description:
    'WeGrow',
}

const index = () => {
  return (
    <>
      <AddFaq />
    </>
  );
};

export default dynamic(() => Promise.resolve(index), { ssr: false });
