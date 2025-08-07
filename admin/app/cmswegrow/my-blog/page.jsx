import dynamic from "next/dynamic";
import MyBlog from "@/components/dashboard/my-blog";

export const metadata = {
  title: 'My Properties || WeGrow - Real Estate',
  description:
    'WeGrow - Real Estate',
}

const index = () => {
  return (
    <>
      <MyBlog />
    </>
  );
};

export default dynamic(() => Promise.resolve(index), { ssr: false });
