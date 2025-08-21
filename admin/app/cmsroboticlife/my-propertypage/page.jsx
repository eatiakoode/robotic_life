import dynamic from "next/dynamic";
import MyPropertypage from "@/components/dashboard/my-propertypage";

export const metadata = {
  title: 'My Properties || WeGrow - Real Estate ',
  description:
    'WeGrow - Real Estate ',
}

const index = () => {
  return (
    <>
      <MyPropertypage />
    </>
  );
};

export default dynamic(() => Promise.resolve(index), { ssr: false });
