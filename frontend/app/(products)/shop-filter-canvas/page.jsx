import Footer1 from "@/components/footers/Footer1";
import Header1 from "@/components/headers/Header1";
import Topbar6 from "@/components/headers/Topbar6";
import Products1 from "@/components/products/Products1";
import Link from "next/link";
import React from "react";
import dynamic from "next/dynamic";
import { getParentCategories, getRobotsByCategorySlug } from "@/api/category";


export async function generateMetadata({ searchParams }) {
  let categorydata = null;
  let locationdata = null;
  try {
    
    if (searchParams.cat) {
      try {
        categorydata = await getRobotsByCategorySlug(searchParams.category);
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

  // const data = await getPropertyFilterData(filter);
  
  // const properties = data?.items || [];
  // const totalCount = data?.totalCount || 0;
  
  let categorydata = null;
  let locationdata = null;
  if (searchParams.category) {
      try {
        categorydata = await getRobotsByCategorySlug(searchParams.category);
      } catch (error) {
        console.error("Category fetch failed:", error.message);
        categorydata = null; // fallback to default
      }
    } 
  


  return(<>
      <Header1 />
      <div
        className="page-title"
        style={{ backgroundImage: "url(/images/section/detail-card.png)" }}
      >
        <div className="container-full">
          <div className="row">
            <div className="col-12">
              <h3 className="heading text-center text-white">Robots</h3>
              <ul className="breadcrumbs d-flex align-items-center justify-content-center">
                <li>
                  <Link className="link text-white" href={`/`}>
                    Homepage
                  </Link>
                </li>
                <li>
                  <i className="icon-arrRight" />
                </li>
                <li>Robots</li>
              </ul>
            </div>
          </div>
        </div>
      </div>
      <Products1 products={categorydata} productMain={categorydata} />
      <Footer1 dark />
    </>)
}
