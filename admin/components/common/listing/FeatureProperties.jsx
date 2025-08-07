'use client'

import Image from "next/image";
// import featureProContent from "../../../data/properties";
import Slider from "react-slick";

const FeatureProperties = ({properties}) => {
  const settings = {
    dots: true,
    arrows: false,
    fade: true,
    slidesToShow: 1,
    slidesToScroll: 1,
    autoplay: false,
    speed: 1000,
  };

  return (
    <>
      <Slider {...settings} arrows={false}>
        {properties?.slice(0, 5).map((item) => (
          <div className="item" key={item._id}>
            <div className="feat_property home7">
              <div className="thumb">
                <Image
                  width={300}
                  height={220}
                  className="img-whp w-100 h-100 cover"
                  src={
                    item.featuredimageurl
                      ? `${process.env.NEXT_PUBLIC_API_URL}${item.featuredimageurl.url?item.featuredimageurl.url:item.featuredimageurl}`
                      : `${process.env.NEXT_PUBLIC_API_URL}public/assets/images/thumbnail.webp`
                  }
                  alt= {`${item.featuredimageurl?.name?item.featuredimageurl?.name:item.title}`}
                  unoptimized
                />

                <div className="thmb_cntnt">
                  <ul className="tag mb0">
                  <li className="list-inline-item" key="1">
                  <a href="#">{item.categoryid?.title}</a>
                </li>
                  </ul>
                  <a className="fp_price"href={`/listing-details-v1/${item._id}`}>
                    {item.price}
                    
                  </a>
                  <h4 className="posr color-white">{item.title}</h4>
                </div>
              </div>
            </div>
          </div>
        ))}
      </Slider>
    </>
  );
};

export default FeatureProperties;
