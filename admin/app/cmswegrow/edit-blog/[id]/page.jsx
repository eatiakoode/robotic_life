import dynamic from "next/dynamic";
import EditBlog from "@/components/dashboard/edit-blog";

export const metadata = {
  title: 'My Properties || WeGrow - Real Estate',
  description:
    'WeGrow - Real Estate',
}

const index = () => {
  return (
    <>
      <EditBlog />
    </>
  );
};

export default dynamic(() => Promise.resolve(index), { ssr: false });
