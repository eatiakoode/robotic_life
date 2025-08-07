import dynamic from "next/dynamic";
import BlogDetails from "@/components/blog-details";

export const metadata = {
  title: 'Builder Details || WeGrow ',
  description:
    'WeGrow',
}

const index = () => {
  return (
    <>
      <BlogDetails />
    </>
  );
};

export default dynamic(() => Promise.resolve(index), { ssr: false });
