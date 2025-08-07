import dynamic from "next/dynamic";
import LandingPage from "@/components/landing-page";
import { getLandingpageBySlug } from "@/api/frontend/landingpage";

// export const metadata = {
//   title: 'Landing Page || WeGrow - Real Estate',
//   description:
//     'WeGrow - Real Estate',
// }
export async function generateMetadata({ params }) {
  try {
    const res = await getLandingpageBySlug(params.id);
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
      // openGraph: {
      //   title: blog.title,
      //   description: blog.description?.slice(0, 150),
      //   images: blog.logoimage
      //     ? [
      //         {
      //           url: `${process.env.NEXT_PUBLIC_API_URL}${blog.logoimage}`,
      //           width: 800,
      //           height: 600,
      //         },
      //       ]
      //     : [],
      // },
    };
  } catch (error) {
    console.error("Metadata error:", error);
    return {
      title: 'Error Loading Blog',
      description: 'There was an issue loading the blog metadata.',
    };
  }
}
// const index = () => {
//   return (
//     <>
//       <LandingPage />
//     </>
//   );
// };

// export default dynamic(() => Promise.resolve(index), { ssr: false });
const LandingDetailsDynamic = ({params}) => {

  
  const id = params.id;
  
  return (
    <>

    <LandingPage params={params}/>
    </>
  );
};

// export default BlogDetailsDynamic;

export default dynamic(() => Promise.resolve(LandingDetailsDynamic), {
  ssr: false,
});