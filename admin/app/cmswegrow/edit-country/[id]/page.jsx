import dynamic from "next/dynamic";
import EditCountry from "@/components/dashboard/edit-country";

export const metadata = {
  title: 'My Properties || WeGrow - Real Estate',
  description:
    'WeGrow - Real Estate',
}

const index = () => {
  return (
    <>
      <EditCountry />
    </>
  );
};

export default dynamic(() => Promise.resolve(index), { ssr: false });
