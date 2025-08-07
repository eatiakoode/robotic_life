'use client'
import Image from "next/image";
// import comparePricingContent from "../../data/comparePricing";
import { useState, useEffect } from "react";
import { getPropertyCompareData } from "@/api/frontend/property";
import { useCompare } from "@/components/common/footer/CompareContext";
// import Image from "next/image";
const ComparePricing = ({ setPropertySelectedComp, setShowBox }) => {
  const [properties, setProperties] = useState([]);
  const { propertycompare, setPropertycompare } = useCompare();
     const deleteCompareProperty = async (id) => {
      setPropertycompare((old) =>
          old.includes(id) ? old.filter(item => item !== id) : [...old, id]
        );
    };
  useEffect(() => {
      const fetchProperties = async () => {
        if (Array.isArray(propertycompare) && propertycompare.length > 0) {
          const propertycomparelist = propertycompare.join(",");
          const data = await getPropertyCompareData(propertycomparelist);
          setProperties(data);
        } else {
          setProperties([]); // clear if nothing to show
        }
      };
    
      fetchProperties();
    }, [propertycompare]); 
  return (
    <>
      {properties.map((item) => (
        <li className="list-inline-item"  key={item._id}>
          <ul className="mc_child_list two text-center">
            <li>
              <div className="membership_header">
                <div className="thumb">
                  <a href="#"  onClick={(e) => deleteCompareProperty(item._id)}>
                    <span className="flaticon-close"></span>
                  </a>
                  <Image
                    width={200}
                    height={80}
                    className="img-whp cover"
                    src={
                      item.featuredimageurl
                        ? `${process.env.NEXT_PUBLIC_API_URL}${item.featuredimageurl.url?item.featuredimageurl.url:item.featuredimageurl}`
                        : `${process.env.NEXT_PUBLIC_API_URL}public/assets/images/thumbnail.webp`
                    }
                    alt= {`${item.featuredimageurl?.name?item.featuredimageurl?.name:item.title}`}
                    unoptimized 
                  />
                  <div className="price">
                    {item.price}
                    
                  </div>
                </div>
                <div className="details">
                <a href={`/property-detail/${item.slug}`}><h4>{item.title}</h4></a>
                  <p>{item.propertytypeid?.title}</p>
                </div>
              </div>
            </li>
            <li>
              <a href={`/property-detail/${item.slug}`}>{item.cityid?.title}</a>
            </li>
            <li>
            {item.areasize} {item.sizeprefix}
            </li>
            <li>
              <a href={`/property-detail/${item.slug}`}>{item.bedrooms}</a>
            </li>
           
            {/* <li>
              <a href={`/property-detail/${item.slug}`}>{item.bathrooms}</a>
            </li> */}
            <li>
              <a href={`/property-detail/${item.slug}`}>{item.garages}</a>
            </li>
            <li>
              <a href={`/property-detail/${item.slug}`}>{item.yearbuild}</a>
            </li>
            {/* <li>
              <a href="#">{item.laundryRoom}</a>
            </li> */}
             <li  >
            {item.amenityid?.map((val, i) => (
                <span  key={i}>{val?.title}, </span>
            ))}
            </li>
            <li>
              <a className="btn pricing_btn" href={`/property-detail/${item.slug}`}>
              {item.furnishingstatus?.title}
              </a>
            </li>
            <li>
              <a href={`/property-detail/${item.slug}`}>View Property</a>
            </li>
          </ul>
        </li>
      ))}
    </>
  );
};

export default ComparePricing;
