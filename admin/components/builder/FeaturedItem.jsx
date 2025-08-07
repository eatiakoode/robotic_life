
'use client'

import Link from "next/link";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { addLength } from "@/features/properties/propertiesSlice";
// import properties from "@/data/properties";
import Image from "next/image";

const FeaturedItem = ({setPropertySelectedComp,setShowBox,properties}) => {
  const dispatch = useDispatch();
  const { statusType, featured, isGridOrList } = useSelector(
    (state) => state.filter
  );
  // status handler
  let content = properties
    // ?.slice(0, 36)
    ?.map((item,index) => (
      <div
      className={`${
        isGridOrList ? "col-12 feature-list" : "col-md-4 col-lg-4"
      } `}
      key={item._id}
    >
      <div
        className={`feat_property home7 style4 ${
          isGridOrList ? "d-flex align-items-center" : undefined
        }`}
      >
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
            <li className="list-inline-item" key="1">
                <a href="#">{item.categoryid?.title}</a>
              </li>
              {/* <li className="list-inline-item">
                <a href="#">Featured</a>
              </li>
              <li className="list-inline-item">
                <a href="#" className="text-capitalize">
                  {item.featured}
                </a>
              </li> */}
            </ul>
            <ul className="icon mb0">
              <li className="list-inline-item">
              <a href="#" className="tooltip-icon" data-tooltip="Compare" onClick={(e) => {
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

            <Link href={`/property-detail/${item.slug}`} className="fp_price">
            {item.price}
            {/* <small>/mo</small> */}
          </Link>
          </div>
        </div>
        <div className="details">
          <div className="tc_content">
          <p className="text-thm">{item.propertytypeid?.title}</p>
          <h4>
            <Link href={`/property-detail/${item.slug}`} >{item.title}</Link>
          </h4>
          <p>
            <span className="flaticon-placeholder"></span>
           {item.address}, {item.locationid?.title}, {item.cityid?.title}
          </p>

          <ul className="prop_details mb0">
            {item.categoryid._id=="67ea48d17cfa562fe8eaafd0" && (
              <li className="list-inline-item" key="1">
                <a href="#">
                Food court/restaurant: {item.foodcourt ? "Yes" : "No"}
                </a>
              </li>
              )}
              {item.categoryid._id=="67e67294759f85d6bf7a131a" && (
              <li className="list-inline-item" key="1">
                <a href="#">
                Beds: {item.bedrooms}
                </a>
              </li>
              )}
              
              {item.categoryid._id=="67ea48d17cfa562fe8eaafd0" && (
              <li className="list-inline-item" key="2">
                <a href="#">
                Multiplex: {item.multiplex ? "Yes" : "No"}
                </a>
              </li>
            )}
            {item.categoryid._id=="67e67294759f85d6bf7a131a" && (
              <li className="list-inline-item" key="2">
                <a href="#">
                Baths: {item.bathrooms}
                </a>
              </li>
            )}
              <li className="list-inline-item" key="3">
                <a href="#">
                Size: {item.areasize} {item.sizeprefix}
                </a>
              </li>
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
      </div>
    </div>
    ));

  // add length of filter items
  useEffect(() => {
    dispatch(addLength(properties.totalCount));
  }, [dispatch, properties]);

  return <>{content}</>;
};

export default FeaturedItem;
