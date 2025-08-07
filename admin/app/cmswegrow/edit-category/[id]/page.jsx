import dynamic from "next/dynamic";
import EditCategory from "@/components/dashboard/edit-category";

export const metadata = {
  title: 'My Properties || WeGrow - Real Estate',
  description:
    'WeGrow - Real Estate',
}

const index = () => {
  return (
    <>
      <EditCategory />
    </>
  );
};

export default dynamic(() => Promise.resolve(index), { ssr: false });
