'use client';

// import Link from "next/link";
import Slider from "react-slick";
import floorproperties from "../../data/floorproperties";
import Image from "next/image";
import { useState } from "react";
import Lightbox from "yet-another-react-lightbox";
import "yet-another-react-lightbox/styles.css";

const FloorFeaturedProperties = ({ unlocked, setShowModal,landingpage }) => {
  const [open, setOpen] = useState(false);
  const [index, setIndex] = useState(0);

  const slides = landingpage?.floorplan?.slice(0, 6).map((item) => ({
    src: item.planimageurl,
    alt: item.title,
  }));
  const settings = {
    dots: false,
    arrows: true,
    slidesToShow: 3,
    slidesToScroll: 1,
    autoplay: false,
    speed: 1200,
    responsive: [
      {
        breakpoint: 1600,
        settings: {
          slidesToShow: 3,
        },
      },
      {
        breakpoint: 1400,
        settings: {
          slidesToShow: 3,
        },
      },
      {
        breakpoint: 992,
        settings: {
          slidesToShow: 2,
        },
      },
      {
        breakpoint: 768,
        settings: {
          slidesToShow: 1,
        },
      },
      {
        breakpoint: 520,
        settings: {
          slidesToShow: 1,
        },
      },
    ],
  };

  return (
    <>
    {landingpage?.floorplan?.length > 0 ? (
    <Slider key={landingpage.floorplan.length} {...settings}>
      {landingpage?.floorplan?.slice(0, 6).map((item, idx) => (
        <div className="item" key={idx}>
        <div
              className={`properti_city home6 ${!unlocked ? "blurred" : ""}`}
              onClick={() => {
                if (!unlocked) {
                  setShowModal(true);
                } else {
                  setIndex(idx);
                  setOpen(true);
                }
              }}
              style={{ cursor: "pointer" }}
            >
            <div className="thumb">
              <Image
                width={585}
                height={416}
                className="img-whp"
                src={
                  item.planimageurl
                    ? `${process.env.NEXT_PUBLIC_API_URL}${item.planimageurl}`
                    : "/assets/images/hotproperties/about-in.webp"
                }
                alt= {`${item.title}`}
                unoptimized
              />
              {/* Optionally, you can put price as a tag or badge */}
              <div className="thmb_cntnt">
                <ul className="tag mb0">
                  <li className="list-inline-item">
                    <span className="badge bg-primary">{item.areasize}</span>
                  </li>
                </ul>
              </div>
            </div>
            {/* End .thumb */}

            <div className="overlay">
              <div className="details">
                <div className="fp_price">
                  {item.title}
                </div>
                {/* <h4>
                  <Link href={`/listing-details/${item.id}`}>
                    {item.title}
                  </Link>
                </h4>
                <p>{item.location}</p> */}
              </div>
            </div>
          </div>
        </div>
      ))}
    </Slider>
    ) : (
      <p>Loading floor plans...</p>
    )}
     <Lightbox
        open={open}
        close={() => setOpen(false)}
        index={index}
        slides={slides}
      />
      </>
  );
};

export default FloorFeaturedProperties;

