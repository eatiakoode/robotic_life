import dynamic from "next/dynamic";
import MyCategory from "@/components/dashboard/my-category";

export const metadata = {
  title: 'My Properties || WeGrow - Real Estate',
  description:
    'WeGrow - Real Estate',
}

const index = () => {
  return (
    <>
      <MyCategory />
    </>
  );
};

export default dynamic(() => Promise.resolve(index), { ssr: false });
