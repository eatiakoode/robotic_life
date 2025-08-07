import dynamic from "next/dynamic";
import EditBlogcategory from "@/components/dashboard/edit-blogcategory";

export const metadata = {
  title: 'My Properties || WeGrow - Real Estate',
  description:
    'WeGrow - Real Estate',
}

const index = () => {
  return (
    <>
      <EditBlogcategory />
    </>
  );
};

export default dynamic(() => Promise.resolve(index), { ssr: false });
