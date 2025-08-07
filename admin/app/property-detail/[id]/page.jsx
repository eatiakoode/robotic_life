export const dynamic = 'force-dynamic';
import "photoswipe/dist/photoswipe.css";
import { getPropertyBySlug } from "@/api/frontend/property";
import PropertyMain from "@/components/listing-details-v1";
import { getFaqByPropertyIdData } from "@/api/frontend/faq";
export async function generateMetadata({ params }) {
  try {
    const res = await getPropertyBySlug(params.id);
    const blog = res?.data;

    if (!blog) {
      return {
        title: 'Property Not Found | WeGrow',
        description: 'The requested blog was not found.',
      };
    }

    return {
      title: blog.metatitle? blog.metatitle : blog.title || 'Property Details | WeGrow',
      description: blog.metadescription?.slice(0, 200) ? blog.metadescription : blog.description?.slice(0, 200) || 'Read more on WeGrow blog.',
      
    };
  } catch (error) {
    console.error("Metadata error:", error);
    return {
      title: 'Error Loading Blog',
      description: 'There was an issue loading the blog metadata.',
    };
  }
}
const ListingDynamicDetailsV1 = async ({params})  => {
  const res = await getPropertyBySlug(params.id);
 
    const property = res?.data;
    const dataFAQ = await getFaqByPropertyIdData(property._id);
    const faqs=dataFAQ.data
    
  return (
    <>
      <PropertyMain property={property} faqs={faqs}/>
    </>
  );
};

export default ListingDynamicDetailsV1;
