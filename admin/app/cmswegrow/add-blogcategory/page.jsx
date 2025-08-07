import dynamic from "next/dynamic";
import AddBlogcategory from "@/components/dashboard/add-blogcategory";

export const metadata = {
  title: 'My Properties || WeGrow',
  description:
    'WeGrow',
}

const index = () => {
  return (
    <>
      <AddBlogcategory />
    </>
  );
};

export default dynamic(() => Promise.resolve(index), { ssr: false });
