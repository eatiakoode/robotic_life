// "use client"; 
// import { useEffect, useState } from "react";
import dynamic from "next/dynamic";
// export const dynamic = "force-dynamic";

// import BreadCrumb2 from "@/components/blog-details/BreadCrumb2";
// // import Comments from "@/components/blog-details/Comments";
// // import Pagination from "@/components/blog-details/Pagination";
// // import Ratings from "@/components/blog-details/Ratings";
// // import RelatedPost from "@/components/blog-details/RelatedPost";
// // import ReviewBox from "@/components/blog-details/ReviewBox";
// import BlogSidebar from "@/components/common/blog/BlogSidebar";
// import CopyrightFooter from "@/components/common/footer/CopyrightFooter";
// import Footer from "@/components/common/footer/Footer";
// // import Social from "@/components/common/footer/Social";
// import Header from "@/components/common/header/DefaultHeader";
// import MobileMenu from "@/components/common/header/MobileMenu";
// import PopupSignInUp from "@/components/common/PopupSignInUp";
// // import blogs from "@/data/blogs";
// import Image from "next/image";

import { getBlogBySlug } from "@/api/frontend/blog";
import BlogDetail from "@/components/common/blog";

export async function generateMetadata({ params }) {
  try {
    const res = await getBlogBySlug(params.id);
    const blog = res?.data;

    if (!blog) {
      return {
        title: 'Property Not Found | WeGrow',
        description: 'The requested blog was not found.',
      };
    }

    return {
      title: blog.metatitle? blog.metatitle : blog.title || 'Property Details | WeGrow',
      description: blog.metadescription?.slice(0, 200) ? blog.metadescription : blog.description?.slice(0, 200)|| 'Read more on WeGrow blog.',
      openGraph: {
        title: blog.title,
        description: blog.description?.slice(0, 150),
        images: blog.logoimage
          ? [
              {
                url: `${process.env.NEXT_PUBLIC_API_URL}${blog.logoimage}`,
                width: 800,
                height: 600,
              },
            ]
          : [],
      },
    };
  } catch (error) {
    console.error("Metadata error:", error);
    return {
      title: 'Error Loading Blog',
      description: 'There was an issue loading the blog metadata.',
    };
  }
}
const BlogDetailsDynamic = async ({params}) => {

  
  const id = params.id;
const res = await getBlogBySlug(params.id);
    const blog = res?.data;
  return (
    <>

    <BlogDetail blog={blog}/>
    </>
  );
};

// export default BlogDetailsDynamic;

export default dynamic(() => Promise.resolve(BlogDetailsDynamic), {
  ssr: false,
});
