'use client'

import Link from "next/link";
import Slider from "react-slick";
import Image from "next/image";
import { useState, useEffect } from "react";
import { useCompare } from "@/components/common/footer/CompareContext";
const FeaturedProperties = ({ setPropertySelectedComp, setShowBox,properties }) => {
  const { propertycompare, setPropertycompare } = useCompare();
  
      const addCompareProperty = async (id) => {
      
        const isExist = propertycompare.includes(id);
      
        if (isExist) {
          alert("Already added for compare");
        } else if (propertycompare.length >= 3) {
          alert("You have already selected 3 products");
        } else {
          setPropertycompare((old) => [...old, id]);
          setShowBox(true);
        }
      };
      
      
  const settings = {
    dots: true,
    arrows: false,
    infinite: properties.length > 2,
    slidesToShow: 3,
    slidesToScroll: 3,
    autoplay: false,
    speed: 1200,
    responsive: [
      {
        breakpoint: 1200,
        settings: {
          slidesToShow: 2,
          slidesToScroll: 1,
          infinite: properties.length > 1,
        },
      },
      {
        breakpoint: 576,
        settings: {
          slidesToShow: 1,
          slidesToScroll: 3,
          infinite: properties.length > 1,
        },
      },
    ],
  };

  let content = properties?.slice(0, 12)?.map((item, index) => (
    <div className="item" key={item._id}>
      <div className="feat_property">
        <div className="thumb">
          <Image
            width={343}
            height={220}
            className="img-whp w-100 h-100 cover"
            src={
              item.featuredimageurl
                ? `${process.env.NEXT_PUBLIC_API_URL}${item.featuredimageurl.url?item.featuredimageurl.url:item.featuredimageurl}`
                : `${process.env.NEXT_PUBLIC_API_URL}public/assets/images/thumbnail.webp`
            }
            alt= {`${item.featuredimageurl?.name?item.featuredimageurl?.name:item.title}`}
            unoptimized // Optional: disables Next.js image optimization (useful if external images)
          />
          <div className="thmb_cntnt">
            <ul className="tag mb0">
              {/* {item.saleTag.map((val, i) => ( */}
                <li className="list-inline-item" key="1">
                  <a href={`/property-detail/${item.slug}`}>{item.categoryid?.title}</a>
                </li>
              {/* ))} */}
            </ul>
            {/* End .tag */}

            <ul className="icon mb0">
              <li className="list-inline-item">
              <a href="" className="tooltip-icon" data-tooltip="Compare" onClick={(e) => {
                e.preventDefault();
                addCompareProperty(item._id);
              }}>
                <span className="flaticon-transfer-1"></span>
              </a>

              </li>
              {/* <li className="list-inline-item">
                <a href="#">
                  <span className="flaticon-heart"></span>
                </a>
              </li> */}
            </ul>
            {/* End .icon */}

            <Link href={`/property-detail/${item.slug}`} className="fp_price">
              {item.price}
              {/* <small>/mo</small> */}
            </Link>
          </div>
        </div>
        {/* End .thumb */}

        <div className="details">
          <div className="tc_content">
            <p className="text-thm">{item.propertytypeid?.title}</p>
            <h4>
              <Link href={`/property-detail/${item.slug}`} >{item.title}</Link>
            </h4>
            <p>
              <span className="flaticon-placeholder"></span>
            {item.address}, {item.locationid?.title} ,{item.cityid?.title}
            </p>

            <ul className="prop_details mb0">
              {/* {item.itemDetails.map((val, i) => ( */}
              {item.paymentplan && (
               <li className="list-inline-item" key="1">
                <a href="{`/property-detail/${item.slug}">
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
               {item.categoryid._id=="67ea48d17cfa562fe8eaafd0" && item.foodcourt && (
              <li className="list-inline-item" key="3">
                <a href={`/property-detail/${item.slug}`}>
                Food court/restaurant: {item.foodcourt ? "Yes" : "No"}
                </a>
              </li>
              )}
              
              
              {item.categoryid._id=="67ea48d17cfa562fe8eaafd0" && item.multiplex && (
              <li className="list-inline-item" key="4">
                <a href={`/property-detail/${item.slug}`}>
                Multiplex: {item.multiplex ? "Yes" : "No"}
                </a>
              </li>
            )}
            
                
              {/* ))} */}
            </ul>
          </div>
          {/* End .tc_content */}

          <div className="fp_footer">
            <ul className="fp_meta float-start mb0">
              <li className="list-inline-item">
                <Link href={`tel:${item?.sellerid?.phone}`}>
                  <Image
                    width={40}
                    height={40}
                    src="/assets/images/property/man.png"
                    alt="pposter1.png"
                  />
                </Link>
              </li>
              <li className="list-inline-item">
                <Link href={`tel:${item?.sellerid?.phone}`}>{item?.sellerid?.title}</Link>
              </li>
            </ul>
            {/* <div className="fp_pdate float-end">{item.postedYear}</div> */}
            <div className="fp_pdate float-end d-flex gap-2 align-items-center">
              <a href={`tel:${item?.sellerid?.phone}`} className="me-2 circle-shape text-dark">
                {/* <i className="fa fa-phone"></i> */}
                <span className="flaticon-telephone"></span>
              </a>
              <a href={`mailto:${item?.sellerid?.email}`} className="circle-shape text-dark">
                {/* <i className="fa fa-envelope"></i> */}
                <span className="flaticon-black-back-closed-envelope-shape"></span>
              </a>
            </div>
          </div>
          {/* End .fp_footer */}
        </div>
        {/* End .details */}
      </div>
    </div>
  ));
  // useEffect(() => {
  //   fetchProperties();
  // }, []); 
  useEffect(() => {
    const stored = localStorage.getItem('propertycompare');
   
    if (stored) {
      setPropertySelectedComp(JSON.parse(stored));
    }
   
  }, []);
  
  // useEffect(() => {
  //   localStorage.setItem("propertycompare", JSON.stringify(propertySelectedComp));
    
   
  // }, [propertySelectedComp]);
  useEffect(() => {
    if (Array.isArray(propertycompare)) {
      localStorage.setItem("propertycompare", JSON.stringify(propertycompare));
    }
  }, [propertycompare]);
  
  
  // return (
  //   <>
  //     <Slider {...settings} arrows={false}>
  //       {content}
  //     </Slider>
  //   </>
  // );
  return (
  <>
    {properties.length > 2 ? (
      <Slider {...settings} arrows={false}>
        {content}
      </Slider>
    ) : (
      <div className="row">
        {properties.map((item, index) => (
          <div className="col-md-6" key={item._id}>
            {content[index]}
          </div>
        ))}
      </div>
    )}
  </>
);

};

export default FeaturedProperties;
