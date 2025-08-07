import dynamic from "next/dynamic";
import MyCities from "@/components/dashboard/my-cities";

export const metadata = {
  title: 'My Properties || WeGrow - Real Estate ',
  description:
    'WeGrow - Real Estate ',
}

const index = () => {
  return (
    <>
      <MyCities />
    </>
  );
};

export default dynamic(() => Promise.resolve(index), { ssr: false });
