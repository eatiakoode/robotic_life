'use client';

import Slider from "react-slick";
import Image from "next/image";
import Link from "next/link";

const TrendingLocations = ({locationlist}) => {
  const properties = [
  {
    _id: "1",
    title: "DLF Cyber City Office Space",
    slug: "dlf-cyber-city-office-space",
    featuredimageurl: "/assets/images/trend1.webp",
    locationid: { title: "DLF Cyber City" },
    cityid: { title: "Gurugram" },
  },
  {
    _id: "2",
    title: "Luxury Flat in Golf Course Road",
    slug: "luxury-flat-golf-course-road",
    featuredimageurl: "/assets/images/trend1.webp",
    locationid: { title: "Golf Course Road" },
    cityid: { title: "Gurugram" },
  },
  {
    _id: "3",
    title: "Affordable Home in Sector 70A",
    slug: "affordable-home-sector-70a",
    featuredimageurl: "/assets/images/trend1.webp",
    locationid: { title: "Sector 70A" },
    cityid: { title: "Gurugram" },
  },
  {
    _id: "4",
    title: "Commercial Shop in Sohna Road",
    slug: "commercial-shop-sohna-road",
    featuredimageurl: "/assets/images/trend1.webp",
    locationid: { title: "Sohna Road" },
    cityid: { title: "Gurugram" },
  },
];


  const isSlider = locationlist.length > 3;

  const settings = {
    dots: true,
    arrows: false,
    infinite: true,
    slidesToShow: 3,
    slidesToScroll: 1,
    autoplay: true,
    speed: 1000,
    responsive: [
      {
        breakpoint: 992,
        settings: {
          slidesToShow: 2,
        },
      },
      {
        breakpoint: 576,
        settings: {
          slidesToShow: 1,
        },
      },
    ],
  };

  const renderCard = (item) => (
    <div key={item._id} className="trending-card-wrapper">
         <Link
            href={`/property-list?location=${item._id}`}
            className="trending-card d-block text-decoration-none text-white">
            <Image
              // src={item.featuredimageurl}
              src={
                item.locationlogoimage
                  ? `${process.env.NEXT_PUBLIC_API_URL}${item.locationlogoimage}`
                  : "/assets/images/trend1.webp"
              }
              alt={item.title}
              unoptimized
              width={600}
              height={400}
              className="w-100 h-100 cover"
            />
            <div className="overlay">
              <div className="text-content">
                <h4>{item.title}</h4>
                <p>{item.cityid.title}</p>
              </div>
            </div>
          </Link>
    </div>
  );

  return (
    <>
      {isSlider ? (
        <Slider {...settings}>
          {locationlist.map((item) => renderCard(item))}
        </Slider>
      ) : (
        <div className="row">
          {locationlist.map((item) => (
            <div className="col-md-4" key={item._id}>
              {renderCard(item)}
            </div>
          ))}
        </div>
      )}
    </>
  );
};

export default TrendingLocations;
