import BlogDefault from "@/components/blogs/BlogDefault";
import BlogList from "@/components/blogs/BlogList";
import Footer1 from "@/components/footers/Footer1";
import Header1 from "@/components/headers/Header1";
import Link from "next/link";
import React from "react";
import dynamic from "next/dynamic";

// export default function BlogListPage() {
//   return (
//     <>
//       <Header1 />
//       <div
//         className="page-title"
//         style={{ backgroundImage: "url(/images/section/detail-card.png)" }}
//       >
//         <div className="container-full">
//           <div className="row">
//             <div className="col-12">
//               <h3 className="heading text-center text-white">Blog Default</h3>
//               <ul className="breadcrumbs d-flex align-items-center justify-content-center">
//                 <li>
//                   <Link className="link text-white" href={`/`}>
//                     Homepage
//                   </Link>
//                 </li>
//                 <li>
//                   <i className="icon-arrRight" />
//                 </li>
//                 <li>Blog List</li>
//               </ul>
//             </div>
//           </div>
//         </div>
//       </div>
//       <BlogList />
//       <Footer1 dark/>
//     </>
//   );
// }

import { getBlogBySlug } from "@/api/frontend/blog";
import BlogDetail from "@/components/common/blog";
import { getBlogById } from "@/api/blog";

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
const res = await getBlogById(params.id);
    const blog = res?.data;
  return (
    <>
     <Header1 />
      <div
        className="page-title"
        style={{ backgroundImage: "url(/images/section/detail-card.png)" }}
      >
        <div className="container-full">
          <div className="row">
            <div className="col-12">
              <h3 className="heading text-center text-white">Blog Default</h3>
              <ul className="breadcrumbs d-flex align-items-center justify-content-center">
                <li>
                  <Link className="link text-white" href={`/`}>
                    Homepage
                  </Link>
                </li>
                <li>
                  <i className="icon-arrRight" />
                </li>
                <li>Blog List</li>
              </ul>
            </div>
          </div>
        </div>
      </div>
      <BlogList blog={blog} />
      <Footer1 dark/>

    {/* <BlogDetail blog={blog}/> */}
    </>
  );
};

// export default BlogDetailsDynamic;

export default dynamic(() => Promise.resolve(BlogDetailsDynamic), {
  ssr: false,
});
