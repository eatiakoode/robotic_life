import dynamic from "next/dynamic";
import AddCategory from "@/components/dashboard/add-category";

export const metadata = {
  title: 'My Category || WeGrow',
  description:
    'WeGrow',
}

const index = () => {
  return (
    <>
      <AddCategory />
    </>
  );
};

export default dynamic(() => Promise.resolve(index), { ssr: false });
