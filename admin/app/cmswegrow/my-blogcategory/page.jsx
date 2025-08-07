import dynamic from "next/dynamic";
import MyBlogcategory from "@/components/dashboard/my-blogcategory";

export const metadata = {
  title: 'My Properties || WeGrow - Real Estate',
  description:
    'WeGrow - Real Estate',
}

const index = () => {
  return (
    <>
      <MyBlogcategory />
    </>
  );
};

export default dynamic(() => Promise.resolve(index), { ssr: false });
