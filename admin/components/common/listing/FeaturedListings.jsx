import Link from "next/link";
// import featureContent from "../../../data/properties";
import Image from "next/image";

const FeaturedListings = ({properties}) => {
  return (
    <>
      {properties?.slice(0, 3).map((item) => (
        <div className="media d-flex" key={item._id}>
          <Link href={`/property-detail/${item.slug}`}>
            <Image
              width={102}
              height={80}
              className="align-self-start me-3 w-100 h-100 cover"
              src={
                item.featuredimageurl
                  ? `${process.env.NEXT_PUBLIC_API_URL}${item.featuredimageurl.url?item.featuredimageurl.url:item.featuredimageurl}`
                  : `${process.env.NEXT_PUBLIC_API_URL}public/assets/images/thumbnail.webp`
              }
              alt= {`${item.featuredimageurl?.name?item.featuredimageurl?.name:item.title}`}
              unoptimized
            />
          </Link>

          <div className="media-body">
            <h5 className="mt-0 post_title">
              <Link href={`/property-detail/${item.slug}`}>{item.title}</Link>
            </h5>
            <Link href={`/property-detail/${item.slug}`}>
              {item.price}
              
            </Link>

            <ul className="mb0">
              {item.paymentplan && (
               <li className="list-inline-item" key="1">
                <a href={`/property-detail/${item.slug}`}>
                Payment Plan: {item.paymentplan}
                </a>
              </li>
              )}
              {item.areasize && (
                <li className="list-inline-item" key="2">
                  <a href={`/property-detail/${item.slug}`}>
                  Size: {item.areasize} {item.sizeprefix}
                  </a>
                </li>
                 )}
                {item.categoryid._id=="67ea48d17cfa562fe8eaafd0" && (
              <li className="list-inline-item" key="3">
                <a href={`/property-detail/${item.slug}`}>
                Food court/restaurant: {item.foodcourt ? "Yes" : "No"}
                </a>
              </li>
              )}
             
              
              {item.categoryid._id=="67ea48d17cfa562fe8eaafd0" && (
              <li className="list-inline-item" key="4">
                <a href="#">
                Multiplex: {item.multiplex ? "Yes" : "No"}
                </a>
              </li>
            )}
           
                
                
                
            </ul>
          </div>
        </div>
      ))}
    </>
  );
};

export default FeaturedListings;
