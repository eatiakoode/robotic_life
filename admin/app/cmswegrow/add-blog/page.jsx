import dynamic from "next/dynamic";
import AddBlog from "@/components/dashboard/add-blog";

export const metadata = {
  title: 'My Properties || WeGrow',
  description:
    'WeGrow',
}

const index = () => {
  return (
    <>
      <AddBlog />
    </>
  );
};

export default dynamic(() => Promise.resolve(index), { ssr: false });
