import dynamic from "next/dynamic";
import { getBuilderBySlugWithProperty } from "@/api/frontend/builder";
import BuilderDetail from "@/components/builder";

export async function generateMetadata({ params }) {
  try {
    const res = await getBuilderBySlugWithProperty(params.id);
    const builder = res?.data;

    if (!builder) {
      return {
        title: 'Property Not Found | WeGrow',
        description: 'The requested builder was not found.',
      };
    }

    return {
      title: builder.metatitle? builder.metatitle : builder.title || 'Property Details | WeGrow',
      description: builder.metadescription?.slice(0, 200) ? builder.metadescription : builder.description?.slice(0, 200)|| 'Read more on WeGrow builder.',
      openGraph: {
        title: builder.title,
        description: builder.description?.slice(0, 150),
        images: builder.logoimage
          ? [
              {
                url: `${process.env.NEXT_PUBLIC_API_URL}${builder.logoimage}`,
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
      title: 'Error Loading Builder',
      description: 'There was an issue loading the builder metadata.',
    };
  }
}
const BuilderDetailsDynamic = async ({params}) => {

  
  const id = params.id;
  
const res = await getBuilderBySlugWithProperty(params.id);
    const builder = res?.data;
  return (
    <>

    <BuilderDetail builder={builder}/>
    </>
  );
};

export default dynamic(() => Promise.resolve(BuilderDetailsDynamic), {
  ssr: false,
});
