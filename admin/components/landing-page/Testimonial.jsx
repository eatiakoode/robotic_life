'use client'

import Image from "next/image";
import Slider from "react-slick";
import { useEffect, useState } from 'react';
import { getTestimonialTableData } from "@/api/frontend/testimonial";

const Testimonial = () => {
    
  const [testimonials, setFindTestimonial] = useState([]);
        //   const router = useRouter();
        
          const fetchFindTestimonial = async () => {
            const data = await getTestimonialTableData();
            
            setFindTestimonial(data);
          };
          useEffect(() => {
            fetchFindTestimonial();
          }, []); 
  const settings = {
    dots: true,
    arrow: false,
    speed: 1200,
    slidesToShow: 1,
    slidesToScroll: 1,
    autoplay: false,
  };

  return (
    <>
      <Slider {...settings} arrows={false}>
        {testimonials?.slice(0, 5).map((item) => (
          <div className="item" key={item._id}>
            <div className="testimonial_grid">
              <div className="thumb">
                <Image width={95} height={95} src="/assets/images/testimonial/man.png" alt="1.jpg" />
              </div>
              <div className="details">
                <h4>{item.title}</h4>
                <p>{item.designation}</p>
                <p className="mt25">{item.description}</p>
              </div>
            </div>
          </div>
        ))}
      </Slider>
    </>
  );
};

export default Testimonial;
