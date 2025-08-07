import dynamic from "next/dynamic";
import PropertyPage from "@/components/propertypage";
import { getPropertyPageBySlug } from "@/api/frontend/propertypage";

export async function generateMetadata({ params }) {
 
  try {
    const res = await getPropertyPageBySlug(params.id);
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
const PropertyPageDetailsDynamic = ({params}) => {

  
  const id = params.id;
  
  return (
    <>

<PropertyPage params={params}/>
    </>
  );
};

// export default BlogDetailsDynamic;

export default dynamic(() => Promise.resolve(PropertyPageDetailsDynamic), {
  ssr: false,
});
// const index = () => {
//   return (
//     <>
//       <PropertyPage params={params}/>
//     </>
//   );
// };

// export default dynamic(() => Promise.resolve(index), { ssr: false });
