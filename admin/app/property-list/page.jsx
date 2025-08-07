// import dynamic from "next/dynamic";
import GridV1 from "@/components/listing-grid/grid-v1";
import { getPropertyFilterData } from "@/api/frontend/property";
import { getCategoryById } from "@/api/frontend/category";
import { getLocationById } from "@/api/frontend/location";

// export const metadata = {
//   title: 'WeGrow - Real Estate ',
//   description:
//     'WeGrow - Real Estate ',
// }
export async function generateMetadata({ searchParams }) {
  let categorydata = null;
  let locationdata = null;
  try {
    
    if (searchParams.cat) {
      try {
        categorydata = await getCategoryById(searchParams.cat);
      } catch (error) {
        console.error("Category fetch failed:", error.message);
        categorydata = null; // fallback to default
      }
    } else if (searchParams.location) {
      try {
          locationdata = await getLocationById(searchParams.location);
        } catch (error) {
          console.error("Category fetch failed:", error.message);
          locationdata = null; // fallback to default
        }
    }
    
    
    if (categorydata) {
      return {
        title: categorydata.metatitle? categorydata.metatitle : 'WEGROW INFRAVENTURES - Property List',
        description: categorydata.metadescription?.slice(0, 200) ? categorydata.metadescription :  'WEGROW INFRAVENTURES - Property List.',
        
      };
    } if (locationdata) {
      return {
        title: locationdata.metatitle? locationdata.metatitle : 'WEGROW INFRAVENTURES - Property List',
        description: locationdata.metadescription?.slice(0, 200) ? locationdata.metadescription :  'WEGROW INFRAVENTURES - Property List.',
        
      };
    } else {
      return {
        title: 'WEGROW INFRAVENTURES - Property List ',
        description:'WEGROW INFRAVENTURES - Property List ',
      };
    }
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
//       <GridV1 />
//     </>
//   );
// };

// // export default dynamic(() => Promise.resolve(index), { ssr: false });

// export default index;
export default async function ListingPage({ searchParams }) {
  const filter = {
    keyword: searchParams.keyword || "",
    city: searchParams.city || "",
    category: searchParams.cat || "",
    propertytype: searchParams.propertytype || "",
    location: searchParams.location || "",
    limit: 4,
    page: searchParams.page || 1,
  };

  const data = await getPropertyFilterData(filter);
  
  const properties = data?.items || [];
  const totalCount = data?.totalCount || 0;
  
  let categorydata = null;
  let locationdata = null;
  if (searchParams.cat) {
      try {
        categorydata = await getCategoryById(searchParams.cat);
      } catch (error) {
        console.error("Category fetch failed:", error.message);
        categorydata = null; // fallback to default
      }
    } else  if (searchParams.location) {
      try {
        locationdata = await getLocationById(searchParams.location);
      } catch (error) {
        console.error("Category fetch failed:", error.message);
        locationdata = null; // fallback to default
      }
    }
  


  return <GridV1 properties={properties} totalCount={totalCount} filter={filter} categorydata={categorydata} locationdata={locationdata}/>;
}

